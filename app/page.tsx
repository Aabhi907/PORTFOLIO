"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const navItems = ["home", "about", "journey", "work", "services", "contact"];

const journey = [
  {
    stage: "01 / First frame",
    title: "Starting independently",
    body: "I began as a freelancer, learning how to translate a client’s idea into a visual people could feel.",
  },
  {
    stage: "02 / Building trust",
    title: "Consultancies, schools & colleges",
    body: "Working across education and local brands taught me to balance clear communication with memorable creative execution.",
  },
  {
    stage: "03 / Taking the lead",
    title: "KMC Balkumari campaign",
    body: "As Marketing Head for the admission campaign, I helped shape its digital strategy, content and rollout.",
  },
  {
    stage: "04 / Expanding the lens",
    title: "Direction, editing & strategy",
    body: "My role grew beyond production into creative direction, video editing, campaign thinking and audience analysis.",
  },
  {
    stage: "05 / Public communication",
    title: "Social media for an MP",
    body: "I now support a Rastriya Swatantra Party Member of Parliament through content analysis, communication and poster design.",
  },
];

const projects = [
  {
    number: "01",
    title: "The Next Step",
    category: "KMC / Admission Campaign",
    image: "/images/project-01.jpg",
    href: "https://www.instagram.com/reel/DYma01JOIg8/",
    alt: "KMC Balkumari science entrance campaign reel cover",
  },
  {
    number: "02",
    title: "Dreams Shouldn’t Wait",
    category: "KMC / Brand Content",
    image: "/images/project-02.jpg",
    href: "https://www.instagram.com/reel/DYy35kCuRYw/",
    alt: "KMC Balkumari admissions campaign reel cover",
  },
  {
    number: "03",
    title: "An Ordinary Day",
    category: "Cinematic / Visual Storytelling",
    image: "/images/project-03.jpg",
    href: "https://www.instagram.com/reel/Da1osUlBBiV/",
    alt: "Cinematic memory reel cover",
    rotated: true,
  },
  {
    number: "04",
    title: "Roots of the Season",
    category: "Asar 15 / Cultural Documentary",
    image: "/images/project-04.jpg",
    href: "https://www.instagram.com/reel/DasUnMxh84c/",
    alt: "Asar 15 Nepali farmer documentary reel cover",
  },
];

const services = [
  ["Videography", "Films with a pulse, from first frame to final cut."],
  ["Video Editing", "Rhythm, emotion and detail shaped into one clear story."],
  ["Creative Direction", "A cohesive visual idea that guides the entire campaign."],
  ["Social Media Analysis", "Audience signals translated into smarter content decisions."],
  ["Poster Design", "Bold, useful communication made for attention and recall."],
  ["Content Planning", "Structured concepts built around your brand and its goals."],
];

