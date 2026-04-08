import { decimal, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const vilaSoniaIndicators = mysqlTable("vila_sonia_indicators", {
  id: int("id").autoincrement().primaryKey(),
  populationTotal: int("population_total"),
  populationBlack: int("population_black"),
  populationPardo: int("population_pardo"),
  populationWhite: int("population_white"),
  populationYellow: int("population_yellow"),
  populationIndigenous: int("population_indigenous"),
  percentageBlackPardo: decimal("percentage_black_pardo", { precision: 10, scale: 2 }),
  incomePerCapita: decimal("income_per_capita", { precision: 12, scale: 2 }),
  idhM: decimal("idh_m", { precision: 5, scale: 3 }),
  averageDeathAge: decimal("average_death_age", { precision: 5, scale: 2 }),
  culturalEquipments: int("cultural_equipments"),
  culturalVulnerability: decimal("cultural_vulnerability", { precision: 10, scale: 2 }),
  dataSource: varchar("data_source", { length: 255 }),
  lastUpdated: timestamp("last_updated").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type VilaSoniaIndicators = typeof vilaSoniaIndicators.$inferSelect;
export type InsertVilaSoniaIndicators = typeof vilaSoniaIndicators.$inferInsert;

// TODO: Add your tables here