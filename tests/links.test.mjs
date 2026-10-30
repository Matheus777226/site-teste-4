import test from 'node:test';
import assert from 'node:assert/strict';
import { services, whatsappUrl } from '../src/data.js';
import { treatmentImages } from '../src/treatment-images.js';
import { access, readFile } from 'node:fs/promises';
test('Somente os cinco serviços confirmados, com imagens existentes e links exatos', async () => {
 assert.deepEqual(services.map(s=>s.name),['Harmonização Corporal','Botox','Preenchimento Bigode Chinês','Preenchimento de Olheiras','Preenchimento Labial']);
 assert.equal(treatmentImages.length,5);
 for(let i=0;i<services.length;i++){
  const service=services[i],url=new URL(whatsappUrl(service.message));
  assert.equal(url.origin+url.pathname,'https://wa.me/5547996203106');
  assert.equal(url.searchParams.get('text'),service.message);
  await access('.'+treatmentImages[i].src);
 }
 const html=await readFile('index.html','utf8');
 assert.equal((html.match(/id="tratamentos"/g)||[]).length,1);
 assert.equal((html.match(/class="evaluation section/g)||[]).length,1);
 assert.equal((html.match(/id="avaliacao"/g)||[]).length,1);
 assert.ok(!html.includes('id="quiz"'));
 for(const word of ['Lavieen','Ultraformer','Rinomodelação','Bioestimuladores','Preenchimento Facial'])assert.ok(!html.includes(word));
});
