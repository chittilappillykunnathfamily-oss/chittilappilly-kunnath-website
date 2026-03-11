import { useState, useEffect } from "react";
import newAustin from "../assets/newAustin.jpg";

const NAV_LINKS = ["Home", "About Us", "Events", "Media", "Notices", "Contact"];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollTo = (label) => {
    setActive(label);
    setMenuOpen(false);
    const id = label.toLowerCase().replace(/\s+/g, "-");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Montserrat:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }

        .hdr {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          transition: all 0.4s ease;
        }
        .hdr-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 0 32px;
          display: flex; align-items: center; justify-content: space-between;
          height: 72px;
          transition: height 0.3s ease;
        }
        .hdr.scrolled .hdr-inner { height: 62px; }

        /* Glass morphism when scrolled */
        .hdr.scrolled {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 2px 24px rgba(26,58,42,0.1);
          border-bottom: 1px solid rgba(201,168,76,0.12);
        }
        .hdr.top { background: transparent; }

        /* LOGO */
        .logo {
          display: flex; align-items: center; gap: 10px;
          cursor: pointer; text-decoration: none; flex-shrink: 0;
          transition: opacity 0.2s;
        }
        .logo:hover { opacity: 0.85; }
        .logo-emblem {
          width: 40px; height: 40px; border-radius: 50%;
          background: linear-gradient(135deg, #1a3a2a, #2d6a4f);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px rgba(26,58,42,0.25);
          flex-shrink: 0; overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .logo:hover .logo-emblem { transform: rotate(8deg) scale(1.08); }
        .logo-emblem img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
        .logo-text {
          font-family: 'Dancing Script', cursive;
          font-size: 20px; font-weight: 600; color: #1a3a2a;
          line-height: 1.1; white-space: nowrap;
        }
        .logo-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 8.5px; font-weight: 500; letter-spacing: 2px;
          text-transform: uppercase; color: #c9a84c; display: block; margin-top: -1px;
        }

        /* DESKTOP NAV — centered absolutely */
        .nav-desktop {
          position: absolute; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 4px;
        }

        .nav-btn {
          position: relative; background: none; border: none; cursor: pointer;
          font-family: 'Montserrat', sans-serif; font-size: 12.5px; font-weight: 600;
          letter-spacing: 0.5px; color: #2a2a2a;
          padding: 8px 14px; border-radius: 4px;
          transition: color 0.25s ease;
          white-space: nowrap;
        }
        .nav-btn::after {
          content: ''; position: absolute;
          bottom: 2px; left: 50%; right: 50%;
          height: 2px; border-radius: 2px;
          background: linear-gradient(to right, #c9a84c, #e8c97a);
          transition: left 0.3s ease, right 0.3s ease;
        }
        .nav-btn:hover { color: #1a3a2a; }
        .nav-btn:hover::after, .nav-btn.active::after {
          left: 14px; right: 14px;
        }
        .nav-btn.active { color: #1a3a2a; }

        /* gold dot indicator for active */
        .nav-btn.active .nav-dot {
          opacity: 1; transform: scale(1);
        }
        .nav-dot {
          position: absolute; top: 4px; right: 8px;
          width: 4px; height: 4px; border-radius: 50%;
          background: #c9a84c;
          opacity: 0; transform: scale(0);
          transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }

        /* BOOK BTN */
        .book-btn {
          display: flex; align-items: center; gap: 8px;
          background: #1a3a2a; color: #fff;
          padding: 10px 20px; border-radius: 3px;
          font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase;
          border: none; cursor: pointer; flex-shrink: 0;
          transition: all 0.3s ease; white-space: nowrap;
          text-decoration: none;
        }
        .book-btn:hover {
          background: #c9a84c; color: #1a1a1a;
          box-shadow: 0 6px 20px rgba(201,168,76,0.3);
          transform: translateY(-1px);
        }

        /* BURGER */
        .burger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 6px;
          z-index: 10;
        }
        .burger span {
          display: block; width: 24px; height: 2px; border-radius: 2px;
          background: #1a3a2a;
          transition: all 0.35s cubic-bezier(0.34,1.2,0.64,1);
          transform-origin: center;
        }
        .burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* MOBILE MENU */
        .mobile-menu {
          display: none;
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(20px);
          z-index: 999;
          flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px;
          opacity: 0; pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .mobile-menu.open {
          opacity: 1; pointer-events: all;
        }

        .mob-link {
          font-family: 'Montserrat', sans-serif;
          font-size: 22px; font-weight: 800;
          letter-spacing: 2px; text-transform: uppercase;
          color: #1a1a1a; background: none; border: none;
          cursor: pointer; padding: 12px 32px;
          position: relative; transition: color 0.2s;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.35s ease, transform 0.35s ease, color 0.2s;
        }
        .mobile-menu.open .mob-link {
          opacity: 1; transform: translateY(0);
        }
        .mobile-menu.open .mob-link:nth-child(1) { transition-delay: 0.05s; }
        .mobile-menu.open .mob-link:nth-child(2) { transition-delay: 0.1s; }
        .mobile-menu.open .mob-link:nth-child(3) { transition-delay: 0.15s; }
        .mobile-menu.open .mob-link:nth-child(4) { transition-delay: 0.2s; }
        .mobile-menu.open .mob-link:nth-child(5) { transition-delay: 0.25s; }
        .mobile-menu.open .mob-link:nth-child(6) { transition-delay: 0.3s; }

        .mob-link::after {
          content: ''; position: absolute;
          left: 32px; bottom: 8px; right: 32px; height: 2px;
          background: linear-gradient(to right, #c9a84c, #e8c97a);
          transform: scaleX(0); transition: transform 0.3s ease;
          transform-origin: left;
        }
        .mob-link:hover, .mob-link.active { color: #c9a84c; }
        .mob-link:hover::after, .mob-link.active::after { transform: scaleX(1); }

        .mob-book {
          margin-top: 24px;
          display: flex; align-items: center; gap: 8px;
          background: #1a3a2a; color: #fff;
          padding: 14px 36px; border-radius: 3px;
          font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          border: none; cursor: pointer;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.35s ease 0.35s, transform 0.35s ease 0.35s, background 0.25s, color 0.25s;
        }
        .mobile-menu.open .mob-book { opacity: 1; transform: translateY(0); }
        .mob-book:hover { background: #c9a84c; color: #1a1a1a; }

        /* close btn inside mobile */
        .mob-close {
          position: absolute; top: 20px; right: 20px;
          background: none; border: none; cursor: pointer;
          color: #1a1a1a; padding: 8px;
        }

        /* scroll progress bar */
        .scroll-bar {
          position: absolute; bottom: 0; left: 0;
          height: 2px;
          background: linear-gradient(to right, #c9a84c, #e8c97a);
          transition: width 0.1s linear;
        }

        @media (max-width: 900px) {
          .nav-desktop { display: none; }
          .book-btn { display: none; }
          .burger { display: flex; }
          .mobile-menu { display: flex; }
        }
        @media (max-width: 480px) {
          .hdr-inner { padding: 0 20px; }
          .logo-text { font-size: 17px; }
        }
      `}</style>

      {/* MOBILE FULL-SCREEN MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button className="mob-close" onClick={() => setMenuOpen(false)}>
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        {/* decorative script */}
        <div style={{ fontFamily:"'Dancing Script',cursive", fontSize:16, color:"#c9a84c", letterSpacing:1, marginBottom:8, opacity: menuOpen ? 1 : 0, transition:"opacity 0.3s" }}>
          Chittilappilly Kunnath
        </div>

        {NAV_LINKS.map((link) => (
          <button
            key={link}
            className={`mob-link ${active === link ? "active" : ""}`}
            onClick={() => scrollTo(link)}
          >
            {link}
          </button>
        ))}

        <button className="mob-book" onClick={() => scrollTo("Contact")}>
          Book the Hall
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </button>
      </div>

      {/* MAIN HEADER */}
      <header className={`hdr ${scrolled ? "scrolled" : "top"}`}>
        <div className="hdr-inner">

          {/* LOGO */}
          <div className="logo" onClick={() => scrollTo("Home")}>
            <div className="logo-emblem">
              <img
                src={newAustin}
                alt="logo"
                onError={e => {
                  e.target.style.display = "none";
                  e.target.parentNode.innerHTML = `<span style="font-family:'Dancing Script',cursive;font-size:18px;color:#e8c97a;font-weight:600">CK</span>`;
                }}
              />
            </div>
            <div>
              <div className="logo-text">Chittilappilly Kunnath</div>
              <span className="logo-sub">Family Association</span>
            </div>
          </div>

          {/* DESKTOP NAV */}
          <nav className="nav-desktop">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                className={`nav-btn ${active === link ? "active" : ""}`}
                onClick={() => scrollTo(link)}
              >
                <span className="nav-dot"/>
                {link}
              </button>
            ))}
          </nav>

          {/* BOOK CTA */}
          <button className="book-btn" onClick={() => scrollTo("Contact")}>
            Book the Hall
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </button>

          {/* BURGER */}
          <button
            className={`burger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span/><span/><span/>
          </button>

        </div>

        {/* scroll progress bar */}
        {scrolled && (
          <ScrollBar/>
        )}
      </header>
    </>
  );
}

function ScrollBar() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setWidth(pct);
    };
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div className="scroll-bar" style={{ width: `${width}%` }}/>;
}