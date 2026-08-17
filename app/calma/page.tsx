"use client";

import { useEffect, useState } from "react";

type CalmyLanguage = "pt-BR" | "en-US" | "es-ES";

const languages: Array<{ value: CalmyLanguage; flag: string; code: string }> = [
  { value: "pt-BR", flag: "🇧🇷", code: "PT" },
  { value: "en-US", flag: "🇺🇸", code: "EN" },
  { value: "es-ES", flag: "🇪🇸", code: "ES" },
];

const calmyContent = {
  "pt-BR": {
    skip: "Ir para o conteúdo",
    back: "Voltar ao portfólio",
    status: "Protótipo em desenvolvimento",
    welcome: "Seu espaço seguro",
    heroTitle: "Você está aqui.",
    heroEmphasis: "Um momento de cada vez.",
    heroText: "Você não precisa resolver tudo agora. O Calmy foi pensado para estar ao seu lado quando até escolher o próximo passo parece difícil.",
    presence: "Eu fico aqui com você.",
    orbIdle: "Toque e segure",
    orbHold: "Estou aqui",
    orbHint: "Sinta o contato do dedo e o apoio do aparelho.",
    voice: "Voz",
    sound: "Som",
    on: "ligado",
    off: "desligado",
    actions: [
      ["01", "Ouvir uma voz", "Orientações curtas, calmas e sem pressa."],
      ["02", "Tocar e acompanhar", "Um ponto de presença, sem exigir controle da respiração."],
      ["03", "Chamar alguém", "Acesso simples à sua rede de apoio e ajuda profissional."],
    ],
    explore: "Conheça o projeto",
    originEyebrow: "A origem do nome",
    originTitle: "Calmy nasceu de Camily — e de um desejo de cuidar.",
    originText1: "O projeto começou observando de perto como uma crise pode tornar difícil pensar, escolher ou até seguir uma orientação simples. Eu queria criar uma presença acolhedora para esses momentos.",
    originText2: "Calmy une a sensação de calma ao nome da minha esposa, Camily. É uma homenagem discreta a quem inspirou a ideia e um lembrete de que, antes de qualquer tecnologia, existe uma pessoa real no centro do projeto.",
    originNote: "Não é sobre mandar alguém se acalmar. É sobre permanecer ao lado enquanto o momento passa.",
    experienceEyebrow: "Dentro do Calmy",
    experienceTitle: "Pouco ruído. Mais presença.",
    experienceText: "A experiência reduz escolhas, usa letras grandes e oferece caminhos independentes. Nada é obrigatório — voz, música, vibração e práticas podem ser desligadas em um toque.",
    features: [
      ["Ajuda agora", "Acesso rápido, sem cadastro e planejado para funcionar até sem internet."],
      ["Plano pessoal", "Contatos, lugares, frases e estratégias escolhidas pela própria pessoa."],
      ["Modo acompanhante", "Orientações para quem está ao lado e quer ajudar com respeito."],
      ["Refúgio vivo", "Um espaço sereno que evolui sem metas agressivas, culpa ou competição."],
    ],
    principle: "A pessoa vem antes da funcionalidade.",
    principleText: "O Calmy não diagnostica, não promete cura e não substitui atendimento. Ele oferece companhia, informação e caminhos simples para buscar apoio.",
    roadmapEyebrow: "Diário de desenvolvimento",
    roadmapTitle: "Construído com cuidado, etapa por etapa.",
    roadmap: [
      ["Concluído", "Propósito e segurança", "Princípios de acolhimento, limites clínicos e fluxo principal definidos."],
      ["Em andamento", "Protótipo acessível", "Letras grandes, narração, baixa carga cognitiva e interação sensorial."],
      ["Próxima etapa", "Plano pessoal e modo acompanhante", "Rede de apoio, preferências e orientações para quem está por perto."],
      ["Futuro", "Refúgio e testes", "Evolução do espaço virtual e validação cuidadosa com usuários."],
    ],
    supportEyebrow: "Ajuda disponível agora",
    supportTitle: "Você não precisa esperar pelo Calmy para pedir ajuda.",
    supportText: "Se você precisa conversar, o CVV atende gratuitamente pelo 188. Em uma urgência ou emergência médica, ligue para o SAMU no 192.",
    cvv: "Ligar para o CVV — 188",
    samu: "Ligar para o SAMU — 192",
    disclaimer: "O Calmy oferece apoio e informação. Não realiza diagnóstico e não substitui psicólogos, médicos ou serviços de emergência.",
    closing: "Calmy ainda está começando.",
    closingEmphasis: "Mas já nasceu com alguém no coração.",
    signature: "Criado com cuidado por João Victor · Inspirado por Camily",
  },
  "en-US": {
    skip: "Skip to content",
    back: "Back to portfolio",
    status: "Prototype in development",
    welcome: "Your safe space",
    heroTitle: "You are here.",
    heroEmphasis: "One moment at a time.",
    heroText: "You do not need to solve everything right now. Calmy was designed to stay beside you when even choosing the next step feels difficult.",
    presence: "I will stay here with you.",
    orbIdle: "Touch and hold",
    orbHold: "I am here",
    orbHint: "Feel your fingertip and the support of the device.",
    voice: "Voice",
    sound: "Sound",
    on: "on",
    off: "off",
    actions: [
      ["01", "Hear a voice", "Short, calm guidance with no rush."],
      ["02", "Touch and follow", "A point of presence without demanding breath control."],
      ["03", "Call someone", "Simple access to your support network and professional help."],
    ],
    explore: "Discover the project",
    originEyebrow: "The name's origin",
    originTitle: "Calmy was born from Camily — and from a wish to care.",
    originText1: "The project began by seeing up close how a crisis can make it hard to think, choose or even follow simple guidance. I wanted to create a welcoming presence for those moments.",
    originText2: "Calmy brings the feeling of calm together with my wife Camily's name. It is a quiet tribute to the person who inspired the idea and a reminder that a real person comes before the technology.",
    originNote: "It is not about telling someone to calm down. It is about staying beside them while the moment passes.",
    experienceEyebrow: "Inside Calmy",
    experienceTitle: "Less noise. More presence.",
    experienceText: "The experience reduces choices, uses large text and offers independent paths. Nothing is mandatory — voice, music, vibration and practices can be turned off with one touch.",
    features: [
      ["Help now", "Fast access with no account, planned to work even offline."],
      ["Personal plan", "Contacts, places, phrases and strategies chosen by the person."],
      ["Companion mode", "Guidance for someone nearby who wants to help respectfully."],
      ["Living refuge", "A serene space that evolves without harsh goals, guilt or competition."],
    ],
    principle: "The person comes before the feature.",
    principleText: "Calmy does not diagnose, promise a cure or replace care. It offers companionship, information and simple paths to support.",
    roadmapEyebrow: "Development journal",
    roadmapTitle: "Built with care, one step at a time.",
    roadmap: [
      ["Complete", "Purpose and safety", "Care principles, clinical limits and the main flow are defined."],
      ["In progress", "Accessible prototype", "Large text, narration, low cognitive load and sensory interaction."],
      ["Next", "Personal plan and companion mode", "Support network, preferences and guidance for someone nearby."],
      ["Future", "Refuge and testing", "Evolution of the virtual space and careful user validation."],
    ],
    supportEyebrow: "Help available now",
    supportTitle: "You do not need to wait for Calmy to ask for help.",
    supportText: "In Brazil, CVV offers free emotional support at 188. For an urgent medical emergency, call SAMU at 192.",
    cvv: "Call CVV — 188",
    samu: "Call SAMU — 192",
    disclaimer: "Calmy offers support and information. It does not diagnose or replace psychologists, doctors or emergency services.",
    closing: "Calmy is only beginning.",
    closingEmphasis: "But it was already born with someone in its heart.",
    signature: "Created with care by João Victor · Inspired by Camily",
  },
  "es-ES": {
    skip: "Ir al contenido",
    back: "Volver al portafolio",
    status: "Prototipo en desarrollo",
    welcome: "Tu espacio seguro",
    heroTitle: "Estás aquí.",
    heroEmphasis: "Un momento a la vez.",
    heroText: "No necesitas resolverlo todo ahora. Calmy fue pensado para acompañarte cuando incluso elegir el siguiente paso parece difícil.",
    presence: "Me quedo aquí contigo.",
    orbIdle: "Toca y mantén",
    orbHold: "Estoy aquí",
    orbHint: "Siente el contacto del dedo y el apoyo del dispositivo.",
    voice: "Voz",
    sound: "Sonido",
    on: "activo",
    off: "inactivo",
    actions: [
      ["01", "Escuchar una voz", "Indicaciones breves, tranquilas y sin prisa."],
      ["02", "Tocar y acompañar", "Un punto de presencia sin exigir controlar la respiración."],
      ["03", "Llamar a alguien", "Acceso sencillo a tu red de apoyo y ayuda profesional."],
    ],
    explore: "Conocer el proyecto",
    originEyebrow: "El origen del nombre",
    originTitle: "Calmy nació de Camily — y de un deseo de cuidar.",
    originText1: "El proyecto comenzó al observar de cerca cómo una crisis puede dificultar pensar, elegir o seguir una orientación sencilla. Quería crear una presencia acogedora para esos momentos.",
    originText2: "Calmy une la sensación de calma con el nombre de mi esposa, Camily. Es un homenaje discreto a quien inspiró la idea y un recordatorio de que, antes que la tecnología, hay una persona real en el centro.",
    originNote: "No se trata de decirle a alguien que se calme. Se trata de permanecer a su lado mientras pasa el momento.",
    experienceEyebrow: "Dentro de Calmy",
    experienceTitle: "Menos ruido. Más presencia.",
    experienceText: "La experiencia reduce las elecciones, usa letras grandes y ofrece caminos independientes. Nada es obligatorio: voz, música, vibración y prácticas se desactivan con un toque.",
    features: [
      ["Ayuda ahora", "Acceso rápido, sin registro y pensado para funcionar incluso sin internet."],
      ["Plan personal", "Contactos, lugares, frases y estrategias elegidas por la persona."],
      ["Modo acompañante", "Orientaciones para quien está cerca y quiere ayudar con respeto."],
      ["Refugio vivo", "Un espacio sereno que evoluciona sin metas agresivas, culpa ni competencia."],
    ],
    principle: "La persona está antes que la función.",
    principleText: "Calmy no diagnostica, no promete cura ni sustituye la atención. Ofrece compañía, información y caminos sencillos para buscar apoyo.",
    roadmapEyebrow: "Diario de desarrollo",
    roadmapTitle: "Construido con cuidado, paso a paso.",
    roadmap: [
      ["Completado", "Propósito y seguridad", "Principios de acogida, límites clínicos y flujo principal definidos."],
      ["En curso", "Prototipo accesible", "Letras grandes, narración, baja carga cognitiva e interacción sensorial."],
      ["Siguiente", "Plan personal y modo acompañante", "Red de apoyo, preferencias y orientación para quien está cerca."],
      ["Futuro", "Refugio y pruebas", "Evolución del espacio virtual y validación cuidadosa con usuarios."],
    ],
    supportEyebrow: "Ayuda disponible ahora",
    supportTitle: "No necesitas esperar a Calmy para pedir ayuda.",
    supportText: "En Brasil, CVV ofrece apoyo emocional gratuito en el 188. Ante una urgencia o emergencia médica, llama al SAMU en el 192.",
    cvv: "Llamar al CVV — 188",
    samu: "Llamar al SAMU — 192",
    disclaimer: "Calmy ofrece apoyo e información. No diagnostica ni sustituye a psicólogos, médicos o servicios de emergencia.",
    closing: "Calmy apenas está comenzando.",
    closingEmphasis: "Pero ya nació con alguien en el corazón.",
    signature: "Creado con cuidado por João Victor · Inspirado por Camily",
  },
} as const;

