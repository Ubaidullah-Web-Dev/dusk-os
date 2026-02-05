import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import gsap from 'gsap';

const ThemeToggler = () => {
    const { currentTheme, setTheme, themes } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const containerRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Animation
    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(menuRef.current,
                { opacity: 0, scale: 0.9, y: 10 },
                { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' }
            );
        }
    }, [isOpen]);

    return (
        <div className="relative" ref={containerRef}>
            <button
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Change Theme"
            >
                <div className="w-5 h-5 rounded-full overflow-hidden relative">
                    {/* Dynamic icon based on theme */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-current to-transparent opacity-50" />
                    <svg className="w-full h-full p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                </div>
            </button>

            {isOpen && (
                <div
                    ref={menuRef}
                    className="absolute right-0 top-full mt-4 w-48 glass rounded-2xl p-2 z-50 flex flex-col gap-1 shadow-2xl"
                >
                    {themes.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => {
                                setTheme(theme.id);
                                setIsOpen(false);
                            }}
                            className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-200 ${currentTheme === theme.id ? 'bg-white/10' : 'hover:bg-white/5'
                                }`}
                        >
                            <div className="flex -space-x-1">
                                <div className="w-4 h-4 rounded-full border border-white/20" style={{ background: theme.colors[0] }} />
                                <div className="w-4 h-4 rounded-full border border-white/20" style={{ background: theme.colors[1] }} />
                            </div>
                            <span className="text-sm font-medium text-white/90">{theme.name}</span>
                            {currentTheme === theme.id && (
                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ThemeToggler;
