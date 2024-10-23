ALTER TABLE "eve_events" RENAME COLUMN "start_date_time" TO "start_date";--> statement-breakpoint
ALTER TABLE "eve_events" RENAME COLUMN "end_date_time" TO "end_date";--> statement-breakpoint
ALTER TABLE "eve_events" ADD COLUMN "start_time" time with time zone;--> statement-breakpoint
ALTER TABLE "eve_events" ADD COLUMN "end_time" time with time zone;