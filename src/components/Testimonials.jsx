import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        quote: "Our backyard has completely transformed into a relaxing green escape. The team's creativity and attention to detail made all the difference.",
        name: 'Paul Richards',
        location: 'California, USA',
        rating: 5,
    },
    {
        quote: "Greenora turned our overgrown patch into a stunning front garden. Professional, punctual, and truly passionate about their work.",
        name: 'Sarah Mitchell',
        location: 'Texas, USA',
        rating: 5,
    },
    {
        quote: "Incredible service from start to finish. They listened to exactly what we wanted and delivered beyond our expectations. Highly recommend!",
        name: 'James Turner',
        location: 'Oregon, USA',
        rating: 5,
    },
];

const Testimonials = () => {
    return (
        <section id="testimonial" className="py-24 md:py-32" style={{ background: 'var(--green-xpale)' }}>
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="section-label">(testimonials)</span>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--green-dark)' }}>
                        Hear From Our{' '}
                        <span style={{ color: 'var(--green-primary)', fontStyle: 'italic' }}>Happy Customers</span>
                    </h2>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="card-hover rounded-3xl p-8 flex flex-col"
                            style={{ background: 'white', border: '1px solid var(--green-pale)' }}
                        >
                            {/* Quote icon */}
                            <div className="mb-5">
                                <Quote size={32} style={{ color: 'var(--green-light)' }} />
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-5">
                                {[...Array(t.rating)].map((_, j) => (
                                    <Star key={j} size={16} fill="var(--green-accent)" color="var(--green-accent)" />
                                ))}
                            </div>

                            {/* Quote text */}
                            <p className="text-base leading-relaxed flex-1 mb-8" style={{ color: 'var(--text-mid)', fontStyle: 'italic' }}>
                                "{t.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3" style={{ borderTop: '1px solid var(--green-pale)', paddingTop: '1.25rem' }}>
                                <div
                                    className="w-11 h-11 rounded-full flex items-center justify-center text-base font-bold text-white flex-shrink-0"
                                    style={{ background: 'linear-gradient(135deg, var(--green-primary), var(--green-accent))' }}
                                >
                                    {t.name[0]}
                                </div>
                                <div>
                                    <div className="font-semibold text-sm" style={{ color: 'var(--green-dark)' }}>{t.name}</div>
                                    <div className="text-xs" style={{ color: 'var(--text-light)' }}>{t.location}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
