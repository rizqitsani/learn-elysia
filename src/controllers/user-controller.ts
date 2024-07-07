import Elysia, { NotFoundError, t } from "elysia";
import { userService } from "../services";

export const userController = new Elysia({
  prefix: "/users",
})
  .use(userService)
  .post(
    "/",
    async ({ body, service }) => {
      return await service.createUser(body.name);
    },
    {
      body: t.Object({
        name: t.String(),
      }),
    },
  )
  .get(
    "/:id",
    async ({ params: { id }, service }) => {
      const user = await service.getUserById(Number(id));

      if (!user) {
        throw new NotFoundError("User not found");
      }

      return user;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    },
  );
