import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
    const heroRef = useRef(null);
    const videoRef = useRef(null);
    const contentRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(videoRef.current,
            { scale: 1.5, filter: "blur(40px)", opacity: 0 },
            { scale: 1, filter: "blur(0px)", opacity: 0.75, duration: 4, ease: "power2.inOut" }
        )
        if (contentRef.current) {
            tl.fromTo(contentRef.current.querySelector('h1'),
                { opacity: 0, y: 80, letterSpacing: "30px" },
                { opacity: 1, y: 0, letterSpacing: "-6px", duration: 2, ease: "power4.out" },
                "-=2"
            )
                .fromTo(contentRef.current.querySelectorAll('.subtext, .hero-description, .btn-primary'),
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, stagger: 0.25, duration: 1.5, ease: "power2.out" },
                    "-=1.5"
                );
        }

        // Golden Sparkles Logic
        const createSparkle = () => {
            if (!heroRef.current) return;
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            const size = Math.random() * 3 + 1;
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            heroRef.current.appendChild(sparkle);

            gsap.fromTo(sparkle,
                { opacity: 0, scale: 0 },
                {
                    opacity: Math.random() * 0.5 + 0.3,
                    scale: 1,
                    duration: Math.random() * 2 + 1,
                    yoyo: true,
                    repeat: 1,
                    onComplete: () => sparkle.remove()
                }
            );
        };

        const sparkleInterval = setInterval(createSparkle, 200);
        return () => clearInterval(sparkleInterval);
    }, { scope: heroRef });

    return (
        <section className="hero" id="hero" ref={heroRef}>
            <video
                autoPlay
                muted
                loop
                playsInline
                className="hero-bg"
                id="hero-video"
                ref={videoRef}
                poster="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1976"
            >
                <source src="/assets/4.png.mp4" type="video/mp4" />
            </video>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <div className="hero-right-side" ref={contentRef}>
                    <h1 id="hero-title">For Pranjal</h1>
                    <p className="subtext">“The soul that finds peace in nature’s silence.”</p>
                    <p className="hero-description">
                        And somehow makes the world calmer just by being in it.
                    </p>
                    <button className="btn-primary on-dark" onClick={() => document.getElementById('memories').scrollIntoView({ behavior: 'smooth' })}>
                        Relive the Magic
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
