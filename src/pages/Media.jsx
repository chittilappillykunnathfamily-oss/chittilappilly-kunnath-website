import { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

/* ─────────────────────────────────────────
   YOUR DATA — replace with your own
───────────────────────────────────────── */




const PHOTO_CATS = ["All", "Nature", "Architecture", "Street", "Portrait", "Travel"];

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Outfit:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #ffffff;
  --bg2: #f7f6f3;
  --bg3: #f0ede8;
  --border: #e8e4de;
  --text: #1a1814;
  --muted: #8c8780;
  --accent: #2563eb;
  --accent-light: #eff4ff;
  --accent2: #f59e0b;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.05);
  --shadow-lg: 0 20px 60px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.07);
  --radius: 12px;
  --font-display: 'Playfair Display', serif;
  --font-body: 'Outfit', sans-serif;
}

.mg-root {
  background: var(--bg);
  min-height: 100vh;
  font-family: var(--font-body);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  padding-top: 50px;
}

/* ── HEADER ── */
.mg-header {
  padding: 56px 56px 0;
  max-width: 1400px;
  margin: 0 auto;
}
.mg-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
}
.mg-eyebrow-dot {
  width: 5px; height: 5px;
  background: var(--accent);
  border-radius: 50%;
}
.mg-headline {
   font-family: 'Montserrat', sans-serif;
  font-size: clamp(26px, 4vw, 44px);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: 4px;
  color: var(--text);
  margin-bottom: 14px;
}
.mg-headline em {
  font-style: italic;
  color: #c9a84c;
}
.mg-sub {
  font-size: 15px;
  font-weight: 300;
  color: var(--muted);
  max-width: 420px;
  line-height: 1.6;
}

/* ── TABS ── */
.mg-tabs-bar {
  max-width: 1400px;
  margin: 40px auto 0;
  padding: 0 56px;
  display: flex;
  align-items: flex-end;
  gap: 0;
  border-bottom: 1.5px solid var(--border);
}
.mg-tab {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--muted);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
  letter-spacing: 0.01em;
  white-space: nowrap;
}
.mg-tab::after {
  content: '';
  position: absolute;
  bottom: -1.5px;
  left: 0; right: 0;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
}
.mg-tab.active { color: var(--text); }
.mg-tab.active::after { transform: scaleX(1); }
.mg-tab:hover:not(.active) { color: var(--text); }
.mg-tab-icon { font-size: 16px; }
.mg-tab-count {
  font-size: 11px;
  font-weight: 500;
  background: var(--bg3);
  color: var(--muted);
  padding: 2px 8px;
  border-radius: 20px;
  transition: background 0.2s, color 0.2s;
}
.mg-tab.active .mg-tab-count {
  background: var(--accent-light);
  color: var(--accent);
}

/* ── PHOTO TAB CONTENT ── */
.mg-body {
  max-width: 1400px;
  margin: 0 auto;
  padding: 36px 56px 80px;
}

/* Filter */
.mg-filter-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}
.mg-filter-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  margin-right: 4px;
}
.mg-chip {
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 500;
  padding: 6px 16px;
  border-radius: 100px;
  border: 1.5px solid var(--border);
  background: var(--bg);
  color: var(--muted);
  cursor: pointer;
  transition: all 0.18s;
  letter-spacing: 0.02em;
}
.mg-chip:hover { border-color: var(--accent); color: var(--accent); }
.mg-chip.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

/* Photo grid */
.mg-photo-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.mg-photo-count {
  font-size: 13px;
  font-weight: 400;
  color: var(--muted);
}
.mg-masonry {
  columns: 3;
  column-gap: 16px;
}
.mg-photo-card {
  break-inside: avoid;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
  border-radius: var(--radius);
  background: var(--bg3);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: box-shadow 0.3s, transform 0.3s;
}
.mg-photo-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-3px);
}
.mg-photo-card img {
  width: 100%;
  display: block;
  border-radius: var(--radius);
  transition: transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94);
  filter: brightness(0.97);
}
.mg-photo-card:hover img {
  transform: scale(1.06);
  filter: brightness(1);
}
.mg-photo-overlay {
  position: absolute;
  inset: 0;
  border-radius: var(--radius);
  background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%);
  opacity: 0;
  transition: opacity 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 18px;
}
.mg-photo-card:hover .mg-photo-overlay { opacity: 1; }
.mg-overlay-cat {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.75);
  margin-bottom: 3px;
}
.mg-overlay-loc {
  font-family: var(--font-display);
  font-size: 17px;
  font-style: italic;
  color: #fff;
}
.mg-photo-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255,255,255,0.92);
  font-size: 10px;
  font-weight: 600;
  color: var(--text);
  padding: 4px 9px;
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.25s;
  backdrop-filter: blur(4px);
}
.mg-photo-card:hover .mg-photo-badge { opacity: 1; }

