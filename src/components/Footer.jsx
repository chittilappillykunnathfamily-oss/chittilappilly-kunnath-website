import { useState } from "react";
import newAustin from "../assets/newAustin.jpg";

const FacebookIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
);

const TwitterXIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const Logo = () => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

        <div style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(232,201,122,0.25)"
        }}>
            <img
                src={newAustin}
                alt="logo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
        </div>

        <div>
            <div style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "18px",
                fontWeight: "600",
                color: "#e8c97a"
            }}>
                Chittilappilly Kunnath
            </div>

            <div style={{
                fontSize: "10px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#a89050"
            }}>
                Family Association
            </div>
        </div>

    </div>
);

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Montserrat:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .footer {
    background: #0d0d0f;
    color: #c8c8cc;
    font-family: 'DM Sans', sans-serif;
    padding: 80px 0;
    position: relative;
    overflow: hidden;
  }

  .footer::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #e8c97a55, transparent);
  }

  .footer-glow {
    position: absolute;
    top: -120px; left: 50%;
    transform: translateX(-50%);
    width: 600px; height: 260px;
    background: radial-gradient(ellipse, rgba(232,201,122,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .footer-inner {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .footer-top {
    display: flex;
  justify-content: space-between;
  align-items: center;
  }
  .footer-left {
  display: flex;
  align-items: center;
}

.footer-right {
  display: flex;
  align-items: center;
}

  .footer-brand p {
    font-size: 14px;
    line-height: 1.75;
    color: #7a7a85;
    margin: 18px 0 28px;
    font-weight: 300;
    max-width: 280px;
  }

  .social-row {
    display: flex;
    gap: 10px;
  }

  .social-btn {
    width: 40px; height: 40px;
    border: 1px solid #2a2a2e;
    border-radius: 10px;
    background: #15151a;
    display: flex; align-items: center; justify-content: center;
    color: #7a7a85;
    cursor: pointer;
    transition: all 0.25s ease;
    text-decoration: none;
  }

  .social-btn:hover {
    border-color: #e8c97a88;
    color: #e8c97a;
    background: #1d1a10;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(232,201,122,0.15);
  }

  .footer-col h4 {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #e8c97a;
    margin-bottom: 20px;
  }

  .footer-col ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .footer-col ul li a {
    font-size: 14px;
    color: #6e6e78;
    text-decoration: none;
    font-weight: 400;
    transition: color 0.2s ease;
    display: inline-block;
  }

  .footer-col ul li a:hover {
    color: #d4d4d8;
  }

  .footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 22px 0;
    gap: 16px;
  }

  .footer-bottom p {
    font-size: 13px;
    color: #42424a;
  }

  .footer-bottom-links {
    display: flex;
    gap: 24px;
  }

  .footer-bottom-links a {
    font-size: 13px;
    color: #42424a;
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-bottom-links a:hover {
    color: #e8c97a;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #18180e;
    border: 1px solid #2c2a14;
    border-radius: 20px;
    padding: 5px 12px;
    font-size: 12px;
    color: #a89050;
    font-weight: 500;
  }

  .badge-dot {
    width: 6px; height: 6px;
    background: #e8c97a;
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

 @media (max-width: 600px) {
  .footer-top {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .footer-right {
    justify-content: center;
  }
}
    .footer-brand {
      grid-column: span 2;
    }
    .footer-brand p { max-width: 100%; }
  }

  @media (max-width: 560px) {
    .footer { padding: 48px 0 0; }
    .footer-top {
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      padding-bottom: 40px;
    }
    .footer-brand { grid-column: span 2; }
    .footer-bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 14px;
    }
    .footer-bottom-links { flex-wrap: wrap; gap: 16px; }
  }
`;

export default function ModernFooter() {
    const [email, setEmail] = useState("");

    return (
        <>
            <style>{styles}</style>
            <footer className="footer">
                <div className="footer-glow" />
                <div className="footer-inner">
                    <div className="footer-top">

                        {/* LEFT */}
                        <div className="footer-left">
                            <Logo />
                        </div>

                        {/* RIGHT */}
                        <div className="footer-right">
                            <div className="social-row">
                                <a href="#" className="social-btn"><FacebookIcon /></a>
                                <a href="#" className="social-btn"><InstagramIcon /></a>
                                <a href="#" className="social-btn"><TwitterXIcon /></a>
                            </div>
                        </div>

                    </div>


                </div>
            </footer>
        </>
    );
}
