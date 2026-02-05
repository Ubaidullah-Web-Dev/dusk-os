import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGsapAnimations = () => {
    useEffect(() => {
        // Global defaults
        gsap.defaults({ ease: 'power3.out', duration: 1 });

        // Hero Entrance Animation - More dramatic
        const heroTl = gsap.timeline();

        heroTl
            .to('#hero-badge', {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power4.out'
            })
            .to('.reveal-text-inner', {
                y: 0,
                duration: 1.5,
                stagger: 0.1,
                ease: 'power4.out'
            }, '-=0.8')
            .to('#hero-subtitle', {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out'
            }, '-=1.2')
            .to('#hero-cta', {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out'
            }, '-=0.8')
            .to('#hero-mockup', {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: 'power3.out'
            }, '-=0.8');

        // Typing Lines - Smoother
        const typingLines = document.querySelectorAll('.typing-line');
        if (typingLines.length) {
            gsap.to(typingLines, {
                opacity: 1,
                duration: 0.8,
                stagger: 0.6,
                delay: 2,
                ease: 'power2.out'
            });
        }

        // Floating Parallax Orbs - Smoother Scrub
        gsap.utils.toArray('.parallax-layer').forEach(layer => {
            const speed = layer.dataset.speed || 0.5;
            gsap.to(layer, {
                y: `${100 * speed}%`,
                ease: 'none',
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1 // Add smoothing
                }
            });
        });

        // Global Section Reveal
        // Note: Components need to add the 'section-reveal' class
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            if (section.id === 'hero' || section.id === 'showcase') return; // Skip hero and showcase

            gsap.fromTo(section.children,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // Scroll Progress - Smoother
        gsap.to('.scroll-progress-bar', {
            scaleY: 1, // Use scaleY for vertical progress
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5
            }
        });

        // Pinned Showcase - High Friction
        const showcase = document.querySelector('#showcase');
        if (showcase) {
            const showcaseTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#showcase',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1
                }
            });

            showcaseTl
                .to('#device-container', { rotateY: 360, rotateX: 10, scale: 0.85, duration: 3 })
                .to('#screen-ui', { opacity: 1, y: 0, duration: 0.5 }, 0.5)
                .to('#float-card-1', { opacity: 1, x: -60, rotateY: -30, duration: 1.5 }, 0.5)
                .to('#float-card-2', { opacity: 1, x: 60, rotateY: 30, duration: 1.5 }, 0.7);
        }

        // Parallax Image - Enhanced
        const parallaxImg = document.querySelector('#parallax-image-container');
        if (parallaxImg) {
            gsap.to(parallaxImg, {
                y: '-30%',
                scale: 1.1,
                ease: 'none',
                scrollTrigger: {
                    trigger: '#parallax-image-container',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        }

        // Download Card
        const downloadCard = document.querySelector('#download-card');
        if (downloadCard) {
            gsap.set(downloadCard, { opacity: 0, scale: 0.9, y: 30 });
            gsap.to(downloadCard, {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'elastic.out(1, 0.75)',
                scrollTrigger: {
                    trigger: '#download',
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);
};

export default useGsapAnimations;
