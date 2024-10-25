import { defineConfig } from "drizzle-kit";

import { env } from "env";
import { config } from "dotenv";
import { neonConfig } from "@neondatabase/serverless";

if (process.env.VERCEL_ENV === "development") {
  neonConfig.wsProxy = (host) => `${host}:54330/v1`;
  neonConfig.useSecureWebSocket = false;
  neonConfig.pipelineTLS = false;
  neonConfig.pipelineConnect = false;
}

config({ path: ".env" });

console.log("env", env, process.env.VERCEL_ENV);

export default defineConfig({
  schema: "./server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  tablesFilter: ["eve_*"],
});
