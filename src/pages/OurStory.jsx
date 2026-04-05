import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";


const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --white: #ffffff;
    --off-white: #f8f7f5;
    --black: #0d0d0d;
    --gray: #6b6b6b;
    --light-gray: #e8e6e1;
    --accent: #c8a96e;
    --accent-light: #f5ede0;
  }

  body { background: var(--white); }

  .page { font-family: 'DM Sans', sans-serif; background: var(--white); color: var(--black); overflow-x: hidden; }

  /* ── HERO SECTION ─────────────────────────────── */
  .hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 90vh;
    align-items: center;
  }

  .hero-image-wrap {
    position: relative;
    height: 100%;
    min-height: 500px;
    overflow: hidden;
  }

  .hero-image-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.8s ease;
  }

  .hero-image-wrap:hover img { transform: scale(1.03); }

  .hero-image-wrap::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(200,169,110,0.15) 0%, transparent 60%);
    pointer-events: none;
  }

  .hero-badge {
    position: absolute;
    top: 32px;
    left: 32px;
    background: var(--accent);
    color: var(--white);
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    padding: 8px 16px;
    z-index: 2;
  }

  .hero-content {
    padding: 80px 72px 80px 64px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
    opacity: 0;
    transform: translateX(30px);
    animation: slideIn 0.9s 0.2s forwards;
  }

  .overline {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
  }

  .hero-heading {
    font-family: 'Playfair Display', serif;
    font-size: clamp(38px, 4vw, 62px);
    font-weight: 900;
    line-height: 1.08;
    color: var(--black);
    letter-spacing: -1px;
  }

  .hero-heading span { color: var(--accent); font-style: italic; }

  .hero-description {
    font-size: 17px;
    line-height: 1.75;
    color: var(--gray);
    font-weight: 300;
    max-width: 440px;
  }

  .hero-actions { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }

  .btn-primary {
    background: var(--black);
    color: var(--white);
    border: none;
    padding: 16px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: background 0.25s, transform 0.2s;
  }
  .btn-primary:hover { background: var(--accent); transform: translateY(-1px); }

  .btn-ghost {
    background: transparent;
    color: var(--black);
    border: 1.5px solid var(--light-gray);
    padding: 15px 28px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: border-color 0.25s, color 0.25s;
  }
  .btn-ghost:hover { border-color: var(--accent); color: var(--accent); }

  /* ── DIVIDER ──────────────────────────────────── */
  .section-divider {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 0 80px;
    margin: 0 auto;
    max-width: 1200px;
  }
  .divider-line { flex: 1; height: 1px; background: var(--light-gray); }
  .divider-dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; }

  /* ── CONTENT SECTIONS ─────────────────────────── */
  .content-sections {
    padding: 100px 80px;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .content-block {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 60px;
    padding: 64px 0;
    border-bottom: 1px solid var(--light-gray);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s, transform 0.6s;
    align-items: start;
  }

  .content-block.visible { opacity: 1; transform: translateY(0); }
  .content-block:last-child { border-bottom: none; }

  .block-number {
    font-family: 'Playfair Display', serif;
    font-size: 80px;
    font-weight: 900;
    color: var(--accent-light);
    line-height: 1;
    letter-spacing: -3px;
    user-select: none;
    padding-top: 4px;
  }

  .block-right { display: flex; flex-direction: column; gap: 16px; }

  .block-tag {
    display: inline-block;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--accent);
    background: var(--accent-light);
    padding: 5px 12px;
    width: fit-content;
  }

  .block-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(24px, 2.5vw, 36px);
    font-weight: 700;
    color: var(--black);
    line-height: 1.2;
    letter-spacing: -0.5px;
  }

  .block-description {
    font-size: 16px;
    line-height: 1.8;
    color: var(--gray);
    font-weight: 300;
    max-width: 560px;
  }

  .block-link {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--black);
    cursor: pointer;
    width: fit-content;
    transition: gap 0.2s, color 0.2s;
    border: none;
    background: none;
    padding: 0;
    margin-top: 8px;
  }
  .block-link:hover { color: var(--accent); gap: 14px; }
  .block-link::after { content: '→'; font-size: 16px; }

  /* ── FOOTER STRIP ─────────────────────────────── */
  .footer-strip {
    background: var(--black);
    color: var(--white);
    padding: 48px 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }
  .footer-strip p { font-size: 13px; color: rgba(255,255,255,0.5); letter-spacing: 0.5px; }
  .footer-brand {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.5px;
  }
  .footer-brand span { color: var(--accent); }

  /* ── ANIMATIONS ───────────────────────────────── */
  @keyframes slideIn {
    to { opacity: 1; transform: translateX(0); }
  }

  /* ── RESPONSIVE: TABLET ───────────────────────── */
  @media (max-width: 1024px) {
    .hero { grid-template-columns: 1fr; min-height: auto; }
    .hero-image-wrap { min-height: 420px; height: 420px; }
    .hero-content { padding: 56px 48px; align-items: flex-start; }
    .content-sections { padding: 80px 48px; }
    .content-block { grid-template-columns: 120px 1fr; gap: 40px; }
    .block-number { font-size: 60px; }
    .footer-strip { padding: 40px 48px; }
    .section-divider { padding: 0 48px; }
  }

  /* ── RESPONSIVE: PHONE ────────────────────────── */
  @media (max-width: 640px) {
    .hero-image-wrap { min-height: 300px; height: 300px; }
    .hero-content { padding: 40px 24px; gap: 24px; }
    .hero-heading { font-size: 36px; }
    .hero-description { font-size: 15px; }
    .content-sections { padding: 60px 24px; }
    .content-block { grid-template-columns: 1fr; gap: 20px; padding: 48px 0; }
    .block-number { font-size: 44px; }
    .block-title { font-size: 26px; }
    .footer-strip { padding: 32px 24px; flex-direction: column; align-items: flex-start; }
    .section-divider { padding: 0 24px; }
  }
