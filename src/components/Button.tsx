import type { CSSProperties } from 'react'

type ButtonProps = {
    label: string
    onClick?: () => void
    className?: string
    style?: CSSProperties
    active?: boolean
    buttonText?: string
}

export default function Button({ label, onClick, className = '', style, active = false, buttonText = '' }: ButtonProps) {
    const base = 'px-6 py-3 text-2xl rounded-full font-medium transition-all duration-200'
    const activeStyles = 'bg-sky-300 text-slate-900 hover:bg-sky-400 hover:shadow-md cursor-pointer'
    const inactiveStyles = 'bg-sky-200 text-slate-500 cursor-not-allowed'

    const handleClick = () => {
        if (active) {
            if (onClick) onClick()
            alert(`Botón "${label}" presionado. ${buttonText}`)
        }
    }

    return (
        <button
            onClick={handleClick}
            className={`${base} ${active ? activeStyles : inactiveStyles} ${className}`}
            style={style}
            aria-pressed={active}
        >
            {label}
        </button>
    )
}
