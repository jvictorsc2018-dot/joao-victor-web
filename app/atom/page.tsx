import Link from "next/link";

export const metadata = {
  title: "ATOM | Assistente pessoal de João Victor",
  description: "ATOM é o projeto de assistente pessoal de João Victor, desenvolvido com memória, contexto e autonomia controlada.",
};

export default function AtomPage() {
  return <main className="case-study"><section className="case-hero">
    <p className="eyebrow"><span /> Projeto em desenvolvimento</p>
    <h1>ATOM</h1>
    <p>Um assistente pessoal pensado para compreender contexto, manter memória privada e executar ações com autonomia controlada.</p>
    <p>O núcleo técnico está em evolução. Nesta fase, o projeto prioriza segurança, regras claras de ação e uma base que possa crescer sem perder o controle.</p>
    <Link className="case-back" href="/">← Voltar ao portfólio</Link>
  </section></main>;
}
