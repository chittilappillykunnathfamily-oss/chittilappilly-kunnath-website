import { useState } from "react";

const aboutItems = [
  {
    id: 1,
    title: "OUR HISTORY",
    subtitle: "Discover",
    desc: "We belong to a family tree of 'good Samaritans being humane rather just human beings' called CHITTILAPPILLY KUNNATH emanated and spread its wings from Parappur. Ours is predominantly an agricultural village of paddy, coconut etc. It's a place 13 km away from Thrissur the cultural capital of Kerala.",
    link: "/history",
    icon: "🏛️",
  },
  {
    id: 2,
    title: "OUR LEGACY",
    subtitle: "This Is",
    desc: "Fr. Antony Kunnath the pride of our family always inspired us. He donated a precious land at the heart of Parappur adjacent to 3 century old St. John Nepumcian Catholic Forane Church and our Tharavattuyogam could build a building called 'KUNNATH AUDITORIUM'.",
    link: "/legacy",
    icon: "🌿",
  },
  {
    id: 3,
    title: "EXECUTIVE COMMITTEE",
    subtitle: "Meet Our",
    desc: "Our executive committee comprises dedicated family members serving in various fields and capacities, guiding the Chittilappilly Kunnath Tharavattuyogam with wisdom, unity and a deep sense of family pride.",
    link: "/committee",
    icon: "👥",
  },
];

