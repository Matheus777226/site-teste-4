export const treatmentImages = [
  ['botox', 'Close editorial da testa e dos olhos com expressão relaxada'],
  ['preenchimento-facial', 'Retrato editorial em três quartos destacando os contornos do rosto'],
  ['preenchimento-labial', 'Close editorial de lábios naturais'],
  ['colageno', 'Retrato editorial com foco na pele do rosto e do pescoço'],
  ['lavieen', 'Close editorial da textura da pele sob luz suave'],
  ['ultraformer', 'Retrato editorial destacando a linha da mandíbula e do pescoço'],
  ['rinomodelacao', 'Perfil editorial destacando as proporções naturais do rosto']
].map(([slug, alt]) => ({ src: `/public/images/treatments/${slug}.png`, alt: `${alt}. Imagem ilustrativa gerada por IA.` }));
