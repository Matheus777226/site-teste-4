import test from 'node:test';
import assert from 'node:assert/strict';
import { treatments, interests, whatsappUrl, interestMessage } from '../src/data.js';
test('Cada tratamento gera uma mensagem específica para o telefone correto', () => {
  assert.equal(treatments.length, 7);
  for(const [name] of treatments){
    const url = new URL(whatsappUrl(`Quero informações sobre ${name}.`));
    assert.equal(url.hostname,'wa.me');
    assert.equal(url.pathname,'/5547996203106');
    assert.equal(url.searchParams.get('text'),`Olá! Quero informações sobre ${name}.`);
  }
});
test('Questionário preserva a intenção, inclusive quando o visitante ainda não sabe', () => {
  for(const interest of interests){
    const message = new URL(whatsappUrl(interestMessage(interest))).searchParams.get('text');
    assert.ok(message.includes('avaliação'));
    assert.ok(message.includes(interest === 'Ainda não sei' ? 'entender os cuidados' : interest));
    assert.ok(!message.includes('undefined'));
  }
});
