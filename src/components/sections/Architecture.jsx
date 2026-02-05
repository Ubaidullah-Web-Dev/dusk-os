import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from '../../data/data.json';

gsap.registerPlugin(ScrollTrigger);

const Architecture = () => {
    const { title, subtitle, layers } = data.architecture;
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=300%", // Increased pin duration for the full cycle
                    pin: true,
                    scrub: 1,
                }
            });

            // Initial setup for 3D look
            gsap.set("#arch-container", {
                rotateX: 60,
                rotateZ: -20,
                scale: 0.8
            });

            // Phase 1: Expand
            tl.to("#arch-container", {
                rotateX: 60,
                rotateZ: -20,
                scale: 0.8,
                duration: 1
            })
                .to("#arch-layer-0", { z: 200, y: -100, opacity: 1, duration: 1 }, 0)
                .to("#arch-layer-1", { z: 0, opacity: 1, duration: 1 }, 0)
                .to("#arch-layer-2", { z: -200, y: 100, opacity: 1, duration: 1 }, 0)

                // Phase 2: Hold (do nothing for a bit so user can see it)
                .to({}, { duration: 0.5 })

                // Phase 3: Collapse back
                .to("#arch-layer-0", { z: 0, y: 0, opacity: 0, duration: 1 }, ">")
                .to("#arch-layer-1", { z: 0, opacity: 0, duration: 1 }, "<")
                .to("#arch-layer-2", { z: 0, y: 0, opacity: 0, duration: 1 }, "<");

            // Mouse Tilt Effect
            const handleMouseMove = (e) => {
                const { clientX, clientY } = e;
                const { innerWidth } = window;
                const x = (clientX / innerWidth - 0.5) * 2;

                gsap.to("#arch-container", {
                    rotateY: x * 15,
                    duration: 1,
                    ease: "power2.out"
                });
            };

            window.addEventListener('mousemove', handleMouseMove);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const getIcon = (iconName) => {
        const iconClass = "w-12 h-12 text-[var(--color-text-primary)]";
        const icons = {
            chip: (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            cube: (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
            window: (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
            )
        };
        return icons[iconName] || null;
    };

    return (
        <section ref={containerRef} id="architecture" className="relative h-screen overflow-hidden flex flex-col items-center justify-center transition-colors duration-500" style={{ backgroundColor: 'var(--color-bg)' }}>

            {/* Theme-aware Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)] via-[var(--color-bg-elevated)] to-[var(--color-bg)] opacity-90" />

            {/* Abstract Blur Blobs using Theme Colors */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-accent)] rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-accent-glow)] rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="absolute inset-0 grid-bg opacity-30" />

            <div className="relative z-10 text-center mb-10 section-reveal">
                <h2 className="text-5xl md:text-7xl font-display font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>
                    {title}
                </h2>
                <p className="text-xl max-w-xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>{subtitle}</p>
            </div>

            <div className="relative w-full max-w-4xl h-[60vh] perspective-2000 flex items-center justify-center">
                <div className="relative w-80 h-80 preserve-3d" id="arch-container">

                    {/* Connecting Line - Theme aware */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-[400px] preserve-3d"
                        style={{
                            transform: 'rotateX(90deg)',
                            background: 'linear-gradient(to bottom, transparent, var(--color-accent), transparent)'
                        }}
                    />

                    {layers.map((layer, index) => (
                        <div
                            key={layer.id}
                            id={`arch-layer-${index}`}
                            className="absolute inset-0 glass rounded-3xl p-8 flex flex-col items-center justify-center text-center opacity-0"
                            style={{
                                background: 'color-mix(in srgb, var(--color-surface) 60%, transparent)',
                                border: '1px solid var(--color-border)',
                                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                                // Initial transform is handled by GSAP
                            }}
                        >
                            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                                style={{
                                    background: layer.color.includes('gradient') ? layer.color : `linear-gradient(135deg, var(--color-surface), var(--color-bg))`,
                                    boxShadow: `0 10px 30px -10px var(--color-accent-glow)`
                                }}>
                                {getIcon(layer.icon)}
                            </div>
                            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>{layer.title}</h3>
                            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{layer.description}</p>

                            {/* Glow effect behind */}
                            <div className="absolute inset-0 opacity-10 blur-2xl -z-10 rounded-3xl"
                                style={{ background: 'var(--color-accent)' }} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Architecture;
