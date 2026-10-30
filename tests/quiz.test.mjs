import test from 'node:test';
import assert from 'node:assert/strict';
import { quiz, quizLabels, quizWhatsappUrl } from '../src/quiz-data.js';

test('Todas as 140 combinações levam as três respostas ao WhatsApp sem dupla codificação', () => {
  let count = 0;
  for (const interest of quiz.steps[0].options) for (const priority of quiz.steps[1].options) for (const intention of quiz.steps[2].options) {
    const answers = { main_interest: interest.id, priority: priority.id, contact_intention: intention.id };
    const url = new URL(quizWhatsappUrl(answers));
    assert.equal(url.origin + url.pathname, 'https://wa.me/5547996203106');
    assert.deepEqual(quizLabels(answers), [interest.label, priority.label, intention.label]);
    const message = url.searchParams.get('text');
    assert.ok(message.includes(`Meu principal interesse: ${interest.label}\nMinha prioridade: ${priority.label}\nO que eu gostaria agora: ${intention.label}`));
    assert.ok(!message.includes('%0A'));
    assert.ok(quiz.microcopy[interest.id]);
    count++;
  }
  assert.equal(count, 140);
});
test('Respostas incompletas ou desconhecidas não geram encaminhamento', () => {
  assert.throws(() => quizWhatsappUrl({}));
  assert.throws(() => quizWhatsappUrl({ main_interest: 'lips', priority: 'fake', contact_intention: 'schedule_evaluation' }));
});
