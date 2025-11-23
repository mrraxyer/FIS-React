import Button from './components/Button'
import SpeedLimiter from './components/SpeedLimiter'
import SimulationArea from './components/SimulationArea'
import { useVehicleSimulation } from './hooks/useVehicleSimulation'

export default function App() {
    const { running, elapsed, vehicles, current, startSimulation, endSimulation } = useVehicleSimulation()

    return (
        <div className="relative min-h-screen bg-white font-sans">
            {/* Left sidebar with buttons and separator*/}
            <div className="absolute left-6 top-0 bottom-0 w-36">
                <Button
                    label="Inicio"
                    className="absolute top-8 left-0"
                    active={!running}
                    buttonType="Inicio"
                    onClick={startSimulation}
                />
                <Button
                    label="Fin"
                    className="absolute bottom-8 left-0"
                    active={running}
                    buttonType="Fin"
                    onClick={endSimulation}
                />
            </div>
            <div className="absolute left-40 top-0 bottom-0 w-1 bg-black rounded" />

            {/* Main canvas area */}
            <main className="absolute left-44 right-6 top-0 bottom-0">
                <div className="absolute top-6 left-6">
                    <SpeedLimiter />
                </div>
                <SimulationArea running={running} elapsed={elapsed} current={current} vehicles={vehicles} />
            </main>
        </div>
    )
}
