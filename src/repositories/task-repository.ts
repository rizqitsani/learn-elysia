import Elysia from 'elysia';
import { NewTask, tasks } from '../db/schema';
import { db } from '../db';
import { eq } from 'drizzle-orm';

export const taskRepository = new Elysia({
  name: 'taskRepository',
}).derive(
  {
    as: 'global',
  },
  () => ({
    repository: {
      create: async (task: NewTask) => {
        return await db.insert(tasks).values(task).returning();
      },
      findById: async (id: number) => {
        return await db.query.tasks.findFirst({
          where: eq(tasks.id, id),
        });
      },
      findByUserId: async (userId: number) => {
        return await db.query.tasks.findMany({
          where: eq(tasks.userId, userId),
        });
      },
      update: async (id: number, task: Partial<NewTask>) => {
        return await db
          .update(tasks)
          .set(task)
          .where(eq(tasks.id, id))
          .returning();
      },
      delete: async (id: number) => {
        return await db.delete(tasks).where(eq(tasks.id, id)).returning();
      },
    },
  })
);
