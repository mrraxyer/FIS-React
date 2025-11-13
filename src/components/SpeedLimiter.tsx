export default function SpeedLimiter() {
    return (
        <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
                {/* Red circle */}
                <div className="absolute inset-0 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-4xl font-bold text-white">60</span>
                </div>

                <div className="absolute -bottom-12 left-0 right-0 text-center">
                    <span className="text-lg font-semibold text-slate-700">km/h</span>
                </div>
            </div>
        </div>
    )
}
