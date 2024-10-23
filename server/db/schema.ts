import {
  pgTableCreator,
  text,
  timestamp,
  uuid,
  primaryKey,
  time,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `eve_${name}`);

export const users = createTable("users", {
  userId: text("user_id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  image: text("image"),
});

export const groups = createTable("groups", {
  groupId: uuid("group_id").defaultRandom().primaryKey(),
  groupName: text("name").notNull(),
  description: text("description"),
  createdBy: text("created_by").notNull(),
  createdAt: timestamp("created_at").notNull(),
});

export const events = createTable("events", {
  eventId: uuid("event_id").defaultRandom().primaryKey(),
  groupId: uuid("group_id").references(() => groups.groupId, {
    onDelete: "cascade",
  }),
  sectionId: uuid("section_id").references(() => eventSections.sectionId, {
    onDelete: "cascade",
  }),
  eventName: text("name").notNull(),
  description: text("description"),
  location: text("location").notNull(),
  startDate: timestamp("start_date", { withTimezone: true }).notNull(),
  startTime: time("start_time", { withTimezone: true }),
  endDate: timestamp("end_date", { withTimezone: true }),
  endTime: time("end_time", { withTimezone: true }),
  createdBy: text("created_by"),
  createdAt: timestamp("created_at"),
});

export const eventLinks = createTable("event_links", {
  linkId: uuid("link_id").defaultRandom().primaryKey(),
  eventId: uuid("event_id").references(() => events.eventId, {
    onDelete: "cascade",
  }),
  linkName: text("link_name").notNull(),
  link: text("link").notNull(),
  createdBy: text("created_by"),
  createdAt: timestamp("created_at"),
});

export const userGroups = createTable(
  "user_groups",
  {
    userId: text("user_id").references(() => users.userId, {
      onDelete: "cascade",
    }),
    groupId: uuid("group_id").references(() => groups.groupId, {
      onDelete: "cascade",
    }),
    joinedAt: timestamp("joined_at").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.groupId] }),
  }),
);

export const userEvents = createTable(
  "user_events",
  {
    userId: text("user_id").references(() => users.userId, {
      onDelete: "cascade",
    }),
    eventId: uuid("event_id").references(() => events.eventId, {
      onDelete: "cascade",
    }),
    joinedAt: timestamp("joined_at").notNull(),
    status: text("status", { enum: ["participate", "maybe"] }).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.eventId] }),
  }),
);

export const eventSections = createTable("event_sections", {
  sectionId: uuid("section_id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
});