export default function AboutSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      id="about-us"
      style={{
        background: "#fff",
        fontFamily: "'Open Sans', sans-serif",
        minHeight: "100vh"
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600&family=Montserrat:wght@400;600;700;800&family=Open+Sans:wght@300;400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .about-wrap { padding: 80px 40px; max-width: 1200px; margin: 0 auto; }

        /* HEADER */
        .about-header { text-align: center; margin-bottom: 64px; }
        .about-script { font-family: 'Dancing Script', cursive; font-size: 36px; color: #c9a84c; display: block; margin-bottom: 2px; line-height: 1.3; }
        .about-main-title { font-family: 'Montserrat', sans-serif; font-size: clamp(22px, 3.5vw, 38px); font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: #1a1a1a; margin-bottom: 18px; }
        .about-divider { display: flex; align-items: center; justify-content: center; gap: 10px; }
        .adl { width: 60px; height: 1px; background: #c9a84c; }
        .add { width: 6px; height: 6px; border-radius: 50%; background: #c9a84c; }

        /* GRID */
        .about-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 56px; }

        /* CARD */
        .about-card {
          background: #f7f7f7;
          border-radius: 4px;
          border-top: 3px solid #c9a84c;
          padding: 32px 28px 28px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease, background 0.3s ease;
        }
        .about-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 56px rgba(0,0,0,0.12);
          background: #fff;
        }

        /* Shimmer sweep on hover */
        .about-card::before {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 60%; height: 100%;
          background: linear-gradient(120deg, transparent 0%, rgba(201,168,76,0.06) 50%, transparent 100%);
          transition: left 0.6s ease;
          pointer-events: none;
        }
        .about-card:hover::before { left: 160%; }

        /* Gold left reveal bar */
        .about-card::after {
          content: '';
          position: absolute;
          left: 0; bottom: 0;
          width: 3px; height: 0%;
          background: linear-gradient(to top, #c9a84c, #e8c97a);
          transition: height 0.4s ease;
        }
        .about-card:hover::after { height: 100%; }

        /* NUMBER */
        .card-num {
          position: absolute; top: 14px; right: 18px;
          font-family: 'Montserrat', sans-serif;
          font-size: 58px; font-weight: 800;
          color: rgba(201,168,76,0.15);
          line-height: 1; user-select: none; pointer-events: none;
          transition: color 0.4s ease, transform 0.4s ease;
        }
        .about-card:hover .card-num {
          color: rgba(201,168,76,0.4);
          transform: scale(1.1) translateY(-4px);
        }

        /* ICON circle — appears on hover */
        .card-icon-wrap {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c9a84c, #e8c97a);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          margin-bottom: 14px;
          transform: scale(0) rotate(-20deg);
          opacity: 0;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1) 0.05s, opacity 0.3s ease;
          flex-shrink: 0;
        }
        .about-card:hover .card-icon-wrap {
          transform: scale(1) rotate(0deg);
          opacity: 1;
        }

        .card-subtitle { font-family: 'Dancing Script', cursive; font-size: 22px; color: #c9a84c; display: block; margin-bottom: 4px; padding-right: 70px; transition: color 0.3s; }
        .card-title { font-family: 'Montserrat', sans-serif; font-size: 17px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #1a1a1a; margin-bottom: 14px; padding-right: 70px; line-height: 1.3; transition: color 0.3s; }
        .about-card:hover .card-title { color: #1a1a1a; }

        .card-rule { width: 36px; height: 2px; background: #c9a84c; margin-bottom: 16px; flex-shrink: 0; transition: width 0.4s ease; }
        .about-card:hover .card-rule { width: 56px; }

        .card-desc { font-size: 13.5px; line-height: 1.85; color: #666; font-weight: 300; flex: 1; margin-bottom: 28px; transition: color 0.3s; }
        .about-card:hover .card-desc { color: #555; }

        /* MORE btn */
        .card-more {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 700;
          letter-spacing: 2.5px; text-transform: uppercase;
          color: #1a1a1a; text-decoration: none;
          transition: color 0.2s ease, gap 0.3s ease;
          margin-top: auto; flex-shrink: 0;
        }
        .card-more:hover { color: #c9a84c; gap: 16px; }
        .more-line { width: 32px; height: 1.5px; background: currentColor; transition: width 0.3s ease; }
        .more-head { width: 7px; height: 7px; border-right: 1.5px solid currentColor; border-top: 1.5px solid currentColor; transform: rotate(45deg); margin-left: -2px; }
        .about-card:hover .more-line { width: 44px; }

        /* BANNER */
        .about-banner {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          border-radius: 4px; padding: 38px 48px;
          display: flex; align-items: center; justify-content: space-between; gap: 24px;
        }
        .banner-script { font-family: 'Dancing Script', cursive; font-size: 18px; color: #c9a84c; display: block; margin-bottom: 4px; }
        .banner-title { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #fff; }
        .banner-quote { font-size: 13px; color: rgba(255,255,255,0.45); font-style: italic; max-width: 380px; flex: 1; line-height: 1.7; text-align: center; }
        .banner-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #c9a84c; color: #1a1a1a;
          padding: 13px 26px; border-radius: 2px;
          font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          border: none; cursor: pointer; white-space: nowrap; text-decoration: none;
          transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .banner-btn:hover { background: #e8c97a; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(201,168,76,0.3); }

        /* ANIMATIONS */
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .about-card:nth-child(1) { animation: fadeUp 0.6s ease 0.1s both; }
        .about-card:nth-child(2) { animation: fadeUp 0.6s ease 0.25s both; }
        .about-card:nth-child(3) { animation: fadeUp 0.6s ease 0.4s both; }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .about-wrap { padding: 50px 18px; }
          .about-grid { grid-template-columns: 1fr; gap: 16px; }
          .about-banner { flex-direction: column; text-align: center; padding: 28px 20px; }
          .banner-quote { display: none; }
          .banner-btn { width: 100%; justify-content: center; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .about-wrap { padding: 60px 24px; }
          .about-grid { grid-template-columns: 1fr 1fr; }
          .about-card:nth-child(3) { grid-column: 1 / -1; max-width: 480px; margin: 0 auto; width: 100%; }
          .banner-quote { display: none; }
        }
      `}</style>

      <div className="about-wrap">

        {/* Header */}
        <div className="about-header">
          <span className="about-script">About Us</span>
          <h2 className="about-main-title">Chittilappilly Kunnath Family</h2>
          <div className="about-divider">
            <div className="adl" /><div className="add" /><div className="adl" />
          </div>
        </div>

        {/* Cards */}
        <div className="about-grid">
          {aboutItems.map((item) => (
            <div
              key={item.id}
              className="about-card"
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="card-num">0{item.id}</div>

              {/* Icon — pops in on hover */}
              <div className="card-icon-wrap">{item.icon}</div>

              <span className="card-subtitle">{item.subtitle}</span>
              <h3 className="card-title">{item.title}</h3>
              <div className="card-rule" />
              <p className="card-desc">{item.desc}</p>

              <a href={item.link} className="card-more">
                MORE
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                  <span className="more-line" />
                  <span className="more-head" />
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* Banner */}
        <div className="about-banner">
          <div>
            <span className="banner-script">Welcome To</span>
            <div className="banner-title">Chittilappilly Kunnath</div>
          </div>
          <p className="banner-quote">
            "കുടുംബം ദൈവിക സ്വഭാവമുള്ളതാണെന്നും അത് ദൈവത്താൽ നിയോഗിക്കപ്പെട്ടതാണെന്നും ഞങ്ങൾ വിശ്വസിക്കുന്നു."
          </p>
          <a href="/about" className="banner-btn">
            Explore Our Story
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

      </div>
    </div>
  );
}