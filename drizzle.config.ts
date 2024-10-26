import { defineConfig } from "drizzle-kit";

import { env } from "env";

export default defineConfig({
  schema: "./server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  tablesFilter: ["eve_*"],
});
