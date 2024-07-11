import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["todo", "in_progress", "done"]);

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: varchar("title", {
    length: 255,
  })
    .notNull()
    .unique(),
  description: text("description"),
  status: statusEnum("status"),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export type NewTask = typeof tasks.$inferInsert

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", {
    length: 255,
  })
    .notNull()
    .unique(),
});
