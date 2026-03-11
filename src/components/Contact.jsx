import { useState } from "react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [activeInfo, setActiveInfo] = useState(null);
  const [copiedText, setCopiedText] = useState(null);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    }, 1500);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const openDirections = () => {
    window.open(
      "https://www.google.com/maps/dir/?api=1&destination=Kunnath+Auditorium+Chalakkal+Road+Parappur+Thrissur+Kerala+680552",
      "_blank"
    );
  };

  const openMap = () => {
    window.open(
      "https://www.google.com/maps/search/Kunnath+Auditorium+Chalakkal+Road+Parappur+Thrissur+Kerala+680552",
      "_blank"
    );
  };

  const phones = [
    { name: "Francis", role: "President", phone: "+91 000000000", tel: "+91000000000" },
    { name: "Josson C D", role: "Secretary", phone: "+91 9447085424", tel: "+919447085424" },
    { name: "Anto C C", role: "Convener", phone: "+91 9995692365", tel: "+919995692365" },
    { name: "Austin Paul", role: "Gen. Convener", phone: "+91 9400486997", tel: "+919400486997" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600&family=Montserrat:wght@400;600;700;800&family=Open+Sans:wght@300;400;600&display=swap');
        * { box-sizing: border-box; }

        .cs { background: #fff; padding: 80px 40px; font-family: 'Open Sans', sans-serif; }

        /* HEADER */
        .cs-header { text-align: center; margin-bottom: 60px; }
        .cs-script { font-family: 'Dancing Script', cursive; font-size: 36px; color: #c9a84c; display: block; margin-bottom: 2px; }
        .cs-title { font-family: 'Montserrat', sans-serif; font-size: clamp(22px,3.5vw,38px); font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: #1a1a1a; margin: 0 0 16px; }
        .cs-div { display:flex; align-items:center; justify-content:center; gap:10px; }
        .cs-dl { width:60px; height:1px; background:#c9a84c; }
        .cs-dd { width:6px; height:6px; border-radius:50%; background:#c9a84c; }

        /* LAYOUT */
        .cs-grid { display:grid; grid-template-columns:1fr 1.5fr; gap:32px; max-width:1100px; margin:0 auto; }

        /* INFO CARDS */
        .cs-info { display:flex; flex-direction:column; gap:16px; }

        .info-card {
          border-radius:6px; padding:22px 22px 20px;
          background:#f7f7f7; border-top:3px solid #c9a84c;
          transition:all 0.35s cubic-bezier(0.34,1.2,0.64,1);
          position:relative; overflow:hidden; cursor:default;
        }
        .info-card::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(201,168,76,0.04),transparent);
          opacity:0; transition:opacity 0.3s;
        }
        .info-card:hover { transform:translateY(-4px); box-shadow:0 16px 40px rgba(0,0,0,0.09); background:#fff; }
        .info-card:hover::before { opacity:1; }

        .ic-head { display:flex; align-items:center; gap:12px; margin-bottom:10px; }
        .ic-icon {
          width:38px; height:38px; border-radius:50%;
          background:linear-gradient(135deg,#c9a84c,#e8c97a);
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
          transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .info-card:hover .ic-icon { transform:scale(1.15) rotate(8deg); }
        .ic-icon svg { width:16px; height:16px; stroke:#fff; fill:none; }
        .ic-title { font-family:'Montserrat',sans-serif; font-size:12px; font-weight:800; letter-spacing:2px; text-transform:uppercase; color:#1a1a1a; }
        .ic-rule { width:28px; height:2px; background:#c9a84c; margin-bottom:12px; transition:width 0.3s ease; }
        .info-card:hover .ic-rule { width:44px; }
        .ic-text { font-size:13px; line-height:1.85; color:#666; font-weight:300; }

        /* ADDRESS ACTIONS */
        .addr-actions { display:flex; gap:8px; margin-top:14px; flex-wrap:wrap; }
        .addr-btn {
          display:inline-flex; align-items:center; gap:6px;
          padding:8px 14px; border-radius:3px; border:none; cursor:pointer;
          font-family:'Montserrat',sans-serif; font-size:10px; font-weight:700;
          letter-spacing:1.5px; text-transform:uppercase;
          transition:all 0.25s ease; text-decoration:none;
        }
        .addr-btn-primary { background:#1a1a1a; color:#fff; }
        .addr-btn-primary:hover { background:#c9a84c; color:#1a1a1a; transform:translateY(-2px); box-shadow:0 6px 16px rgba(201,168,76,0.25); }
        .addr-btn-outline { background:transparent; color:#1a1a1a; border:1.5px solid rgba(0,0,0,0.15); }
        .addr-btn-outline:hover { border-color:#c9a84c; color:#c9a84c; transform:translateY(-2px); }
        .addr-btn svg { width:12px; height:12px; }

        /* COPY TOAST */
        .copy-toast {
          position:fixed; bottom:28px; left:50%; transform:translateX(-50%);
          background:#1a1a1a; color:#fff; padding:10px 20px; border-radius:4px;
          font-family:'Montserrat',sans-serif; font-size:11px; font-weight:600; letter-spacing:1px;
          display:flex; align-items:center; gap:8px;
          animation:toastIn 0.3s ease both; z-index:999;
          box-shadow:0 8px 24px rgba(0,0,0,0.2);
        }
        @keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(12px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }

        /* PHONE CONTACTS */
        .phone-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px 24px; }
        .ph-row {}
        .ph-role { font-size:9px; font-weight:700; color:#bbb; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:2px; }
        .ph-name { font-size:13px; color:#333; margin-bottom:2px; font-weight:400; }
        .ph-link {
          display:inline-flex; align-items:center; gap:5px;
          color:#c9a84c; text-decoration:none; font-size:12.5px; font-weight:600;
          transition:all 0.2s; border-bottom:1px dashed transparent;
        }
        .ph-link:hover { color:#a07a2a; border-bottom-color:#c9a84c; }
        .ph-link svg { width:11px; height:11px; }

        /* RIGHT COLUMN */
        .cs-right { display:flex; flex-direction:column; gap:16px; }

        /* FORM */
        .form-card { background:#f7f7f7; border-top:3px solid #c9a84c; border-radius:6px; padding:30px 28px; }
        .form-script { font-family:'Dancing Script',cursive; font-size:22px; color:#c9a84c; display:block; margin-bottom:2px; }
        .form-htitle { font-family:'Montserrat',sans-serif; font-size:17px; font-weight:800; letter-spacing:2px; text-transform:uppercase; color:#1a1a1a; margin:0 0 6px; }
        .form-rule { width:32px; height:2px; background:#c9a84c; margin-bottom:22px; }

        .frow { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .fg { display:flex; flex-direction:column; }
        .fg.full { grid-column:1/-1; }
        .fl { font-family:'Montserrat',sans-serif; font-size:9.5px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#999; margin-bottom:6px; }
        .fi, .fta {
          background:#fff; border:1.5px solid rgba(0,0,0,0.08); border-radius:4px;
          padding:11px 13px; font-family:'Open Sans',sans-serif; font-size:13.5px; color:#1a1a1a;
          outline:none; width:100%; transition:all 0.25s ease;
        }
        .fi:focus, .fta:focus { border-color:#c9a84c; box-shadow:0 0 0 3px rgba(201,168,76,0.1); }
        .fi:hover, .fta:hover { border-color:rgba(201,168,76,0.4); }
        .fta { resize:vertical; min-height:100px; }

        .fsub {
          width:100%; display:flex; align-items:center; justify-content:center; gap:10px;
          background:#1a1a1a; color:#fff; padding:14px; border-radius:4px;
          font-family:'Montserrat',sans-serif; font-size:11px; font-weight:700;
          letter-spacing:2.5px; text-transform:uppercase; border:none; cursor:pointer;
          transition:all 0.3s; margin-top:12px; position:relative; overflow:hidden;
        }
        .fsub::before {
          content:''; position:absolute; top:0; left:-100%; width:100%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent);
          transition:left 0.5s;
        }
        .fsub:hover::before { left:100%; }
        .fsub:hover { background:#c9a84c; color:#1a1a1a; box-shadow:0 8px 24px rgba(201,168,76,0.3); }
        .fsub:disabled { opacity:0.7; cursor:not-allowed; }

        .spinner { width:16px; height:16px; border:2px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:spin 0.7s linear infinite; }
        @keyframes spin { to { transform:rotate(360deg); } }

        .success-banner {
          display:flex; align-items:center; gap:12px;
          background:linear-gradient(135deg,rgba(82,183,136,0.08),rgba(82,183,136,0.04));
          border:1px solid rgba(82,183,136,0.25); border-radius:4px;
          padding:14px 16px; margin-top:12px;
          animation:fadeUp 0.4s ease both;
        }
        .success-icon { width:32px; height:32px; background:rgba(82,183,136,0.15); border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .success-icon svg { width:16px; height:16px; stroke:#2d6a4f; }
        .success-text-title { font-family:'Montserrat',sans-serif; font-size:12px; font-weight:700; color:#2d6a4f; letter-spacing:1px; text-transform:uppercase; }
        .success-text-sub { font-size:12px; color:#4a9070; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .cs { padding:50px 18px; }
          .cs-grid { grid-template-columns:1fr; }
          .phone-grid { grid-template-columns:1fr 1fr; }
          .frow { grid-template-columns:1fr; }
          .form-card { padding:24px 18px; }
          .addr-actions { flex-direction:column; }
          .addr-btn { justify-content:center; }
        }
        @media (min-width:769px) and (max-width:1024px) {
          .cs-grid { grid-template-columns:1fr 1.2fr; gap:24px; }
        }
      `}</style>

      {copiedText && (
        <div className="copy-toast">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
          {copiedText} copied!
        </div>
      )}

      <section id="contact" className="cs">

        {/* Header */}
        <div className="cs-header">
          <span className="cs-script">Get In Touch</span>
          <h2 className="cs-title">Contact Us</h2>
          <div className="cs-div"><div className="cs-dl"/><div className="cs-dd"/><div className="cs-dl"/></div>
        </div>

        <div className="cs-grid">

          {/* LEFT */}
          <div className="cs-info">

            {/* Address + Directions */}
            <div className="info-card">
              <div className="ic-head">
                <div className="ic-icon">
                  <svg viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div className="ic-title">Address</div>
              </div>
              <div className="ic-rule"/>
              <p className="ic-text">
                Kunnath Auditorium, Chalakkal Road,<br/>
                Near Church, Parappur P.O,<br/>
                Thrissur District, Pincode: 680552, Kerala.
              </p>
              <div className="addr-actions">
                <button className="addr-btn addr-btn-primary" onClick={openDirections}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                  </svg>
                  Get Directions
                </button>
                <button className="addr-btn addr-btn-outline" onClick={openMap}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  View on Map
                </button>
                <button className="addr-btn addr-btn-outline" onClick={() => copyToClipboard("Kunnath Auditorium, Chalakkal Road, Near Church, Parappur P.O, Thrissur District, Pincode: 680552, Kerala.", "Address")}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                  Copy Address
                </button>
              </div>
            </div>

            {/* Hall Booking */}
            <div className="info-card">
              <div className="ic-head">
                <div className="ic-icon">
                  <svg viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <div className="ic-title">Hall Booking</div>
              </div>
              <div className="ic-rule"/>
              <p className="ic-text" style={{marginBottom:10}}>Martin Lazar</p>
              <div style={{display:"flex", alignItems:"center", gap:8, flexWrap:"wrap"}}>
                <a href="tel:+919446839395" className="ph-link">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  +91 9446839395
                </a>
                <button className="addr-btn addr-btn-outline" style={{padding:"5px 10px", fontSize:9}} onClick={() => copyToClipboard("+919446839395", "Number")}>Copy</button>
              </div>
            </div>

            {/* Email */}
            <div className="info-card">
              <div className="ic-head">
                <div className="ic-icon">
                  <svg viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div className="ic-title">Email</div>
              </div>
              <div className="ic-rule"/>
              <div style={{display:"flex", alignItems:"flex-start", gap:8, flexWrap:"wrap"}}>
                <a href="mailto:chittilappillykunnathfamily@gmail.com" className="ph-link" style={{fontSize:12, wordBreak:"break-all"}}>
                  chittilappillykunnathfamily@gmail.com
                </a>
                <button className="addr-btn addr-btn-outline" style={{padding:"5px 10px", fontSize:9, flexShrink:0}} onClick={() => copyToClipboard("chittilappillykunnathfamily@gmail.com", "Email")}>Copy</button>
              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="cs-right">

            {/* Phone block */}
            <div className="info-card">
              <div className="ic-head">
                <div className="ic-icon">
                  <svg viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div className="ic-title">Phone Contacts</div>
              </div>
              <div className="ic-rule"/>
              <div className="phone-grid">
                {phones.map(p => (
                  <div key={p.name} className="ph-row">
                    <div className="ph-role">{p.role}</div>
                    <div className="ph-name">{p.name}</div>
                    <div style={{display:"flex", alignItems:"center", gap:6}}>
                      <a href={`tel:${p.tel}`} className="ph-link">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                        {p.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="form-card">
              <span className="form-script">Send a Message</span>
              <h3 className="form-htitle">We'd Love to Hear</h3>
              <div className="form-rule"/>

              <form onSubmit={submit}>
                <div className="frow">
                  <div className="fg">
                    <label className="fl">Your Name</label>
                    <input className="fi" name="name" value={form.name} onChange={handle} placeholder="John Doe" required/>
                  </div>
                  <div className="fg">
                    <label className="fl">Phone</label>
                    <input className="fi" name="phone" value={form.phone} onChange={handle} placeholder="+91 00000 00000"/>
                  </div>
                  <div className="fg full">
                    <label className="fl">Email Address</label>
                    <input className="fi" name="email" type="email" value={form.email} onChange={handle} placeholder="you@example.com" required/>
                  </div>
                  <div className="fg full">
                    <label className="fl">Message</label>
                    <textarea className="fta" name="message" value={form.message} onChange={handle} placeholder="How can we help you?" required/>
                  </div>
                </div>

                <button type="submit" className="fsub" disabled={sending}>
                  {sending ? (
                    <><div className="spinner"/> Sending...</>
                  ) : (
                    <>Send Message
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </>
                  )}
                </button>

                {sent && (
                  <div className="success-banner">
                    <div className="success-icon">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <div>
                      <div className="success-text-title">Message Sent!</div>
                      <div className="success-text-sub">We'll get back to you soon.</div>
                    </div>
                  </div>
                )}
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;