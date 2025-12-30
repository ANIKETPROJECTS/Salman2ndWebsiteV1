import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./models/auth";

export * from "./models/auth";

export const competitions = pgTable("competitions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // 'F1', '4x4', 'Drift', 'Robotics'
  date: timestamp("date").notNull(),
  location: text("location"),
  imageUrl: text("image_url"),
  status: text("status").default("upcoming"), // upcoming, active, completed
});

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  competitionId: integer("competition_id").references(() => competitions.id),
  imageUrl: text("image_url"),
  achievements: jsonb("achievements"), // Store badges/medals as JSON
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").references(() => teams.id).notNull(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  role: text("role").notNull(), // 'Driver', 'Engineer', 'Manager'
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(), // 'Workshop', 'Lab', 'Visit'
  date: timestamp("date").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: timestamp("date").notNull(),
  type: text("type").notNull(), // 'Trophy', 'Certificate', 'Badge'
  recipientId: integer("recipient_id"), // Could be team or user ID contextually, simplifying for MVP
  recipientType: text("recipient_type"), // 'user' or 'team'
  description: text("description"),
  imageUrl: text("image_url"),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  assignedTo: varchar("assigned_to").references(() => users.id),
  dueDate: timestamp("due_date"),
  status: text("status").default("pending"), // pending, in_progress, completed, overdue
  priority: text("priority").default("medium"), // low, medium, high
});

export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  date: timestamp("date").notNull(),
  status: text("status").notNull(), // present, absent, late
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: timestamp("date").notNull(),
  description: text("description"),
  type: text("type"),
  location: text("location"),
});

// Schemas
// export const insertUserSchema = createInsertSchema(users).omit({ id: true }); // Users handled by Auth
export const insertCompetitionSchema = createInsertSchema(competitions).omit({ id: true });
export const insertTeamSchema = createInsertSchema(teams).omit({ id: true });
export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true });
export const insertActivitySchema = createInsertSchema(activities).omit({ id: true });
export const insertAchievementSchema = createInsertSchema(achievements).omit({ id: true });
export const insertTaskSchema = createInsertSchema(tasks).omit({ id: true });
export const insertAttendanceSchema = createInsertSchema(attendance).omit({ id: true });
export const insertEventSchema = createInsertSchema(events).omit({ id: true });

// Types
// export type User = typeof users.$inferSelect; // Imported from auth
// export type InsertUser = z.infer<typeof insertUserSchema>;
export type Competition = typeof competitions.$inferSelect;
export type Team = typeof teams.$inferSelect;
export type Task = typeof tasks.$inferSelect;
export type Attendance = typeof attendance.$inferSelect;
export type Activity = typeof activities.$inferSelect;
export type Achievement = typeof achievements.$inferSelect;
export type Event = typeof events.$inferSelect;
