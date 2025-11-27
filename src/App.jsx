import { useState, useRef, useEffect } from "react";
import { HexagonBackground } from '@/components/ui/shadcn-io/hexagon-background'

// Julia Set Renderer Component
function JuliaSetRenderer({ cRe = -0.700, cIm = 0.270 }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width = 600;
        const height = canvas.height = 600;

        const maxIter = 500;
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
                    pixels[idx] = 0;           // R
                    pixels[idx + 1] = v;       // G
                    pixels[idx + 2] = v;       // B
                }
                pixels[idx + 3] = 255;
            }
        }

        ctx.putImageData(imgData, 0, 0);
    }, [cRe, cIm]);  // Re-render on cRe or cIm change

    return <canvas ref={canvasRef} className="rounded-xl" />;
}

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
    const [cReStr, setCReStr] = useState("-0.700");
    const [cImStr, setCImStr] = useState("0.270");

    const cRe = parseFloat(cReStr) || 0;
    const cIm = parseFloat(cImStr) || 0;

    return (
        <div className="relative h-screen w-full flex items-center justify-center bg-background">
            <HexagonBackground
                hexagonSize={75}
                hexagonMargin={3}
                className="absolute inset-0"
            >
                <div className="relative z-10 text-center text-foreground">
                    <h1 className="text-5xl font-bold mb-6 tracking-tight">Vincent Schall</h1>
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
                            className="atop-4 left-4 text-foreground hover:text-red-500 px-3 py-1 bg-gray-200 rounded font-semibold"
                            onClick={() => setShowJulia(false)}
                        >
                            Close
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-center text-foreground">Julia Set Fractal</h2>
                        <fieldset className="flex flex-col items-center mb-4 space-y-3">
                            <legend className="text-lg font-medium text-foreground">
                                Complex Parameter c:
                            </legend>

                            <div className="flex items-end space-x-2">
                                {/* Real Part Input */}
                                <div className="flex flex-col">
                                    <label htmlFor="cReInput" className="text-sm text-foreground mb-1">
                                        Real
                                    </label>
                                    <input
                                        id="cReInput"
                                        type="text"
                                        inputMode="decimal"
                                        value={cReStr}
                                        onChange={(e) => setCReStr(e.target.value)}
                                        className="w-24 px-2 py-1 border rounded text-foreground bg-background"
                                    />
                                </div>

                                <span className="text-foreground pb-1 text-xl">+</span>

                                {/* Imaginary Part Input */}
                                <div className="flex flex-col">
                                    <label htmlFor="cImInput" className="text-sm text-foreground mb-1">
                                        Imaginary
                                    </label>
                                    <input
                                        id="cImInput"
                                        type="text"
                                        inputMode="decimal"
                                        value={cImStr}
                                        onChange={(e) => setCImStr(e.target.value)}
                                        className="w-24 px-2 py-1 border rounded text-foreground bg-background"
                                    />
                                </div>

                                <span className="text-foreground pb-1 text-xl">i</span>
                            </div>
                        </fieldset>

                        <p className="text-center text-foreground mb-4">Some of my favorites: -0.40+0.60i; 0.28+0.01i; -0.70-0.30i; -0.84-0.23i; -0.80+0.16i</p>

                        <JuliaSetRenderer cRe={cRe} cIm={cIm} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
