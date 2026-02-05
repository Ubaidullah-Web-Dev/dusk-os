import { useRef } from 'react';

const MagneticButton = ({ children, className = '', as: Component = 'button', ...props }) => {
    const btnRef = useRef(null);
    const innerRef = useRef(null);

    const handleMouseMove = (e) => {
        const rect = btnRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        if (innerRef.current) {
            innerRef.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        }
    };

    const handleMouseLeave = () => {
        if (innerRef.current) {
            innerRef.current.style.transform = 'translate(0, 0)';
        }
    };

    return (
        <Component
            ref={btnRef}
            className={`magnetic-btn ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            <span ref={innerRef} className="magnetic-btn-inner">
                {children}
            </span>
        </Component>
    );
};

export default MagneticButton;