export default function CalmyPage() {
  const [language, setLanguage] = useState<CalmyLanguage>("pt-BR");
  const [holding, setHolding] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  const content = calmyContent[language];

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("joao-victor-web-language");
      if (saved === "pt-BR" || saved === "en-US" || saved === "es-ES") setLanguage(saved);
    } catch {
      // Portuguese remains the safe default when storage is unavailable.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = "Calmy | Um projeto especial de João Victor";
    try {
      window.localStorage.setItem("joao-victor-web-language", language);
    } catch {
      // Keep the chosen language only for this visit.
    }
  }, [language]);

  return (
    <main className="calmy-page">
      <a className="skip-link calmy-skip" href="#calmy-content">{content.skip}</a>

      <section className="calmy-app" aria-labelledby="calmy-title">
        <div className="calmy-ambient" aria-hidden="true">
          <span className="calmy-glow glow-one" />
          <span className="calmy-glow glow-two" />
          <span className="calmy-leaf leaf-a" />
          <span className="calmy-leaf leaf-b" />
          <span className="calmy-leaf leaf-c" />
        </div>

        <header className="calmy-appbar">
          <a className="calmy-brand" href="/calmy" aria-label="Calmy">
            <span className="calmy-brand-mark" aria-hidden="true"><i /></span>
            <strong>calmy</strong>
          </a>
          <span className="calmy-status"><i /> {content.status}</span>
          <div className="calmy-app-actions">
            <label className="calmy-language">
              <span className="sr-only">Idioma</span>
              <select value={language} onChange={(event) => setLanguage(event.target.value as CalmyLanguage)}>
                {languages.map((item) => <option key={item.value} value={item.value}>{item.flag} {item.code}</option>)}
              </select>
            </label>
            <a className="calmy-back" href="/" aria-label={content.back}><span>←</span><b>{content.back}</b></a>
          </div>
        </header>

        <div className="calmy-stage">
          <div className="calmy-stage-copy">
            <p className="calmy-overline"><i /> {content.welcome}</p>
            <h1 id="calmy-title">{content.heroTitle}<em>{content.heroEmphasis}</em></h1>
            <p>{content.heroText}</p>
            <blockquote>{content.presence}</blockquote>
          </div>

          <div className="calmy-presence">
            <div className={`calmy-orb-wrap ${holding ? "is-holding" : ""}`}>
              <span className="calmy-orbit orbit-one" aria-hidden="true" />
              <span className="calmy-orbit orbit-two" aria-hidden="true" />
              <button
                className="calmy-orb"
                type="button"
                aria-pressed={holding}
                onPointerDown={() => setHolding(true)}
                onPointerUp={() => setHolding(false)}
                onPointerCancel={() => setHolding(false)}
                onPointerLeave={() => setHolding(false)}
              >
                <span>{holding ? content.orbHold : content.orbIdle}</span>
                <i aria-hidden="true" />
              </button>
            </div>
            <p>{content.orbHint}</p>
            <div className="calmy-controls">
              <button type="button" className={voiceOn ? "is-on" : ""} onClick={() => setVoiceOn((value) => !value)} aria-pressed={voiceOn}>
                <span aria-hidden="true">◖</span>{content.voice}<small>{voiceOn ? content.on : content.off}</small>
              </button>
              <button type="button" className={soundOn ? "is-on" : ""} onClick={() => setSoundOn((value) => !value)} aria-pressed={soundOn}>
                <span aria-hidden="true">≈</span>{content.sound}<small>{soundOn ? content.on : content.off}</small>
              </button>
            </div>
          </div>
        </div>

        <div className="calmy-action-dock">
          {content.actions.map(([number, title, text], index) => (
            <a key={title} href={index === 2 ? "#apoio" : "#experiencia"}>
              <small>{number}</small><div><strong>{title}</strong><span>{text}</span></div><b>↗</b>
            </a>
          ))}
        </div>
        <a className="calmy-scroll" href="#calmy-content"><span>↓</span>{content.explore}</a>
      </section>

      <div id="calmy-content">
        <section className="calmy-origin">
          <div className="calmy-origin-heading">
            <p className="calmy-overline"><i /> {content.originEyebrow}</p>
            <h2>{content.originTitle}</h2>
          </div>
          <div className="calmy-origin-copy">
            <p>{content.originText1}</p>
            <p>{content.originText2}</p>
            <blockquote>{content.originNote}</blockquote>
          </div>
          <div className="calmy-name-story" aria-hidden="true">
            <span>calm</span><i>+</i><span>camily</span><b>calmy</b>
          </div>
        </section>

        <section className="calmy-experience" id="experiencia">
          <div className="calmy-section-heading">
            <p className="calmy-overline light"><i /> {content.experienceEyebrow}</p>
            <h2>{content.experienceTitle}</h2>
            <p>{content.experienceText}</p>
          </div>
          <div className="calmy-feature-grid">
            {content.features.map(([title, text], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <div className={`calmy-feature-icon icon-${index + 1}`} aria-hidden="true"><i /></div>
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
          <aside className="calmy-principle">
            <span className="calmy-principle-orb" aria-hidden="true"><i /></span>
            <div><p>{content.principle}</p><small>{content.principleText}</small></div>
          </aside>
        </section>

        <section className="calmy-roadmap" id="desenvolvimento">
          <div className="calmy-section-heading dark">
            <p className="calmy-overline"><i /> {content.roadmapEyebrow}</p>
            <h2>{content.roadmapTitle}</h2>
          </div>
          <ol>
            {content.roadmap.map(([state, title, text], index) => (
              <li className={index === 0 ? "is-done" : index === 1 ? "is-current" : ""} key={title}>
                <span className="calmy-roadmap-index">0{index + 1}</span>
                <div><small>{state}</small><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="calmy-support" id="apoio" aria-labelledby="calmy-support-title">
          <div>
            <p className="calmy-overline light"><i /> {content.supportEyebrow}</p>
            <h2 id="calmy-support-title">{content.supportTitle}</h2>
            <p>{content.supportText}</p>
          </div>
          <div className="calmy-support-actions">
            <a href="tel:188">{content.cvv}<span>↗</span></a>
            <a href="tel:192">{content.samu}<span>↗</span></a>
          </div>
          <small>{content.disclaimer}</small>
        </section>

        <section className="calmy-closing">
          <div className="calmy-closing-copy"><h2>{content.closing}<em>{content.closingEmphasis}</em></h2><p>{content.signature}</p></div>
          <div className="calmy-closing-visual" aria-hidden="true"><span><i /></span><b>c</b></div>
        </section>
      </div>

      <footer className="calmy-footer"><strong>calmy</strong><span>Projeto em desenvolvimento · 2026</span><a href="/">JVictor ↗</a></footer>
    </main>
  );
}
