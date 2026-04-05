import { useState, useEffect } from "react";

export default function ImageSlideshow() {
    const [slides, setSlides] = useState([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
  const fetchImages = async () => {
    try {
      const res = await fetch(
        "https://chittilappillykunnath.com/wp-json/wp/v2/pages/2297"
      );
      const data = await res.json();

      // 👇 ADD HERE
      console.log("FULL DATA 👉", data);
      console.log("ACF 👉", data.acf);

      const ids = [data.acf.image_1, data.acf.image2].filter(Boolean);

      // 👇 ADD HERE
      console.log("IDS 👉", ids);

      const images = await Promise.all(
        ids.map(async (id) => {
          const imgRes = await fetch(
            `https://chittilappillykunnath.com/wp-json/wp/v2/media/${id}`
          );
          const imgData = await imgRes.json();

          return {
            id,
            url: imgData.source_url,
          };
        })
      );

      // 👇 ADD HERE
      console.log("IMAGES 👉", images);

      setSlides(images);
    } catch (err) {
      console.error(err);
    }
  };

  fetchImages();
}, []);

    const next = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const prev = () => {
        setCurrent((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        );
    };

    if (slides.length === 0) return <p style={{ textAlign: 'center' }}>Loading...</p>;

    const slide = slides[current];

    return (
        <>
            <style>{`
        .wrapper {
          width: 100%;
          max-width: 1100px;
          margin: 40px auto;
          padding: 0 16px;
        }

        .frame {
          position: relative;
          width: 100%;
          height: 420px;
          border-radius: 20px;
          overflow: hidden;
          background: #000;
        }

        .bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: opacity 0.5s ease;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
        }

        .content {
          position: absolute;
          bottom: 20px;
          left: 20px;
          color: white;
        }

        .content h2 {
          font-size: 28px;
          margin-bottom: 5px;
        }

        .content p {
          font-size: 14px;
          opacity: 0.8;
        }

        /* Arrows */
        .nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(0,0,0,0.5);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 5;
        }

        .left { left: 15px; }
        .right { right: 15px; }

        .nav:hover {
          background: rgba(0,0,0,0.7);
        }

        /* Thumbnails */
        .thumbs {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-top: 12px;
        }

        .thumb {
          width: 60px;
          height: 40px;
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
        }

        .thumb.active {
          border-color: #fff;
        }

        .thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Tablet */
        @media (max-width: 900px) {
          .frame {
            height: 320px;
          }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .frame {
            height: 240px;
            border-radius: 12px;
          }

          .nav {
            width: 32px;
            height: 32px;
          }

          .left { left: 8px; }
          .right { right: 8px; }

          .content h2 {
            font-size: 18px;
          }

          .content p {
            font-size: 12px;
          }
        }
      `}</style>

            <div className="wrapper">
                <div className="frame">
                    <div
                        className="bg"
                        style={{ backgroundImage: `url(${slide.url})` }}
                    />

                    <div className="overlay" />

                    <div className="content">
                        <h2>{slide.title}</h2>
                        <p>From WordPress CMS</p>
                    </div>

                    {/* Arrows */}
                    <div className="nav left" onClick={prev}>‹</div>
                    <div className="nav right" onClick={next}>›</div>
                </div>

                {/* Thumbnails */}
                <div className="thumbs">
                    {slides.map((s, i) => (
                        <div
                            key={s.id}
                            className={`thumb ${i === current ? "active" : ""}`}
                            onClick={() => setCurrent(i)}
                        >
                            <img src={s.url} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}