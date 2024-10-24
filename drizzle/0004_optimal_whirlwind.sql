CREATE TABLE IF NOT EXISTS "eve_event_links" (
	"link_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_id" uuid,
	"link_name" text NOT NULL,
	"link" text NOT NULL,
	"created_by" text,
	"created_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eve_event_links" ADD CONSTRAINT "eve_event_links_event_id_eve_events_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."eve_events"("event_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