/* ── VIDEO TAB CONTENT ── */
.mg-video-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.mg-video-card {
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--bg);
  box-shadow: var(--shadow-sm);
  border: 1.5px solid var(--border);
  transition: box-shadow 0.3s, transform 0.3s;
  cursor: pointer;
}
.mg-video-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}
.mg-thumb-wrap {
  position: relative;
  padding-top: 56.25%;
  background: var(--bg3);
  overflow: hidden;
}
.mg-thumb-wrap img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease, filter 0.3s;
  filter: brightness(0.9);
}
.mg-video-card:hover .mg-thumb-wrap img {
  transform: scale(1.04);
  filter: brightness(0.75);
}
.mg-play-btn {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
.mg-play-circle {
  width: 52px;
  height: 52px;
  background: rgba(255,255,255,0.95);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  transition: transform 0.25s, background 0.2s;
}
.mg-video-card:hover .mg-play-circle {
  transform: scale(1.12);
  background: #fff;
}
.mg-play-triangle {
  width: 0; height: 0;
  border-top: 9px solid transparent;
  border-bottom: 9px solid transparent;
  border-left: 16px solid var(--accent);
  margin-left: 3px;
}
.mg-thumb-duration {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0,0,0,0.7);
  color: #fff;
  font-size: 11px;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: 4px;
  backdrop-filter: blur(4px);
  letter-spacing: 0.05em;
}
.mg-video-info {
  padding: 16px 18px 18px;
}
.mg-video-loc {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 6px;
}
.mg-video-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 400;
  color: var(--text);
  line-height: 1.25;
  margin-bottom: 10px;
}
.mg-video-open {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s;
}
.mg-video-open:hover { color: var(--accent); }
.mg-video-open-arrow { font-size: 14px; }

/* ── LIGHTBOX ── */
.mg-lb {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.25s ease;
}
@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
.mg-lb-bg {
  position: absolute;
  inset: 0;
  background: rgba(10,10,10,0.88);
  backdrop-filter: blur(16px);
}
.mg-lb-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 92vw;
}
.mg-lb-img {
  max-width: 84vw;
  max-height: 78vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 48px 100px rgba(0,0,0,0.6);
  display: block;
}
.mg-lb-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  padding: 0 2px;
}
  /* LOADER */
.mg-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  gap: 14px;
}

