import { quiz, quizLabels, quizWhatsappUrl } from './quiz-data.js';

const arrow = '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true"><path d="M4 16 16 4M4 4h12v12"/></svg>';
const whatsapp = '<svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-12 7L3 20l1.5-5a8 8 0 1 1 15.5-3.5Z"/><path d="M8 7c-2 3 3 8 6 7l1-2-3-1-1 1-2-2 1-1Z"/></svg>';

export function initQuiz(root) {
  let step = 0, timer, started = false, locked = false;
  const answers = {};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  // In-page integration hooks only. No vendor SDK, cookies or network requests.
  function track(event) {
    const detail = { event, quiz_name: 'pherface_qualification', ...answers };
    window.dispatchEvent(new CustomEvent('pherface:quiz', { detail }));
    if (Array.isArray(window.dataLayer)) window.dataLayer.push({ ...detail });
  }
  function render(focus = false) {
    clearTimeout(timer); locked = false;
    const result = step === 3;
    const current = quiz.steps[step];
    root.innerHTML = `<div class="quiz-progress-label"><span>${result ? 'SUAS RESPOSTAS, SEU PRÓXIMO PASSO' : 'SEU CUIDADO COMEÇA COM UMA CONVERSA'}</span><span>${result ? 'CONCLUÍDO' : `${step + 1} / 3`}</span></div><div class="quiz-progress" role="progressbar" aria-label="Progresso do questionário" aria-valuemin="0" aria-valuemax="3" aria-valuenow="${result ? 3 : step + 1}"><span style="width:${(result ? 3 : step + 1) / 3 * 100}%"></span></div><div class="quiz-screen ${result ? 'quiz-result' : ''}"></div>`;
    const screen = root.querySelector('.quiz-screen');
    if (result) {
      const labels = quizLabels(answers);
      screen.innerHTML = `<p class="eyebrow">PRONTO</p><h3 tabindex="-1">Agora a gente já conhece um pouco mais<br><em>sobre o que você procura.</em></h3><p class="quiz-description">Envie suas respostas para nossa equipe e continue a conversa pelo WhatsApp.</p><div class="quiz-summary"><h4>Seu interesse</h4><dl>${['Principal interesse','Principal prioridade','Objetivo da conversa'].map((field, i) => `<div><dt>${field}</dt><dd>${labels[i]}</dd></div>`).join('')}</dl></div><p class="quiz-personal">${quiz.microcopy[answers.main_interest]}</p><a class="button quiz-send" id="evaluation-cta" href="${quizWhatsappUrl(answers)}" target="_blank" rel="noopener noreferrer">${whatsapp} Continuar no WhatsApp ${arrow}</a><p class="quiz-disclaimer">As respostas não representam uma indicação de tratamento. A definição de qualquer procedimento depende de avaliação individual realizada por profissional habilitado.</p><div class="quiz-result-actions"><button type="button" class="quiz-back">← Revisar respostas</button><button type="button" class="quiz-reset">Recomeçar</button></div>`;
      screen.querySelector('.quiz-send').addEventListener('click', () => track('quiz_whatsapp_clicked'));
      screen.querySelector('.quiz-reset').addEventListener('click', () => {
        Object.keys(answers).forEach(key => delete answers[key]); started = false; step = 0; render(true);
      });
    } else {
      screen.innerHTML = `<h3 id="quiz-question" tabindex="-1">${current.question}</h3><p class="quiz-description" id="quiz-subtitle">${current.subtitle}</p><div class="quiz-options ${step === 0 ? 'visual-options' : ''}" role="group" aria-labelledby="quiz-question" aria-describedby="quiz-subtitle"></div><div class="quiz-controls">${step ? '<button type="button" class="quiz-back">← Voltar</button>' : '<span>ESCOLHA UMA OPÇÃO PARA CONTINUAR</span>'}<span class="quiz-feedback" role="status" aria-live="polite"></span></div>`;
      const options = screen.querySelector('.quiz-options');
      current.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.type = 'button'; button.className = 'quiz-option'; button.style.setProperty('--option-index', index);
        button.setAttribute('aria-pressed', String(answers[current.id] === option.id));
        button.innerHTML = `<span class="option-copy"><span class="option-number">0${index + 1}</span><strong>${option.label}</strong>${option.description ? `<span class="option-description">${option.description}</span>` : ''}</span><span class="option-check" aria-hidden="true"></span>`;
        button.addEventListener('click', () => {
          if (locked) return;
          locked = true;
          answers[current.id] = option.id;
          if (!started) { started = true; track('quiz_started'); }
          options.querySelectorAll('button').forEach(b => { b.setAttribute('aria-pressed', String(b === button)); b.setAttribute('aria-disabled', 'true'); });
          screen.querySelector('.quiz-feedback').textContent = 'Escolha confirmada';
          screen.classList.add('is-confirmed');
          track(step === 2 ? 'quiz_completed' : `quiz_step_${step + 1}_completed`);
          timer = setTimeout(() => { step++; render(true); }, reduced.matches ? 0 : 400);
        });
        options.append(button);
      });
    }
    screen.querySelector('.quiz-back')?.addEventListener('click', () => {
      clearTimeout(timer); step--; render(true);
    });
    if (focus) {
      screen.querySelector('h3').focus({ preventScroll: true });
      const top = root.getBoundingClientRect().top;
      if(top < 10 || top > innerHeight / 2) root.scrollIntoView({behavior: reduced.matches ? 'instant' : 'smooth', block: 'start'});
    }
  }
  render();
}
