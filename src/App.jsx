import { useEffect } from 'react';
import './styles/index.css';

// Hooks
import useLenis from './hooks/useLenis';
import useGsapAnimations from './hooks/useGsapAnimations';

// Common Components
import NoiseOverlay from './components/common/NoiseOverlay';
import CustomCursor from './components/common/CustomCursor';
import ScrollProgress from './components/common/ScrollProgress';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Section Components
import Hero from './components/sections/Hero';
import Marquee from './components/sections/Marquee';
import Showcase from './components/sections/Showcase';
import Features from './components/sections/Features';
import ParallaxImage from './components/sections/ParallaxImage';
import Download from './components/sections/Download';

function App() {
    // Initialize Lenis smooth scrolling
    useLenis();

    // Initialize GSAP animations
    useGsapAnimations();

    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {/* Global Effects */}
            <NoiseOverlay />
            <CustomCursor />
            <ScrollProgress />

            {/* Layout */}
            <Navbar />

            {/* Sections */}
            <main>
                <Hero />
                <Marquee />
                <Showcase />
                <Features />
                <ParallaxImage />
                <Download />
            </main>

            <Footer />
        </>
    );
}

export default App;
