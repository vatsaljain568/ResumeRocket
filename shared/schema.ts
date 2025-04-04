import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Portfolio related types
export const portfolioSchema = z.object({
  name: z.string().optional(),
  title: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional(),
  about: z.string().optional(),
  experience: z.array(
    z.object({
      position: z.string(),
      company: z.string(),
      duration: z.string(),
      description: z.array(z.string())
    })
  ).optional(),
  education: z.array(
    z.object({
      degree: z.string(),
      institution: z.string(),
      duration: z.string(),
      description: z.string().optional()
    })
  ).optional(),
  skills: z.array(z.string()).optional(),
  projects: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      link: z.string().url().optional()
    })
  ).optional()
});

export type Portfolio = z.infer<typeof portfolioSchema>;

// User schema for the database
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Portfolio schema for the database
export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  data: jsonb("data").notNull().$type<Portfolio>(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull()
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPortfolioSchema = createInsertSchema(portfolios).pick({
  userId: true,
  data: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;
export type PortfolioRecord = typeof portfolios.$inferSelect;
