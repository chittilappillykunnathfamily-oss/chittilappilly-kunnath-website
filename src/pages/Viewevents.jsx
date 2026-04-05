import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";


// const events = [
//     {
//         id: 1,
//         name: "Neon Horizons Music Festival",
//         date: "APR 12, 2026",
//         day: "Sunday",
//         time: "6:00 PM",
//         location: "Skyline Arena, Mumbai",
//         category: "Music",
//         poster: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=600&fit=crop",
//     },
//     {
//         id: 2,
//         name: "Design Forward Summit",
//         date: "APR 19, 2026",
//         day: "Saturday",
//         time: "10:00 AM",
//         location: "Convention Centre, Bangalore",
//         category: "Design",
//         poster: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=600&fit=crop",
//     },
//     {
//         id: 3,
//         name: "Tech Pulse Conference",
//         date: "MAY 3, 2026",
//         day: "Sunday",
//         time: "9:00 AM",
//         location: "Expo Hub, Delhi",
//         category: "Tech",
//         poster: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=600&fit=crop",
//     },
//     {
//         id: 4,
//         name: "Coastal Food & Art Carnival",
//         date: "MAY 17, 2026",
//         day: "Sunday",
//         time: "12:00 PM",
//         location: "Marine Drive, Kochi",
//         category: "Food & Art",
//         poster: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=600&fit=crop",
//     },
//     {
//         id: 5,
//         name: "Indie Film Showcase",
//         date: "JUN 7, 2026",
//         day: "Sunday",
//         time: "7:30 PM",
//         location: "Studio Noir, Chennai",
//         category: "Film",
//         poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
//     },
//     {
//         id: 6,
//         name: "Urban Beats Dance Battle",
//         date: "JUN 21, 2026",
//         day: "Saturday",
//         time: "5:00 PM",
//         location: "Central Park, Pune",
//         category: "Dance",
//         poster: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=600&fit=crop",
//     },
// ];

const categoryColors = {
    Music: { bg: "#ff6b35", light: "rgba(255,107,53,0.12)" },
    Design: { bg: "#7c3aed", light: "rgba(124,58,237,0.12)" },
    Tech: { bg: "#0ea5e9", light: "rgba(14,165,233,0.12)" },
    "Food & Art": { bg: "#10b981", light: "rgba(16,185,129,0.12)" },
    Film: { bg: "#f59e0b", light: "rgba(245,158,11,0.12)" },
    Dance: { bg: "#ec4899", light: "rgba(236,72,153,0.12)" },
};

