import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const destinations = [
    {
        title: "The Arches of Aga Khan Palace",
        description: "Walking through the elegant corridors and sun-drenched gardens, where every shadow tells a story of grace and history.",
        image: "https://images.unsplash.com/photo-1616423643031-77ec14b4369a?auto=format&fit=crop&q=80&w=1974"
    },
    {
        title: "Sunset at Vetal Tekdi",
        description: "Climbing above the city lights to watch the sky turn into a canvas of gold and purple—a quiet moment shared just for us.",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1974"
    },
    {
        title: "Mist of Sinhagad Fort",
        description: "Standing atop the ancient fortress, wrapped in soft clouds and the cool mountain breeze, looking out at the world together.",
        image: "https://images.unsplash.com/photo-1627916607164-159677e5d263?auto=format&fit=crop&q=80&w=1974"
    },
    {
        title: "Whispers of Mulshi Lake",
        description: "Where the mountains meet the emerald waters, and time slows down to the rhythm of the ripples on the shore.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1974"
    },
    {
        title: "Shaniwar Wada’s Grandeur",
        description: "Tracing the echoes of the Peshwas amidst the massive stone walls, finding magic in the corners where history still breathes.",
        image: "https://images.unsplash.com/photo-1611005167232-094119d69f06?auto=format&fit=crop&q=80&w=1974"
    }
];

const Suggestion = () => {
    const [result, setResult] = useState(null);
    const [isExploring, setIsExploring] = useState(false);
    const resultRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        if (result && resultRef.current) {
            gsap.fromTo(resultRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power2.out"
                }
            );
        }
        if (result && imgRef.current) {
            gsap.fromTo(imgRef.current,
                { opacity: 0, scale: 0.95, rotate: -1 },
                {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    duration: 1.5,
                    ease: "expo.out",
                    delay: 0.2
                }
            );
        }
    }, [result]);

    const exploreTogether = () => {
        if (isExploring) return;

        setIsExploring(true);

        if (result) {
            gsap.to([resultRef.current, imgRef.current], {
                opacity: 0,
                y: -20,
                duration: 0.5,
                onComplete: () => {
                    setResult(null);
                    triggerNewDestination();
                }
            });
        } else {
            triggerNewDestination();
        }
    };

    const triggerNewDestination = () => {
        setTimeout(() => {
            const final = destinations[Math.floor(Math.random() * destinations.length)];
            setResult(final);
            setIsExploring(false);
        }, 1200);
    };

    return (
        <section className="suggestion" id="suggestion">
            <div className="container">
                <div className="reveal-up">
                    <h2 className="responsive-h2">Exploring Pune with You</h2>
                    <div className="suggestion-card responsive-card">
                        <div className="btn-wrap">
                            <button
                                className="btn-primary on-light"
                                onClick={exploreTogether}
                                disabled={isExploring}
                            >
                                {isExploring ? "Finding a Special Corner..." : result ? "Suggest Another Spot" : "Where to Next in Pune?"}
                            </button>
                        </div>

                        {result && (
                            <div ref={resultRef} className="whisper-content" style={{ marginTop: '20px' }}>
                                <div className="suggestion-result responsive-result">{result.title}</div>
                                <p className="poetic-desc responsive-p">
                                    "{result.description}"
                                </p>
                            </div>
                        )}

                        {result?.image && (
                            <div ref={imgRef} className="suggestion-image-wrap">
                                <img
                                    src={result.image}
                                    alt={result.title}
                                    className="suggestion-image cinema-glow"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Suggestion;
