import Elysia from 'elysia';
import { taskRepository } from '../repositories';
import { NewTask } from '../db/schema';

export const taskService = new Elysia({
  name: 'taskService',
})
  .use(taskRepository)
  .derive(
    {
      as: 'global',
    },
    ({ repository }) => ({
      service: {
        createTask: async (task: NewTask) => {
          return await repository.create(task);
        },
        getTaskById: async (id: number) => {
          return await repository.findById(id);
        },
        getTasksByUserId: async (userId: number) => {
          return await repository.findByUserId(userId);
        },
        updateTask: async (id: number, task: Partial<NewTask>) => {
          return await repository.update(id, task);
        },
        deleteTask: async (id: number) => {
          return await repository.delete(id);
        },
      },
    })
  );
