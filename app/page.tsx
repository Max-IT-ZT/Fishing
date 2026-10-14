"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const tripTime = new Date(2026, 9, 16, 14, 0, 0);

const fishingMemories = [
  {
    src: "/images/photo_2026-10-14_21-13-33%20(2).jpg",
    alt: "Двоє друзів разом на риболовлі біля води",
    label: "01 / СВОЯ КОМАНДА",
    caption: "Головне — компанія",
  },
  {
    src: "/images/IMG_3452.JPG",
    alt: "Рибалка з уловом на березі",
    label: "02 / ВДАЛИЙ ДЕНЬ",
    caption: "Є що згадати",
  },
  {
    src: "/images/photo_2026-10-14_21-13-33.jpg",
    alt: "Друзі відпочивають разом на риболовлі",
    label: "03 / НА БЕРЕЗІ",
    caption: "День без поспіху",
  },
  {
    src: "/images/photo_2026-10-14_21-13-33%20(3).jpg",
    alt: "Друг з рибальським садком біля озера",
    label: "04 / УЛОВ Є",
    caption: "Рибальські історії",
  },
  {
    src: "/images/photo_2026-10-14_21-13-33%20(4).jpg",
    alt: "Рибалка показує свій улов",
    label: "05 / НА ГАЧКУ",
    caption: "Оце вже клюнуло",
  },
  {
    src: "/images/photo_2026-10-14_21-13-33%20(5).jpg",
    alt: "Ранкова риболовля на тихому озері",
    label: "06 / РАНОК НА ВОДІ",
    caption: "Поки місто ще спить",
  },
  {
    src: "/images/photo_2026-10-14_21-13-33%20(6).jpg",
    alt: "Вудки біля озера на світанку",
    label: "07 / ТИША",
    caption: "Тут час сповільнюється",
  },
  {
    src: "/images/photo_2026-10-14_21-13-34.jpg",
    alt: "Спокійне озеро серед лісу",
    label: "08 / НАШ БЕРЕГ",
    caption: "Ближче до природи",
  },
  {
    src: "/images/photo_2026-10-14_21-13-34%20(2).jpg",
    alt: "Рибалка з вудкою на березі",
    label: "09 / ЗА ЗАНЯТТЯМ",
    caption: "Чекаємо на клювання",
  },
  {
    src: "/images/photo_2026-10-14_21-13-34%20(3).jpg",
    alt: "Нічна риболовля з уловом",
    label: "10 / ПІСЛЯ ЗАХОДУ",
    caption: "Клює і вночі",
  },
  {
    src: "/images/photo_2026-10-14_21-13-34%20(4).jpg",
    alt: "Рибалка з вудкою біля озера",
    label: "11 / ЩЕ ЗАКИД",
    caption: "Ще одна спроба",
  },
  {
    src: "/images/photo_2026-10-14_21-13-34%20(5).jpg",
    alt: "Великий улов на риболовлі",
    label: "12 / ГАРНИЙ УЛОВ",
    caption: "Таке не забувається",
  },
  {
    src: "/images/photo_2026-10-14_21-13-34%20(6).jpg",
    alt: "Друг тримає великого коропа",
    label: "13 / ТРОФЕЙ",
    caption: "До наступної рибалки",
  },
];

