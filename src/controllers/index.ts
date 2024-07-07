import Elysia from "elysia";
import type { ApiResponse } from "../types/response";
import { userController } from "./user-controller";

const controllers = new Elysia()
  .onError(({ code, error, set }) => {
    let status: number;
    switch (code) {
      case "NOT_FOUND":
        status = 404;
        break;
      case "VALIDATION":
        status = 400;
        break;
      default:
        status = 500;
        break;
    }

    set.status = status;
    return {
      status,
      message: error.message,
      data: null,
    } satisfies ApiResponse;
  })
  .onAfterHandle(({ response }) => {
    return {
      status: 200,
      message: "Success",
      data: response as ApiResponse["data"],
    } satisfies ApiResponse;
  })
  .use(userController);

export default controllers;
