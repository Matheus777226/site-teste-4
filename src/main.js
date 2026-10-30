import { trackEvent } from './tracking.js';
import { quiz2 } from './quiz-2-data.js';
import { services, whatsappUrl } from './data.js';
import { treatmentImages } from './treatment-images.js';
const list = document.querySelector('#treatment-list');
services.forEach(({id, name, headline, description, cta, message}, index) => {
  const item = document.createElement('details');
  item.innerHTML = `<summary><span class="number">0${index + 1}</span>${name}<span class="plus" aria-hidden="true">+</span></summary><div class="treatment-body"><h3>${headline}</h3><p>${description}</p><a class="text-link" target="_blank" rel="noopener noreferrer" href="${whatsappUrl(message)}">${cta} <span>↗</span></a></div>`;
  const media = document.createElement('figure');
  media.className = 'treatment-inline-image';
  const image = document.createElement('img');
  image.src = treatmentImages[index].src;
  image.alt = treatmentImages[index].alt;
  image.width = treatmentImages[index].width; image.height = treatmentImages[index].height;
  image.loading = 'lazy'; image.decoding = 'async';
  media.append(image);
  const caption = document.createElement('figcaption');
  caption.textContent = 'Resultados individuais podem variar.';
  media.append(caption);
  item.querySelector('.treatment-body').prepend(media);
  if (index === 0) item.open = true;
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    trackEvent('service_viewed', { service_id: id, service_name: name });
    [...list.children].forEach(other => { if (other !== item) other.open = false; });
    document.querySelector('#visual-number').textContent = `0${index + 1} — 05`;
    document.querySelector('#visual-caption').textContent = headline;
    const featured = document.querySelector('#treatment-featured');
    featured.src = treatmentImages[index].src;
    featured.alt = treatmentImages[index].alt;
    featured.width = treatmentImages[index].width;
    featured.height = treatmentImages[index].height;
  });
  item.querySelector('.text-link').addEventListener('click', () => trackEvent('service_whatsapp_clicked', { service_id: id, service_name: name }));
  list.append(item);
});
document.querySelectorAll('[data-wa]').forEach(a => { a.href = whatsappUrl(a.dataset.wa); a.target = '_blank'; a.rel = 'noopener noreferrer'; });
import { initQuiz } from './quiz.js';
initQuiz(document.querySelector('#quiz'));
initQuiz(document.querySelector('#quiz-2'), quiz2);
// Keep the floating contact control from covering either quiz's primary action.
if ('IntersectionObserver' in window) {
  const visibleActions = new Set();
  const floating = document.querySelector('.floating-wa');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting ? visibleActions.add(entry.target) : visibleActions.delete(entry.target));
    for (const action of visibleActions) if (!action.isConnected) visibleActions.delete(action);
    floating.hidden = visibleActions.size > 0;
  });
  const watch = () => {
    observer.disconnect(); visibleActions.clear(); floating.hidden = false;
    document.querySelectorAll('.quiz-send').forEach(action => observer.observe(action));
  };
  document.querySelectorAll('.quiz-root').forEach(root => new MutationObserver(watch).observe(root, { childList: true, subtree: true }));
}
const menu = document.querySelector('.menu');
function closeMenu(){ document.querySelector('#navigation').classList.remove('open'); menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Abrir menu'); }
menu.addEventListener('click', () => { const open = document.querySelector('#navigation').classList.toggle('open'); menu.setAttribute('aria-expanded',String(open)); menu.setAttribute('aria-label',open ? 'Fechar menu' : 'Abrir menu'); });
document.querySelectorAll('#navigation a').forEach(a => a.addEventListener('click',closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
document.querySelector('#year').textContent = new Date().getFullYear();
// Draw directional marks as vectors for consistent rendering on minimal systems.
document.querySelectorAll('.button span, .text-link span, .header-cta span, .floating-wa i, .experience-words i').forEach(el => {
  if(el.textContent.trim() === '↗') el.innerHTML = '<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M4 16 16 4M4 4h12v12"/></svg>';
});
document.querySelector('#load-map').addEventListener('click', () => {
  const iframe = document.createElement('iframe'); iframe.title = 'Localização da Pherface Blumenau'; iframe.src = 'https://maps.google.com/maps?q=Rua%20Benjamin%20Constant%202670%20Blumenau%20SC&output=embed'; iframe.referrerPolicy = 'no-referrer-when-downgrade'; iframe.allowFullscreen = true;
  document.querySelector('.map-panel').replaceChildren(iframe);
});
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
if (!reduced.matches && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion');
  const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); observer.unobserve(e.target); } }),{threshold:.1});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
