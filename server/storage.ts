import { db } from "./db";
import { eq, and } from "drizzle-orm";
import {
  users, competitions, teams, activities, achievements, tasks, attendance, events,
  type User, type Competition, type Team, type Activity, type Achievement, type Task, type Attendance, type Event, type InsertUser
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser & { id: string }): Promise<User>;
  updateUserRole(id: string, role: string): Promise<User>;
  getStudents(): Promise<User[]>;
  
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
  getTasksByUserId(userId: string): Promise<Task[]>;
  createTask(task: any): Promise<Task>;
  updateTask(id: number, updates: Partial<Task>): Promise<Task>;

  // Attendance
  getAttendance(): Promise<Attendance[]>;
  getAttendanceByUserId(userId: string): Promise<Attendance[]>;
  markAttendance(attendance: any): Promise<Attendance>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: any): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUserRole(id: string, role: string): Promise<User> {
    const [user] = await db.update(users).set({ 
      role,
      updatedAt: new Date()
    }).where(eq(users.id, id)).returning();
    return user;
  }

  async getStudents(): Promise<User[]> {
    return await db.select().from(users).where(eq(users.role, "student"));
  }

  async getCompetitions(): Promise<Competition[]> {
    return await db.select().from(competitions);
  }

  async getCompetition(id: number): Promise<Competition | undefined> {
    const [competition] = await db.select().from(competitions).where(eq(competitions.id, id));
    return competition;
  }

  async getActivities(): Promise<Activity[]> {
    return await db.select().from(activities);
  }

  async getAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements);
  }

  async getEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }

  async getTeams(): Promise<Team[]> {
    return await db.select().from(teams);
  }

  async getTasks(): Promise<Task[]> {
    return await db.select().from(tasks);
  }

  async getTasksByUserId(userId: string): Promise<Task[]> {
    return await db.select().from(tasks).where(eq(tasks.assignedTo, userId));
  }

  async createTask(task: any): Promise<Task> {
    const [newTask] = await db.insert(tasks).values(task).returning();
    return newTask;
  }

  async updateTask(id: number, updates: Partial<Task>): Promise<Task> {
    const [task] = await db.update(tasks).set(updates).where(eq(tasks.id, id)).returning();
    return task;
  }

  async getAttendance(): Promise<Attendance[]> {
    return await db.select().from(attendance);
  }

  async getAttendanceByUserId(userId: string): Promise<Attendance[]> {
    return await db.select().from(attendance).where(eq(attendance.userId, userId));
  }

  async markAttendance(att: any): Promise<Attendance> {
    const [newAtt] = await db.insert(attendance).values(att).returning();
    return newAtt;
  }
}

export const storage = new DatabaseStorage();
