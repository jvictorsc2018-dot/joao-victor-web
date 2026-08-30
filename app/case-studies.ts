export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  image: string;
  imageAlt: string;
  externalUrl: string;
  accent: string;
  challenge: string;
  solution: string;
  audience: string;
  features: string[];
  decisions: Array<{ title: string; text: string }>;
  projectedImpact: string[];
};

export const caseStudies: Record<string, CaseStudy> = {
  foodwave: {
    slug: "foodwave",
    name: "FoodWave",
    category: "Sistema para restaurantes",
    summary:
      "Uma experiência completa de cardápio, pedidos e gestão pensada para aproximar a operação do restaurante da experiência do cliente.",
    image: "/images/projects/foodwave-showcase.webp",
    imageAlt: "Telas do FoodWave com cardápio digital e painel administrativo",
    externalUrl: "https://victorscape2.gumroad.com/l/foodwave-restaurant-system",
    accent: "#ff6b3d",
    challenge:
      "Restaurantes pequenos costumam dividir pedidos, cardápio, pagamentos e controle financeiro entre várias ferramentas. Isso aumenta o trabalho manual e torna a operação mais difícil de acompanhar.",
    solution:
      "O FoodWave reúne a jornada do cliente e a rotina administrativa em uma única base: apresentação dos pratos, realização do pedido, acompanhamento da operação e visão financeira.",
    audience:
      "Restaurantes, lanchonetes, pizzarias e operações de delivery que querem vender online com identidade própria.",
    features: [
      "Cardápio digital responsivo",
      "Carrinho e fluxo de pedidos",
      "Pagamentos pelo próprio site",
      "Painel administrativo e financeiro",
      "Estrutura em português, inglês e espanhol",
      "Base pronta para personalização",
    ],
    decisions: [
      {
        title: "Compra sem atrito",
        text: "A navegação prioriza categorias, produtos e fechamento do pedido com poucos passos.",
      },
      {
        title: "Operação no mesmo lugar",
        text: "O painel conecta pedidos e informações financeiras para reduzir controles paralelos.",
      },
      {
        title: "Produto adaptável",
        text: "A base foi estruturada para receber identidade, cardápio e regras de diferentes restaurantes.",
      },
    ],
    projectedImpact: [
      "Tornar o pedido online mais direto para o cliente",
      "Reduzir a dependência de anotações e ferramentas desconectadas",
      "Dar ao restaurante uma presença digital própria e profissional",
    ],
  },
  agendawave: {
    slug: "agendawave",
    name: "AgendaWave",
    category: "Agendamento e gestão",
    summary:
      "Uma plataforma para profissionais organizarem horários, clientes, serviços, pagamentos e a rotina do atendimento.",
    image: "/images/projects/agendawave-showcase.webp",
    imageAlt: "Telas da plataforma AgendaWave para agendamentos e gestão",
    externalUrl: "https://agendawave.jvictorsc2018.chatgpt.site",
    accent: "#bd8cff",
    challenge:
      "Agendamentos feitos somente por mensagens exigem muitas confirmações, dificultam a visualização dos horários livres e deixam informações importantes espalhadas.",
    solution:
      "A AgendaWave transforma a agenda em um fluxo organizado, reunindo disponibilidade, clientes, serviços, sinal de pagamento e visão financeira em uma experiência simples.",
    audience:
      "Salões, barbearias, estúdios e profissionais autônomos que trabalham com horário marcado.",
    features: [
      "Agenda visual por data e horário",
      "Cadastro de clientes e serviços",
      "Controle de sinal e pagamentos",
      "Visão financeira da operação",
      "Fluxo responsivo para celular",
      "Painel centralizado para o profissional",
    ],
    decisions: [
      {
        title: "Agenda em primeiro plano",
        text: "A disponibilidade é tratada como o centro da experiência para facilitar decisões rápidas.",
      },
      {
        title: "Menos troca de mensagens",
        text: "Serviços, horários e dados do cliente ficam organizados em um fluxo único.",
      },
      {
        title: "Gestão além do calendário",
        text: "Sinais e informações financeiras ajudam a acompanhar o negócio, não apenas os horários.",
      },
    ],
    projectedImpact: [
      "Diminuir conflitos e esquecimentos de horários",
      "Organizar o histórico de clientes e serviços",
      "Oferecer mais clareza sobre a rotina e os recebimentos",
    ],
  },
  stockwave: {
    slug: "stockwave",
    name: "StockWave",
    category: "Estoque e financeiro",
    summary:
      "Um sistema direto para pequenos comércios controlarem produtos, fornecedores, vendas, caixa e relatórios.",
    image: "/images/projects/stockwave-showcase.webp",
    imageAlt: "Telas do StockWave com estoque, vendas e indicadores financeiros",
    externalUrl: "https://stockwave.jvictorsc2018.chatgpt.site",
    accent: "#43d4a0",
    challenge:
      "Quando estoque, vendas e caixa são controlados em cadernos ou planilhas separadas, faltas de produtos e divergências financeiras ficam mais difíceis de perceber.",
    solution:
      "O StockWave centraliza o registro da operação diária e transforma movimentações de produtos e vendas em uma visão simples do negócio.",
    audience:
      "Lojas, depósitos e pequenos comércios que precisam sair do controle manual sem adotar uma ferramenta complicada.",
    features: [
      "Cadastro de produtos e fornecedores",
      "Entradas, saídas e estoque mínimo",
      "Registro de vendas e movimentações",
      "Controle de caixa e financeiro",
      "Indicadores e relatórios essenciais",
      "Interface adaptada para computador e celular",
    ],
    decisions: [
      {
        title: "Clareza operacional",
        text: "Indicadores essenciais aparecem primeiro, sem sobrecarregar o usuário com informações secundárias.",
      },
      {
        title: "Movimentação rastreável",
        text: "Entradas, saídas e vendas formam um histórico que ajuda a entender o estoque atual.",
      },
      {
        title: "Gestão acessível",
        text: "A experiência foi pensada para negócios que precisam de controle, mas não de um sistema complexo.",
      },
    ],
    projectedImpact: [
      "Perceber reposições necessárias com antecedência",
      "Reduzir divergências entre estoque registrado e operação",
      "Acompanhar vendas e caixa em uma visão centralizada",
    ],
  },
};

export const caseStudySlugs = Object.keys(caseStudies);
