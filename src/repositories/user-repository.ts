import { eq } from "drizzle-orm";
import Elysia from "elysia";
import { db } from "../db";
import { users } from "../db/schema";

export const userRepository = new Elysia({
  name: "userRepository",
}).derive(
  {
    as: "global",
  },
  () => ({
    repository: {
      create: async (name: string) => {
        return await db.insert(users).values({ name }).returning();
      },
      findById: async (id: number) => {
        return await db.query.users.findFirst({
          where: eq(users.id, id),
        });
      },
    },
  }),
);