`;

const blocks = [
  {
    tag: "Strategy",
    title: "Discover Our History",
    description:
      `We belong to a family tree of “good Samaritans being humane rather just human beings” called ‘CHITTILAPPILLY KUNNATH’ emanated and spread its wings from Parappur. Ours is predominantly an agricultural village of paddy, coconut etc. It’s a place 13 km away from Thrissur the cultural capital of Kerala. Our family members are serving the mankind in various fields and capacities. Family widened its horizon by its noble presence at Thrissur, Mannuthy,Varandarappilly, Kozhikode and far and wide. 210 family units are now branches of our family tree.

25 years ago we came together to form a family association called ‘CHITTILAPPILLY KUNNATH THARAVATTUYOGAM, PARAPPUR’ as a bond of love and unity. Since then we, entire family members met sharing happiness every year and the unity in heart and soul flourished. A directory of our family tree is brought out displaying the glittering history of our proud heritage. isolation. They emerge from a deep understanding of the people who use them — their habits,frustrations, and aspirations. We help teams align around insight before execution.`,
  },
  {
    tag: "Design",
    title: "Craft Interfaces Worth Coming Back To",
    description:
      "First impressions matter, but retention is the real measure of design quality. We create experiences that feel intuitive on day one and rewarding on day one hundred — because delight compounds.",
  },
];

export default function ModernPage() {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.idx);
            setVisible((prev) => [...new Set([...prev, idx])]);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".content-block").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page">
      <style>{style}</style>
       <Header />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-image-wrap">
          <span className="hero-badge">New Collection</span>
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=80"
            alt="Hero visual"
          />
        </div>

        <div className="hero-content">
          <span className="overline">Welcome to the studio</span>
          <h1 className="hero-heading">
            Design that <span>moves</span> people forward
          </h1>
          <p className="hero-description">
            We partner with ambitious teams to shape products, brands, and experiences
            that are impossible to ignore — and hard to leave.
          </p>
          <div className="hero-actions">
            <button className="btn-primary">Get Started</button>
            <button className="btn-ghost">See Our Work</button>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="section-divider">
        <div className="divider-line" />
        <div className="divider-dot" />
        <div className="divider-line" />
      </div>

      {/* ── CONTENT BLOCKS ── */}
      <section className="content-sections">
        {blocks.map((block, i) => (
          <div
            key={i}
            className={`content-block${visible.includes(i) ? " visible" : ""}`}
            data-idx={i}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="block-number">0{i + 1}</div>
            <div className="block-right">
              <span className="block-tag">{block.tag}</span>
              <h2 className="block-title">{block.title}</h2>
              <p className="block-description">{block.description}</p>
              {/* <button className="block-link">Learn more</button> */}
            </div>
          </div>
        ))}
      </section>

      {/* ── FOOTER STRIP ── */}
      
      <Footer />
    </div>
    
  );
}
