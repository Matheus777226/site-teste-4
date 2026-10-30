import test from 'node:test';
import assert from 'node:assert/strict';
import { quiz2 } from '../src/quiz-2-data.js';
import { quizWhatsappUrl } from '../src/quiz-data.js';
test('120 combinações do segundo quiz preservam valores, serviço relacionado, emojis e acentos', () => {
  let count = 0;
  const expected = ['Botox','Preenchimento de Olheiras','Preenchimento Labial','Preenchimento Bigode Chinês','Harmonização Corporal','Avaliação personalizada'];
  for(const [index,region] of quiz2.steps[0].options.entries()) for(const goal of quiz2.steps[1].options) for(const next of quiz2.steps[2].options) {
    const url = new URL(quizWhatsappUrl({region:region.id,goal:goal.id,next_step:next.id},quiz2));
    const text=url.searchParams.get('text');
    assert.equal(url.origin+url.pathname,'https://wa.me/5547996203106');
    for(const value of [region.value,goal.value,next.value,expected[index],'📍','✨','💬'])assert.ok(text.includes(value));
    assert.ok(text.includes('\n\n'));
    assert.ok(!text.includes('%0A'));
    count++;
  }
  assert.equal(count,120);
  assert.throws(()=>quizWhatsappUrl({region:'lips'},quiz2));
});
