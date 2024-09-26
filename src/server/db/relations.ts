import { relations } from "drizzle-orm";
import { events, groups, userEvents, userGroups, users } from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
  userGroups: many(userGroups),
  userEvents: many(userEvents),
}));

export const groupsRelations = relations(groups, ({ many }) => ({
  userGroups: many(userGroups),
  events: many(events),
}));

export const eventsRelations = relations(events, ({ many }) => ({
  userEvents: many(userEvents),
}));

export const userGroupsRelations = relations(userGroups, ({ one }) => ({
  user: one(users, {
    fields: [userGroups.userId],
    references: [users.userId],
  }),
  group: one(groups, {
    fields: [userGroups.groupId],
    references: [groups.groupId],
  }),
}));

export const userEventsRelations = relations(userEvents, ({ one }) => ({
  user: one(users, {
    fields: [userEvents.userId],
    references: [users.userId],
  }),
  event: one(events, {
    fields: [userEvents.eventId],
    references: [events.eventId],
  }),
}));