function getCountdown(): Countdown {
  const remaining = Math.max(0, tripTime.getTime() - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function getDayLabel(days: number): string {
  const lastTwoDigits = days % 100;
  const lastDigit = days % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return "ДНІВ";
  if (lastDigit === 1) return "ДЕНЬ";
  if (lastDigit >= 2 && lastDigit <= 4) return "ДНІ";
  return "ДНІВ";
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 4H4v4m12-4h4v4M4 16v4h4m12-4v4h-4" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={direction === "previous" ? "chevron-previous" : undefined}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default function Home() {
  const [countdown, setCountdown] = useState<Countdown | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [lightboxImageRatio, setLightboxImageRatio] = useState(4 / 3);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const update = () => setCountdown(getCountdown());
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedPhoto === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedPhoto(null);
      if (event.key === "ArrowRight") {
        setSelectedPhoto((current) =>
          current === null ? null : (current + 1) % fishingMemories.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setSelectedPhoto((current) =>
          current === null
            ? null
            : (current - 1 + fishingMemories.length) % fishingMemories.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhoto]);

  const selectedMemory =
    selectedPhoto === null ? null : fishingMemories[selectedPhoto];

  const showPreviousPhoto = () => {
    setSelectedPhoto((current) =>
      current === null
        ? null
        : (current - 1 + fishingMemories.length) % fishingMemories.length,
    );
  };

  const showNextPhoto = () => {
    setSelectedPhoto((current) =>
      current === null ? null : (current + 1) % fishingMemories.length,
    );
  };

  const values = countdown ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const tripStarted =
    countdown !== null &&
    Object.values(countdown).every((value) => value === 0);
  const calendarUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" +
    encodeURIComponent("Рибалка — час вирушати!") +
    "&dates=20261016T110000Z/20261016T180000Z&details=" +
    encodeURIComponent("Збираємося на рибалку. Час вирушати — 14:00.");

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="На початок сторінки">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32">
              <path d="M4 16c5-7 13-8 20-3l4-3v12l-4-3c-7 5-15 4-20-3Zm8 0h.01" />
              <path d="m27 13 3-3m-3 12 3 3" />
            </svg>
          </span>
          <span>
            Тихе полювання<span className="brand-period">.</span>
          </span>
        </a>
        <span className="topbar-note">
          <span className="live-dot" /> ПЛАНУЄМО ВТЕЧУ З МІСТА
        </span>
        <a className="topbar-date" href="#details">
          ЖОВТЕНЬ ’26 <span>↘</span>
        </a>
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-grain" />
        <div className="hero-content">
          <p className="eyebrow">
            <span className="eyebrow-line" /> ВЕЛИКА ВОДА. СВОЇ ЛЮДИ.
          </p>
          <h1 id="hero-title">
            Там, де
            <br />
            <em>клює</em> тиша.
          </h1>
          <p className="hero-description">
            Ранок без будильника, знайомий берег
            <br className="desktop-break" /> і жодних планів повертатися швидко.
          </p>
          <div className="hero-bottom">
            <div className="countdown-wrap" aria-live="polite">
              <p className="countdown-caption">
                {tripStarted ? "ЧАС ВИРУШАТИ" : "ДО НАШОЇ РИБАЛКИ"}
              </p>
              <div
                className="countdown"
                aria-label="Зворотний відлік до рибалки"
              >
                {(["days", "hours", "minutes", "seconds"] as const).map(
                  (unit, index) => (
                    <div className="time-unit" key={unit}>
                      <span className="time-value">
                        {countdown
                          ? unit === "days"
                            ? String(values[unit])
                            : String(values[unit]).padStart(2, "0")
                          : "—"}
                      </span>
                      <span className="time-label">
                        {index === 0
                          ? getDayLabel(values.days)
                          : ["", "ГОД", "ХВ", "СЕК"][index]}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
            <a
              className="round-link"
              href="#details"
              aria-label="Деталі поїздки"
            >
              <ArrowIcon />
            </a>
          </div>
        </div>
        <div className="hero-index">
          <span>01</span>
          <i /> 03
        </div>
        <div className="image-credit">
          42° 18′ N &nbsp;·&nbsp; ДЕСЬ БІЛЯ ВОДИ
        </div>
      </section>

      <section
        className="trip-details"
        id="details"
        aria-label="Деталі поїздки"
      >
        <div className="trip-heading">
          <p className="eyebrow eyebrow-dark">
            <span className="eyebrow-line" /> ЗБЕРЕЖИ ЦЮ ДАТУ
          </p>
          <h2>
            У календарі
            <br />
            вже видніються <em>вудки.</em>
          </h2>
        </div>
        <div className="trip-info">
          <div className="detail-row">
            <span className="detail-icon calendar-icon" aria-hidden="true">
              <span>16</span>
            </span>
            <div>
              <span className="detail-label">ДАТА Й ЧАС</span>
              <strong>П’ятниця, 16 жовтня</strong>
              <span className="detail-sub">Зустрічаємось о 14:00</span>
            </div>
          </div>
          <div className="detail-row">
            <span className="detail-icon pin-icon">
              <PinIcon />
            </span>
            <div>
              <span className="detail-label">НАПРЯМОК</span>
              <strong>с. Сінгури</strong>
              <a
                className="detail-sub location-link"
                href="https://maps.google.com/?q=село+Сінгури+Житомирська+область"
                target="_blank"
                rel="noreferrer"
              >
                Житомирська область · відкрити мапу ↗
              </a>
            </div>
          </div>
          <a
            className="calendar-button"
            href={calendarUrl}
            target="_blank"
            rel="noreferrer"
          >
            Додати в календар <ArrowIcon />
          </a>
        </div>
      </section>

      <section className="memory-section" aria-labelledby="memory-title">
        <div className="memory-heading">
          <p className="eyebrow eyebrow-dark">
            <span className="eyebrow-line" /> КАДРИ З ПОПЕРЕДНІХ РИБАЛОК
          </p>
          <h2 id="memory-title">
            Наші спогади
            <br /> з попередніх <em>рибалок.</em>
          </h2>
        </div>
        <div className="memory-grid">
          {fishingMemories.map((memory, index) => (
            <button
              className={`memory-card${index === 0 ? " memory-card-large" : ""}`}
              key={memory.src}
              type="button"
              onClick={() => setSelectedPhoto(index)}
              aria-label={`Відкрити фото на весь екран: ${memory.alt}`}
            >
              <div
                className="memory-photo"
                aria-hidden="true"
                style={{ backgroundImage: `url("${memory.src}")` }}
              >
                <span className="memory-expand">
                  <ExpandIcon />
                </span>
              </div>
              <span className="memory-caption">
                <span>{memory.label}</span>
                <b>{memory.caption}</b>
              </span>
            </button>
          ))}
        </div>
        {selectedPhoto !== null && selectedMemory && (
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Перегляд фото з рибалки"
            onClick={() => setSelectedPhoto(null)}
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              const startX = touchStartX.current;
              const endX = event.changedTouches[0]?.clientX;
              touchStartX.current = null;
              if (startX === null || endX === undefined) return;
              const distance = endX - startX;
              if (Math.abs(distance) < 48) return;
              if (distance < 0) showNextPhoto();
              else showPreviousPhoto();
            }}
          >
            <div
              className="lightbox-panel"
              style={{
                width: `min(100%, calc(72dvh * ${lightboxImageRatio} + 48px))`,
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="lightbox-toolbar">
                <span className="lightbox-count">
                  {String(selectedPhoto + 1).padStart(2, "0")} <i />{" "}
                  {String(fishingMemories.length).padStart(2, "0")}
                </span>
                <button
                  className="lightbox-close"
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  aria-label="Закрити фото"
                >
                  <CloseIcon />
                </button>
              </div>
              <div
                className="lightbox-stage"
                style={{
                  width: `min(calc(100% - 24px), calc(72dvh * ${lightboxImageRatio}))`,
                  aspectRatio: String(lightboxImageRatio),
                }}
              >
                <button
                  className="lightbox-nav lightbox-previous"
                  type="button"
                  onClick={showPreviousPhoto}
                  aria-label="Попереднє фото"
                >
                  <ChevronIcon direction="previous" />
                </button>
                <Image
                  className="lightbox-image"
                  src={selectedMemory.src}
                  alt={selectedMemory.alt}
                  fill
                  sizes="100vw"
                  unoptimized
                  priority
                  onLoad={(event) => {
                    const { naturalWidth, naturalHeight } = event.currentTarget;
                    if (naturalHeight > 0) {
                      setLightboxImageRatio(naturalWidth / naturalHeight);
                    }
                  }}
                />
                <button
                  className="lightbox-nav lightbox-next"
                  type="button"
                  onClick={showNextPhoto}
                  aria-label="Наступне фото"
                >
                  <ChevronIcon direction="next" />
                </button>
              </div>
              <div className="lightbox-caption">
                <span>{selectedMemory.label}</span>
                <b>{selectedMemory.caption}</b>
                <span className="lightbox-swipe-hint">ГОРТАЙТЕ ФОТО</span>
              </div>
            </div>
          </div>
        )}
        <p className="memory-note">Історії, які хочеться повторити.</p>
      </section>

      <footer className="footer">
        <span>БІЛЬШЕ НЕБА. МЕНШЕ СПОВІЩЕНЬ.</span>
        <span>
          ЗРОБЛЕНО З ЛЮБОВ’Ю ДО ВОДИ <b>✳</b>
        </span>
      </footer>
    </main>
  );
}
