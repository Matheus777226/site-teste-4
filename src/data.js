export const treatments = [
  ['Toxina Botulínica','EXPRESSÃO. EQUILÍBRIO. NATURALIDADE.','Conheça as possibilidades do tratamento durante uma avaliação personalizada.','Quero saber sobre Botox'],
  ['Preenchimento Facial','CONTORNOS QUE RESPEITAM VOCÊ.','Procedimentos personalizados devem ser definidos após avaliação profissional.','Quero saber sobre preenchimento'],
  ['Preenchimento Labial','DETALHES QUE TRANSFORMAM A EXPRESSÃO.','Descubra durante uma avaliação quais possibilidades podem ser adequadas para você.','Quero saber sobre lábios'],
  ['Bioestimuladores de Colágeno','TECNOLOGIA ENCONTRA CUIDADO.','Conheça as opções disponíveis e converse com a equipe sobre uma avaliação.','Quero conhecer'],
  ['Laser Lavieen','TECNOLOGIA QUE MERECE SER VISTA DE PERTO.','Consulte a equipe para entender indicações, disponibilidade e protocolo.','Quero saber sobre Lavieen'],
  ['Ultraformer','TECNOLOGIA EM OUTRA PROFUNDIDADE.','Entre em contato com a equipe para conhecer o tratamento e verificar disponibilidade.','Quero saber sobre Ultraformer'],
  ['Rinomodelação','HARMONIA ESTÁ NOS DETALHES.','Converse com a equipe sobre as possibilidades e a importância de uma avaliação individual.','Falar com uma especialista']
];
export const interests = ['Linhas de expressão','Lábios','Contorno facial','Qualidade da pele','Colágeno','Ainda não sei'];
export function whatsappUrl(message) { return `https://wa.me/5547996203106?text=${encodeURIComponent('Olá! ' + message)}`; }
export function interestMessage(interest) { return interest === 'Ainda não sei' ? 'Conheci a Pherface Blumenau pelo site e gostaria de uma avaliação para entender os cuidados adequados para mim.' : `Conheci a Pherface Blumenau pelo site e gostaria de agendar uma avaliação. Meu interesse é: ${interest}.`; }
