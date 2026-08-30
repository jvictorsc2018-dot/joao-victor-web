import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, caseStudySlugs } from "../../case-studies";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) return {};

  return {
    title: `${study.name} | Estudo de caso — João Victor Web`,
    description: study.summary,
    alternates: { canonical: `/projetos/${study.slug}` },
    openGraph: {
      title: `${study.name} | Estudo de caso`,
      description: study.summary,
      url: `/projetos/${study.slug}`,
      type: "article",
      images: [{ url: study.image, alt: study.imageAlt }],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) notFound();

  return (
    <main className="case-page" style={{ "--case-accent": study.accent } as CSSProperties}>
      <a className="skip-link" href="#case-content">Ir para o conteúdo</a>

      <header className="case-header">
        <Link className="case-signature" href="/" aria-label="João Victor Web — início">
          <span className="brand-signature" aria-hidden="true" />
        </Link>
        <Link className="case-back" href="/#projetos"><span aria-hidden="true">←</span> Todos os projetos</Link>
      </header>

      <section className="case-hero" aria-labelledby="case-title">
        <div className="case-hero-copy">
          <p className="case-overline"><i /> Estudo de caso · {study.category}</p>
          <h1 id="case-title">{study.name}</h1>
          <p>{study.summary}</p>
          <div className="case-hero-actions">
            <a href={study.externalUrl} target="_blank" rel="noreferrer">Abrir projeto <span aria-hidden="true">↗</span></a>
            <a href="#case-content">Conhecer o processo <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <figure className="case-hero-image">
          <Image unoptimized src={study.image} alt={study.imageAlt} width={1440} height={810} priority />
          <span aria-hidden="true" />
        </figure>
      </section>

      <div id="case-content">
        <section className="case-story">
          <article><small>01 · O desafio</small><h2>Uma operação que precisava de mais clareza.</h2><p>{study.challenge}</p></article>
          <article><small>02 · A solução</small><h2>Um fluxo pensado do início ao fim.</h2><p>{study.solution}</p></article>
        </section>

        <section className="case-scope">
          <div>
            <p className="case-overline"><i /> Escopo do projeto</p>
            <h2>O essencial para transformar rotina em experiência digital.</h2>
            <p className="case-audience"><strong>Para quem foi pensado:</strong> {study.audience}</p>
          </div>
          <ul>{study.features.map((feature, index) => <li key={feature}><span>{String(index + 1).padStart(2, "0")}</span>{feature}</li>)}</ul>
        </section>

        <section className="case-decisions">
          <div className="case-section-heading">
            <p className="case-overline"><i /> Decisões de produto</p>
            <h2>Design com uma função clara.</h2>
          </div>
          <div className="case-decision-grid">
            {study.decisions.map((decision, index) => (
              <article key={decision.title}><span>0{index + 1}</span><h3>{decision.title}</h3><p>{decision.text}</p></article>
            ))}
          </div>
        </section>

        <section className="case-impact">
          <div><p className="case-overline light"><i /> Impacto projetado</p><h2>O valor que a solução busca entregar.</h2></div>
          <ul>{study.projectedImpact.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
          <small>Os benefícios acima representam objetivos do projeto, não métricas auditadas de um cliente.</small>
        </section>

        <section className="case-next">
          <p>Próximo projeto</p>
          <h2>Tem uma ideia parecida?</h2>
          <a href="https://wa.me/5586995550544?text=Ol%C3%A1%2C%20Jo%C3%A3o%20Victor!%20Vi%20um%20estudo%20de%20caso%20no%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar." target="_blank" rel="noreferrer">Conversar sobre meu projeto <span aria-hidden="true">↗</span></a>
        </section>
      </div>

      <footer className="case-footer"><span>© 2026 João Victor Web</span><Link href="/">Voltar ao início</Link></footer>
    </main>
  );
}
