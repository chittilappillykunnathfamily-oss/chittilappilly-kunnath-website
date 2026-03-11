import React from 'react';
import { Leaf, ArrowRight } from 'lucide-react';

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Testimonials', href: '#testimonial' },
    { label: 'Services', href: '#services' },
    { label: "FAQ's", href: '#faq' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Contact', href: '#contact' },
    { label: 'Projects', href: '#works' },
];

const Footer = () => {
    return (
        <footer style={{ background: '#0f1f15' }}>
            {/* CTA Banner */}
            <div
                className="py-16 px-6"
                style={{ background: 'var(--green-primary)' }}
            >
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'white', fontFamily: 'Playfair Display, serif' }}>
                            Ready to transform your outdoor space?
                        </h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)' }}>Let's build your dream garden together.</p>
                    </div>
                    <a href="#contact" className="btn-outline flex-shrink-0" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.6)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--green-primary)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'white'; }}
                    >
                        Work with us <ArrowRight size={16} />
                    </a>
                </div>
            </div>

            {/* Main footer */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--green-accent)' }}>
                                <Leaf size={16} color="white" />
                            </div>
                            <span className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'white' }}>
                                Greenora
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
                            Crafting beautiful outdoor spaces with care and expertise. Serving homeowners across the USA.
                        </p>
                    </div>

                    {/* Navigation links - two columns */}
                    <div className="md:col-span-2">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {navLinks.map(link => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm transition-colors duration-200 hover:text-green-400"
                                    style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)' }}
                >
                    <span>© 2025 Greenora. All rights reserved.</span>
                    <span>Designed & built with care 🌿</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