.mg-loader-ring {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 3px solid rgba(201,168,76,0.2);
  border-top: 3px solid #c9a84c;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.mg-loader p {
  font-size: 13px;
  color: #c9a84c;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.mg-lb-loc {
  font-family: var(--font-display);
  font-size: 20px;
  font-style: italic;
  color: #fff;
}
.mg-lb-counter { font-size: 12px; color: rgba(255,255,255,0.45); letter-spacing: 0.08em; }
.mg-lb-x {
  position: fixed;
  top: 24px; right: 28px;
  width: 40px; height: 40px;
  background: rgba(255,255,255,0.1);
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s;
  backdrop-filter: blur(8px);
}
.mg-lb-x:hover { background: rgba(255,255,255,0.2); }
.mg-lb-nav {
  position: fixed;
  top: 50%; transform: translateY(-50%);
  width: 48px; height: 48px;
  background: rgba(255,255,255,0.1);
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s;
  backdrop-filter: blur(8px);
}
.mg-lb-nav:hover { background: rgba(255,255,255,0.2); }
.mg-lb-prev { left: 20px; }
.mg-lb-next { right: 20px; }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .mg-header { padding: 40px 32px 0; }
  .mg-tabs-bar { padding: 0 32px; }
  .mg-body { padding: 28px 32px 60px; }
  .mg-masonry { columns: 2; }
  .mg-video-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .mg-header { padding: 28px 20px 0; }
  .mg-tabs-bar { padding: 0 20px; gap: 0; }
  .mg-tab { padding: 12px 16px; font-size: 13px; }
  .mg-body { padding: 20px 20px 48px; }
  .mg-masonry { columns: 1; }
  .mg-video-grid { grid-template-columns: 1fr; }
  .mg-lb-nav { display: none; }
  .mg-lb-img { max-width: 95vw; }
}
`;

export default function MediaGallery() {
  const [tab, setTab] = useState("photos");
  // const [photoFilter, setPhotoFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

  const filteredPhotos = photos;

  const prev = useCallback(() =>
    setLightbox(i => (i - 1 + filteredPhotos.length) % filteredPhotos.length),
    [filteredPhotos.length]);
  const next = useCallback(() =>
    setLightbox(i => (i + 1) % filteredPhotos.length),
    [filteredPhotos.length]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          "https://chittilappillykunnath.com/wp-json/wp/v2/videos"
        );
        const data = await res.json();

        const getYoutubeId = (url) => {
          try {
            const parsed = new URL(url);

            // youtu.be format
            if (parsed.hostname === "youtu.be") {
              return parsed.pathname.slice(1);
            }

            // youtube.com format
            if (parsed.searchParams.get("v")) {
              return parsed.searchParams.get("v");
            }

            return null;
          } catch {
            return null;
          }
        };

        const formatted = data
          .map(item => ({
            id: item.id,
            youtubeId: getYoutubeId(item.acf?.youtube_link),
            title: item.title.rendered,
            location: "—",
            duration: "—",
            date: item.date
          }))
          .filter(v => v.youtubeId);

        // latest first
        formatted.sort((a, b) => new Date(b.date) - new Date(a.date));

        setVideos(formatted);

      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoadingVideos(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "https://chittilappillykunnath.com/wp-json/wp/v2/media?per_page=50"
        );

        const data = await res.json();

        const formatted = data.map(item => ({
          id: item.id,
          src: item.source_url,
          category: item.media_type || "Photo",
          location: item.title?.rendered || "Unknown",
        }));

        setPhotos(formatted);

      } catch (err) {
        console.error("Error fetching photos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);
  const currentPhoto = lightbox !== null ? filteredPhotos[lightbox] : null;
  const Loader = () => (
    <div className="mg-loader">
      <div className="mg-loader-ring"></div>
      <p>Loading memories...</p>
    </div>
  );

  return (
    <>
      <style>{css}</style>
      <Header />
      <div className="mg-root">

        {/* ── HEADER ── */}
        <header className="mg-header">
          <div className="mg-eyebrow">
            {/* <span className="mg-eyebrow-dot" /> */}
            {/* Creative Portfolio */}
          </div>
          <h1 className="mg-headline">Our Moments<em> & </em> Memories</h1>
          <p className="mg-sub">A collection of our family events, celebrations, and cherished memories..</p>
        </header>

        {/* ── TABS ── */}
        <div className="mg-tabs-bar">
          <button
            className={`mg-tab${tab === "photos" ? " active" : ""}`}
            onClick={() => setTab("photos")}
          >
            <span className="mg-tab-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4h16v16H4z" fill="none" />
                <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 11.5l2.5 3.01L14.5 10l4.5 6H5l3.5-4.5z" />
              </svg>
            </span>
            Photos
            <span className="mg-tab-count">{photos.length}</span>
          </button>
          <button
            className={`mg-tab${tab === "videos" ? " active" : ""}`}
            onClick={() => setTab("videos")}
          >
            <span className="mg-tab-icon">▶</span>
            Videos
            <span className="mg-tab-count">{videos.length}</span>
          </button>
        </div>

        {/* ── BODY ── */}
        <div className="mg-body">

          {/* PHOTOS TAB */}
          {tab === "photos" && (
            <>

              <div className="mg-photo-meta">
                <span className="mg-photo-count">{filteredPhotos.length} photos</span>
              </div>
              {loading ? (
                <Loader />
              ) : (
                <div className="mg-masonry">
                  {filteredPhotos.map((photo, i) => (
                    <div
                      className="mg-photo-card"
                      key={photo.id}
                      onClick={() => setLightbox(i)}
                    >
                      <img src={photo.src} alt={photo.category} loading="lazy" />
                      <div className="mg-photo-overlay">
                        <span className="mg-overlay-cat">{photo.category}</span>
                        <span className="mg-overlay-loc">{photo.location}</span>
                      </div>
                      <span className="mg-photo-badge">{photo.category}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* VIDEOS TAB */}
          {tab === "videos" && (
            <div className="mg-video-grid">
              {videos.map(video => (
                <div className="mg-video-card" key={video.id}>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none", display: "block" }}
                  >
                    <div className="mg-thumb-wrap">
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                        alt={video.title}
                        loading="lazy"
                      />
                      <div className="mg-play-btn">
                        <div className="mg-play-circle">
                          <div className="mg-play-triangle" />
                        </div>
                      </div>
                      <span className="mg-thumb-duration">{video.duration}</span>
                    </div>
                  </a>
                  <div className="mg-video-info">
                    <p className="mg-video-loc">{video.location}</p>
                    <p className="mg-video-title">{video.title}</p>
                    <a
                      className="mg-video-open"
                      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Watch on YouTube
                      <span className="mg-video-open-arrow">↗</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── LIGHTBOX ── */}
        {lightbox !== null && currentPhoto && (
          <div className="mg-lb">
            <div className="mg-lb-bg" onClick={() => setLightbox(null)} />
            <button className="mg-lb-x" onClick={() => setLightbox(null)}>✕</button>
            <button className="mg-lb-nav mg-lb-prev" onClick={prev}>‹</button>
            <button className="mg-lb-nav mg-lb-next" onClick={next}>›</button>
            <div className="mg-lb-inner">
              <img className="mg-lb-img" src={currentPhoto.src} alt={currentPhoto.category} />
              <div className="mg-lb-footer">
                <span className="mg-lb-loc">{currentPhoto.location}</span>
                <span className="mg-lb-counter">
                  {String(lightbox + 1).padStart(2, "0")} / {String(filteredPhotos.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}
