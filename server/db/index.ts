import { drizzle } from "drizzle-orm/vercel-postgres";
import * as schema from "./schema";
import * as relations from "./relations";
import { sql } from "server/db/db";

export const db = drizzle(sql, { schema: { ...schema, ...relations } });
