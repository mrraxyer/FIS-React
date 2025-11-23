export default function SpeedLimiter() {
    const SPEED_LIMIT = 60

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative w-48 h-48">
                {/* Red circle */}
                <div className="absolute inset-0 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-4xl font-bold text-white">{SPEED_LIMIT}</span>
                </div>

                <div className="absolute -bottom-12 left-0 right-0 text-center">
                    <span className="text-lg font-semibold text-slate-700">km/h</span>
                </div>
            </div>
        </div>
    )
}
