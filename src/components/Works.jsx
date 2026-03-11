import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';

const projects = [
    {
        image: project1,
        title: 'Elegant Front Yard Upgrade',
        desc: 'Redesigned the front yard to improve curb appeal using structured hedges, a new lawn, and stone edging.',
        tags: ['Curb Appeal', 'Planting'],
    },
    {
        image: project2,
        title: 'Modern Garden Retreat',
        desc: 'Transformed a neglected backyard into a calm, modern retreat with layered planting and a stone patio.',
        tags: ['Residential', 'Outdoor Living'],
    },
    {
        image: project3,
        title: 'Sustainable Courtyard Garden',
        desc: 'Created an eco-friendly courtyard using native plants and a smart drip irrigation system.',
        tags: ['Eco-Friendly', 'Irrigation'],
    },
];

const Works = () => {
    return (
        <section id="works" className="py-24 md:py-32" style={{ background: 'white' }}>
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="max-w-2xl mb-16">
                    <span className="section-label">(works)</span>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--green-dark)' }}>
                        A Look at Our{' '}
                        <span style={{ color: 'var(--green-primary)', fontStyle: 'italic' }}>Completed Projects</span>
                    </h2>
                </div>

                {/* Projects */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.map((project, i) => (
                        <div
                            key={i}
                            className="card-hover rounded-3xl overflow-hidden"
                            style={{ background: 'var(--bg-cream)', border: '1px solid var(--green-pale)' }}
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden" style={{ height: '260px' }}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-7">
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="text-xs font-medium px-3 py-1 rounded-full"
                                            style={{ background: 'var(--green-pale)', color: 'var(--green-primary)' }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--green-dark)', fontFamily: 'Playfair Display, serif' }}>
                                    {project.title}
                                </h3>
                                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-mid)' }}>
                                    {project.desc}
                                </p>

                                <button
                                    className="flex items-center gap-2 text-sm font-semibold transition-all duration-200"
                                    style={{ color: 'var(--green-primary)', background: 'none', border: 'none', cursor: 'pointer' }}
                                    onMouseEnter={e => e.currentTarget.style.color = 'var(--green-medium)'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'var(--green-primary)'}
                                >
                                    View Project <ArrowUpRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Works;
