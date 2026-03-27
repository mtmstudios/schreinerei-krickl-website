import { type User, type InsertUser, type Inquiry, type InsertInquiry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Portal inquiries
  getInquiries(filters?: { status?: string; source?: string }): Promise<Inquiry[]>;
  getInquiry(id: string): Promise<Inquiry | undefined>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  updateInquiry(id: string, patch: Partial<Pick<Inquiry, "status" | "internalNotes">>): Promise<Inquiry | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private inquiries: Map<string, Inquiry>;

  constructor() {
    this.users = new Map();
    this.inquiries = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getInquiries(filters?: { status?: string; source?: string }): Promise<Inquiry[]> {
    let list = Array.from(this.inquiries.values());
    if (filters?.status) list = list.filter((i) => i.status === filters.status);
    if (filters?.source) list = list.filter((i) => i.source === filters.source);
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getInquiry(id: string): Promise<Inquiry | undefined> {
    return this.inquiries.get(id);
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = randomUUID();
    const inquiry: Inquiry = {
      id,
      createdAt: new Date(),
      source: insertInquiry.source,
      callerPhone: insertInquiry.callerPhone ?? null,
      callerName: insertInquiry.callerName ?? null,
      callerEmail: insertInquiry.callerEmail ?? null,
      subject: insertInquiry.subject ?? null,
      summary: insertInquiry.summary ?? null,
      intent: insertInquiry.intent ?? null,
      sentiment: insertInquiry.sentiment ?? null,
      emailBody: insertInquiry.emailBody ?? null,
      status: insertInquiry.status ?? "new",
      internalNotes: insertInquiry.internalNotes ?? null,
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async updateInquiry(
    id: string,
    patch: Partial<Pick<Inquiry, "status" | "internalNotes">>,
  ): Promise<Inquiry | undefined> {
    const existing = this.inquiries.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...patch };
    this.inquiries.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
