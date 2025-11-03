import { useState, useRef, useEffect } from "react";
import { HexagonBackground } from '@/components/ui/shadcn-io/hexagon-background'

// Julia Set Renderer Component
function JuliaSetRenderer({ cRe = -0.7, cIm = 0.27015 }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width = 600;
        const height = canvas.height = 600;

        const maxIter = 300;
        const zoom = 1.5;
        const moveX = 0;
        const moveY = 0;

        const imgData = ctx.createImageData(width, height);
        const pixels = imgData.data;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let zx = 1.5 * (x - width / 2) / (0.5 * zoom * width) + moveX;
                let zy = (y - height / 2) / (0.5 * zoom * height) + moveY;
                let i = 0;
                while (zx * zx + zy * zy < 4 && i < maxIter) {
                    const tmp = zx * zx - zy * zy + cRe;
                    zy = 2.0 * zx * zy + cIm;
                    zx = tmp;
                    i++;
                }
                const idx = (y * width + x) * 4;

                if (i === maxIter) {
                    // Black for inside the set (background)
                    pixels[idx] = 0;     // R
                    pixels[idx + 1] = 0; // G
                    pixels[idx + 2] = 0; // B
                } else {
                    // Bluish gradient for outside the set (fractal)
                    const v = (i / maxIter) * 255;
                    pixels[idx] = 0;           // R (black)
                    pixels[idx + 1] = 0;       // G (black)
                    pixels[idx + 2] = v;       // B (0 to full blue)
                }
                pixels[idx + 3] = 255;
            }
        }

        ctx.putImageData(imgData, 0, 0);
    }, [cRe, cIm]);  // Re-render on cRe or cIm change

    return <canvas ref={canvasRef} className="rounded-xl" />;
}

// Door Open Icon Component (from Lucide)
function DoorIcon({ size = 32 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 4h3a2 2 0 0 1 2 2v14"/>
            <path d="M2 20h3"/>
            <path d="M13 20h9"/>
            <path d="M10 12v.01"/>
            <path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"/>
        </svg>
    );
}

function App() {
    const [showJulia, setShowJulia] = useState(false);
    const [cRe, setCRe] = useState(-0.7);
    const [cIm, setCIm] = useState(0.27015);

    const handleCReChange = (e) => {
        const num = e.target.valueAsNumber;
        if (!isNaN(num)) {
            setCRe(num);
        }
    };

    const handleCImChange = (e) => {
        const num = e.target.valueAsNumber;
        if (!isNaN(num)) {
            setCIm(num);
        }
    };

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

            {/* Door Button */}
            <button
                className="fixed bottom-4 right-4 z-20 p-3 bg-white rounded-full shadow-lg hover:bg-gray-200 transition"
                onClick={() => setShowJulia(true)}
                title="open secret feature"
            >
                <DoorIcon size={48} />
            </button>

            {/* Julia Set Modal */}
            {showJulia && (
                <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70">
                    <div className="bg-background rounded-2xl p-6 max-w-full max-h-full overflow-auto relative">
                        <button
                            className="absolute top-4 right-4 text-foreground hover:text-red-500 px-3 py-1 bg-gray-200 rounded font-semibold"
                            onClick={() => setShowJulia(false)}
                        >
                            Close
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-center text-foreground">Julia Set Fractal</h2>

                        {/* Input Controls */}
                        <div className="flex flex-col items-center mb-4 space-y-2">
                            <label className="text-sm text-foreground">Complex Parameter c = </label>
                            <div className="flex space-x-4">
                                <input
                                    type="number"
                                    step="0.00001"
                                    value={cRe}
                                    onChange={handleCReChange}
                                    className="w-24 px-2 py-1 border rounded text-foreground bg-background"
                                    placeholder="Real"
                                />
                                <span className="text-foreground">+</span>
                                <input
                                    type="number"
                                    step="0.00001"
                                    value={cIm}
                                    onChange={handleCImChange}
                                    className="w-24 px-2 py-1 border rounded text-foreground bg-background"
                                    placeholder="Imag"
                                />
                                <span className="text-foreground">i</span>
                            </div>
                        </div>

                        <p className="text-center text-foreground mb-4">Current: c = {cRe} + {cIm}i</p>
                        <JuliaSetRenderer cRe={cRe} cIm={cIm} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;