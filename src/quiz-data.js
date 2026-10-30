export const quiz = {
  "steps": [
    {
      "id": "main_interest",
      "question": "O que você gostaria de realçar?",
      "subtitle": "Escolha a opção que mais combina com o que você procura hoje.",
      "selection": "single",
      "options": [
        {
          "id": "expression_lines",
          "label": "Linhas de expressão",
          "related_service": "Botox",
          "description": "Converse com a equipe sobre seus interesses durante uma avaliação individual."
        },
        {
          "id": "dark_circles",
          "label": "Olheiras",
          "related_service": "Preenchimento de Olheiras",
          "description": "Converse com a equipe sobre seus interesses durante uma avaliação individual."
        },
        {
          "id": "lips",
          "label": "Lábios",
          "related_service": "Preenchimento Labial",
          "description": "Converse com a equipe sobre seus interesses durante uma avaliação individual."
        },
        {
          "id": "nasolabial",
          "label": "Bigode chinês",
          "related_service": "Preenchimento Bigode Chinês",
          "description": "Converse com a equipe sobre seus interesses durante uma avaliação individual."
        },
        {
          "id": "body_contour",
          "label": "Contorno corporal",
          "related_service": "Harmonização Corporal",
          "description": "Converse com a equipe sobre seus interesses durante uma avaliação individual."
        },
        {
          "id": "not_sure",
          "label": "Ainda não sei",
          "related_service": "Avaliação personalizada",
          "description": "Converse com a equipe sobre seus interesses durante uma avaliação individual."
        }
      ]
    },
    {
      "id": "priority",
      "question": "O que é mais importante para você?",
      "subtitle": "Isso ajuda nossa equipe a entender melhor o que você procura.",
      "selection": "single",
      "options": [
        {
          "id": "natural_result",
          "label": "Naturalidade",
          "description": "Quero algo discreto e que preserve minhas características."
        },
        {
          "id": "skin_care",
          "label": "Cuidar da minha pele",
          "description": "Meu foco principal é melhorar minha rotina de cuidados."
        },
        {
          "id": "facial_harmony",
          "label": "Harmonia facial",
          "description": "Quero entender melhor as proporções do meu rosto."
        },
        {
          "id": "preventive",
          "label": "Prevenção e cuidado",
          "description": "Quero começar a cuidar agora."
        },
        {
          "id": "professional_opinion",
          "label": "Quero ouvir uma especialista",
          "description": "Prefiro receber orientação durante uma avaliação."
        }
      ]
    },
    {
      "id": "contact_intention",
      "question": "E agora, como podemos te ajudar?",
      "subtitle": "Escolha sua intenção principal.",
      "selection": "single",
      "options": [
        {
          "id": "schedule_evaluation",
          "label": "Quero agendar uma avaliação"
        },
        {
          "id": "understand_options",
          "label": "Quero entender minhas opções"
        },
        {
          "id": "know_values",
          "label": "Quero informações sobre valores"
        },
        {
          "id": "ask_questions",
          "label": "Ainda tenho algumas dúvidas"
        }
      ]
    }
  ],
  "microcopy": {
    "expression_lines": "Seu interesse é linhas de expressão. Converse com a equipe para entender as possibilidades após uma avaliação individual.",
    "dark_circles": "Seu interesse é olheiras. Converse com a equipe para entender as possibilidades após uma avaliação individual.",
    "lips": "Seu interesse é lábios. Converse com a equipe para entender as possibilidades após uma avaliação individual.",
    "nasolabial": "Seu interesse é bigode chinês. Converse com a equipe para entender as possibilidades após uma avaliação individual.",
    "body_contour": "Seu interesse é contorno corporal. Converse com a equipe para entender as possibilidades após uma avaliação individual.",
    "not_sure": "Sem problema. Você não precisa saber qual procedimento procura. Conte seus objetivos para a equipe durante uma avaliação."
  },
  "id": "quiz_1"
};
export function quizLabels(answers, config = quiz) {
  return config.steps.map(step => {
    const option = step.options.find(option => option.id === answers[step.id]);
    if (!option) throw new Error('Responda às três perguntas antes de continuar.');
    return option.label;
  });
}
export function quizWhatsappUrl(answers, config = quiz) {
  const [interest, priority, intention] = quizLabels(answers, config);
  if(config.id === 'quiz_2') {
    const values = config.steps.map(step => step.options.find(option => option.id === answers[step.id]).value);
    const related = config.steps[0].options.find(option => option.id === answers.region).related_service;
    const message = `Olá! Conheci a Pherface Blumenau pelo site e respondi ao questionário. ✨\n\n📍 Região que mais me interessa: ${values[0]}\n✨ O que eu procuro: ${values[1]}\n💬 Quero: ${values[2]}\n\nTenho interesse em entender melhor: ${related}.\n\nGostaria de conversar com a equipe e receber mais informações.`;
    return `https://wa.me/5547996203106?text=${encodeURIComponent(message)}`;
  }
  const related = config.steps[0].options.find(option => option.id === answers.main_interest).related_service;
  const message = `Olá! Conheci a Pherface Blumenau pelo site e respondi ao questionário.

Meu principal interesse: ${interest}
Minha prioridade: ${priority}
O que eu gostaria agora: ${intention}
Assunto de interesse: ${related}

Gostaria de conversar com a equipe e entender melhor as possibilidades para mim.`;
  return `https://wa.me/5547996203106?text=${encodeURIComponent(message)}`;
}
