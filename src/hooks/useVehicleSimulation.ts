import { useState, useRef, useEffect } from 'react'

type Vehicle = { id: string; plate: string; speed: number; color: string; points: number }

const colors = ['text-red-600', 'text-blue-600', 'text-green-600', 'text-yellow-600', 'text-purple-600', 'text-orange-600']
const SPEED_LIMIT = 60

export function useVehicleSimulation() {
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

    const genPlate = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const code = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join('')
        return `GT-${code}`
    }

    const genSpeed = () => Math.floor(20 + Math.random() * 101) // 20-120 km/h

    const generateVehicle = () => {
        carCountRef.current += 1
        const nextColor = colors[carCountRef.current % colors.length]
        const speed = genSpeed()
        const points = speed <= SPEED_LIMIT ? 10 : 0
        const v: Vehicle = {
            id: `c${carCountRef.current}`,
            plate: genPlate(),
            speed,
            color: nextColor,
            points
        }
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

    const finalizeSimulation = (auto = false) => {
        clearScheduled()
        setRunning(false)
        setStartTime(null)
        if (auto) alert('Simulación finalizada automáticamente (>=60s).')
    }

    const startSimulation = () => {
        setVehicles([])
        setCurrent(null)
        carCountRef.current = 0
        setStartTime(Date.now())
        setElapsed(0)
        setRunning(true)
    }

    const endSimulation = () => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [running, startTime])

    return {
        running,
        elapsed,
        vehicles,
        current,
        startSimulation,
        endSimulation
    }
}
