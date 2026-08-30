import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-network" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <Link className="not-found-brand" href="/" aria-label="João Victor Web — início"><span className="brand-signature" /></Link>
      <section>
        <p><span /> Erro 404</p>
        <h1>Essa página saiu da rota.</h1>
        <div>
          <p>O endereço pode ter mudado ou não existir. Você pode voltar ao portfólio e continuar conhecendo os projetos.</p>
          <Link href="/">Voltar ao início <span aria-hidden="true">→</span></Link>
        </div>
      </section>
      <small>João Victor Web · Sites e sistemas sob medida</small>
    </main>
  );
}
