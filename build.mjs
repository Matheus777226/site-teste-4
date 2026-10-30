import { cp, mkdir, rm } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await mkdir('dist');
for (const file of ['index.html', 'src', 'public']) await cp(file, `dist/${file}`, { recursive: true });
await cp('public/robots.txt', 'dist/robots.txt');
console.log('Build concluído em dist/');
