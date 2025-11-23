import { useEffect, useRef, useState } from 'react'
import Button from './components/Button'
import SpeedLimiter from './components/SpeedLimiter'
import CarDisplay from './components/CarDisplay'

type Vehicle = { id: string; color: string }
const colors = ['text-red-600', 'text-blue-600', 'text-green-600', 'text-yellow-600', 'text-purple-600', 'text-orange-600']

export default function App() {
    const [running, setRunning] = useState(false)
    const [startTime, setStartTime] = useState<number | null>(null)
    const [elapsed, setElapsed] = useState(0)
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [current, setCurrent] = useState<Vehicle | null>(null)
    const carCountRef = useRef(0)
    const timeoutsRef = useRef<number[]>([])

    const clearScheduled = () => {
        timeoutsRef.current.forEach(id => clearTimeout(id))
        timeoutsRef.current = []
    }

    const finalizeSimulation = (auto = false) => {
        clearScheduled()
        setRunning(false)
        setStartTime(null)
        if (auto) alert('Simulación finalizada automáticamente (>=60s).')
    }

    const generateVehicle = () => {
        carCountRef.current += 1
        const nextColor = colors[carCountRef.current % colors.length]
        const v: Vehicle = { id: `c${carCountRef.current}`, color: nextColor }
        setVehicles(prev => [...prev, v])
        setCurrent(v)
    }

    const scheduleNextCycle = () => {
        if (!startTime) return
        const totalSeconds = Math.floor((Date.now() - startTime) / 1000)
        if (totalSeconds >= 60) {
            finalizeSimulation(true)
            return
        }
        generateVehicle()
        const id = window.setTimeout(() => {
            scheduleNextCycle()
        }, 10000) // wait 10 seconds then generate next
        timeoutsRef.current.push(id)
    }

    const handleStart = () => {
        setVehicles([])
        setCurrent(null)
        carCountRef.current = 0
        setStartTime(Date.now())
        setElapsed(0)
        setRunning(true)
    }

    const handleEnd = () => {
        finalizeSimulation(false)
    }

    // Track elapsed seconds
    useEffect(() => {
        if (!running || !startTime) return
        const interval = window.setInterval(() => {
            setElapsed(Math.floor((Date.now() - startTime) / 1000))
        }, 1000)
        return () => clearInterval(interval)
    }, [running, startTime])

    // Start scheduling when simulation starts
    useEffect(() => {
        if (running && startTime) {
            clearScheduled()
            scheduleNextCycle()
        } else if (!running) {
            clearScheduled()
        }
        return () => clearScheduled()
    }, [running, startTime])

    return (
        <div className="relative min-h-screen bg-white font-sans">
            {/* Left sidebar with buttons and separator*/}
            <div className="absolute left-6 top-0 bottom-0 w-36">
                <Button
                    label="Inicio"
                    className="absolute top-8 left-0"
                    active={!running}
                    buttonType="Inicio"
                    onClick={handleStart}
                />
                <Button
                    label="Fin"
                    className="absolute bottom-8 left-0"
                    active={running}
                    buttonType="Fin"
                    onClick={handleEnd}
                />
            </div>
            <div className="absolute left-40 top-0 bottom-0 w-1 bg-black rounded" />

            {/* Main canvas area */}
            <main className="absolute left-44 right-6 top-0 bottom-0">
                <div className="absolute top-6 left-6">
                    <SpeedLimiter />
                </div>
                {running && current && <CarDisplay color={current.color} />}
                {/* Simple status & table */}
                <div className="absolute top-8 left-72 text-slate-800 text-lg">
                    <div className="font-semibold">Tiempo: {elapsed}s</div>
                </div>
                <div className="absolute top-32 left-72 bg-white/60 border border-slate-400 rounded shadow text-slate-800">
                    <table className="text-lg">
                        <thead>
                            <tr className="bg-slate-200">
                                <th className="px-4 py-2">Coche</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicles.map(v => (
                                <tr key={v.id} className="odd:bg-white even:bg-slate-100">
                                    <td className="px-4 py-2">{v.id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}
