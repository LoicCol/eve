ALTER TABLE "eve_events" RENAME COLUMN "event_date" TO "start_date_time";--> statement-breakpoint
ALTER TABLE "eve_events" ALTER COLUMN "start_date_time" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "eve_events" ALTER COLUMN "created_by" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "eve_events" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "eve_events" ADD COLUMN "end_date_time" timestamp with time zone;