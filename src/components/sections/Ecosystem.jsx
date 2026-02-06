import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from '../../data/data.json';

gsap.registerPlugin(ScrollTrigger);

const Ecosystem = () => {
    const { title, subtitle, items } = data.ecosystem;
    const containerRef = useRef(null);
    const gyroRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=200%",
                    pin: true,
                    scrub: 1,
                }
            });

            // Initial Setup
            gsap.set(".orbit-ring", { rotateX: 90 });
            gsap.set(".tech-item", { scale: 0, opacity: 0 });

            // Animate Rings Opening aka Gyroscope effect
            tl.to("#ring-1", { rotateX: 110, rotateY: 20, duration: 2 }, 0)
                .to("#ring-2", { rotateX: 70, rotateY: -20, duration: 2 }, 0)
                .to("#ring-3", { rotateX: 90, rotateY: 0, scale: 1.2, duration: 2 }, 0)

                // Rotate the whole gyro assembly
                .to(gyroRef.current, { rotateZ: 180, duration: 5, ease: "none" }, 0);

            // Animate Items Popping Up
            items.forEach((_, index) => {
                const angle = (index / items.length) * Math.PI * 2;
                const radius = 180; // Distance from center
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                // Position items in a circle
                gsap.set(`#tech-item-${index}`, {
                    x: x,
                    y: y,
                    z: 0
                });

                tl.to(`#tech-item-${index}`, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "back.out(1.7)"
                }, index * 0.2); // Stagger appearance
            });

            // Continuous rotation for the gyro (independent of scroll for liveliness)
            gsap.to(".gyro-inner", {
                rotateY: 360,
                duration: 20,
                repeat: -1,
                ease: "none"
            });

        }, containerRef);

        return () => ctx.revert();
    }, [items]);

    const getIcon = (iconName) => {
        const iconClass = "w-8 h-8 text-white";
        // Simple placeholder paths for the tech icons
        const icons = {
            rust: <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6Z" /></svg>,
            wayland: <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2,12 L12,2 L22,12 L12,22 Z" /></svg>,
            pipewire: <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="8" /><path d="M12,4 V20 M4,12 H20" /></svg>,
            vulkan: <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M12,2 L2,20 H22 L12,2 Z" /></svg>
        };
        return icons[iconName] || icons.rust;
    };

    return (
        <section ref={containerRef} className="relative h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-accent)_0%,_transparent_70%)] opacity-20 blur-[100px]" />

            <div className="relative z-10 text-center mb-20">
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
                    {title}
                </h2>
                <p className="text-lg text-white/60 font-light">{subtitle}</p>
            </div>

            {/* 3D Scene */}
            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] perspective-1000">
                <div ref={gyroRef} className="w-full h-full relative preserve-3d flex items-center justify-center">

                    {/* Central Core */}
                    <div className="absolute w-24 h-24 bg-white rounded-full shadow-[0_0_50px_var(--color-accent)] animate-pulse z-20" style={{ willChange: 'transform' }}>
                        <div className="absolute inset-0 bg-white blur-xl opacity-50"></div>
                    </div>

                    {/* Orbit Rings */}
                    <div className="absolute inset-0 flex items-center justify-center preserve-3d gyro-inner" style={{ willChange: 'transform' }}>
                        <div id="ring-1" className="orbit-ring absolute w-[300px] h-[300px] rounded-full border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]" style={{ willChange: 'transform' }} />
                        <div id="ring-2" className="orbit-ring absolute w-[400px] h-[400px] rounded-full border border-white/10" style={{ willChange: 'transform' }} />
                        <div id="ring-3" className="orbit-ring absolute w-[500px] h-[500px] rounded-full border border-dashed border-white/10" style={{ willChange: 'transform' }} />
                    </div>

                    {/* Tech Items Orbiting */}
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            id={`tech-item-${index}`}
                            className="tech-item absolute w-auto h-auto min-w-[120px] glass rounded-xl p-3 flex items-center gap-3 border border-white/10 shadow-lg cursor-pointer hover:scale-110 transition-transform"
                            style={{
                                background: `linear-gradient(135deg, rgba(255,255,255,0.05), transparent)`,
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${item.color}`}>
                                {getIcon(item.icon)}
                            </div>
                            <div className="text-left">
                                <h4 className="font-bold text-sm text-white">{item.title}</h4>
                                <p className="text-[10px] text-white/50 whitespace-nowrap">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Ecosystem;
