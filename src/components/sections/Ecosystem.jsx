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
                    end: "+=400%", // Extended for dramatic scroll journey
                    pin: true,
                    scrub: 1,
                }
            });

            // Initial state - everything hidden and behind
            gsap.set(".tech-orb", { scale: 0, opacity: 0, z: -500, rotateX: -90 });
            gsap.set("#energy-core", { scale: 0, opacity: 0, rotateZ: 0 });
            gsap.set(".connection-line", { scaleX: 0, opacity: 0 });
            gsap.set(".constellation-container", { scale: 0.5, rotateX: 0, rotateY: 0, rotateZ: 0 });

            // PHASE 1: Core Genesis  
            tl.to("#energy-core", {
                scale: 1,
                opacity: 1,
                rotateZ: 360,
                duration: 2,
                ease: "power2.out"
            })

                // PHASE 2: Orbs Materialize
                .to(".tech-orb", {
                    scale: 1,
                    opacity: 1,
                    z: 0,
                    rotateX: 0,
                    duration: 2,
                    stagger: 0.15,
                    ease: "back.out(1.5)"
                }, "+=0.5")

                // PHASE 3: Connection Activation
                .to(".connection-line", {
                    scaleX: 1,
                    opacity: 0.8,
                    duration: 1.5,
                    stagger: 0.1,
                    ease: "power2.inOut"
                }, "-=1")

                // PHASE 4: 3D Rotation Dance
                .to(".constellation-container", {
                    rotateY: 180,
                    rotateX: 20,
                    scale: 1.2,
                    duration: 3,
                    ease: "power1.inOut"
                }, "+=0.3")

                // PHASE 5: Orbs Orbit Shift
                .to(".tech-orb", {
                    z: 60,
                    rotateZ: 360,
                    scale: 1.05,
                    duration: 2.5,
                    stagger: {
                        each: 0.2,
                        from: "center"
                    },
                    ease: "power2.inOut"
                }, "-=1.5")

                // PHASE 6: Constellation Finale (subtle)
                .to(".constellation-container", {
                    scale: 1.2,
                    rotateY: 360,
                    rotateZ: 20,
                    duration: 3,
                    ease: "power2.inOut"
                })
                .to(".tech-orb", {
                    scale: 1.1,
                    z: 100,
                    duration: 3,
                    stagger: 0.1,
                    ease: "power2.inOut"
                }, "<")
                .to("#energy-core", {
                    scale: 1.25,
                    rotateZ: 720,
                    duration: 3,
                    ease: "power2.inOut"
                }, "<");

            // Continuous floating animation for orbs (pauses individually on hover)
            document.querySelectorAll('.tech-orb').forEach(orb => {
                const float = gsap.to(orb, {
                    y: "random(-40, 40)",
                    x: "random(-20, 20)",
                    rotateZ: "random(-10, 10)",
                    duration: "random(3, 5)",
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });

                orb.addEventListener('mouseenter', () => {
                    float.pause();
                    gsap.to(orb, { x: 0, y: 0, rotateZ: 0, scale: 1.1, duration: 0.4, ease: "power2.out" });
                });
                orb.addEventListener('mouseleave', () => {
                    float.play();
                    gsap.to(orb, { scale: 1, duration: 0.4, ease: "power2.in" });
                });
            });

            // Core pulsing (more intense)
            gsap.to("#energy-core", {
                scale: 1.15,
                duration: 1.5,
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
                const particleCount = 120; // Increased particle count

                class Particle {
                    constructor() {
                        this.reset();
                        this.hue = Math.random() * 60 + 250; // Purple to pink range
                    }

                    reset() {
                        this.x = canvas.width / 2;
                        this.y = canvas.height / 2;
                        this.angle = Math.random() * Math.PI * 2;
                        this.speed = Math.random() * 3 + 1;
                        this.life = 0;
                        this.maxLife = Math.random() * 120 + 80;
                        this.radius = Math.random() * 2 + 1;
                    }

                    update() {
                        this.x += Math.cos(this.angle) * this.speed;
                        this.y += Math.sin(this.angle) * this.speed;
                        this.angle += 0.01; // Spiral effect
                        this.life++;

                        if (this.life > this.maxLife) {
                            this.reset();
                        }
                    }

                    draw() {
                        const opacity = 1 - (this.life / this.maxLife);
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                        ctx.fillStyle = `hsla(${this.hue}, 60%, 50%, ${opacity * 0.3})`;
                        ctx.shadowBlur = 4;
                        ctx.shadowColor = `hsla(${this.hue}, 70%, 55%, ${opacity * 0.2})`;
                        ctx.fill();
                    }
                }

                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle());
                }

                function animate() {
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
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
                className="absolute inset-0 pointer-events-none opacity-20"
            />

            {/* Holographic Grid Background */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `
                    linear-gradient(var(--color-accent) 1px, transparent 1px),
                    linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
                perspective: '1200px',
                transform: 'rotateX(65deg) scale(2.5)',
                transformOrigin: 'center'
            }} />

            {/* Radial Glow */}
            <div className="absolute inset-0" style={{
                background: 'radial-gradient(circle at center, color-mix(in srgb, var(--color-accent) 15%, transparent) 0%, transparent 70%)'
            }} />

            {/* Animated rays */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
                    style={{
                        background: 'conic-gradient(from 0deg, transparent 0deg, color-mix(in srgb, var(--color-accent) 5%, transparent) 45deg, transparent 90deg, transparent 180deg, color-mix(in srgb, var(--color-accent) 5%, transparent) 225deg, transparent 270deg)',
                        animation: 'spin 25s linear infinite',
                    }}
                />
            </div>

            {/* Title */}
            <div className="relative z-10 text-center mb-32">
                <h2 className="text-5xl md:text-7xl font-display font-bold mb-4" style={{
                    color: 'var(--color-text-primary)'
                }}>
                    {title}
                </h2>
                <p className="text-lg font-light tracking-wide" style={{
                    color: 'var(--color-text-secondary)'
                }}>{subtitle}</p>
            </div>

            {/* 3D Constellation */}
            <div className="relative w-full h-[600px] perspective-[2000px] flex items-center justify-center">
                <div className="constellation-container relative preserve-3d" style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}>

                    {/* Central Energy Core */}
                    <div
                        id="energy-core"
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full z-20"
                        style={{
                            background: 'radial-gradient(circle, color-mix(in srgb, var(--color-accent) 85%, transparent) 0%, color-mix(in srgb, var(--color-accent) 35%, transparent) 50%, transparent 70%)',
                            boxShadow: '0 0 60px 20px color-mix(in srgb, var(--color-accent) 50%, transparent), inset 0 0 30px rgba(255, 255, 255, 0.2)',
                            willChange: 'transform'
                        }}
                    >
                        <div className="absolute inset-0 rounded-full bg-white opacity-30 blur-xl animate-pulse" />
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
                                        background: `linear-gradient(90deg, var(--color-accent), transparent)`,
                                        boxShadow: '0 0 10px color-mix(in srgb, var(--color-accent) 40%, transparent)',
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
                                            className="absolute -inset-6 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{
                                                background: `linear-gradient(135deg, ${item.color.replace('from-', '').replace(' to-', ', ')})`
                                            }}
                                        />

                                        {/* Orb Body */}
                                        <div
                                            className="relative w-28 h-28 rounded-full flex items-center justify-center border-2 border-white/30 backdrop-blur-md group-hover:scale-110 transition-all duration-300"
                                            style={{
                                                background: `linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))`,
                                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.15)'
                                            }}
                                        >
                                            <div className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br ${item.color}`}>
                                                <div style={{ color: 'white' }}>
                                                    {getIcon(item.icon)}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info Card */}
                                        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-32 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                            <div className="glass rounded-lg p-3 border border-white/20 backdrop-blur-xl"
                                                style={{
                                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                                                }}>
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

            <style jsx>{`
                @keyframes spin {
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
            `}</style>
        </section>
    );
};

export default Ecosystem;
