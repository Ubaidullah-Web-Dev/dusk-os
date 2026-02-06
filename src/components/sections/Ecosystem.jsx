import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from '../../data/data.json';

gsap.registerPlugin(ScrollTrigger);

const Ecosystem = () => {
    const { title, subtitle, items } = data.ecosystem;
    const containerRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=250%",
                    pin: true,
                    scrub: 1.5,
                }
            });

            // Initial state
            gsap.set(".tech-orb", { scale: 0, opacity: 0, z: -200 });
            gsap.set("#energy-core", { scale: 0.5, opacity: 0 });
            gsap.set(".connection-line", { scaleX: 0, opacity: 0 });

            // Phase 1: Core appears
            tl.to("#energy-core", {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: "power2.out"
            })
                // Phase 2: Orbs float in
                .to(".tech-orb", {
                    scale: 1,
                    opacity: 1,
                    z: 0,
                    duration: 1.5,
                    stagger: 0.2,
                    ease: "back.out(1.2)"
                }, "-=0.5")
                // Phase 3: Connection lines appear
                .to(".connection-line", {
                    scaleX: 1,
                    opacity: 0.6,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power1.inOut"
                }, "-=1")
                // Phase 4: Expand the constellation
                .to(".constellation-container", {
                    scale: 1.3,
                    rotateZ: 15,
                    duration: 2,
                    ease: "power1.inOut"
                });

            // Continuous floating animation for orbs
            gsap.to(".tech-orb", {
                y: "random(-30, 30)",
                x: "random(-20, 20)",
                duration: "random(3, 5)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: {
                    each: 0.3,
                    from: "random"
                }
            });

            // Core pulsing
            gsap.to("#energy-core", {
                scale: 1.1,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Particle animation (using canvas)
            const canvas = canvasRef.current;
            if (canvas) {
                const ctx = canvas.getContext('2d');
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                const particles = [];
                const particleCount = 80;

                class Particle {
                    constructor() {
                        this.reset();
                    }

                    reset() {
                        this.x = canvas.width / 2;
                        this.y = canvas.height / 2;
                        this.angle = Math.random() * Math.PI * 2;
                        this.speed = Math.random() * 2 + 1;
                        this.life = 0;
                        this.maxLife = Math.random() * 100 + 100;
                    }

                    update() {
                        this.x += Math.cos(this.angle) * this.speed;
                        this.y += Math.sin(this.angle) * this.speed;
                        this.life++;

                        if (this.life > this.maxLife) {
                            this.reset();
                        }
                    }

                    draw() {
                        const opacity = 1 - (this.life / this.maxLife);
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(139, 92, 246, ${opacity * 0.6})`;
                        ctx.fill();
                    }
                }

                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle());
                }

                function animate() {
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    particles.forEach(particle => {
                        particle.update();
                        particle.draw();
                    });

                    requestAnimationFrame(animate);
                }

                animate();
            }

        }, containerRef);

        return () => ctx.revert();
    }, [items]);

    const getIcon = (iconName) => {
        const iconClass = "w-8 h-8";
        const icons = {
            rust: <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="12" cy="12" r="6" fill="currentColor" /></svg>,
            wayland: <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2,12 L12,2 L22,12 L12,22 Z" /></svg>,
            pipewire: <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="8" /><path d="M12,4 V20 M4,12 H20" /></svg>,
            vulkan: <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M12,2 L2,20 H22 L12,2 Z" /></svg>
        };
        return icons[iconName] || icons.rust;
    };

    // Calculate positions in a circular layout
    const getOrbPosition = (index, total) => {
        const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
        const radius = 250;
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
        };
    };

    return (
        <section
            ref={containerRef}
            className="relative h-screen overflow-hidden flex flex-col items-center justify-center"
            style={{
                background: 'linear-gradient(180deg, var(--color-bg) 0%, #0a0118 50%, #000000 100%)'
            }}
        >
            {/* Canvas for particles */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none opacity-40"
            />

            {/* Holographic Grid Background */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `
                    linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                perspective: '1000px',
                transform: 'rotateX(60deg) scale(2)',
                transformOrigin: 'center'
            }} />

            {/* Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.15)_0%,_transparent_70%)]" />

            {/* Title */}
            <div className="relative z-10 text-center mb-32">
                <h2 className="text-5xl md:text-7xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-purple-400 to-pink-400 animate-pulse">
                    {title}
                </h2>
                <p className="text-lg text-purple-200/70 font-light tracking-wide">{subtitle}</p>
            </div>

            {/* 3D Constellation */}
            <div className="relative w-full h-[600px] perspective-[2000px] flex items-center justify-center">
                <div className="constellation-container relative preserve-3d" style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}>

                    {/* Central Energy Core */}
                    <div
                        id="energy-core"
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full z-20"
                        style={{
                            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.9) 0%, rgba(139, 92, 246, 0.4) 50%, transparent 70%)',
                            boxShadow: '0 0 60px 20px rgba(168, 85, 247, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.3)',
                            willChange: 'transform'
                        }}
                    >
                        <div className="absolute inset-0 rounded-full bg-white opacity-20 blur-xl animate-pulse" />
                        <div className="absolute inset-4 rounded-full border-2 border-white/30 animate-spin" style={{ animationDuration: '8s' }} />
                        <div className="absolute inset-8 rounded-full border border-white/20 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
                    </div>

                    {/* Tech Orbs */}
                    {items.map((item, index) => {
                        const pos = getOrbPosition(index, items.length);
                        return (
                            <div key={item.id}>
                                {/* Connection Line */}
                                <div
                                    className="connection-line absolute left-1/2 top-1/2 h-[2px] origin-left"
                                    style={{
                                        width: '250px',
                                        transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px) rotate(${(index / items.length) * 360 - 90}deg)`,
                                        background: `linear-gradient(90deg, rgba(168, 85, 247, 0.8), transparent)`,
                                        boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
                                        transformOrigin: 'right center',
                                        willChange: 'transform'
                                    }}
                                />

                                {/* Tech Orb */}
                                <div
                                    className="tech-orb absolute left-1/2 top-1/2 group cursor-pointer"
                                    style={{
                                        transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`,
                                        transformStyle: 'preserve-3d',
                                        willChange: 'transform'
                                    }}
                                >
                                    <div className="relative">
                                        {/* Orb Glow */}
                                        <div
                                            className="absolute -inset-4 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{
                                                background: `linear-gradient(135deg, ${item.color.replace('from-', '').replace(' to-', ', ')})`
                                            }}
                                        />

                                        {/* Orb Body */}
                                        <div
                                            className="relative w-24 h-24 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md group-hover:scale-110 transition-all duration-300"
                                            style={{
                                                background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
                                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)'
                                            }}
                                        >
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${item.color}`}>
                                                <div style={{ color: 'white' }}>
                                                    {getIcon(item.icon)}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info Card */}
                                        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-32 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                            <div className="glass rounded-lg p-3 border border-white/10">
                                                <h4 className="font-bold text-sm text-white text-center">{item.title}</h4>
                                                <p className="text-[10px] text-white/60 text-center mt-1">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Ecosystem;
