import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarSide } from '@fortawesome/free-solid-svg-icons'

type CarDisplayProps = {
    color: string
}

export default function CarDisplay({ color }: CarDisplayProps) {
    return (
        <div className="absolute bottom-32 right-40 flex flex-col items-center select-none">
            <FontAwesomeIcon
                icon={faCarSide}
                className={`${color} drop-shadow`}
                style={{ fontSize: '140px' }}
            />
        </div>
    )
}
