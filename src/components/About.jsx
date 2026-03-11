import React from 'react';
import { ArrowRight } from 'lucide-react';
import aboutImg from '../assets/about.png';

const stats = [
    { number: '15+', label: 'Years in the Industry' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '600+', label: 'Completed Projects' },
    { number: '40+', label: 'Expert Landscapers' },
];

const About = () => {
    return (
        <section id="about" className="py-24 md:py-32" style={{ background: 'white' }}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image */}
                    <div className="relative">
                        <div
                            className="absolute -top-6 -left-6 w-full h-full rounded-3xl"
                            style={{ background: 'var(--green-pale)', zIndex: 0 }}
                        />
                        <img
                            src={aboutImg}
                            alt="Landscaping team at work"
                            className="relative z-10 w-full h-auto object-cover rounded-3xl shadow-2xl"
                            style={{ maxHeight: '520px' }}
                        />
                        {/* Floating badge */}
                        <div
                            className="absolute -bottom-6 -right-6 z-20 rounded-2xl p-5 shadow-xl"
                            style={{ background: 'var(--green-primary)', color: 'white' }}
                        >
                            <div className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>15+</div>
                            <div className="text-sm opacity-80 mt-1">Years Experience</div>
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <span className="section-label">(about us)</span>
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: 'var(--green-dark)' }}>
                            Expert Landscaping,{' '}
                            <span style={{ color: 'var(--green-primary)', fontStyle: 'italic' }}>Personalized for You</span>
                        </h2>
                        <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-mid)' }}>
                            At Greenora, we create beautiful, functional outdoor spaces with care and expertise. From design to maintenance, our team delivers professional landscaping solutions tailored to your home, ensuring every garden looks its best year-round.
                        </p>

                        {/* Stats grid */}
                        <div className="grid grid-cols-2 gap-6 mb-10">
                            {stats.map(stat => (
                                <div
                                    key={stat.label}
                                    className="p-5 rounded-2xl"
                                    style={{ background: 'var(--green-xpale)', border: '1px solid var(--green-pale)' }}
                                >
                                    <div className="stat-number">{stat.number}</div>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <a href="#contact" className="btn-primary">
                            Work with us <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
