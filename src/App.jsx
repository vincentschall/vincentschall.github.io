import { HexagonBackground } from '@/components/ui/shadcn-io/hexagon-background'

function App() {
    return (
        <div className="relative h-screen w-full flex items-center justify-center bg-background">
            <HexagonBackground
                hexagonSize={75}
                hexagonMargin={3}
                className="absolute inset-0"
            >
                <div className="relative z-10 text-center text-foreground">
                    <h1 className="text-5xl font-bold mb-6 tracking-tight">vincent schall</h1>
                    <nav className="text-xl mb-4">
                        <a
                            href="https://github.com/vincentschall"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline transition-colors"
                        >
                            GitHub
                        </a>
                        <span> | </span>
                        <a
                            href="https://www.linkedin.com/in/vincent-schall-b15aa1365/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline transition-colors"
                        >
                            LinkedIn
                        </a>
                        <span> | </span>
                        <a
                            href="https://lichess.org/@/HerrKules0721"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline transition-colors"
                        >
                            Lichess
                        </a>
                    </nav>
                    <div className="text-lg">
                        <a
                            href="mailto:v.schall@unibas.ch"
                            className="hover:underline transition-colors"
                        >
                            v.schall@unibas.ch
                        </a>
                    </div>
                </div>
            </HexagonBackground>
        </div>
    )
}

export default App