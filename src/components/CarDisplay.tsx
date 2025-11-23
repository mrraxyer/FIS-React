import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarSide } from '@fortawesome/free-solid-svg-icons'

type CarDisplayProps = {
    color: string
    plate: string
}

export default function CarDisplay({ color, plate }: CarDisplayProps) {
    return (
        <div className="absolute bottom-32 right-40 flex flex-col items-center select-none">
            <div className="mb-2 text-slate-800 text-2xl font-bold">{plate}</div>
            <FontAwesomeIcon
                icon={faCarSide}
                className={`${color} drop-shadow`}
                style={{ fontSize: '140px' }}
            />
        </div>
    )
}
