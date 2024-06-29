import { Elysia } from 'elysia';

const app = new Elysia()
  .state('name', 'Elysia')
  .get('/', () => `Hello, world!`)
  .decorate('logger', (value: unknown) => {
    console.log(value);
  })
  .get('/hi', () => 'Hi Agus!')
  .get('/hi/:name', ({ params: { name = 'Anonymous' } }) => `Hi, ${name}!`)
  .onError(({ code }) => {
    if (code === 'NOT_FOUND') {
      return 'Whoops! Not found!';
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
