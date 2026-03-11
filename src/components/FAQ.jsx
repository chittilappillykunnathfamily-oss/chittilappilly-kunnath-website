import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        q: 'How long does a typical landscaping project take?',
        a: 'Most projects take between one to three weeks, depending on the size and complexity. We always provide a clear timeline before starting any work.',
    },
    {
        q: 'Do you offer maintenance after installation?',
        a: 'Yes! We provide regular maintenance packages to keep your garden healthy, clean, and thriving all year round.',
    },
    {
        q: 'Can you design a garden for small spaces?',
        a: 'Absolutely. We specialize in maximizing smaller yards and patios, creating functional and beautiful outdoor areas that suit your lifestyle.',
    },
    {
        q: 'What kind of materials do you use?',
        a: 'We use premium plants, stones, and eco-friendly materials sourced from trusted suppliers to ensure lasting quality and sustainability.',
    },
    {
        q: 'How do I get a quote for my project?',
        a: "You can contact us through the form or email. Once we understand your vision, we'll send a detailed estimate with design and material options.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section id="faq" className="py-24 md:py-32" style={{ background: 'white' }}>
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="section-label">(faq)</span>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--green-dark)' }}>
                        Got Questions?{' '}
                        <span style={{ color: 'var(--green-primary)', fontStyle: 'italic' }}>We Have Answers</span>
                    </h2>
                </div>

                {/* Accordion */}
                <div className="flex flex-col gap-3">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={i}
                                className="rounded-2xl overflow-hidden transition-all duration-300"
                                style={{
                                    border: `1px solid ${isOpen ? 'var(--green-light)' : 'var(--green-pale)'}`,
                                    background: isOpen ? 'var(--green-xpale)' : 'white',
                                }}
                            >
                                <button
                                    className="w-full flex items-center justify-between px-7 py-5 text-left"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                                >
                                    <span
                                        className="text-base font-semibold pr-4"
                                        style={{ color: isOpen ? 'var(--green-primary)' : 'var(--green-dark)', fontFamily: 'Inter, sans-serif' }}
                                    >
                                        {faq.q}
                                    </span>
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                                        style={{
                                            background: isOpen ? 'var(--green-primary)' : 'var(--green-pale)',
                                            color: isOpen ? 'white' : 'var(--green-primary)',
                                        }}
                                    >
                                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                                    </div>
                                </button>

                                <div
                                    style={{
                                        maxHeight: isOpen ? '200px' : '0',
                                        overflow: 'hidden',
                                        transition: 'max-height 0.35s ease',
                                    }}
                                >
                                    <p className="px-7 pb-6 text-sm leading-relaxed" style={{ color: 'var(--text-mid)' }}>
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
