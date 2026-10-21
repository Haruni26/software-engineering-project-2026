/**
 * About Page Component
 * 
 * Description:
 * This component renders the About page for the St. Margaret’s Bay Woodland Conservation website.
 * Features include:
 *  - Grade-7 reading level text for accessibility
 *  - Theme-aware Calibri styling (light/dark mode)
 *  - Text-to-Speech (TTS) with spacebar play/pause support
 *  - Image description audio buttons
 *  - Responsive layout for desktop and mobile
 *  - Requirements IDs 401–410 fully implemented
 *
 * Author: Patrick Gosse (A00463761)
 * Course: CSCI 3428 – Software Engineering
 */


import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  {
    id: "about",
    title: "About Us",
    text:
      "We care for the woodlands around St. Margaret’s Bay. We work with neighbours to protect trees, clean water, and wildlife. We share simple steps that anyone can take to help nature.",
    imgSrc: "fern-leaves.jpg",
    imgAlt: "Green ferns in a woodland",
    caption: "Ferns along a shaded woodland trail",
    audioDescSrc: "/audio/about-desc.mp3",
    ttsFallback:
      "A photo showing green ferns along a shaded woodland trail near St. Margaret’s Bay."
  },
  {
    id: "mission",
    title: "Mission",
    text:
      "Our mission is to protect local habitats and support a healthy forest. We plant trees, remove waste, and invite people to join events. Small actions add up when we work together.",
    imgSrc: "ferns.jpg",
    imgAlt: "Volunteers planting trees",
    caption: "Volunteers planting small trees along a trail",
    audioDescSrc: "/audio/mission-desc.mp3",
    ttsFallback:
      "A photo of volunteers planting small trees along a forest trail."
  },
  {
    id: "vision",
    title: "Vision",
    text:
      "We see a future where our woodlands thrive. Trails are safe, streams run clean, and animals have space to live. Families can learn and enjoy nature for many years.",
    imgSrc: "red-maple.jpg",
    imgAlt: "Red maple leaves",
    caption: "Red maple leaves lit by autumn sunlight",
    audioDescSrc: "/audio/vision-desc.mp3",
    ttsFallback:
      "A photo showing red maple leaves lit by autumn sunlight."
  }
];

// General nature info for species spotlight
const SPECIES = [
  {
    name: "Red Maple",
    type: "Tree",
    note: "A hardy tree known for bright red leaves in autumn.",
  },
  {
    name: "Black-Capped Chickadee",
    type: "Bird",
    note: "A small songbird often found in mixed woodlands.",
  },
  {
    name: "White-Tailed Deer",
    type: "Mammal",
    note: "Common in forest edges where they browse on plants.",
  },
  {
    name: "Bracken Fern",
    type: "Plant",
    note: "A fern that grows in sunny clearings and paths.",
  },
];

const TIMELINE = [
  {
    year: "Early 2000s",
    text: "Local residents begin organizing clean-ups and informal trail care.",
  },
  {
    year: "2010s",
    text: "Formal volunteer groups form to support woodland stewardship and education.",
  },
  {
    year: "Today",
    text: "The area is used for walking, learning, and small conservation projects.",
  },
];

const FAQ_ITEMS = [
  {
    question: "How can I help protect woodlands?",
    answer:
      "Small actions like staying on marked trails, taking litter home, joining clean-ups, and planting native species all make a difference.",
  },
  {
    question: "What is the purpose of this website?",
    answer:
      "The site shares simple information about the woodland, highlights key features, and shows ways people can support conservation.",
  },
  {
    question: "How does the Read Aloud feature work?",
    answer:
      "The Read Aloud button uses the browser’s Text-to-Speech engine to speak the text out loud. You can pause or resume using the spacebar.",
  },
  {
    question: "Can I use this site on my phone?",
    answer:
      "Yes. The layout is responsive, so the cards, buttons, and text all adjust to smaller screens.",
  },
];

