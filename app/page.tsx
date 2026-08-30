"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { detectLanguage, siteContent, type Language } from "./site-content";

const languageOptions: Array<{ value: Language; label: string; name: string; flagSrc: string }> = [
  { value: "pt-BR", label: "PT", name: "Português", flagSrc: "/images/flags/br.svg" },
  { value: "en-US", label: "EN", name: "English", flagSrc: "/images/flags/us.svg" },
  { value: "es-ES", label: "ES", name: "Español", flagSrc: "/images/flags/es.svg" },
];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  driftVx: number;
  driftVy: number;
  radius: number;
  accent: boolean;
};

function HeroParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.closest<HTMLElement>(".hero");
    if (!canvas || !hero) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0, active: false, type: "mouse" };
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let touchReleaseTimer = 0;

    const buildParticles = () => {
      const compact = width < 720;
      const count = compact
        ? Math.min(34, Math.max(22, Math.round((width * height) / 19000)))
        : Math.min(86, Math.max(50, Math.round((width * height) / 15000)));

      particles = Array.from({ length: count }, () => {
        const direction = Math.random() * Math.PI * 2;
        const speed = compact
          ? 0.11 + Math.random() * 0.07
          : 0.17 + Math.random() * 0.12;
        const driftVx = Math.cos(direction) * speed;
        const driftVy = Math.sin(direction) * speed;

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: driftVx,
          vy: driftVy,
          driftVx,
          driftVy,
          radius: Math.random() * 1.5 + 0.9,
          accent: Math.random() < 0.18,
        };
      });
    };

    const resize = () => {
      const rect = hero.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      buildParticles();
      if (reducedMotion) draw();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const compact = width < 720;
      const connectionDistance = compact ? 105 : 145;

      for (let first = 0; first < particles.length; first += 1) {
        const particle = particles[first];

        if (!reducedMotion) {
          if (pointer.active) {
            const dx = particle.x - pointer.x;
            const dy = particle.y - pointer.y;
            const distance = Math.hypot(dx, dy);
            const influence = compact ? 118 : 145;
            if (distance > 0 && distance < influence) {
              const force = (influence - distance) / influence;
              const forceStrength = compact && pointer.type === "touch" ? 0.026 : 0.018;
              particle.vx += (dx / distance) * force * forceStrength;
              particle.vy += (dy / distance) * force * forceStrength;
            }
          }

          // Return gently to a permanent base drift after pointer interaction.
          // This keeps the network alive instead of letting friction stop it.
          particle.vx += (particle.driftVx - particle.vx) * 0.018;
          particle.vy += (particle.driftVy - particle.vy) * 0.018;
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < -8) particle.x = width + 8;
          if (particle.x > width + 8) particle.x = -8;
          if (particle.y < -8) particle.y = height + 8;
          if (particle.y > height + 8) particle.y = -8;
        }

        for (let second = first + 1; second < particles.length; second += 1) {
          const neighbor = particles[second];
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y);
          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * (compact ? 0.22 : 0.29);
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(neighbor.x, neighbor.y);
            context.strokeStyle = `rgba(255, 242, 223, ${opacity})`;
            context.lineWidth = compact ? 0.8 : 0.9;
            context.stroke();
          }
        }

        if (pointer.active) {
          const pointerDistance = Math.hypot(particle.x - pointer.x, particle.y - pointer.y);
          const pointerConnectionDistance = compact ? 132 : 170;
          if (pointerDistance < pointerConnectionDistance) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(pointer.x, pointer.y);
            const pointerOpacity = pointer.type === "touch" ? 0.48 : 0.34;
            context.strokeStyle = `rgba(255, 91, 62, ${(1 - pointerDistance / pointerConnectionDistance) * pointerOpacity})`;
            context.lineWidth = compact ? 0.95 : 0.8;
            context.stroke();
          }
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = particle.accent
          ? "rgba(255, 91, 62, 0.82)"
          : "rgba(255, 242, 223, 0.66)";
        context.fill();
      }
    };

    const animate = () => {
      draw();
      animationFrame = window.requestAnimationFrame(animate);
    };

    const updatePointer = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.type = event.pointerType || "mouse";
      pointer.active = true;
    };

    const handlePointerDown = (event: PointerEvent) => {
      window.clearTimeout(touchReleaseTimer);
      updatePointer(event);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" && event.pressure === 0) return;
      updatePointer(event);
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      window.clearTimeout(touchReleaseTimer);
      touchReleaseTimer = window.setTimeout(() => {
        pointer.active = false;
      }, 280);
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(hero);
    hero.addEventListener("pointerdown", handlePointerDown);
    hero.addEventListener("pointermove", handlePointerMove);
    hero.addEventListener("pointerup", handlePointerUp);
    hero.addEventListener("pointercancel", handlePointerUp);
    hero.addEventListener("pointerleave", handlePointerLeave);
    resize();
    if (!reducedMotion) animate();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(touchReleaseTimer);
      observer.disconnect();
      hero.removeEventListener("pointerdown", handlePointerDown);
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerup", handlePointerUp);
      hero.removeEventListener("pointercancel", handlePointerUp);
      hero.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-particle-network" aria-hidden="true" />;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("pt-BR");
  const [languageReady, setLanguageReady] = useState(false);
  const languageMenuRef = useRef<HTMLDetailsElement>(null);
  const [activeAtom, setActiveAtom] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const content = siteContent[language];
  const activeLanguage = languageOptions.find((option) => option.value === language) ?? languageOptions[0];
  const activeAtomPoint = content.about.points[activeAtom];
  const activeServiceItem = content.services.items[activeService];
  const whatsappUrl = `https://wa.me/5586995550544?text=${encodeURIComponent(content.whatsappMessage)}`;
  const serviceWhatsappUrl = `https://wa.me/5586995550544?text=${encodeURIComponent(`${content.services.whatsappMessage} ${activeServiceItem.title}.`)}`;

  useEffect(() => {
    const detection = window.setTimeout(() => {
      setLanguage(detectLanguage());
      setLanguageReady(true);
    }, 0);
    return () => window.clearTimeout(detection);
  }, []);

  useEffect(() => {
    if (!languageReady) return;
    try {
      window.localStorage.setItem("joao-victor-web-language", language);
    } catch {
      // Keep the selected language in memory when browser storage is unavailable.
    }
    document.documentElement.lang = language;
    document.title = content.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", content.meta.description);
  }, [content.meta.description, content.meta.title, language, languageReady]);

  return (
    <main id="inicio">
      <a className="skip-link" href="#conteudo">
        {content.skip}
      </a>

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label={content.brandAria}>
          <span className="brand-signature" aria-hidden="true" />
        </a>

        <nav className="desktop-nav" aria-label={content.navAria}>
          <a href="#servicos">{content.nav.services}</a>
          <a href="#projetos">{content.nav.projects}</a>
          <a href="#produtos">{content.nav.products}</a>
          <a href="#processo">{content.nav.process}</a>
          <a href="#contato">{content.nav.contact}</a>
        </nav>

        <div className="header-actions">
          <details className="language-switcher" ref={languageMenuRef}>
            <summary aria-label={`${content.languageLabel}: ${activeLanguage.name}`} title={content.languageLabel}>
              <span className="language-flag" aria-hidden="true">
                <Image unoptimized src={activeLanguage.flagSrc} alt="" width={32} height={32} />
              </span>
              <span className="language-code">{activeLanguage.label}</span>
              <span className="language-chevron" aria-hidden="true">⌄</span>
            </summary>
            <div className="language-options" role="group" aria-label={content.languageLabel}>
              {languageOptions.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  className={option.value === language ? "is-active" : undefined}
                  aria-pressed={option.value === language}
                  onClick={() => {
                    setLanguage(option.value);
                    languageMenuRef.current?.removeAttribute("open");
                  }}
                >
                  <span className="language-flag" aria-hidden="true">
                    <Image unoptimized src={option.flagSrc} alt="" width={32} height={32} />
                  </span>
                  <span>{option.name}</span>
                  <small>{option.label}</small>
                </button>
              ))}
            </div>
          </details>
          <a
            className="header-cta"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={content.quoteAria}
          >
            <span>{content.quote}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <details className="mobile-menu">
          <summary aria-label={content.openMenu}>
            <span />
            <span />
          </summary>
          <nav aria-label={content.mobileNavAria}>
            <a href="#servicos">{content.nav.services}</a>
            <a href="#projetos">{content.nav.projects}</a>
            <a href="#produtos">{content.nav.products}</a>
            <a href="#processo">{content.nav.process}</a>
            <a href="#contato">{content.nav.contact}</a>
          </nav>
        </details>
      </header>

      <div id="conteudo">
        <section className="hero" aria-labelledby="hero-title">
          <HeroParticleNetwork />
          <div className="hero-copy">
            <p className="eyebrow">
              <span /> {content.hero.eyebrow}
            </p>
            <h1 id="hero-title">
              {content.hero.title} <em>{content.hero.emphasis}</em>
            </h1>
            <p className="hero-text">{content.hero.text}</p>

            <div className="hero-actions">
              <a
                className="button button-primary"
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                {content.hero.quote} <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-secondary" href="#projetos">
                {content.hero.projects} <span aria-hidden="true">↓</span>
              </a>
            </div>

            <ul className="proof-list" aria-label={content.hero.proofAria}>
              <li>
                <span className="proof-icon" aria-hidden="true">□</span>
                {content.hero.proofs[0]}
              </li>
              <li>
                <span className="proof-icon code-icon" aria-hidden="true">&lt;/&gt;</span>
                {content.hero.proofs[1]}
              </li>
              <li>
                <span className="proof-icon" aria-hidden="true">•••</span>
                {content.hero.proofs[2]}
              </li>
            </ul>
          </div>

          <div className="hero-art" aria-hidden="true">
            <span className="orbit orbit-one" />
            <span className="orbit orbit-two" />
            <span className="cream-shape shape-top" />
            <span className="cream-shape shape-bottom" />

            <div className="solution-card floating-card">
              <div className="mini-window-bar">
                <span />
                <span className="mini-menu" />
              </div>
              <div className="solution-grid">
                <div>
                  <p>{content.hero.solution}</p>
                  <strong>{content.hero.result}</strong>
                  <span className="text-line long" />
                  <span className="text-line" />
                  <span className="mini-action">→</span>
                </div>
                <div className="chart-panel">
                  <div className="bar-chart">
                    <i style={{ height: "29%" }} />
                    <i style={{ height: "45%" }} />
                    <i style={{ height: "62%" }} />
                    <i style={{ height: "82%" }} />
                  </div>
                  <div className="chart-icons">
                    <span>⌁</span><span>◔</span><span>↗</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-card floating-card">
              <aside className="dashboard-rail">
                <span className="rail-logo">J</span>
                <i /><i /><i /><i />
              </aside>
              <div className="dashboard-body">
                <div className="dashboard-head">
                  <div>
                    <small>{content.hero.projectPanel}</small>
                    <strong>{content.hero.overview}</strong>
                  </div>
                  <span className="growth">+32%</span>
                </div>
                <div className="line-chart">
                  <span className="chart-glow" />
                  <i className="point point-one" />
                  <i className="point point-two" />
                  <i className="point point-three" />
                  <i className="point point-four" />
                </div>
                <div className="stats-grid">
                  <span><small>{content.hero.clients}</small><strong>128</strong></span>
                  <span><small>{content.hero.projectsLabel}</small><strong>34</strong></span>
                  <span><small>{content.hero.outcome}</small><strong>+48%</strong></span>
                </div>
              </div>
            </div>

            <div className="mobile-card floating-card">
              <p>{content.hero.platform}</p>
              <span className="mobile-line" />
              <span className="mobile-line short" />
              <div className="mobile-screen">
                <i /><i /><i />
              </div>
              <div className="mobile-tabs"><i /><i /><i /></div>
            </div>
          </div>
        </section>

        <section className="services section-shell" id="servicos" aria-labelledby="services-title">
          <div className="section-heading">
            <p className="eyebrow"><span /> {content.services.eyebrow}</p>
            <h2 id="services-title">{content.services.title}</h2>
            <p>{content.services.intro}</p>
          </div>
          <div className="services-grid">
            {content.services.items.map((service, index) => (
              <a
                className={`service-card${activeService === index ? " is-active" : ""}`}
                href="#servico-detalhes"
                onClick={() => setActiveService(index)}
                aria-label={`${content.services.linkLabel}: ${service.title}`}
                aria-current={activeService === index ? "true" : undefined}
                key={service.title}
              >
                <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <span className="service-link-text">{content.services.linkLabel}</span>
                <span className="service-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>

          <article className="service-detail" id="servico-detalhes" aria-live="polite">
            <div className="service-detail-intro">
              <p className="service-detail-kicker">
                <span>{String(activeService + 1).padStart(2, "0")}</span>
                {content.services.detailEyebrow}
              </p>
              <h3>{activeServiceItem.title}</h3>
              <p>{activeServiceItem.text}</p>
              <a href={serviceWhatsappUrl} target="_blank" rel="noreferrer">
                {content.services.cta} <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="service-detail-content">
              <div className="service-detail-fact">
                <span>{content.services.audienceLabel}</span>
                <p>{activeServiceItem.audience}</p>
              </div>
              <div className="service-detail-fact service-detail-includes">
                <span>{content.services.includesLabel}</span>
                <ul>
                  {activeServiceItem.includes.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className="service-detail-fact">
                <span>{content.services.outcomeLabel}</span>
                <p>{activeServiceItem.outcome}</p>
              </div>
            </div>
          </article>
        </section>

        <section className="visual-showcase section-shell" aria-labelledby="visual-showcase-title">
          <div className="visual-showcase-copy">
            <p className="eyebrow"><span /> {content.visual.eyebrow}</p>
            <h2 id="visual-showcase-title">{content.visual.title}</h2>
            <p>{content.visual.text}</p>
            <div className="visual-tags">
              {content.visual.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <a className="visual-project-link" href="#projetos">
              {content.visual.cta} <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="visual-showcase-media">
            <figure className="visual-primary">
              <Image
                unoptimized
                src="/images/digital-studio-banner.webp"
                alt={content.visual.studioAlt}
                width={1672}
                height={941}
              />
              <figcaption className="visual-image-caption visual-primary-caption">
                <small>{content.visual.primaryLabel}</small>
                <strong>{content.visual.primaryTitle}</strong>
              </figcaption>
            </figure>
            <figure className="visual-secondary">
              <Image
                unoptimized
                src="/images/responsive-showcase-banner.webp"
                alt={content.visual.responsiveAlt}
                width={1672}
                height={941}
              />
              <figcaption className="visual-image-caption visual-secondary-caption">
                <span className="visual-live-dot" aria-hidden="true" />
                <span>
                  <small>{content.visual.secondaryLabel}</small>
                  <strong>{content.visual.secondaryTitle}</strong>
                </span>
              </figcaption>
            </figure>
            <div className="visual-capabilities" aria-label={content.visual.capabilitiesLabel}>
              {content.visual.capabilities.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.text}</small>
                  </div>
                </article>
              ))}
            </div>
            <span className="visual-orbit" aria-hidden="true" />
          </div>
        </section>

        <section className="projects section-shell" id="projetos" aria-labelledby="projects-title">
          <div className="section-heading row-heading">
            <div>
              <p className="eyebrow"><span /> {content.projects.eyebrow}</p>
              <h2 id="projects-title">{content.projects.title}</h2>
            </div>
            <p>{content.projects.intro}</p>
          </div>

          <div className="projects-grid">
            {content.projects.items.map((project) => (
              <article className="project-card" key={project.name}>
                <div className={`project-visual ${project.visualClass}`} aria-hidden="true">
                  {project.visualClass === "project-calma" ? (
                    <div className="calma-project-art">
                      <span className="calma-project-sun" />
                      <span className="calma-project-hill hill-back" />
                      <span className="calma-project-hill hill-front" />
                      <span className="calma-project-phone">
                        <i className="calma-mini-mark">C</i>
                        <strong>Calmy</strong>
                        <small>Um momento só seu.</small>
                        <b>Ajuda agora</b>
                      </span>
                      <span className="calma-project-leaf leaf-one" />
                      <span className="calma-project-leaf leaf-two" />
                    </div>
                  ) : (
                    <Image
                      unoptimized
                      src={project.image}
                      alt=""
                      width={1440}
                      height={810}
                    />
                  )}
                  <span className="project-image-shine" />
                </div>
                <div className="project-info">
                  <p>{project.category}</p>
                  <h3>{project.name}</h3>
                  <span>{project.description}</span>
                  <div className="project-links">
                    {project.caseHref ? (
                      <Link href={project.caseHref}>
                        {language === "pt-BR" ? "Ver estudo de caso" : language === "en-US" ? "View case study" : "Ver caso de estudio"} <span aria-hidden="true">→</span>
                      </Link>
                    ) : null}
                    {project.href ? (
                      project.href.startsWith("/") ? (
                        <Link href={project.href}>
                          {project.linkLabel} <span aria-hidden="true">↗</span>
                        </Link>
                      ) : (
                        <a className={project.caseHref ? "project-external-link" : undefined} href={project.href} target="_blank" rel="noreferrer">
                          {project.caseHref
                            ? (language === "pt-BR" ? "Abrir projeto" : language === "en-US" ? "Open project" : "Abrir proyecto")
                            : project.linkLabel} <span aria-hidden="true">↗</span>
                        </a>
                      )
                    ) : (
                      <span className="project-status">{project.linkLabel}</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="products section-shell" id="produtos" aria-labelledby="products-title">
          <div className="section-heading row-heading products-heading">
            <div>
              <p className="eyebrow"><span /> {content.products.eyebrow}</p>
              <h2 id="products-title">{content.products.title}</h2>
            </div>
            <p>{content.products.intro}</p>
          </div>

          <div className="products-grid">
            {content.products.items.map((product) => (
              <article className={`product-card ${product.visualClass}`} key={product.name}>
                <div className="product-art" role="img" aria-label={product.visualAria}>
                  <Image
                    unoptimized
                    src={product.image}
                    alt=""
                    width={1440}
                    height={810}
                  />
                  <span className="product-image-shine" aria-hidden="true" />
                </div>

                <div className="product-content">
                  <div className="product-meta">
                    <p>{product.category}</p>
                    <span>{content.products.oneTime}</span>
                  </div>
                  <h3>{product.name}</h3>
                  <p className="product-summary">{product.summary}</p>
                  <ul>
                    {product.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                  <div className="product-purchase">
                    <div className="product-price"><small>{content.products.oneTime}</small><strong>{product.price}</strong></div>
                    <a
                      className="product-buy"
                      href={product.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${content.products.buyAria} ${product.name} — ${product.price}`}
                    >
                      {content.products.buy} <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                  <p className="product-secure"><span aria-hidden="true">✓</span>{content.products.secure}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="product-custom">
            <span className="product-custom-mark" aria-hidden="true">JV</span>
            <div>
              <h3>{content.products.customTitle}</h3>
              <p>{content.products.customText}</p>
            </div>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              {content.products.customButton} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="process section-shell" id="processo" aria-labelledby="process-title">
          <div className="process-intro">
            <p className="eyebrow"><span /> {content.process.eyebrow}</p>
            <h2 id="process-title">{content.process.title}</h2>
            <p>{content.process.intro}</p>
            <a className="text-link" href={whatsappUrl} target="_blank" rel="noreferrer">
              {content.process.link} <span aria-hidden="true">↗</span>
            </a>
          </div>
          <ol className="process-list">
            {content.process.items.map((item, index) => (
              <li key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="about section-shell" aria-labelledby="about-title">
          <div className="atom-experience">
            <div className="atom-stage" role="group" aria-label={content.about.atomAria}>
              <span className="atom-orbit atom-orbit-one" aria-hidden="true" />
              <span className="atom-orbit atom-orbit-two" aria-hidden="true" />
              <span className="atom-orbit atom-orbit-three" aria-hidden="true" />
              <Link className="atom-nucleus" href="/atom" aria-label={content.about.atomLink}>
                <span>ATOM</span>
                <small>{content.about.nucleus}</small>
              </Link>
              {content.about.points.map((point, index) => (
                <button
                  type="button"
                  className={`atom-electron atom-electron-${index + 1}${activeAtom === index ? " active" : ""}`}
                  aria-label={`${point.title}. ${point.text}`}
                  aria-pressed={activeAtom === index}
                  onClick={() => setActiveAtom(index)}
                  key={point.title}
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
            <p className="atom-hint"><span aria-hidden="true">↗</span>{content.about.atomHint}</p>
            <Link className="atom-page-link" href="/atom">{content.about.atomLink} <span aria-hidden="true">→</span></Link>
          </div>
          <div className="about-copy">
            <p className="eyebrow"><span /> {content.about.eyebrow}</p>
            <h2 id="about-title">{content.about.title}</h2>
            <p>{content.about.text}</p>
            <div className="about-tags" aria-label={content.about.tagsAria}>
              {content.about.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="atom-detail" aria-live="polite">
              <span>{String(activeAtom + 1).padStart(2, "0")}</span>
              <div>
                <h3>{activeAtomPoint.title}</h3>
                <p>{activeAtomPoint.text}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact section-shell" id="contato" aria-labelledby="contact-title">
          <div>
            <p className="eyebrow light-eyebrow"><span /> {content.contact.eyebrow}</p>
            <h2 id="contact-title">{content.contact.title}</h2>
          </div>
          <div className="contact-action">
            <p>{content.contact.text}</p>
            <a className="button contact-button" href={whatsappUrl} target="_blank" rel="noreferrer">
              {content.contact.button} <span aria-hidden="true">↗</span>
            </a>
            <small>{content.contact.note}</small>
          </div>
        </section>

        <section className="business-info section-shell" id="informacoes" aria-labelledby="business-info-title">
          <div className="business-intro">
            <p className="eyebrow"><span /> {content.business.eyebrow}</p>
            <h2 id="business-info-title">{content.business.title}</h2>
            <p>{content.business.intro}</p>
            <dl className="business-facts">
              <div><dt>{content.business.tradeName}</dt><dd>João Victor Web</dd></div>
              <div><dt>{content.business.owner}</dt><dd>João Victor Costa</dd></div>
              <div><dt>{content.business.service}</dt><dd>{content.business.serviceValue}</dd></div>
              <div><dt>{content.business.contact}</dt><dd><a href={whatsappUrl} target="_blank" rel="noreferrer">+55 86 99555-0544</a></dd></div>
            </dl>
          </div>

          <div className="policy-list">
            <details id="termos">
              <summary>{content.business.termsTitle} <span aria-hidden="true">+</span></summary>
              <div>{content.business.terms.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </details>
            <details id="cancelamento">
              <summary>{content.business.cancellationTitle} <span aria-hidden="true">+</span></summary>
              <div>{content.business.cancellation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </details>
            <details id="privacidade">
              <summary>{content.business.privacyTitle} <span aria-hidden="true">+</span></summary>
              <div>{content.business.privacy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </details>
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#inicio" aria-label={content.brandAria}>
          <span className="brand-signature" aria-hidden="true" />
        </a>
        <nav className="footer-links" aria-label={content.footer.legalAria}>
          <a href="#termos">{content.footer.terms}</a>
          <a href="#cancelamento">{content.footer.cancellation}</a>
          <a href="#privacidade">{content.footer.privacy}</a>
        </nav>
        <p>© 2026 João Victor Web</p>
      </footer>
    </main>
  );
}
