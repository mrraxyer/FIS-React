import CarDisplay from './CarDisplay'

type Vehicle = { id: string; plate: string; speed: number; color: string }

type SimulationAreaProps = {
    running: boolean
    elapsed: number
    current: Vehicle | null
    vehicles: Vehicle[]
}

export default function SimulationArea({ running, elapsed, current, vehicles }: SimulationAreaProps) {
    return (
        <>
            {running && current && <CarDisplay color={current.color} plate={current.plate} />}

            {/* Status display */}
            <div className="absolute top-8 left-72 text-slate-800 text-lg">
                <div className="font-semibold">Tiempo: {elapsed}s</div>
            </div>

            {/* Vehicle table */}
            <div className="absolute top-32 left-72 bg-white/60 border border-slate-400 rounded shadow text-slate-800">
                <table className="text-lg">
                    <thead>
                        <tr className="bg-slate-200">
                            <th className="px-4 py-2">Placa</th>
                            <th className="px-4 py-2">Velocidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map(v => (
                            <tr key={v.id} className="odd:bg-white even:bg-slate-100">
                                <td className="px-4 py-2">{v.plate}</td>
                                <td className="px-4 py-2">{v.speed} km/h</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