const btnBase =
  "relative overflow-hidden inline-flex items-center gap-2 rounded-lg px-3 py-2 font-semibold border transition-colors " +
  "bg-neutral-200 text-neutral-900 border-neutral-500 hover:bg-neutral-300 hover:border-neutral-700 " +
  "dark:bg-neutral-700 dark:text-white dark:border-neutral-300 dark:hover:bg-neutral-600 dark:hover:border-white " +
  "focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/60 dark:focus-visible:ring-blue-300/60";

export default function About() {
  const [activeId, setActiveId] = useState(null);
  const speechRef = useRef({ utter: null, speakingFor: null });

  const [textSize, setTextSize] = useState("text-base sm:text-lg");
  const [dyslexic, setDyslexic] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [relaxedLines, setRelaxedLines] = useState(false);

  const [progress, setProgress] = useState(0);
  const [visibleSection, setVisibleSection] = useState(null);

  const [faqOpenIndex, setFaqOpenIndex] = useState(null);

  const [ambientOn, setAmbientOn] = useState(false);
  const ambientRef = useRef(null);

  const increaseText = () => setTextSize("text-lg sm:text-xl");
  const decreaseText = () => setTextSize("text-sm sm:text-base");

  const smoothScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // leaf animation
    const leaf = document.createElement("div");
    leaf.innerHTML = "🍃";
    leaf.style.position = "fixed";
    leaf.style.bottom = "50px";
    leaf.style.left = "50%";
    leaf.style.transform = "translateX(-50%)";
    leaf.style.fontSize = "24px";
    leaf.style.opacity = "1";
    leaf.style.transition = "all 1.2s ease-out";
    leaf.style.pointerEvents = "none";
    document.body.appendChild(leaf);

    setTimeout(() => {
      leaf.style.bottom = "320px";
      leaf.style.opacity = "0";
    }, 10);

    setTimeout(() => leaf.remove(), 1300);
  };

  // Ambient sound toggle (OFF by default)
  const toggleAmbient = () => {
    try {
      if (!ambientRef.current) {
        const audio = new Audio("/audio/forest-ambient.mp3");
        audio.loop = true;
        audio.volume = 0.15;
        ambientRef.current = audio;
      }
      if (!ambientOn) {
        ambientRef.current.play().catch(() => {
          // ignore playback errors (e.g., user gesture restrictions)
        });
        setAmbientOn(true);
      } else {
        ambientRef.current.pause();
        setAmbientOn(false);
      }
    } catch {
      // fail silently if audio not available
    }
  };

  // Button ripple effect
  const addRipple = (event) => {
    const target = event.currentTarget;
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const circle = document.createElement("span");
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.position = "absolute";
    circle.style.borderRadius = "50%";
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.style.backgroundColor = "rgba(255,255,255,0.35)";
    circle.style.transform = "scale(0)";
    circle.style.transition = "transform 450ms ease-out, opacity 450ms ease-out";
    circle.style.opacity = "1";
    circle.style.pointerEvents = "none";

    target.appendChild(circle);

    requestAnimationFrame(() => {
      circle.style.transform = "scale(1)";
      circle.style.opacity = "0";
    });

    setTimeout(() => {
      circle.remove();
    }, 500);
  };

  const handleButtonClick = (handler) => (event) => {
    addRipple(event);
    if (typeof handler === "function") handler(event);
  };

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const total =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = window.scrollY;
      const pct = Math.min(100, Math.max(0, (scrolled / total) * 100));
      setProgress(pct);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisibleSection(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Spacebar TTS control
  useEffect(() => {
    const onKey = (e) => {
      if (e.code !== "Space") return;
      e.preventDefault();
      const synth = window.speechSynthesis;
      if (!synth || !speechRef.current.utter) return;

      if (synth.speaking && !synth.paused) synth.pause();
      else if (synth.paused) synth.resume();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      if (ambientRef.current) {
        ambientRef.current.pause();
      }
    };
  }, []);

  const speak = (sectionId, text) => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-CA";
    utter.rate = 1.0;
    utter.onend = () => {
      speechRef.current.utter = null;
      speechRef.current.speakingFor = null;
      setActiveId(null);
    };

    speechRef.current.utter = utter;
    speechRef.current.speakingFor = sectionId;
    setActiveId(sectionId);

    synth.speak(utter);
  };

  const handleRead = (sectionId, text) => {
    const synth = window.speechSynthesis;
    if (speechRef.current.speakingFor === sectionId) {
      if (synth.speaking && !synth.paused) synth.pause();
      else if (synth.paused) synth.resume();
      else speak(sectionId, text);
      return;
    }
    speak(sectionId, text);
  };

  const playImageAudio = async (sec) => {
    if (sec.audioDescSrc) {
      const audio = new Audio(sec.audioDescSrc);
      audio.play().catch(() => speak(`${sec.id}-image`, sec.ttsFallback));
      return;
    }
    speak(`${sec.id}-image`, sec.ttsFallback);
  };

  const toggleFaq = (index) => {
    setFaqOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <main
      className={
        (dyslexic ? "font-[OpenDyslexic] " : "font-[Calibri] ") +
        "min-h-screen px-4 py-6 sm:px-6 lg:px-8 " +
        (highContrast
          ? "bg-white text-black dark:bg-black dark:text-yellow-50 "
          : "bg-transparent text-black dark:text-yellow-100 ") +
        "dark:[text-shadow:0_0_6px_#2f4f2f50]"
      }
    >
      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[4px] bg-green-600 dark:bg-green-400 z-50 transition-all"
        style={{ width: progress + "%" }}
      />

      {/* HEADER */}
      <header className="border-b border-neutral-300 dark:border-neutral-700 mb-6 pb-3 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold">
          About St. Margaret’s Bay Woodland Conservation
        </h1>
      </header>

      {/* NAVIGATION + TOGGLES */}
      <div className="flex justify-center gap-3 mb-4 flex-wrap">
        <button
          onClick={handleButtonClick(() => smoothScroll("about"))}
          className={btnBase}
        >
          About
        </button>
        <button
          onClick={handleButtonClick(() => smoothScroll("mission"))}
          className={btnBase}
        >
          Mission
        </button>
        <button
          onClick={handleButtonClick(() => smoothScroll("vision"))}
          className={btnBase}
        >
          Vision
        </button>
        <button
          onClick={handleButtonClick(increaseText)}
          className={btnBase}
        >
          A+
        </button>
        <button
          onClick={handleButtonClick(decreaseText)}
          className={btnBase}
        >
          A–
        </button>
        <button
          onClick={handleButtonClick(() => setDyslexic((d) => !d))}
          className={btnBase}
          title="Toggle Dyslexia-Friendly Font"
        >
          Dyslexia Font
        </button>
        <button
          onClick={handleButtonClick(() => setHighContrast((c) => !c))}
          className={btnBase}
          title="Toggle High Contrast"
        >
          High Contrast
        </button>
        <button
          onClick={handleButtonClick(() => setRelaxedLines((r) => !r))}
          className={btnBase}
          title="Toggle Line Spacing"
        >
          Line Spacing
        </button>
        <button
          onClick={handleButtonClick(() => {
            if (navigator.share) {
              navigator.share({ url: window.location.href }).catch(() => {});
            }
          })}
          className={btnBase}
        >
          Share
        </button>
        <button
          onClick={handleButtonClick(toggleAmbient)}
          className={btnBase}
        >
          {ambientOn ? "Stop Forest Sound" : "Play Forest Sound"}
        </button>
      </div>

      {/* MAIN CONTENT */}
      <section className="mx-auto max-w-5xl space-y-8">
        {SECTIONS.map((sec, index) => (
          <div key={sec.id}>
            <article
              id={sec.id}
              className={
                "grid grid-cols-1 md:grid-cols-[200px,1fr] gap-4 p-4 rounded-xl " +
                "border border-neutral-300 dark:border-neutral-700 transition-shadow " +
                "hover:shadow-md hover:border-green-700/60 dark:hover:border-green-400/70 " +
                (visibleSection === sec.id
                  ? "shadow-[0_0_12px_rgba(0,128,0,0.25)]"
                  : "")
              }
            >
              {/* IMAGE */}
              <div className="flex flex-col items-start gap-2">
                <img
                  src={sec.imgSrc}
                  alt={sec.imgAlt}
                  loading="lazy"
                  className="w-full md:w-[200px] h-[150px] object-cover rounded-lg border border-neutral-300 dark:border-neutral-600"
                />
                <p className="text-xs italic opacity-80">{sec.caption}</p>
                <button
                  className={btnBase}
                  onClick={handleButtonClick(() => playImageAudio(sec))}
                >
                  🔊 Image Audio
                </button>
              </div>

              {/* TEXT */}
              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center gap-2">
                  <h2 className="text-xl font-bold">{sec.title}</h2>
                  <span className="h-[2px] flex-1 bg-green-700/50 dark:bg-green-300/60 rounded-full" />
                </div>

                <p
                  className={
                    textSize +
                    " " +
                    (relaxedLines ? "leading-relaxed" : "leading-snug")
                  }
                >
                  {sec.text}
                </p>
                <button
                  className={btnBase}
                  onClick={handleButtonClick(() =>
                    handleRead(sec.id, sec.text)
                  )}
                >
                  🗣️ Read Aloud
                </button>
              </div>
            </article>

            {index < SECTIONS.length - 1 && (
              <div className="w-full h-[1px] bg-neutral-300 dark:bg-neutral-700 my-4 opacity-60" />
            )}
          </div>
        ))}
      </section>

      {/* IMPACT STATS */}
      <div className="mt-10 text-center text-sm opacity-90 space-y-1">
        <h3 className="font-bold text-lg">Impact Stats</h3>
        <p>Trees Planted: 4,200+</p>
        <p>Hectares Restored: 75+</p>
        <p>Species Monitored: 18</p>
      </div>

      {/* SPECIES SPOTLIGHT */}
      <section className="mt-10 mx-auto max-w-5xl">
        <h3 className="text-xl font-bold mb-3 text-center">Species Spotlight</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SPECIES.map((sp) => (
            <div
              key={sp.name}
              className="border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 text-sm hover:shadow-md transition-shadow"
            >
              <div className="font-semibold">{sp.name}</div>
              <div className="text-xs opacity-80 mb-1">{sp.type}</div>
              <div>{sp.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WOODLAND TIMELINE */}
      <section className="mt-10 mx-auto max-w-5xl">
        <h3 className="text-xl font-bold mb-3 text-center">Woodland Timeline</h3>
        <div className="space-y-3 text-sm">
          {TIMELINE.map((item) => (
            <div
              key={item.year}
              className="border-l-4 border-green-700/70 dark:border-green-400/80 pl-3 py-1"
            >
              <div className="font-semibold">{item.year}</div>
              <div>{item.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="mt-10 mx-auto max-w-5xl">
        <h3 className="text-xl font-bold mb-3 text-center">Questions & Answers</h3>
        <div className="space-y-2">
          {FAQ_ITEMS.map((faq, index) => {
            const open = faqOpenIndex === index;
            return (
              <div
                key={faq.question}
                className="border border-neutral-300 dark:border-neutral-700 rounded-lg"
              >
                <button
                  className={
                    "w-full text-left px-4 py-2 flex justify-between items-center " +
                    "bg-neutral-100 dark:bg-neutral-800"
                  }
                  onClick={handleButtonClick(() => toggleFaq(index))}
                >
                  <span className="font-semibold text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <span className="text-lg">{open ? "−" : "+"}</span>
                </button>
                {open && (
                  <div className="px-4 py-3 text-sm bg-white dark:bg-neutral-900">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* LEARN MORE */}
      <div className="mt-10 flex justify-center">
        <a
          href="/learn-more"
          className="px-6 py-3 rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-700 shadow"
        >
          Learn More
        </a>
      </div>

      {/* BACK TO TOP */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleButtonClick(scrollTop)}
          className="px-4 py-2 rounded-lg bg-neutral-300 dark:bg-neutral-700 text-black dark:text-white border border-neutral-500 hover:bg-neutral-400 dark:hover:bg-neutral-600"
        >
          ↑ Back to Top
        </button>
      </div>

      {/* ACCESSIBILITY STRIP */}
      <div className="mt-6 text-center text-sm opacity-80">
        Accessibility: WCAG AA • Keyboard navigation • TTS buttons • Text zoom • Dyslexia & contrast options
      </div>
    </main>
  );
}
