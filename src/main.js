import { treatments, whatsappUrl } from './data.js';
const list = document.querySelector('#treatment-list');
treatments.forEach(([name, headline, description, cta], index) => {
  const item = document.createElement('details');
  item.innerHTML = `<summary><span class="number">0${index + 1}</span>${name}<span class="plus" aria-hidden="true">+</span></summary><div class="treatment-body"><h3>${headline}</h3><p>${description}</p><a class="text-link" target="_blank" rel="noopener noreferrer" href="${whatsappUrl(`Vi o tratamento ${name} no site da Pherface Blumenau e gostaria de mais informações.`)}">${cta} <span>↗</span></a></div>`;
  if (index === 0) item.open = true;
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    [...list.children].forEach(other => { if (other !== item) other.open = false; });
    document.querySelector('#visual-number').textContent = `0${index + 1} — 07`;
    document.querySelector('#visual-caption').textContent = headline;
    document.querySelector('.orb').style.transform = `rotate(${-23 + index * 23}deg)`;
  });
  list.append(item);
});
document.querySelectorAll('[data-wa]').forEach(a => { a.href = whatsappUrl(a.dataset.wa); a.target = '_blank'; a.rel = 'noopener noreferrer'; });
import { initQuiz } from './quiz.js';
initQuiz(document.querySelector('#quiz'));
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
document.querySelector('.tiny-star').innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M12 1v22M1 12h22M4 4l16 16M4 20 20 4"/></svg>';
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
import('./sculpture.js').then(({createSculpture}) => createSculpture(document.querySelector('#hero-sculpture'))).catch(() => {});
