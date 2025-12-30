import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { api, buildUrl } from "@shared/routes";
import { competitions, activities, achievements, events, teams, tasks, attendance, users } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Auth setup
  await setupAuth(app);
  registerAuthRoutes(app);

  // Public Routes
  app.get(api.competitions.list.path, async (_req, res) => {
    const data = await storage.getCompetitions();
    res.json(data);
  });

  app.get(api.activities.list.path, async (_req, res) => {
    const data = await storage.getActivities();
    res.json(data);
  });

  app.get(api.achievements.list.path, async (_req, res) => {
    const data = await storage.getAchievements();
    res.json(data);
  });

  app.get(api.events.list.path, async (_req, res) => {
    const data = await storage.getEvents();
    res.json(data);
  });

  app.get(api.teams.list.path, async (_req, res) => {
    const data = await storage.getTeams();
    res.json(data);
  });

  // Protected / Dashboard Routes
  app.get(api.tasks.list.path, async (_req, res) => {
    const data = await storage.getTasks();
    res.json(data);
  });

  app.get(api.tasks.getByUser.path, async (req, res) => {
    const data = await storage.getTasksByUserId(req.params.userId);
    res.json(data);
  });

  app.post(api.tasks.create.path, async (req, res) => {
    const data = await storage.createTask(req.body);
    res.status(201).json(data);
  });

  app.patch(api.tasks.update.path, async (req, res) => {
    const data = await storage.updateTask(Number(req.params.id), req.body);
    res.json(data);
  });

  app.get(api.attendance.list.path, async (_req, res) => {
    const data = await storage.getAttendance();
    res.json(data);
  });

  app.get(api.attendance.getByUser.path, async (req, res) => {
    const data = await storage.getAttendanceByUserId(req.params.userId);
    res.json(data);
  });

  app.post(api.attendance.mark.path, async (req, res) => {
    const data = await storage.markAttendance(req.body);
    res.status(201).json(data);
  });

  app.get(api.users.listStudents.path, async (_req, res) => {
    const data = await storage.getStudents();
    res.json(data);
  });

  app.get(api.users.get.path, async (req, res) => {
    const user = await storage.getUser(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingUsers = await storage.getStudents();
  if (existingUsers.length === 0) {
    // Create mock users for testing as requested
    // Student: student1 / password123
    // Parent: parent1 / password123
    // Admin: admin1 / password123
    
    await storage.createUser({
      id: "student-1",
      username: "student1",
      password: "password123",
      email: "student@stemclub.com",
      firstName: "Alex",
      lastName: "Racer",
      role: "student",
      grade: "10"
    });

    await storage.createUser({
      id: "admin-1",
      username: "admin1",
      password: "password123",
      email: "admin@stemclub.com",
      firstName: "Club",
      lastName: "Manager",
      role: "admin"
    });

    const parent = await storage.createUser({
      id: "parent-1",
      username: "parent1",
      password: "password123",
      email: "parent@stemclub.com",
      firstName: "John",
      lastName: "Racer",
      role: "parent",
      childId: "student-1"
    });

    await db.insert(competitions).values([
      { title: "F1 in Schools", description: "Design and race miniature F1 cars.", type: "F1", date: new Date("2025-06-15"), status: "upcoming" },
      { title: "4x4 RC Car Challenge", description: "Off-road remote control car competition.", type: "4x4", date: new Date("2025-05-20"), status: "upcoming" },
      { title: "Drift Racing", description: "Precision drifting competition.", type: "Drift", date: new Date("2025-04-10"), status: "active" },
    ]);

    await db.insert(tasks).values([
      { title: "Aerodynamics Draft", description: "Complete the initial CFD analysis for the front wing.", assignedTo: "student-1", status: "pending", priority: "high", dueDate: new Date("2025-01-20") },
      { title: "Telemetry Setup", description: "Calibrate the speed sensors for the drift car.", assignedTo: "student-1", status: "completed", priority: "medium", dueDate: new Date("2025-01-10") },
    ]);

    await db.insert(attendance).values([
      { userId: "student-1", date: new Date("2025-01-08"), status: "present" },
      { userId: "student-1", date: new Date("2025-01-09"), status: "present" },
    ]);
  }
}
