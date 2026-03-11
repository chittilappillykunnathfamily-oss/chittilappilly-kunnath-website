import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import heroBg from '../assets/hero.png';

const Hero = () => {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{ background: 'var(--green-dark)' }}
        >
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroBg})`, opacity: 0.35 }}
            />

            {/* Dark overlay gradient */}
            <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to bottom right, rgba(27,46,34,0.85), rgba(27,46,34,0.6))' }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center fade-in-up">
                {/* Badge */}
                <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-medium"
                    style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', color: 'var(--green-pale)', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={13} fill="#52B788" color="#52B788" />
                        ))}
                    </div>
                </div>

                {/* Main heading */}
                <h1
                    className="text-5xl md:text-7xl font-bold leading-tight mb-6"
                    style={{ color: 'white', fontFamily: 'Playfair Display, serif', letterSpacing: '-0.02em' }}
                >
                    CHITTILAPILLY KUNNATH <br />
                    THARAVATTUYOGAM{' '}
                    <span style={{ color: 'var(--green-accent)', fontStyle: 'italic' }}>
                        exceptional landscaping
                    </span>
                </h1>

                {/* Subtext */}
                <p
                    className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                >
                    We provide complete, reliable, and affordable landscaping solutions across the USA — from design to maintenance, ensuring your outdoor spaces are built to last.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a href="#contact" className="btn-primary text-base px-8 py-3.5">
                        Work with us <ArrowRight size={18} />
                    </a>
                    <a href="#works" className="btn-outline text-base px-8 py-3.5" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.45)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    >
                        View Our Work
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
                <span className="text-xs tracking-widest uppercase text-white">Scroll</span>
                <div className="w-0.5 h-12 rounded-full" style={{ background: 'linear-gradient(to bottom, white, transparent)' }} />
            </div>
        </section>
    );
};

export default Hero;
