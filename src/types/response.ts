export type ApiResponse<T extends Record<string, unknown> = {}> = {
  status: number;
  message: string;
  data: T | null;
};