export default function UpcomingEvents() {

    const [events, setEvents] = useState([]);
    const [hovered, setHovered] = useState(null);
    const [activeFilter, setActiveFilter] = useState("All");

    useEffect(() => {
        fetch("https://chittilappillykunnath.com/wp-json/wp/v2/posts?_embed")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.log(err));
    }, []);



    const categories = ["All", ...Object.keys(categoryColors)];
    const filtered = events;

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ev-root {
          min-height: 100vh;
          background: #f7f7f5;
          font-family: 'DM Sans', sans-serif;
          color: #1a1a2e;
          padding: 48px 24px 80px;
        }

        .ev-header {
          max-width: 1200px;
          margin: 0 auto 52px;
        }

        .ev-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #ff6b35;
          margin-bottom: 16px;
        }

        .ev-eyebrow::before {
          content: '';
          width: 28px;
          height: 2px;
          background: #ff6b35;
          display: inline-block;
        }

        .ev-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(42px, 7vw, 80px);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -2px;
          color: #0f0f1a;
          margin-bottom: 6px;
        }

        .ev-title span {
          color: #ff6b35;
          font-style: italic;
        }

        .ev-subtitle {
          font-size: 15px;
          color: #888899;
          margin-top: 14px;
          font-weight: 300;
        }

        .ev-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 32px;
        }

        .ev-filter-btn {
          padding: 8px 18px;
          border-radius: 100px;
          border: 1px solid rgba(0,0,0,0.12);
          background: #fff;
          color: #666;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ev-filter-btn:hover {
          border-color: rgba(0,0,0,0.25);
          color: #1a1a2e;
        }

        .ev-filter-btn.active {
          background: #ff6b35;
          border-color: #ff6b35;
          color: #fff;
        }

        .ev-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .ev-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.07);
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease, box-shadow 0.35s ease;
          display: flex;
          flex-direction: column;
        }

        .ev-card:hover {
          transform: translateY(-8px);
          border-color: rgba(0,0,0,0.12);
          box-shadow: 0 32px 64px rgba(0,0,0,0.12);
        }

        .ev-poster-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 2 / 3;
          overflow: hidden;
        }

        .ev-poster-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .ev-card:hover .ev-poster-img {
          transform: scale(1.06);
        }

        .ev-poster-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0) 40%,
            rgba(0,0,0,0.88) 100%
          );
        }

        .ev-poster-top {
          position: absolute;
          top: 16px;
          left: 16px;
          right: 16px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .ev-cat-badge {
          padding: 5px 12px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .ev-date-chip {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 12px;
          padding: 6px 12px;
          text-align: center;
        }

        .ev-date-chip-month {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #ff6b35;
        }

        .ev-date-chip-day {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: #0f0f1a;
          line-height: 1;
        }

        .ev-poster-bottom {
          position: absolute;
          bottom: 20px;
          left: 20px;
          right: 20px;
        }

        .ev-event-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(18px, 2.5vw, 22px);
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 8px;
        }

        .ev-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .ev-meta-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: rgba(255,255,255,0.55);
          font-weight: 400;
        }

        .ev-meta-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
        }

        .ev-card-footer {
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(0,0,0,0.06);
        }

        .ev-time-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: #555566;
        }

        .ev-time-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ff6b35;
          box-shadow: 0 0 8px #ff6b35;
        }

        .ev-rsvp-btn {
          padding: 8px 20px;
          border-radius: 100px;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.3px;
        }

        .ev-rsvp-btn:hover {
          transform: scale(1.04);
          filter: brightness(1.1);
        }

        .ev-count {
          max-width: 1200px;
          margin: 0 auto 24px;
          font-size: 13px;
          color: #aaaabc;
          font-weight: 400;
        }

        @media (max-width: 600px) {
          .ev-root { padding: 32px 16px 60px; }
          .ev-grid { grid-template-columns: 1fr; gap: 16px; }
          .ev-header { margin-bottom: 36px; }
          .ev-title { letter-spacing: -1.5px; }
        }

        @media (min-width: 601px) and (max-width: 900px) {
          .ev-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
       <Header />

            <div className="ev-root"> <br />
                <div className="ev-header"> <br />
                    <div className="ev-eyebrow">Upcoming Events</div>
                    <h1 className="ev-title">
                        Don't miss what's <span>next</span>
                    </h1>
                    <p className="ev-subtitle">Handpicked events worth showing up for.</p>
{/* 
                    <div className="ev-filters">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`ev-filter-btn${activeFilter === cat ? " active" : ""}`}
                                onClick={() => setActiveFilter(cat)}
                                style={
                                    activeFilter === cat && cat !== "All"
                                        ? { background: categoryColors[cat]?.bg, borderColor: categoryColors[cat]?.bg }
                                        : {}
                                }
                            >
                                {cat}
                            </button>
                        ))}
                    </div> */}
                </div>

                <p className="ev-count">{filtered.length} event{filtered.length !== 1 ? "s" : ""} found</p>

                <div className="ev-grid">
                    {filtered.map((event) => {
                        const color = categoryColors["Music"];
                        const image =
                            event._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                            "https://via.placeholder.com/400x600";

                        const rawDate = event.acf?.date || "20260101";
                        const formattedDate = `${rawDate.slice(0, 4)}-${rawDate.slice(4, 6)}-${rawDate.slice(6, 8)}`;

                        const dateObj = new Date(formattedDate);

                        const dayNum = dateObj.getDate();
                        const month = dateObj
                            .toLocaleString("default", { month: "short" })
                            .toUpperCase();

                        const timeObj = new Date(`1970-01-01T${event.acf?.event_time || "00:00:00"}`);
                        const time = timeObj.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        });
                        return (
                            <div
                                key={event.id}
                                className="ev-card"
                                onMouseEnter={() => setHovered(event.id)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <div className="ev-poster-wrap">
                                    <img
                                        src={image}
                                        alt={event.title.rendered}
                                        className="ev-poster-img"
                                        loading="lazy"
                                    />
                                    <div className="ev-poster-overlay" />

                                    <div className="ev-poster-top">
                                        {/* <span
                                            className="ev-cat-badge"
                                            style={{ background: color.light, color: color.bg }}
                                        >
                                            Music
                                        </span> */}
                                        <div className="ev-date-chip">
                                            <div className="ev-date-chip-month">{month}</div>
                                            <div className="ev-date-chip-day">{dayNum}</div>
                                        </div>
                                    </div>

                                    <div className="ev-poster-bottom">
                                        <h2 className="ev-event-name">{event.title.rendered}</h2>
                                        <div className="ev-meta">
                                            <div className="ev-meta-row">
                                                <span>📍</span>
                                                <span>{event.acf?.location}</span>
                                            </div>
                                            <div className="ev-meta-row">
                                                <span>🗓</span>
                                                <span>{month} {dayNum}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="ev-card-footer">
                                    <div className="ev-time-label">
                                        <span className="ev-time-dot" />
                                        {time}
                                    </div>
                                    {/* <button
                                        className="ev-rsvp-btn"
                                        style={{ background: color.bg, color: "#fff" }}
                                    >
                                        RSVP →
                                    </button> */}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
            <Footer />
        </>
    );
}
