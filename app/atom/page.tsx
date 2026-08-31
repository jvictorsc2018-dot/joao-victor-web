import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "ATOM | Assistente pessoal de João Victor", description: "ATOM é o assistente pessoal de João Victor: contexto, memória privada e autonomia controlada." };

export default function AtomPage() {
  return <main className="atom-page">
    <nav className="atom-nav"><Link href="/">← João Victor Web</Link><span>Projeto pessoal em desenvolvimento</span></nav>
    <section className="atom-opening">
      <div className="atom-portrait"><Image src="/images/atom-hero.webp" alt="Ilustração original do ATOM, um assistente robótico de luz azul" width={700} height={1244} priority /></div>
      <div className="atom-intro"><p className="atom-kicker">Assistente pessoal • em construção</p><h1>ATOM</h1><p>Um assistente pessoal pensado para compreender seu contexto, manter memória privada e ajudar nos seus projetos com autonomia controlada.</p><div className="atom-actions"><a href="#o-que-e">O que é o ATOM <span>↓</span></a><a href="#construcao">Como está sendo construído <span>↓</span></a></div></div>
    </section>
    <section className="atom-section" id="o-que-e"><p className="atom-kicker">O que é</p><h2>Uma presença digital que conhece o seu contexto.</h2><p>ATOM é meu projeto de assistente pessoal: uma base para conversar, lembrar, raciocinar e apoiar decisões, sem abrir mão de privacidade, limites e controle humano.</p></section>
    <section className="atom-section atom-build" id="construcao"><p className="atom-kicker">Como está sendo construído</p><h2>Arquitetura modular, segurança desde o início.</h2><p>O núcleo foi separado em partes de conversa, IA, segurança e autenticação. Ações sensíveis foram desenhadas para depender de regras e confirmação; memória e dados externos recebem tratamentos diferentes.</p><div className="atom-stack"><span>Core</span><span>AI</span><span>Security</span><span>Auth</span></div><p className="atom-note">A base A0–A4 está concluída. O próximo passo é ampliar os providers de IA com roteamento e fallback controlados.</p></section>
    <footer className="atom-closing"><p>Feito para ajudar, não para substituir.</p><Link href="/">Voltar ao portfólio →</Link></footer>
  </main>;
}
