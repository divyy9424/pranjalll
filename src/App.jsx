import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import Hero from './components/Hero';
import About from './components/About';
import Memories from './components/Memories';
import Suggestion from './components/Suggestion';
import Final from './components/Final';

const App = () => {
    const cursorRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Initial Volume and Heart logic
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.2;
        }

        const handleMouseMove = (e) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        };
        window.addEventListener('mousemove', handleMouseMove);

        const createHeart = () => {
            const heart = document.createElement('div');
            heart.className = 'heart-particle';
            heart.innerHTML = '❤';

            const size = Math.random() * 20 + 8;
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.bottom = '-50px';
            heart.style.fontSize = `${size}px`;
            heart.style.opacity = Math.random() * 0.4 + 0.2;

            const duration = Math.random() * 3 + 4;
            heart.style.animationDuration = `${duration}s`;

            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), duration * 1000);
        };

        const heartInterval = setInterval(createHeart, 1200);

        // Scroll Reveal Animations
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            if (index === 0) {
                // Guaranteed entry for Hero regardless of scroll position
                gsap.fromTo(section,
                    { opacity: 0 },
                    { opacity: 1, duration: 2, ease: "power2.out" }
                );
            } else {
                gsap.fromTo(section,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(heartInterval);
        };
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
    };

    const toggleAudio = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(() => console.log("User interaction required"));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className={`app-container ${isDarkMode ? 'dark' : ''}`}>
            <div className="custom-cursor" id="cursor" ref={cursorRef}></div>
            <div className="cinematic-vignette"></div>

            <button className="theme-toggle" onClick={toggleTheme}>
                {isDarkMode ? 'Morning Glow' : 'Midnight Grace'}
            </button>

            <Hero />
            <About />
            <Memories />
            <Suggestion />
            <Final />

            <button className="destiny-btn" onClick={() => setShowModal(true)}>
                Click if you believe in destiny
            </button>

            <div className={`modal-overlay ${showModal ? 'active' : ''}`} onClick={() => setShowModal(false)}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <p>“Maybe this website is just the beginning of a beautiful journey.”</p>
                    <button className="btn-primary on-light" style={{ marginTop: '40px' }} onClick={() => setShowModal(false)}>
                        Continue the Journey
                    </button>
                </div>
            </div>

            <audio id="bg-music" loop ref={audioRef}>
                <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
            </audio>

            <div className="audio-control" id="audio-toggle" onClick={toggleAudio}>
                {isPlaying ? '⏸' : '🎵'}
            </div>
        </div>
    );
};

export default App;
