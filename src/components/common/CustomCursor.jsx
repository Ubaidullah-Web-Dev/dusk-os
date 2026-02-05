import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const dotRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const dot = dotRef.current;

        // Use gsap.quickTo for high performance updates
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });
        const xToDot = gsap.quickTo(dot, "x", { duration: 0.5, ease: "power3" });
        const yToDot = gsap.quickTo(dot, "y", { duration: 0.5, ease: "power3" });

        const handleMouseMove = (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
            xToDot(e.clientX);
            yToDot(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Hover effect
        const handleMouseEnter = () => {
            gsap.to(cursor, { scale: 1.5, opacity: 0.5, duration: 0.3 });
            gsap.to(dot, { scale: 0.5, duration: 0.3 });
        };

        const handleMouseLeave = () => {
            gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
            gsap.to(dot, { scale: 1, duration: 0.3 });
        };

        const interactiveElements = document.querySelectorAll('a, button, .tilt-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        // Add magnetic effect cleanup to interactive elements if needed here
        // But MagneticButton handles its own magnetism usually.

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="custom-cursor hidden md:block" id="cursor" />
            <div ref={dotRef} className="custom-cursor-dot hidden md:block" id="cursor-dot" />
        </>
    );
};

export default CustomCursor;
