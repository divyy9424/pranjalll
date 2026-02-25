import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
            }
        });

        if (containerRef.current) {
            tl.from(containerRef.current, {
                opacity: 0,
                y: 80,
                duration: 1.5,
                ease: "expo.out"
            })
                .from(containerRef.current.querySelectorAll('h2, p'), {
                    opacity: 0,
                    y: 30,
                    stagger: 0.3,
                    duration: 1.2,
                    ease: "power2.out"
                }, "-=0.8");
        }
    }, { scope: sectionRef });

    return (
        <section className="about" id="about" ref={sectionRef}>
            <div className="container glass-card" ref={containerRef}>
                <h2>Everything I’ve Wanted to Say...</h2>
                <p>
                    We may not have known each other for long — maybe we don’t even fully know each other yet — but there’s something about this connection that feels real.
                    <br /><br />
                    I know I’m someone who pauses a lot. I overthink. I take time to understand things. Sometimes I miss moments. Sometimes I don’t fully understand myself.
                    <br /><br />
                    But somehow, you’re there — to correct me gently, to walk beside me, to explore things together instead of leaving me behind.
                    <br /><br />
                    I may not always get everything right. I may fall short in many ways. But for you, I’m willing to put in the effort. Because some connections aren’t about perfection — they’re about choosing each other, even while learning.
                    <br /><br />
                    And maybe… that’s what makes this feel different. 💛
                </p>
            </div>
        </section>
    );
};

export default About;
