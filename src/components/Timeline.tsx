import Button from './Button'

export default function Timeline() {
    return (
        <div className="relative min-h-screen bg-white font-sans">
            {/* Left sidebar with buttons and separator*/}
            <div className="absolute left-6 top-0 bottom-0 w-36">
                <Button label="Inicio" className="absolute top-8 left-0" active={true} />
                <Button label="Fin" className="absolute bottom-8 left-0" active={false} />
            </div>
            <div className="absolute left-40 top-0 bottom-0 w-1 bg-black rounded" />

            {/* Main canvas area */}
            <main className="absolute left-44 right-6 top-0 bottom-0 flex items-center justify-center" aria-hidden="true">
                <h1 className="text-center">Canvas</h1>
            </main>
        </div>
    )
}
