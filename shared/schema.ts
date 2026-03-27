import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// ── Portal: Anfragen (Anrufe + Chat) ───────────────────────────────────────

export const inquiries = pgTable("inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  source: text("source").notNull(), // "phone" | "chat"
  callerPhone: text("caller_phone"),
  callerName: text("caller_name"),
  callerEmail: text("caller_email"),
  subject: text("subject"),
  summary: text("summary"),
  intent: text("intent"),
  sentiment: text("sentiment"),
  emailBody: text("email_body"),
  status: text("status").notNull().default("new"), // "new" | "in_progress" | "done"
  internalNotes: text("internal_notes"),
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
