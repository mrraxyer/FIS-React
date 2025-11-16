import type { CSSProperties } from 'react'
import { useState } from 'react'
import Modal from './Modal'

type ButtonProps = {
    label: string
    onClick?: () => void
    className?: string
    style?: CSSProperties
    active?: boolean
    buttonType?: 'Inicio' | 'Fin'
}

export default function Button({ label, onClick, className = '', style, active = false, buttonType }: ButtonProps) {
    const [showModal, setShowModal] = useState(false)

    const base = 'px-6 py-3 text-2xl rounded-full font-medium transition-all duration-200'
    const activeStyles = 'bg-sky-300 text-slate-900 hover:bg-sky-400 hover:shadow-md cursor-pointer'
    const inactiveStyles = 'bg-sky-200 text-slate-500 cursor-not-allowed'

    const handleClick = () => {
        if (active) {
            // Custom behavior based on buttonType
            if (buttonType === 'Inicio') {
                alert('Simulación iniciada.')
                if (onClick) {
                    onClick()
                }
            } else if (buttonType === 'Fin') {
                setShowModal(true)
            }
        }
    }

    const handleConfirm = () => {
        setShowModal(false)
        alert('Simulación finalizada.')
        if (onClick) {
            onClick()
        }
    }

    const handleCancel = () => {
        setShowModal(false)
    }

    return (
        <>
            <button
                onClick={handleClick}
                className={`${base} ${active ? activeStyles : inactiveStyles} ${className}`}
                style={style}
                aria-pressed={active}
            >
                {label}
            </button>
            <Modal
                isOpen={showModal}
                title="¿Terminar simulación?"
                message="¿Estás seguro de que deseas finalizar la simulación?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                confirmText="Sí"
                cancelText="No"
            />
        </>
    )
}
