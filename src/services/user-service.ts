import { Elysia } from "elysia";
import { userRepository } from "../repositories";

export const userService = new Elysia({ name: "userService" })
  .use(userRepository)
  .derive(
    {
      as: "global",
    },
    ({ repository }) => ({
      service: {
        createUser: async (name: string) => {
          return await repository.create(name);
        },
        getUserById: async (id: number) => {
          return await repository.findById(id);
        },
      },
    }),
  );
