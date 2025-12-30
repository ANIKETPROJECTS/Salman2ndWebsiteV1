import { db } from "./db";
import { eq } from "drizzle-orm";
import {
  users, competitions, teams, activities, achievements, tasks, attendance, events,
  type User, type Competition, type Team, type Activity, type Achievement, type Task, type Attendance, type Event
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  updateUserRole(id: string, role: string): Promise<User>;
  
  // Competitions
  getCompetitions(): Promise<Competition[]>;
  getCompetition(id: number): Promise<Competition | undefined>;

  // Activities
  getActivities(): Promise<Activity[]>;

  // Achievements
  getAchievements(): Promise<Achievement[]>;

  // Events
  getEvents(): Promise<Event[]>;

  // Teams
  getTeams(): Promise<Team[]>;

  // Tasks
  getTasks(): Promise<Task[]>;
  updateTask(id: number, updates: Partial<Task>): Promise<Task>;

  // Attendance
  getAttendance(): Promise<Attendance[]>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async updateUserRole(id: string, role: string): Promise<User> {
    const [user] = await db.update(users).set({ role }).where(eq(users.id, id)).returning();
    return user;
  }

  // Competitions
  async getCompetitions(): Promise<Competition[]> {
    return await db.select().from(competitions);
  }

  async getCompetition(id: number): Promise<Competition | undefined> {
    const [competition] = await db.select().from(competitions).where(eq(competitions.id, id));
    return competition;
  }

  // Activities
  async getActivities(): Promise<Activity[]> {
    return await db.select().from(activities);
  }

  // Achievements
  async getAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements);
  }

  // Events
  async getEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }

  // Teams
  async getTeams(): Promise<Team[]> {
    return await db.select().from(teams);
  }

  // Tasks
  async getTasks(): Promise<Task[]> {
    return await db.select().from(tasks);
  }

  async updateTask(id: number, updates: Partial<Task>): Promise<Task> {
    const [task] = await db.update(tasks).set(updates).where(eq(tasks.id, id)).returning();
    return task;
  }

  // Attendance
  async getAttendance(): Promise<Attendance[]> {
    return await db.select().from(attendance);
  }
}

export const storage = new DatabaseStorage();
