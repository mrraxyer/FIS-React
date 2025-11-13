import type { CSSProperties } from 'react'

type ButtonProps = {
    label: string
    onClick?: () => void
    className?: string
    style?: CSSProperties
    active?: boolean
}

export default function Button({ label, onClick, className = '', style, active = false }: ButtonProps) {
    const base = 'px-6 py-3 text-2xl rounded-full font-medium transition-all duration-200'
    const activeStyles = 'bg-sky-300 text-slate-900 hover:bg-sky-400 hover:shadow-md cursor-default'
    const inactiveStyles = 'bg-red-300 text-white cursor-not-allowed'

    return (
        <button
            onClick={onClick}
            className={`${base} ${active ? activeStyles : inactiveStyles} ${className}`}
            style={style}
            aria-pressed={active}
        >
            {label}
        </button>
    )
}
