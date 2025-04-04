import { users, type User, type InsertUser, portfolios, type Portfolio, type InsertPortfolio, type PortfolioRecord } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createPortfolio(portfolio: Omit<InsertPortfolio, "createdAt" | "updatedAt">): Promise<PortfolioRecord>;
  getPortfolio(id: number): Promise<PortfolioRecord | undefined>;
  updatePortfolio(id: number, data: Portfolio): Promise<PortfolioRecord | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private portfolioRecords: Map<number, PortfolioRecord>;
  userCurrentId: number;
  portfolioCurrentId: number;

  constructor() {
    this.users = new Map();
    this.portfolioRecords = new Map();
    this.userCurrentId = 1;
    this.portfolioCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createPortfolio(insertPortfolio: Omit<InsertPortfolio, "createdAt" | "updatedAt">): Promise<PortfolioRecord> {
    const id = this.portfolioCurrentId++;
    const now = new Date().toISOString();
    const portfolio: PortfolioRecord = { 
      ...insertPortfolio, 
      id,
      createdAt: now,
      updatedAt: now
    };
    this.portfolioRecords.set(id, portfolio);
    return portfolio;
  }

  async getPortfolio(id: number): Promise<PortfolioRecord | undefined> {
    return this.portfolioRecords.get(id);
  }

  async updatePortfolio(id: number, data: Portfolio): Promise<PortfolioRecord | undefined> {
    const portfolio = this.portfolioRecords.get(id);
    if (!portfolio) return undefined;
    
    const updatedPortfolio: PortfolioRecord = {
      ...portfolio,
      data,
      updatedAt: new Date().toISOString()
    };
    
    this.portfolioRecords.set(id, updatedPortfolio);
    return updatedPortfolio;
  }
}

export const storage = new MemStorage();
