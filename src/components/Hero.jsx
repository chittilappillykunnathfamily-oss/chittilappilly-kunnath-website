import React, { useEffect, useRef } from 'react';
import heroBg from '../assets/hero.png';

const Hero = () => {
    const canvasRef = useRef(null);
    const bgRef = useRef(null);

    /* ── Firefly Canvas ── */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        class Firefly {
            constructor(initial = false) { this.reset(initial); }

            reset(initial = false) {
                this.x = Math.random() * canvas.width;
                this.y = initial ? Math.random() * canvas.height : canvas.height + 10;
                this.ax = (Math.random() - 0.5) * 0.008;
                this.ay = (Math.random() - 0.5) * 0.006;
                this.fx = 0.3 + Math.random() * 0.5;
                this.fy = 0.2 + Math.random() * 0.4;
                this.px = Math.random() * Math.PI * 2;
                this.py = Math.random() * Math.PI * 2;
                this.baseVx = (Math.random() - 0.5) * 0.3;
                this.baseVy = -(0.15 + Math.random() * 0.35);
                this.t = initial ? Math.random() * 300 : 0;
                this.radius = 1.2 + Math.random() * 2.2;
                this.glowR = this.radius * (5 + Math.random() * 7);
                this.pulseSpeed = 0.02 + Math.random() * 0.04;
                this.pulsePhase = Math.random() * Math.PI * 2;
                this.blinkSpeed = 0.008 + Math.random() * 0.025;
                this.blinkPhase = Math.random() * Math.PI * 2;
                this.blinkMin = 0.05;
                this.blinkMax = 0.85 + Math.random() * 0.15;
                this.trail = [];
                this.trailLen = Math.floor(8 + Math.random() * 16);
                const hues = [46, 52, 40, 58, 80];
                this.hue = hues[Math.floor(Math.random() * hues.length)];
                this.sat = 80 + Math.random() * 20;
                this.prevDriftX = 0;
                this.prevDriftY = 0;
            }

            update() {
                this.t++;
                const driftX = Math.sin(this.t * this.fx * 0.01 + this.px) * 80 * this.ax * 100;
                const driftY = Math.sin(this.t * this.fy * 0.01 + this.py) * 60 * this.ay * 100;
                this.x += this.baseVx + (driftX - this.prevDriftX);
                this.y += this.baseVy + (driftY - this.prevDriftY);
                this.prevDriftX = driftX;
                this.prevDriftY = driftY;
                this.trail.unshift({ x: this.x, y: this.y });
                if (this.trail.length > this.trailLen) this.trail.pop();
                if (this.y < -20 || this.x < -50 || this.x > canvas.width + 50) this.reset();
            }

            draw() {
                const pulse = 0.6 + 0.4 * Math.sin(this.t * this.pulseSpeed + this.pulsePhase);
                const blink = this.blinkMin + (this.blinkMax - this.blinkMin) *
                    (0.5 + 0.5 * Math.sin(this.t * this.blinkSpeed + this.blinkPhase));
                const alpha = blink * pulse;
                const lum = 60 + 20 * pulse;

                for (let i = 0; i < this.trail.length; i++) {
                    const a = (1 - i / this.trail.length) * alpha * 0.35;
                    const r = this.radius * (1 - i / this.trail.length) * 0.7;
                    ctx.beginPath();
                    ctx.arc(this.trail[i].x, this.trail[i].y, Math.max(r, 0.3), 0, Math.PI * 2);
                    ctx.fillStyle = `hsla(${this.hue},${this.sat}%,${lum}%,${a})`;
                    ctx.fill();
                }

                const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.glowR * pulse);
                glow.addColorStop(0, `hsla(${this.hue},${this.sat}%,${lum}%,${alpha * 0.25})`);
                glow.addColorStop(0.4, `hsla(${this.hue},${this.sat}%,${lum}%,${alpha * 0.08})`);
                glow.addColorStop(1, `hsla(${this.hue},${this.sat}%,${lum}%,0)`);
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.glowR * pulse, 0, Math.PI * 2);
                ctx.fillStyle = glow;
                ctx.fill();

                const core = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 1.8);
                core.addColorStop(0, `hsla(${this.hue + 10},100%,95%,${alpha})`);
                core.addColorStop(0.5, `hsla(${this.hue},${this.sat}%,${lum}%,${alpha * 0.8})`);
                core.addColorStop(1, `hsla(${this.hue},${this.sat}%,${lum}%,0)`);
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius * 1.8, 0, Math.PI * 2);
                ctx.fillStyle = core;
                ctx.fill();
            }
        }

        const fireflies = Array.from({ length: 65 }, (_, i) => new Firefly(i < 40));
        let raf;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            fireflies.forEach(f => { f.update(); f.draw(); });
            raf = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
        };
    }, []);

    /* ── Parallax on mouse move ── */
    const handleMouseMove = (e) => {
        if (!bgRef.current) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 12;
        const y = (e.clientY / window.innerHeight - 0.5) * 8;
        bgRef.current.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
    };

    return (
        <>
            {/* ── Google Fonts ── */}
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600;700&display=swap"
                rel="stylesheet"
            />

            <style>{`
                :root {
                    --gold: #C9A84C;
                    --gold-light: #E8C97A;
                    --gold-pale: #F5E6C0;
                    --deep: #0A0A0F;
                    --ivory: #F7F2E8;
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                @keyframes scrollPulse {
                    0%, 100% { opacity: 0.4; transform: scaleY(1); }
                    50%      { opacity: 1;   transform: scaleY(1.2); }
                }

                .hero-anim-1 { opacity: 0; animation: fadeUp 1s 0.3s forwards; }
                .hero-anim-2 { opacity: 0; animation: fadeUp 1s 0.5s forwards; }
                .hero-anim-3 { opacity: 0; animation: fadeUp 1s 0.7s forwards; }
                .hero-anim-4 { opacity: 0; animation: fadeUp 1s 0.9s forwards; }
                .hero-anim-5 { opacity: 0; animation: fadeUp 1s 1.0s forwards; }
                .hero-anim-6 { opacity: 0; animation: fadeUp 1s 1.1s forwards; }
                .hero-anim-7 { opacity: 0; animation: fadeUp 1s 1.3s forwards; }
                .hero-anim-8 { opacity: 0; animation: fadeIn 1s 1.5s forwards; }
                .hero-anim-9 { opacity: 0; animation: fadeUp 1s 1.6s forwards; }
                .hero-anim-side { opacity: 0; animation: fadeIn 1.5s 1.8s forwards; }

                .hero-scroll-line {
                    width: 1px; height: 40px;
                    background: linear-gradient(180deg, var(--gold) 0%, transparent 100%);
                    animation: scrollPulse 2s infinite;
                }

                .hero-btn-primary {
                    font-family: 'Cinzel', serif;
                    font-size: 11px;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: #0A0A0F;
                    background: linear-gradient(135deg, #E8C97A 0%, #C9A84C 50%, #A07828 100%);
                    border: none;
                    padding: 15px 40px;
                    cursor: pointer;
                    text-decoration: none;
                    position: relative;
                    overflow: hidden;
                    clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
                    transition: transform 0.3s, box-shadow 0.3s;
                    display: inline-block;
                }
                .hero-btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 40px rgba(201,168,76,0.4);
                }

                .hero-btn-secondary {
                    font-family: 'Cinzel', serif;
                    font-size: 11px;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: var(--gold-light);
                    background: transparent;
                    border: 1px solid rgba(201,168,76,0.5);
                    padding: 14px 36px;
                    cursor: pointer;
                    text-decoration: none;
                    position: relative;
                    overflow: hidden;
                    transition: border-color 0.3s, color 0.3s, background 0.3s;
                    display: inline-block;
                }
                .hero-btn-secondary:hover {
                    border-color: var(--gold);
                    color: var(--gold);
                    background: rgba(201,168,76,0.08);
                }

                .hero-stat-item {
                    flex: 1;
                    padding: 22px 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    border-right: 1px solid rgba(201,168,76,0.15);
                    transition: background 0.3s;
                    min-width: 120px;
                }
                .hero-stat-item:last-child { border-right: none; }
                .hero-stat-item:hover { background: rgba(201,168,76,0.05); }

                .hero-corner { position: absolute; z-index: 3; width: 80px; height: 80px; }
                .hero-corner-tl { top: 80px; left: 30px; border-top: 1px solid rgba(201,168,76,0.5); border-left: 1px solid rgba(201,168,76,0.5); }
                .hero-corner-tr { top: 80px; right: 30px; border-top: 1px solid rgba(201,168,76,0.5); border-right: 1px solid rgba(201,168,76,0.5); }
                .hero-corner-bl { bottom: 90px; left: 30px; border-bottom: 1px solid rgba(201,168,76,0.5); border-left: 1px solid rgba(201,168,76,0.5); }
                .hero-corner-br { bottom: 90px; right: 30px; border-bottom: 1px solid rgba(201,168,76,0.5); border-right: 1px solid rgba(201,168,76,0.5); }

                @media (max-width: 768px) {
                    .hero-corner { display: none; }
                    .hero-side-text { display: none; }
                    .hero-stats-bar { flex-wrap: wrap; }
                    .hero-stat-item { min-width: 50%; border-bottom: 1px solid rgba(201,168,76,0.15); }
                    .hero-stat-item:nth-child(2) { border-right: none; }
                    .hero-cta-group { flex-direction: column !important; }
                }

                @media (max-width: 480px) {
                    .hero-stat-item { min-width: 100%; border-right: none; }
                }
            `}</style>

            {/* ── SECTION ── */}
            <section
                id="hero"
                onMouseMove={handleMouseMove}
                style={{
                    position: 'relative',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                    background: '#0A0A0F',
                    fontFamily: "'EB Garamond', Georgia, serif",
                }}
            >
                {/* Background image */}
                <div
                    ref={bgRef}
                    style={{
                        position: 'absolute', inset: 0,
                        //backgroundImage: `url(${heroBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'sepia(0.3) brightness(0.45) contrast(1.1)',
                        transform: 'scale(1.05)',
                        transition: 'transform 0.1s linear',
                    }}
                />

                {/* Overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: `
                        radial-gradient(ellipse 70% 60% at 50% 50%, rgba(10,8,5,0.15) 0%, rgba(10,8,5,0.75) 60%, rgba(10,8,5,0.92) 100%),
                        repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(201,168,76,0.015) 2px, rgba(201,168,76,0.015) 4px)
                    `,
                }} />

                {/* Firefly Canvas */}
                <canvas
                    ref={canvasRef}
                    style={{ position: 'absolute', inset: 0, zIndex: 4, width: '100%', height: '100%', pointerEvents: 'none' }}
                />

                {/* Corner decorations */}
                <div className="hero-corner hero-corner-tl" />
                <div className="hero-corner hero-corner-tr" />
                <div className="hero-corner hero-corner-bl" />
                <div className="hero-corner hero-corner-br" />

                {/* Side text */}
                <div className="hero-side-text hero-anim-side" style={{
                    position: 'absolute', zIndex: 5, left: 30, bottom: 100,
                    fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.3em',
                    color: 'rgba(201,168,76,0.4)', textTransform: 'uppercase',
                    writingMode: 'vertical-rl',
                }}>
                    Est. Kerala · India
                </div>
                <div className="hero-side-text hero-anim-side" style={{
                    position: 'absolute', zIndex: 5, right: 30, bottom: 100,
                    fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.3em',
                    color: 'rgba(201,168,76,0.4)', textTransform: 'uppercase',
                    writingMode: 'vertical-rl', transform: 'rotate(180deg)',
                }}>
                    Family · Heritage · Unity
                </div>

                {/* ── MAIN CONTENT ── */}
                <div style={{
                    position: 'relative', zIndex: 5,
                    width: '100%', maxWidth: 900,
                    margin: '0 auto',
                    textAlign: 'center',
                    padding: '0 24px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                }}>
                    {/* Eyebrow */}
                    <div className="hero-anim-1" style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: 11, letterSpacing: '0.35em',
                        color: '#C9A84C', textTransform: 'uppercase',
                        marginBottom: 20,
                        display: 'flex', alignItems: 'center', gap: 16,
                    }}>
                        <span style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C)', display: 'inline-block' }} />
                        Family Union
                        <span style={{ width: 40, height: 1, background: 'linear-gradient(90deg, #C9A84C, transparent)', display: 'inline-block' }} />
                    </div>

                    {/* Welcome */}
                    <div className="hero-anim-2" style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: 'italic', fontWeight: 300,
                        fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
                        color: '#E8C97A', lineHeight: 1,
                        marginBottom: 8,
                        textShadow: '0 0 60px rgba(201,168,76,0.3)',
                    }}>
                        Welcome to
                    </div>

                    {/* Title */}
                    <h1 className="hero-anim-3" style={{
                        fontFamily: "'Cinzel', serif",
                        fontWeight: 700,
                        fontSize: 'clamp(1.4rem, 3.5vw, 2.8rem)',
                        color: '#F7F2E8',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        lineHeight: 1.3,
                        marginBottom: 28,
                        textShadow: '0 2px 30px rgba(0,0,0,0.5)',
                    }}>
                        Chittilappilly <br />Tharavattuyogam
                    </h1>

                    {/* Divider */}
                    <div className="hero-anim-4" style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: 16, marginBottom: 28,
                    }}>
                        <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C)' }} />
                        <div style={{
                            width: 8, height: 8,
                            border: '1px solid #C9A84C',
                            transform: 'rotate(45deg)',
                            position: 'relative',
                            background: '#C9A84C',
                        }} />
                        <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, #C9A84C, transparent)' }} />
                    </div>

                    {/* Tagline */}
                    <div className="hero-anim-5" style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: 11, letterSpacing: '0.22em',
                        color: '#C9A84C', textTransform: 'uppercase',
                        marginBottom: 18,
                    }}>
                        Proof of Our Unity
                    </div>

                    {/* Quote */}
                    <p className="hero-anim-6" style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: 'italic',
                        fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                        color: 'rgba(247,242,232,0.7)',
                        maxWidth: 520, lineHeight: 1.8,
                        marginBottom: 44,
                    }}>
                        <span style={{ color: 'rgba(201,168,76,0.8)', fontSize: '1.5em', lineHeight: 0, verticalAlign: '-0.2em' }}>"</span>
                        We believe the family is divine in nature and that God designates it as the fundamental building block of society, both on earth and through eternity.
                        <span style={{ color: 'rgba(201,168,76,0.8)', fontSize: '1.5em', lineHeight: 0, verticalAlign: '-0.2em' }}>"</span>
                    </p>

                    {/* CTAs */}
                    <div className="hero-anim-7 hero-cta-group" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <a href="#about" className="hero-btn-primary">Discover Our Story</a>
                        <a href="#events" className="hero-btn-secondary">View Events</a>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="hero-anim-9" style={{
                    position: 'absolute', bottom: 90, left: '50%', transform: 'translateX(-50%)',
                    zIndex: 5,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                }}>
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.25em', color: 'rgba(201,168,76,0.6)', textTransform: 'uppercase' }}>
                        Scroll
                    </span>
                    <div className="hero-scroll-line" />
                </div>

                {/* Stats bar */}
                <div className="hero-anim-8 hero-stats-bar" style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5,
                    display: 'flex', alignItems: 'stretch',
                    borderTop: '1px solid rgba(201,168,76,0.2)',
                    background: 'rgba(10,8,5,0.7)',
                    backdropFilter: 'blur(20px)',
                }}>
                    {[
                        { num: '200+', label: 'Family Members' },
                        { num: '50+',  label: 'Years of Unity' },
                        { num: '30+',  label: 'Annual Events' },
                        { num: '5',    label: 'Generations' },
                    ].map(({ num, label }) => (
                        <div key={label} className="hero-stat-item">
                            <div style={{ fontFamily: "'Cinzel', serif", fontSize: '1.6rem', fontWeight: 600, color: '#C9A84C', lineHeight: 1 }}>
                                {num}
                            </div>
                            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.75rem', letterSpacing: '0.12em', color: 'rgba(247,242,232,0.5)', textTransform: 'uppercase' }}>
                                {label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Hero;