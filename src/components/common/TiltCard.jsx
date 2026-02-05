import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const TiltCard = ({ children, className = '', ...props }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = Math.max(-5, Math.min(5, (y - centerY) / 70));
            const rotateY = Math.max(-5, Math.min(5, (centerX - x) / 70));

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                scale: 1.01,
                duration: 0.5,
                ease: 'power3.out'
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.6,
                ease: 'power3.out'
            });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div ref={cardRef} className={`tilt-card ${className}`} {...props}>
            <div className="tilt-card-glare rounded-3xl" />
            {children}
        </div>
    );
};

export default TiltCard;
