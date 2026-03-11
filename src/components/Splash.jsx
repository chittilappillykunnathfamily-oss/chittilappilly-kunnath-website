import React, { useEffect, useState } from 'react';

// Using logo.mp4 from assets. Please ensure the provided logo is saved here.
import logo from '../assets/logo.mp4';

const Splash = ({ onFinish }) => {
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        // Display the splash screen for 2.5 seconds total
        // 1.5s for the reveal animation to finish and stay, then fade out
        const timer = setTimeout(() => {
            setIsFadingOut(true);
            // Wait for the fade out transition (500ms) before unmounting
            setTimeout(() => {
                onFinish();
            }, 500);
        }, 11500);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div
            className={`fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
        >
            <div className="flex flex-col items-center animate-reveal">
                <video
                    src={logo}
                    autoPlay
                    muted
                    playsInline
                    className="w-[100px] md:w-[300px] lg:w-[1400px] h-auto drop-shadow-lg mb-6"
                    onError={(e) => {
                        // Fallback if logo.mp4 is not yet placed in assets
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML += '<div class="text-3xl font-bold" style="color: var(--green-dark); font-family: Playfair Display, serif;">Chittilappilly Kunnath</div><div class="text-sm mt-2 text-gray-500">(Please place logo.mp4 in src/assets)</div>';
                    }}
                />

                {/* <div className="text-center font-bold tracking-widest text-[#B59139]" style={{ fontFamily: 'Playfair Display, serif' }}>
                    <div className="text-4xl md:text-4xl mb-1">CHITTILAPILLY KUNNATH</div>
                    <div className="text-xl md:text-xl tracking-[0.2em] opacity-90">THARAVATTUYOGAM</div>
                </div> */}
            </div>
        </div>
    );
};

export default Splash;
