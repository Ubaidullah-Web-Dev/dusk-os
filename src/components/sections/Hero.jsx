import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../common/MagneticButton';
import data from '../../data/data.json';

gsap.registerPlugin(ScrollTrigger);

// Helper component to split text into characters
const SplitText = ({ children, className = '' }) => {
    if (typeof children !== 'string') return children;

    return (
        <span className={`inline-block ${className}`}>
            {children.split('').map((char, index) => (
                <span
                    key={index}
                    className="char-split inline-block origin-bottom"
                    style={{ whiteSpace: 'pre' }} // Preserve spaces
                >
                    {char}
                </span>
            ))}
        </span>
    );
};

const Hero = () => {
    const mockupRef = useRef(null);
    const heroRef = useRef(null);
    const textContainerRef = useRef(null);

    const { badge, title, subtitle, ctas, terminal } = data.hero;

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Mouse Movement for Mockup
            const mockup = mockupRef.current;
            const hero = heroRef.current;

            const handleMouseMove = (e) => {
                const rect = hero.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                gsap.to(mockup, {
                    rotateY: x * 10,
                    rotateX: -y * 10,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            };

            const handleMouseLeave = () => {
                gsap.to(mockup, { rotateY: 0, rotateX: 0, duration: 0.5 });
            };

            hero.addEventListener('mousemove', handleMouseMove);
            hero.addEventListener('mouseleave', handleMouseLeave);

            // Replayable Entrance Animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: hero,
                    start: "top center",
                    // "play" on entering, "reverse" on leaving up (scrolling down past), 
                    // "play" scroling back up into it, "reverse" scrolling futher up? 
                    // Actually user requested "every time i scroll into it".
                    // This implies resetting effectively. 
                    toggleActions: "play none none reverse", // Play when enter, reverse when leave back up
                }
            });

            // Initial sets
            gsap.set(".char-split", {
                y: 100,
                opacity: 0,
                rotateX: -90,
                filter: "blur(10px)"
            });
            gsap.set("#hero-badge, #hero-subtitle, #hero-cta, #hero-mockup", { opacity: 0, y: 20 });

            tl
                .to("#hero-badge", {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out"
                })
                .to(".char-split", {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    filter: "blur(0px)",
                    stagger: 0.05,
                    duration: 1,
                    ease: "back.out(1.7)"
                }, "-=0.4")
                .to("#hero-subtitle", {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.6")
                .to("#hero-cta", {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.6")
                .to("#hero-mockup", {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out"
                }, "-=0.6");

            return () => {
                hero.removeEventListener('mousemove', handleMouseMove);
                hero.removeEventListener('mouseleave', handleMouseLeave);
            };
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
                <div className="grid-bg absolute inset-0 opacity-30" />

                {/* Floating Orbs */}
                <div className="parallax-layer absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" data-speed="0.5" />
                <div className="parallax-layer absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[80px]" data-speed="-0.3" />
                <div className="parallax-layer absolute top-1/2 right-1/3 w-64 h-64 bg-pink-600/10 rounded-full blur-[60px]" data-speed="0.8" />
            </div>

            <div ref={textContainerRef} className="relative z-10 max-w-7xl mx-auto px-6 text-center perspective-1000">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 opacity-0" id="hero-badge">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/60">{badge}</span>
                </div>

                {/* Title */}
                <h1 className="font-display font-bold mb-6 leading-[0.9] tracking-tight" id="hero-title">
                    <span className="block text-6xl md:text-8xl lg:text-9xl overflow-hidden py-2">
                        <SplitText>{title[0]}</SplitText>
                    </span>
                    <span className="block text-6xl md:text-8xl lg:text-9xl mt-2 overflow-hidden py-2">
                        <span className="gradient-text">
                            <SplitText>{title[1]}</SplitText>
                        </span>
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-0 transition-colors duration-500" style={{ color: 'var(--color-text-secondary)' }} id="hero-subtitle">
                    {subtitle}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0" id="hero-cta">
                    {ctas.map((cta, index) => (
                        <MagneticButton
                            key={index}
                            className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${cta.primary
                                ? 'group bg-white text-black hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]'
                                : 'glass hover:bg-white/10 border border-white/10 text-white'
                                }`}
                        >
                            <span className="flex items-center gap-3">
                                {cta.label}
                                {cta.primary && (
                                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                )}
                            </span>
                        </MagneticButton>
                    ))}
                </div>

                {/* Terminal Mockup */}
                <div className="mt-16 max-w-4xl mx-auto opacity-0 perspective-1000" id="hero-mockup">
                    <div ref={mockupRef} className="relative transform-gpu transition-transform duration-100 ease-out" id="mockup-3d">
                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-2xl opacity-50" />

                        <div className="relative bg-[#0a0a0f]/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl glow-purple">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <div className="flex-1 text-center">
                                    <span className="text-xs text-white/30 font-mono">{terminal.title}</span>
                                </div>
                            </div>

                            <div className="p-8 font-mono text-sm md:text-base text-left space-y-2">
                                <div className="typing-line opacity-0">
                                    <span className="text-purple-400">$</span>
                                    <span className="text-white/80 ml-2">{terminal.command}</span>
                                </div>
                                {terminal.steps.map((step, i) => (
                                    <div key={i} className="typing-line opacity-0 pl-4 text-white/40 text-xs md:text-sm">
                                        <span>→ {step.text}<span className="loading-dots" /> <span className="text-green-400">{step.status}</span></span>
                                    </div>
                                ))}
                                <div className="typing-line opacity-0 mt-4 pt-4 border-t border-white/10">
                                    <span className="text-green-400">✓</span>
                                    <span className="text-white ml-2">{terminal.success.message}</span>
                                    <span className="text-purple-400 font-bold ml-1">{terminal.success.highlight}</span>
                                    <span className="text-white/40"> — {terminal.success.version}</span>
                                </div>
                            </div>

                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl opacity-80 blur-sm transform rotate-12 floating shadow-2xl border border-white/20" />
                            <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl opacity-60 blur-sm transform -rotate-12 floating shadow-2xl border border-white/20" style={{ animationDelay: '-3s' }} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
                <span className="text-xs uppercase tracking-widest text-white/40">Scroll to explore</span>
                <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
            </div>
        </section>
    );
};

export default Hero;
