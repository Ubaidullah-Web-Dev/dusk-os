import { useState, useEffect, createContext, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Check localStorage or system preference, default to 'default' (dusk)
    const [currentTheme, setCurrentTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            return saved || 'default';
        }
        return 'default';
    });

    useEffect(() => {
        const root = document.documentElement;

        // Remove all previous theme attributes
        root.removeAttribute('data-theme');

        // Apply new theme if not default
        if (currentTheme !== 'default') {
            root.setAttribute('data-theme', currentTheme);
        }

        localStorage.setItem('theme', currentTheme);
    }, [currentTheme]);

    const themes = [
        { id: 'default', name: 'Dusk', colors: ['#050508', '#8b5cf6'] },
        { id: 'midnight', name: 'Midnight', colors: ['#020617', '#fbbf24'] },
        { id: 'nebula', name: 'Nebula', colors: ['#1a0b2e', '#22d3ee'] },
        { id: 'crimson', name: 'Crimson', colors: ['#0a0000', '#ff003c'] },
        { id: 'dawn', name: 'Dawn', colors: ['#f8fafc', '#6366f1'] },
    ];

    return (
        <ThemeContext.Provider value={{ currentTheme, setTheme: setCurrentTheme, themes }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
