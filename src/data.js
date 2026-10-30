export const services = [
  {
    "id": "harmonizacao-corporal",
    "name": "Harmonização Corporal",
    "headline": "VALORIZE SEUS CONTORNOS.",
    "description": "Conheça as possibilidades da harmonização corporal e converse com nossa equipe para uma avaliação personalizada.",
    "cta": "Quero saber mais",
    "message": "Olá! Conheci a Pherface Blumenau pelo site e tenho interesse em Harmonização Corporal. Gostaria de receber mais informações."
  },
  {
    "id": "botox",
    "name": "Botox",
    "headline": "EXPRESSÃO COM NATURALIDADE.",
    "description": "Converse com nossa equipe sobre toxina botulínica e entenda as possibilidades de acordo com seus objetivos.",
    "cta": "Quero saber sobre Botox",
    "message": "Olá! Conheci a Pherface Blumenau pelo site e tenho interesse em Botox. Gostaria de saber mais."
  },
  {
    "id": "bigode-chines",
    "name": "Preenchimento Bigode Chinês",
    "headline": "SUAVIDADE NOS DETALHES.",
    "description": "Conheça as possibilidades de preenchimento da região dos sulcos nasolabiais através de uma avaliação personalizada.",
    "cta": "Quero saber mais",
    "message": "Olá! Vi o Preenchimento de Bigode Chinês no site da Pherface Blumenau e gostaria de receber mais informações."
  },
  {
    "id": "preenchimento-olheiras",
    "name": "Preenchimento de Olheiras",
    "headline": "REALCE O SEU OLHAR.",
    "description": "Converse com nossa equipe e conheça as possibilidades de cuidado para a região das olheiras.",
    "cta": "Quero saber sobre olheiras",
    "message": "Olá! Conheci a Pherface Blumenau pelo site e tenho interesse em Preenchimento de Olheiras. Gostaria de saber mais."
  },
  {
    "id": "preenchimento-labial",
    "name": "Preenchimento Labial",
    "headline": "REALCE SEM PERDER SUA IDENTIDADE.",
    "description": "Conheça as possibilidades para valorização dos lábios através de uma avaliação individual.",
    "cta": "Quero saber sobre preenchimento labial",
    "message": "Olá! Conheci a Pherface Blumenau pelo site e tenho interesse em Preenchimento Labial. Gostaria de receber mais informações."
  }
];
export function whatsappUrl(message) { return `https://wa.me/5547996203106?text=${encodeURIComponent(message.startsWith("Olá!") ? message : "Olá! " + message)}`; }
