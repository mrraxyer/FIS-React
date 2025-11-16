import type { ReactNode } from 'react'

type ModalProps = {
    isOpen: boolean
    title: string
    message: ReactNode
    onConfirm: () => void
    onCancel: () => void
    confirmText?: string
    cancelText?: string
}

export default function Modal({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = 'Sí',
    cancelText = 'No',
}: ModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
                <p className="text-gray-600 text-lg mb-8">{message}</p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2 text-lg font-medium rounded-lg border-2 border-gray-400 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 text-lg font-medium rounded-lg bg-sky-400 text-white hover:bg-sky-500 transition-colors duration-200"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}
