import { useState, useEffect, useRef } from 'react';
import MagneticButton from '../common/MagneticButton';
import ThemeToggler from './ThemeToggler';
import data from '../../data/data.json';
import gsap from 'gsap';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef(null);
    const mobileLinkRefs = useRef([]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.pageYOffset > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Mobile Menu Animation
    useEffect(() => {
        if (isMobileMenuOpen) {
            gsap.fromTo(mobileMenuRef.current,
                { height: 0, opacity: 0 },
                { height: 'auto', opacity: 1, duration: 0.5, ease: 'power3.out' }
            );

            gsap.fromTo(mobileLinkRefs.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
            );
        } else {
            if (mobileMenuRef.current) {
                gsap.to(mobileMenuRef.current, {
                    height: 0,
                    opacity: 0,
                    duration: 0.4,
                    ease: 'power3.in',
                });
            }
        }
    }, [isMobileMenuOpen]);

    const { brand, links, cta } = data.navigation;

    return (
        <nav id="navbar" className={`nav-container ${isScrolled ? 'nav-scrolled' : ''}`}>
            <div className="nav-inner">
                <a href="#" className="flex items-center gap-3 group magnetic-btn">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    </div>
                    <span className="font-display font-bold text-xl tracking-tight" style={{ color: 'var(--color-text-primary)' }}>{brand}</span>
                </a>

                <div className="hidden md:flex items-center gap-8">
                    {links.map((link, index) => (
                        <MagneticButton key={index} as="a" href={link.href} className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity" style={{ color: 'var(--color-text-primary)' }}>
                            {link.label}
                        </MagneticButton>
                    ))}

                    <div className="w-px h-6 bg-white/10 mx-2" />

                    <ThemeToggler />

                    <MagneticButton
                        as="a"
                        href={cta.href}
                        className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:scale-105 transition-transform"
                    >
                        <span className="flex items-center gap-2">
                            {cta.label}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </span>
                    </MagneticButton>
                </div>

                {/* Mobile Controls */}
                <div className="md:hidden flex items-center gap-4">
                    <ThemeToggler />

                    <button
                        className="p-2"
                        style={{ color: 'var(--color-text-primary)' }}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                id="mobileMenu"
                ref={mobileMenuRef}
                className="md:hidden overflow-hidden h-0"
            >
                <div className="mt-4 glass rounded-2xl p-4 shadow-xl">
                    <div className="flex flex-col gap-2">
                        {links.map((link, index) => (
                            <a
                                key={index}
                                ref={el => mobileLinkRefs.current[index] = el}
                                href={link.href}
                                className="p-3 rounded-xl hover:bg-white/5 transition-colors text-sm font-medium opacity-0 translate-y-4"
                                style={{ color: 'var(--color-text-primary)' }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            ref={el => mobileLinkRefs.current[links.length] = el}
                            href={cta.href}
                            className="p-3 rounded-xl bg-white text-black text-center text-sm font-semibold mt-2 opacity-0 translate-y-4"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Download Now
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
