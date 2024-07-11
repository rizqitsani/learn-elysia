import Elysia, { NotFoundError, t } from 'elysia';
import { taskService } from '../services';

export const taskController = new Elysia({
  prefix: '/tasks',
})
  .use(taskService)
  .post(
    '/',
    async ({ body, service }) => {
      return await service.createTask(body);
    },
    {
      body: t.Object({
        userId: t.Number(),
        title: t.String(),
        description: t.String(),
      }),
    }
  )
  .get(
    '/',
    async ({ query, service }) => {
      return await service.getTasksByUserId(Number(query.userId));
    },
    {
      query: t.Object({
        userId: t.String(),
      }),
    }
  )
  .get(
    '/:id',
    async ({ params: { id }, query, service }) => {
      const task = await service.getTaskById(Number(id));

      if (!task) {
        throw new NotFoundError('Task not found');
      }

      return task;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .put(
    '/:id',
    async ({ body, params: { id }, service }) => {
      return await service.updateTask(Number(id), body);
    },
    {
      body: t.Partial(
        t.Object({
          userId: t.Number(),
          title: t.String(),
          description: t.String(),
        })
      ),
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .delete('/:id', async ({ params: { id }, service }) => {
    return await service.deleteTask(Number(id));
  });
