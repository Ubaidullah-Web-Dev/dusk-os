import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import data from '../../data/data.json';

const Architecture = () => {
    const { title, subtitle, layers } = data.architecture;
    const containerRef = useRef(null);

    const getIcon = (iconName) => {
        const icons = {
            chip: (
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            cube: (
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
            window: (
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
            )
        };
        return icons[iconName] || null;
    };

    return (
        <section id="architecture" className="relative min-h-[200vh] bg-[#050508]">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0f] to-black" />
                <div className="absolute inset-0 grid-bg opacity-30" />

                <div className="relative z-10 text-center mb-10 translate-y-[5vh] section-reveal">
                    <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 text-white">
                        {title}
                    </h2>
                    <p className="text-xl text-white/60 max-w-xl mx-auto">{subtitle}</p>
                </div>

                <div className="relative w-full max-w-4xl h-[60vh] perspective-2000 flex items-center justify-center">
                    <div className="relative w-80 h-80 preserve-3d" id="arch-container">

                        {/* Connecting Line */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-[400px] bg-gradient-to-b from-transparent via-purple-500/50 to-transparent preserve-3d" style={{ transform: 'rotateX(90deg)' }} />

                        {layers.map((layer, index) => (
                            <div
                                key={layer.id}
                                id={`arch-layer-${index}`}
                                className="absolute inset-0 glass rounded-3xl p-8 flex flex-col items-center justify-center text-center opacity-0"
                                style={{
                                    background: 'rgba(10, 10, 15, 0.6)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    transform: `translateY(${index * 2}px)` // Initial stack
                                }}
                            >
                                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${layer.color} flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20`}>
                                    {getIcon(layer.icon)}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{layer.title}</h3>
                                <p className="text-sm text-white/50">{layer.description}</p>

                                {/* Glow effect behind */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${layer.color} opacity-5 blur-2xl -z-10 rounded-3xl`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Architecture;
