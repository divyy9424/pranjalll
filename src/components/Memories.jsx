import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
// ScrollTrigger registered in App.jsx

const memoriesData = [
    {
        src: "/assets/5.png.mp4",
        quote: "The light in your eyes is the heartbeat of the love that nurtured you—a precious soul carrying the blessings of an entire lineage.",
        label: "Eternal Roots"
    },
    {
        src: "/assets/7.png.mp4",
        quote: "In the soft stillness of the mountain air, I found my world. You are the quiet peace I've been searching for my whole life.",
        label: "Soulful Whispers"
    },
    {
        src: "/assets/10.png.mp4",
        quote: "Even the holy Ganges and the ancient mountains bow to the divinity I see in your smile. You are my most sacred prayer.",
        label: "Divine Grace"
    },
    {
        src: "/assets/5.png.mp4",
        quote: "It was never about the road or the destination—the magic was always in our hands intertwined as we walked toward forever.",
        label: "The Infinite Journey"
    },
    {
        src: "/assets/4.png.mp4",
        quote: "I found my home not in a house, but in the warmth of your embrace. You are the only place I ever want to stay.",
        label: "Home in You"
    },
    {
        src: "/assets/6.png.mp4",
        quote: "Your laughter is my favorite melody—a song of pure joy that turns every ordinary day into a masterpiece of happiness.",
        label: "Symphony of Joy"
    },
    {
        src: "/assets/love.mp4",
        quote: "You are the 'forever' I never knew I was searching for. My heart is, and always will be, completely and hopelessly yours.",
        label: "Eternal Poetry"
    }
];

const Memories = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);

    useGSAP(() => {
        // Entry animation is now handled globally in App.jsx via ScrollTrigger
        // But we can keep card specific stagger if needed, or remove to avoid conflict.
        // I'll keep it but make it subtle.
        gsap.fromTo(".video-card",
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            }
        );
    }, { scope: sectionRef });

    return (
        <section className="memories" id="memories" ref={sectionRef}>
            <div className="container">
                <div className="memories-header" ref={headerRef}>
                    <h2>Moments That Define You</h2>
                    <p className="memories-sub">Treasured Chapters of Us</p>
                </div>
                <div className="video-grid">
                    {memoriesData.map((memory, index) => (
                        <div className="video-card" key={index}>
                            <div className="video-wrap">
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="memory-video"
                                >
                                    <source src={memory.src} type="video/mp4" />
                                </video>
                            </div>
                            <div className="card-quote">
                                <p>"{memory.quote}"</p>
                                <span className="card-label">{memory.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Memories;
