import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import controllers from './controllers';

const app = new Elysia({
  prefix: '/api',
})
  .use(swagger())
  .use(controllers)
  .get('/', () => 'Hello, world!')
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
