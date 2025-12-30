import { pgTable, text, serial, integer, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  role: text("role").default("student"), // student, parent, admin
  childId: varchar("child_id"), // For parents to link to students
  profileImageUrl: text("profile_image_url"),
  bio: text("bio"),
  grade: text("grade"),
  studentId: text("student_id"), // Unique school student ID
  parentPhone: text("parent_phone"), // For student profile
  medicalInfo: text("medical_info"), // Emergency info
  achievements_data: jsonb("achievements_data").default([]), // Individual accomplishments
  interests: text("interests").array(), // For student personalization
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const sessions = pgTable("sessions", {
  sid: text("sid").primaryKey(),
  sess: jsonb("sess").notNull(),
  expire: timestamp("expire").notNull(),
});

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
  achievements: jsonb("achievements"),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").references(() => teams.id).notNull(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  role: text("role").notNull(),
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  date: timestamp("date").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: timestamp("date").notNull(),
  type: text("type").notNull(),
  recipientId: varchar("recipient_id"), // Can be userId or teamId
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
  priority: text("priority").default("medium"),
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
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true, updatedAt: true });
export const insertCompetitionSchema = createInsertSchema(competitions).omit({ id: true });
export const insertTeamSchema = createInsertSchema(teams).omit({ id: true });
export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true });
export const insertActivitySchema = createInsertSchema(activities).omit({ id: true });
export const insertAchievementSchema = createInsertSchema(achievements).omit({ id: true });
export const insertTaskSchema = createInsertSchema(tasks).omit({ id: true });
export const insertAttendanceSchema = createInsertSchema(attendance).omit({ id: true });
export const insertEventSchema = createInsertSchema(events).omit({ id: true });

// Types
export type Competition = typeof competitions.$inferSelect;
export type Team = typeof teams.$inferSelect;
export type Task = typeof tasks.$inferSelect;
export type Attendance = typeof attendance.$inferSelect;
export type Activity = typeof activities.$inferSelect;
export type Achievement = typeof achievements.$inferSelect;
export type Event = typeof events.$inferSelect;
