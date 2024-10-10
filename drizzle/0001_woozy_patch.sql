CREATE TABLE IF NOT EXISTS "eve_event_sections" (
	"section_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text
);
--> statement-breakpoint
ALTER TABLE "eve_events" ADD COLUMN "section_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eve_events" ADD CONSTRAINT "eve_events_section_id_eve_event_sections_section_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."eve_event_sections"("section_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
