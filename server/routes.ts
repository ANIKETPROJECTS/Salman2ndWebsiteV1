import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { api } from "@shared/routes";
import { z } from "zod";
import { competitions, activities, achievements, events, teams, tasks, attendance } from "@shared/schema";
import { db } from "./db";

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

  app.get(api.competitions.get.path, async (req, res) => {
    const data = await storage.getCompetition(Number(req.params.id));
    if (!data) return res.status(404).json({ message: "Competition not found" });
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

  // Protected / Dashboard Routes (Auth middleware can be added here)
  app.get(api.tasks.list.path, async (_req, res) => {
    const data = await storage.getTasks();
    res.json(data);
  });

  app.patch(api.tasks.update.path, async (req, res) => {
    try {
      const updates = api.tasks.update.input.parse(req.body);
      const data = await storage.updateTask(Number(req.params.id), updates);
      res.json(data);
    } catch (error) {
       res.status(400).json({ message: "Invalid input" });
    }
  });

  app.get(api.attendance.list.path, async (_req, res) => {
    const data = await storage.getAttendance();
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
  const existingCompetitions = await storage.getCompetitions();
  if (existingCompetitions.length === 0) {
    await db.insert(competitions).values([
      { title: "F1 in Schools", description: "Design and race miniature F1 cars.", type: "F1", date: new Date("2025-06-15"), status: "upcoming" },
      { title: "4x4 RC Car Challenge", description: "Off-road remote control car competition.", type: "4x4", date: new Date("2025-05-20"), status: "upcoming" },
      { title: "Drift Racing", description: "Precision drifting competition.", type: "Drift", date: new Date("2025-04-10"), status: "active" },
    ]);

    await db.insert(activities).values([
      { title: "Aerodynamics Workshop", type: "Workshop", date: new Date("2025-01-15"), description: "Learn about drag and lift." },
      { title: "Guest Speaker: F1 Engineer", type: "Visit", date: new Date("2025-02-01"), description: "Q&A with a real F1 engineer." },
    ]);

    await db.insert(achievements).values([
      { title: "National Champions", date: new Date("2022-06-26"), type: "Trophy", description: "Team AEOLIAN won the National Finals." },
      { title: "8th in World Finals", date: new Date("2023-09-15"), type: "Trophy", description: "Team AEOLIAN placed 8th globally in Singapore." },
    ]);
    
    await db.insert(teams).values([
        { name: "Team AEOLIAN", competitionId: 1, achievements: ["National Champions 2022", "8th in World 2023"] },
        { name: "Team V3", competitionId: 2, achievements: ["4x4 Development Champions"] },
    ]);
    
    await db.insert(events).values([
        { title: "Club Orientation", date: new Date("2025-09-01"), type: "Meeting", location: "Auditorium" },
    ]);
  }
}
