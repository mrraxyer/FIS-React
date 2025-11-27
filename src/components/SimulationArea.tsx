import CarDisplay from './CarDisplay'

type Vehicle = { id: string; plate: string; speed: number; color: string; points: number }

type SimulationAreaProps = {
    running: boolean
    elapsed: number
    current: Vehicle | null
    vehicles: Vehicle[]
}

const SPEED_LIMIT = 60 // km/h

export default function SimulationArea({ running, elapsed, current, vehicles }: SimulationAreaProps) {
    const exceedsCurrent = current && current.speed > SPEED_LIMIT

    return (
        <>
            {running && current && (
                <div className="absolute bottom-32 right-40 flex flex-col items-center">
                    <CarDisplay color={current.color} plate={current.plate} />
                    <div className={`mt-4 text-2xl font-bold ${exceedsCurrent ? 'text-red-600' : 'text-green-600'}`}>
                        {exceedsCurrent ? 'Excede' : 'Normal'}
                    </div>
                </div>
            )}

            {/* Status display */}
            <div className="absolute top-8 left-72 text-slate-800 text-lg">
                <div className="font-semibold">Tiempo: {Math.min(elapsed, 60)}s</div>
            </div>

            {/* Vehicle table */}
            <div className="absolute top-32 left-72 bg-white/60 border border-slate-400 rounded shadow text-slate-800">
                <table className="text-lg">
                    <thead>
                        <tr className="bg-slate-200">
                            <th className="px-4 py-2">Placa</th>
                            <th className="px-4 py-2">Velocidad</th>
                            <th className="px-4 py-2">Puntos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map(v => (
                            <tr key={v.id} className="odd:bg-white even:bg-slate-100">
                                <td className="px-4 py-2">{v.plate}</td>
                                <td className="px-4 py-2">{v.speed} km/h</td>
                                <td className={`px-4 py-2 font-semibold ${v.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {v.points === 0 ? 'No' : 'Si'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
