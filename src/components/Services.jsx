import React from "react";

const features = [
  { icon: "🎭", title: "Performances", desc: "Concerts, plays, orchestra & dance" },
  { icon: "🏆", title: "Ceremonies", desc: "Awards, lectures & assemblies" },
  { icon: "💍", title: "Celebrations", desc: "Weddings, baptisms & events" },
];

const Services = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamath:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .aud-section {
          position: relative;
          overflow: hidden;
          padding: 100px 40px;
          background: #faf6ee;
        }

        .aud-bg-glow {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 80% 60% at 10% 20%, rgba(82,183,136,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 90% 80%, rgba(201,168,76,0.06) 0%, transparent 60%);
        }

        .aud-deco-letter {
          position: absolute; top: -40px; right: -20px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 420px; font-weight: 300;
          color: rgba(45,106,79,0.04); line-height: 1;
          pointer-events: none; user-select: none;
        }

        .aud-container {
          max-width: 1080px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .aud-label {
          display: flex; align-items: center; gap: 12px; margin-bottom: 28px;
        }
        .aud-label-line {
          width: 50px; height: 1px;
          background: linear-gradient(to right, #2d6a4f, transparent);
        }
        .aud-label-text {
          font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 500;
          letter-spacing: 4px; text-transform: uppercase; color: #2d6a4f;
        }

        /* GRID */
        .aud-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        /* IMAGE SIDE */
        .aud-image-block { position: relative; }

        .aud-corner {
          position: absolute; top: -16px; left: -16px;
          width: 60px; height: 60px;
          border-top: 2px solid #c9a84c;
          border-left: 2px solid #c9a84c;
          border-radius: 4px 0 0 0;
          z-index: 1;
        }

        .aud-frame {
          border-radius: 4px 72px 4px 4px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(26,58,42,0.22);
          position: relative;
        }
        .aud-frame img {
          width: 100%; height: 420px; object-fit: cover; display: block;
          transition: transform 0.7s ease;
        }
        .aud-frame:hover img { transform: scale(1.04); }

        .aud-frame-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 45%, rgba(26,58,42,0.58) 100%);
          pointer-events: none;
        }

        .aud-badge {
          position: absolute; bottom: 22px; left: 22px; z-index: 2;
          background: rgba(201,168,76,0.93); color: #1a3a2a;
          padding: 9px 18px; border-radius: 2px;
          font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 500;
          letter-spacing: 2.5px; text-transform: uppercase;
        }

        .aud-stat {
          position: absolute; top: 28px; right: -20px;
          background: #1a3a2a; color: white;
          padding: 16px 18px; border-radius: 8px; text-align: center;
          box-shadow: 0 14px 32px rgba(26,58,42,0.3); z-index: 2;
        }
        .aud-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 34px; font-weight: 600; color: #e8c97a; line-height: 1;
        }
        .aud-stat-lbl {
          font-size: 9.5px; letter-spacing: 1.5px; text-transform: uppercase;
          color: rgba(255,255,255,0.6); margin-top: 5px; line-height: 1.5;
        }

        /* TEXT SIDE */
        .aud-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 4vw, 54px);
          font-weight: 300; line-height: 1.1; color: #1a3a2a; margin: 0;
        }
        .aud-heading em { font-style: italic; color: #2d6a4f; }

        .aud-gold-rule {
          width: 60px; height: 2px;
          background: linear-gradient(to right, #c9a84c, #e8c97a);
          margin: 16px 0 14px;
        }

        .aud-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px; font-style: italic; color: #5a5a4a; margin-bottom: 26px;
        }

        .aud-desc {
          font-size: 14.5px; line-height: 1.9; color: #5a5a4a;
          font-family: 'Jost', sans-serif; font-weight: 300;
          margin-bottom: 30px;
          border-left: 2px solid #52b788; padding-left: 18px;
        }

        /* FEATURE CARDS */
        .aud-features {
          display: flex; gap: 12px; margin-bottom: 32px;
        }

        .feat-card {
          background: white; border: 1px solid rgba(45,106,79,0.1);
          border-radius: 8px; padding: 18px 10px; text-align: center;
          transition: all 0.3s ease; position: relative; overflow: hidden; flex: 1;
        }
        .feat-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(to right, #2d6a4f, #c9a84c);
          transform: scaleX(0); transition: transform 0.3s ease;
        }
        .feat-card:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(45,106,79,0.12); }
        .feat-card:hover::after { transform: scaleX(1); }
        .feat-icon { font-size: 22px; margin-bottom: 8px; display: block; }
        .feat-title {
          font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 500;
          letter-spacing: 1.5px; text-transform: uppercase; color: #1a3a2a; margin-bottom: 5px;
        }
        .feat-desc { font-size: 11px; color: #aaa; line-height: 1.5; }

        /* CTA */
        .cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #1a3a2a; color: white;
          padding: 13px 28px; border-radius: 3px;
          font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 500;
          letter-spacing: 2px; text-transform: uppercase;
          border: 1px solid transparent; cursor: pointer; transition: all 0.3s ease;
        }
        .cta-btn:hover { background: transparent; color: #1a3a2a; border-color: #1a3a2a; }

        /* ANIMATIONS */
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .anim-left  { animation: fadeLeft  0.9s ease both; }
        .anim-right { animation: fadeRight 0.9s ease 0.15s both; }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .aud-section { padding: 60px 20px; }
          .aud-deco-letter { display: none; }

          .aud-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          /* image adjustments */
          .aud-frame img { height: 280px; }
          .aud-frame { border-radius: 4px 48px 4px 4px; }

          .aud-stat {
            right: 12px;
            top: 12px;
            padding: 12px 14px;
          }
          .aud-stat-num { font-size: 26px; }
          .aud-stat-lbl { font-size: 8.5px; }

          .aud-corner { top: -10px; left: -10px; width: 40px; height: 40px; }

          /* text adjustments */
          .aud-heading { font-size: 38px; }
          .aud-tagline { font-size: 15px; }
          .aud-desc { font-size: 14px; }

          /* stack feature cards vertically on very small screens */
          .aud-features { flex-direction: column; gap: 10px; }
          .feat-card { padding: 14px 16px; display: flex; align-items: center; gap: 14px; text-align: left; }
          .feat-card::after { display: none; }
          .feat-icon { font-size: 26px; margin-bottom: 0; flex-shrink: 0; }
          .feat-title { margin-bottom: 2px; }

          .cta-btn { width: 100%; justify-content: center; padding: 14px; }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .aud-section { padding: 80px 30px; }
          .aud-grid { gap: 40px; }
          .aud-frame img { height: 360px; }
          .aud-stat { right: -10px; }
        }
      `}</style>

      <section id="services" className="aud-section">
        <div className="aud-bg-glow" />
        <div className="aud-deco-letter">A</div>

        <div className="aud-container">

          {/* Label */}
          <div className="aud-label">
            <div className="aud-label-line" />
            <span className="aud-label-text">Our Venue</span>
          </div>

          {/* Grid */}
          <div className="aud-grid">

            {/* LEFT: Image */}
            <div className="aud-image-block anim-left">
              <div className="aud-corner" />
              <div className="aud-frame">
                <img
                  src="https://chittilappillykunnath.com/wp-content/uploads/2022/04/IMG-20220330-WA0016.jpg"
                  alt="Kunnath Auditorium"
                />
                <div className="aud-frame-overlay" />
                <div className="aud-badge">Kunnath Auditorium</div>
              </div>
              <div className="aud-stat">
                <div className="aud-stat-num">15+</div>
                <div className="aud-stat-lbl">Years of<br />Excellence</div>
              </div>
            </div>

            {/* RIGHT: Text */}
            <div className="anim-right">
              <h2 className="aud-heading">
                Our <em>Auditorium</em>
              </h2>
              <div className="aud-gold-rule" />
              <p className="aud-tagline">Where Every Moment Becomes a Memory</p>

              <p className="aud-desc">
                A beautiful and spacious auditorium designed for every occasion — from grand
                performances and award ceremonies to intimate celebrations. With modern facilities
                and a comfortable atmosphere, we bring your most cherished events to life.
              </p>

              {/* Feature cards */}
              <div className="aud-features">
                {features.map((f) => (
                  <div key={f.title} className="feat-card">
                    <span className="feat-icon">{f.icon}</span>
                    <div>
                      <div className="feat-title">{f.title}</div>
                      <div className="feat-desc">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button className="cta-btn">
                Book a Visit
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Services;