const tools = [
  ["Sony A7 IV", "Capture"],
  ["DaVinci Resolve", "Edit + Grade"],
  ["Canva", "Design"],
  ["Claude AI", "Ideation"],
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [selectedService, setSelectedService] = useState("Creative project");
  const [loaderVisible, setLoaderVisible] = useState(true);

  const mailHref = useMemo(
    () =>
      `mailto:aabishkarshrestha.np@gmail.com?subject=${encodeURIComponent(
        `Project enquiry — ${selectedService}`,
      )}`,
    [selectedService],
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const updateLenis = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const timer = window.setTimeout(() => setLoaderVisible(false), 1750);
    const sections = navItems
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55%", threshold: [0.05, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let context: gsap.Context | undefined;
    if (!reduceMotion && root.current) {
      context = gsap.context(() => {
        gsap.from(".hero-word span", {
          yPercent: 115,
          duration: 1.15,
          stagger: 0.08,
          ease: "power4.out",
          delay: 1.3,
        });
        gsap.from(".hero-detail", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 1.5,
        });
        gsap.to(".hero-portrait", {
          yPercent: 8,
          scale: 1.035,
          ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
        });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 55,
            opacity: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
          gsap.from(card, {
            clipPath: "inset(12% 0 0 0)",
            y: 70,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          });
        });
        gsap.to(".journey-progress", {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: { trigger: ".journey-list", start: "top 70%", end: "bottom 68%", scrub: true },
        });
      }, root);
    }

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      context?.revert();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const chooseService = (service: string) => {
    setSelectedService(service);
    window.setTimeout(() => goTo("contact"), 0);
  };

  return (
    <div ref={root} className="site-shell">
      <AnimatePresence>
        {loaderVisible && (
          <motion.div
            className="loader"
            initial={{ opacity: 1 }}
            exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
            role="status"
            aria-label="Loading Aabishkar Shrestha portfolio"
          >
            <div className="loader-mark">AS</div>
            <div className="loader-line"><span /></div>
            <p>Kathmandu · Nepal</p>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="nav-wrap">
        <button className="brand" onClick={() => goTo("home")} aria-label="Go to home">
          AS<span>®</span>
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button key={item} className={active === item ? "active" : ""} onClick={() => goTo(item)}>
              {item}
            </button>
          ))}
        </nav>
        <a className="nav-cta" href="#contact" onClick={(event) => { event.preventDefault(); goTo("contact"); }}>
          Let&apos;s talk <Arrow />
        </a>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span /><span />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            aria-label="Mobile navigation"
          >
            {navItems.map((item, index) => (
              <button key={item} onClick={() => goTo(item)}>
                <span>0{index + 1}</span>{item}
              </button>
            ))}
            <a href="https://www.instagram.com/notaabhi/" target="_blank" rel="noreferrer">
              Instagram <Arrow diagonal />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>

      <main>
        <section id="home" className="hero">
          <div className="hero-kicker hero-detail">Creative Professional · Kathmandu</div>
          <h1 className="hero-name" aria-label="Aabishkar Shrestha">
            <span className="hero-word"><span>AABISHKAR</span></span>
            <span className="hero-word hero-word-bottom"><span>SHRESTHA</span></span>
          </h1>
          <div className="portrait-wrap">
            <Image
              className="hero-portrait"
              src="/images/hero-cutout-cropped.png"
              alt="Aabishkar Shrestha, creative professional from Kathmandu"
              fill
              priority
              unoptimized
              style={{ objectFit: "cover", objectPosition: "center top" }}
              sizes="(max-width: 768px) 92vw, 58vw"
            />
          </div>
          <div className="hero-copy hero-detail">
            <p>Making brands shine through visuals that connect.</p>
            <a href="#work" onClick={(event) => { event.preventDefault(); goTo("work"); }}>
              Explore selected work <Arrow />
            </a>
          </div>
          <div className="hero-stat hero-stat-one hero-detail">
            <strong>2+</strong><span>years crafting<br />visual stories</span>
          </div>
          <div className="hero-stat hero-stat-two hero-detail">
            <span>Videography</span><span>Direction</span><span>Strategy</span>
          </div>
          <div className="scroll-cue hero-detail"><span>Scroll to discover</span><i /></div>
        </section>

        <section id="about" className="about section-pad">
          <div className="section-label" data-reveal><span>01</span> The first frame</div>
          <div className="about-grid">
            <div className="about-image" data-reveal>
              <Image src="/images/about-portrait.png" alt="Black-and-white portrait of Aabishkar Shrestha" fill unoptimized sizes="(max-width: 768px) 92vw, 42vw" />
              <div className="image-caption"><span>Kathmandu, Nepal</span><span>Creative professional</span></div>
            </div>
            <div className="about-copy">
              <h2 data-reveal>Ideas become<br /><em>visible.</em></h2>
              <p className="about-lead" data-reveal>I&apos;m Aabishkar Shrestha—an emerging videographer and creative professional helping brands stand out through engaging visuals, meaningful content and smart social strategy.</p>
              <div className="about-columns" data-reveal>
                <p>My journey began independently with consultancies, schools, colleges and local brands. It grew into leading KMC Balkumari&apos;s admission marketing campaign across strategy, content and execution.</p>
                <p>Today I also support a Rastriya Swatantra Party Member of Parliament through social communication, content analysis and poster design. Good content should connect clearly—and help a brand grow.</p>
              </div>
              <div className="about-signoff" data-reveal><strong>02+</strong><span>Years of<br />experience</span></div>
            </div>
          </div>
        </section>

        <section id="journey" className="journey section-pad">
          <div className="section-label light" data-reveal><span>02</span> The journey</div>
          <div className="journey-heading">
            <h2 data-reveal>Every stage<br />shaped the <em>next.</em></h2>
            <p data-reveal>Not a timeline of dates—a progression of trust, responsibility and creative range.</p>
          </div>
          <div className="journey-list">
            <div className="journey-track"><div className="journey-progress" /></div>
            {journey.map((item) => (
              <article className="journey-item" key={item.stage} data-reveal>
                <span className="journey-dot" />
                <p className="stage">{item.stage}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="work section-pad">
          <div className="section-label" data-reveal><span>03</span> Selected work</div>
          <div className="work-heading">
            <h2 data-reveal>Stories made<br />to be <em>felt.</em></h2>
            <p data-reveal>Campaigns, human moments and culture—framed with intention.</p>
          </div>
          <div className="projects-grid">
            {projects.map((project) => (
              <a className="project-card" href={project.href} target="_blank" rel="noopener noreferrer" key={project.number}>
                <div className="project-image">
                  <Image className={project.rotated ? "rotate-cover" : ""} src={project.image} alt={project.alt} fill unoptimized sizes="(max-width: 768px) 94vw, 46vw" />
                  <span className="play">Play <Arrow diagonal /></span>
                </div>
                <div className="project-meta">
                  <span>{project.number}</span>
                  <h3>{project.title}</h3>
                  <p>{project.category}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <div className="marquee" aria-label="Creative services">
          {[0, 1].map((track) => (
            <div className="marquee-track" aria-hidden={track === 1} key={track}>
              <span>Videography</span><i>✦</i><span>Creative Direction</span><i>✦</i><span>Video Editing</span><i>✦</i><span>Social Strategy</span><i>✦</i><span>Visual Storytelling</span><i>✦</i>
            </div>
          ))}
        </div>

        <section id="services" className="services section-pad">
          <div className="section-label" data-reveal><span>04</span> Capabilities</div>
          <div className="services-heading">
            <h2 data-reveal>What I bring<br />to the <em>frame.</em></h2>
            <p data-reveal>One creative partner from concept and capture to analysis and rollout.</p>
          </div>
          <div className="service-list">
            {services.map(([name, description], index) => (
              <button className="service-row" key={name} onClick={() => chooseService(name)}>
                <span className="service-number">0{index + 1}</span>
                <strong>{name}</strong>
                <span className="service-description">{description}</span>
                <span className="service-arrow"><Arrow diagonal /></span>
              </button>
            ))}
          </div>
        </section>

        <section className="tools section-pad" aria-labelledby="tools-title">
          <div className="section-label light" data-reveal><span>05</span> The toolkit</div>
          <h2 id="tools-title" data-reveal>Tools serve<br />the <em>idea.</em></h2>
          <div className="tools-list">
            {tools.map(([tool, use], index) => (
              <div className="tool-row" key={tool} data-reveal>
                <span>0{index + 1}</span><strong>{tool}</strong><p>{use}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="contact-top">
            <div className="section-label light"><span>06</span> Contact</div>
            <p>Available for select creative collaborations.</p>
          </div>
          <div className="contact-title">
            <span>LET&apos;S</span>
            <span><em>WORK</em> TOGETHER</span>
          </div>
          <p className="contact-context">Current enquiry: <strong>{selectedService}</strong></p>
          <div className="contact-actions">
            <motion.a whileHover={{ x: 6 }} href={mailHref}>Email me <Arrow diagonal /></motion.a>
            <motion.a whileHover={{ x: 6 }} href="https://wa.me/9779860607001" target="_blank" rel="noreferrer">WhatsApp <Arrow diagonal /></motion.a>
            <motion.a whileHover={{ x: 6 }} href="tel:+9779860607001">Call <Arrow diagonal /></motion.a>
            <motion.a whileHover={{ x: 6 }} href="https://www.instagram.com/notaabhi/" target="_blank" rel="noreferrer">Instagram <Arrow diagonal /></motion.a>
          </div>
          <footer>
            <span>© {new Date().getFullYear()} Aabishkar Shrestha</span>
            <span>Kathmandu, Nepal · 27.7172° N</span>
            <button onClick={() => goTo("home")}>Back to top ↑</button>
          </footer>
        </section>
      </main>
    </div>
  );
}
