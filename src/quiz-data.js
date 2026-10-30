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
          "description": "Quero conversar sobre cuidados relacionados às linhas e marcas de expressão.",
          "visual": "close abstrato e sofisticado da região dos olhos e testa"
        },
        {
          "id": "lips",
          "label": "Lábios",
          "description": "Quero entender as possibilidades para valorizar meus lábios.",
          "visual": "composição editorial minimalista focada nos lábios"
        },
        {
          "id": "facial_contour",
          "label": "Contorno facial",
          "description": "Gostaria de conversar sobre proporções e contornos do rosto.",
          "visual": "perfil facial com iluminação lateral sofisticada"
        },
        {
          "id": "skin_quality",
          "label": "Qualidade da pele",
          "description": "Quero cuidar da aparência, textura e aspecto geral da minha pele.",
          "visual": "macro de pele com iluminação premium"
        },
        {
          "id": "collagen",
          "label": "Colágeno e firmeza",
          "description": "Quero conversar sobre cuidados relacionados à firmeza e qualidade da pele.",
          "visual": "forma 3D orgânica representando estrutura e sustentação"
        },
        {
          "id": "spots_texture",
          "label": "Manchas e textura",
          "description": "Quero saber mais sobre opções de cuidado para manchas ou textura.",
          "visual": "macro de pele abstrata com partículas de luz"
        },
        {
          "id": "not_sure",
          "label": "Ainda não sei",
          "description": "Quero conversar com a equipe e entender quais possibilidades existem para mim.",
          "visual": "rosto editorial parcialmente oculto por vidro translúcido"
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
    "expression_lines": "Sua principal dúvida está relacionada a linhas de expressão. A equipe pode conversar com você sobre as possibilidades disponíveis após uma avaliação.",
    "lips": "Você demonstrou interesse em valorizar seus lábios. Converse com a equipe para conhecer as possibilidades disponíveis.",
    "facial_contour": "Seu interesse está relacionado ao contorno facial. Uma avaliação individual ajuda a entender melhor suas características e objetivos.",
    "skin_quality": "Você demonstrou interesse nos cuidados com a qualidade da pele. A equipe pode apresentar as tecnologias e opções disponíveis.",
    "collagen": "Seu interesse principal está relacionado à firmeza e ao cuidado com a pele. Converse com a equipe para entender as possibilidades.",
    "spots_texture": "Você quer saber mais sobre cuidados relacionados a manchas e textura. Fale com a equipe para receber orientação individual.",
    "not_sure": "Sem problema. Você não precisa saber qual procedimento procura. Conte seus objetivos para a equipe durante uma avaliação."
  }
};
export function quizLabels(answers) {
  return quiz.steps.map(step => {
    const option = step.options.find(option => option.id === answers[step.id]);
    if (!option) throw new Error('Responda às três perguntas antes de continuar.');
    return option.label;
  });
}
export function quizWhatsappUrl(answers) {
  const [interest, priority, intention] = quizLabels(answers);
  const message = `Olá! Conheci a Pherface Blumenau pelo site e respondi ao questionário. ✨

Meu principal interesse: ${interest}
Minha prioridade: ${priority}
O que eu gostaria agora: ${intention}

Gostaria de conversar com a equipe e entender melhor as possibilidades para mim.`;
  return `https://wa.me/5547996203106?text=${encodeURIComponent(message)}`;
}
