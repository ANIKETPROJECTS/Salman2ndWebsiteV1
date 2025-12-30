import { z } from 'zod';
import { 
  insertUserSchema, insertCompetitionSchema, insertTeamSchema, 
  insertActivitySchema, insertAchievementSchema, insertTaskSchema, 
  insertAttendanceSchema, insertEventSchema,
  users, competitions, teams, activities, achievements, tasks, attendance, events
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  // Public Data
  competitions: {
    list: {
      method: 'GET' as const,
      path: '/api/competitions',
      responses: { 200: z.array(z.custom<typeof competitions.$inferSelect>()) },
    },
    get: {
      method: 'GET' as const,
      path: '/api/competitions/:id',
      responses: { 200: z.custom<typeof competitions.$inferSelect>(), 404: errorSchemas.notFound },
    },
  },
  activities: {
    list: {
      method: 'GET' as const,
      path: '/api/activities',
      responses: { 200: z.array(z.custom<typeof activities.$inferSelect>()) },
    },
  },
  achievements: {
    list: {
      method: 'GET' as const,
      path: '/api/achievements',
      responses: { 200: z.array(z.custom<typeof achievements.$inferSelect>()) },
    },
  },
  events: {
    list: {
      method: 'GET' as const,
      path: '/api/events',
      responses: { 200: z.array(z.custom<typeof events.$inferSelect>()) },
    },
  },
  teams: {
    list: {
      method: 'GET' as const,
      path: '/api/teams',
      responses: { 200: z.array(z.custom<typeof teams.$inferSelect>()) },
    },
  },

  // Protected / Dashboard Data
  tasks: {
    list: {
      method: 'GET' as const,
      path: '/api/tasks',
      responses: { 200: z.array(z.custom<typeof tasks.$inferSelect>()) },
    },
    getByUser: {
      method: 'GET' as const,
      path: '/api/tasks/user/:userId',
      responses: { 200: z.array(z.custom<typeof tasks.$inferSelect>()) },
    },
    update: {
      method: 'PATCH' as const,
      path: '/api/tasks/:id',
      input: insertTaskSchema.partial(),
      responses: { 200: z.custom<typeof tasks.$inferSelect>() },
    },
    create: {
      method: 'POST' as const,
      path: '/api/tasks',
      input: insertTaskSchema,
      responses: { 201: z.custom<typeof tasks.$inferSelect>() },
    }
  },
  attendance: {
    list: {
      method: 'GET' as const,
      path: '/api/attendance',
      responses: { 200: z.array(z.custom<typeof attendance.$inferSelect>()) },
    },
    getByUser: {
      method: 'GET' as const,
      path: '/api/attendance/user/:userId',
      responses: { 200: z.array(z.custom<typeof attendance.$inferSelect>()) },
    },
    mark: {
      method: 'POST' as const,
      path: '/api/attendance',
      input: insertAttendanceSchema,
      responses: { 201: z.custom<typeof attendance.$inferSelect>() },
    }
  },
  users: {
    get: {
      method: 'GET' as const,
      path: '/api/users/:id',
      responses: { 200: z.custom<typeof users.$inferSelect>(), 404: errorSchemas.notFound },
    },
    listStudents: {
      method: 'GET' as const,
      path: '/api/students',
      responses: { 200: z.array(z.custom<typeof users.$inferSelect>()) },
    }
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
