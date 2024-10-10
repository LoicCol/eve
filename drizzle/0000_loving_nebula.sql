CREATE TABLE IF NOT EXISTS "eve_events" (
	"event_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"group_id" uuid,
	"name" text NOT NULL,
	"description" text,
	"location" text NOT NULL,
	"event_date" timestamp NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "eve_groups" (
	"group_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_by" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "eve_user_events" (
	"user_id" text,
	"event_id" uuid,
	"joined_at" timestamp NOT NULL,
	"status" text NOT NULL,
	CONSTRAINT "eve_user_events_user_id_event_id_pk" PRIMARY KEY("user_id","event_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "eve_user_groups" (
	"user_id" text,
	"group_id" uuid,
	"joined_at" timestamp NOT NULL,
	CONSTRAINT "eve_user_groups_user_id_group_id_pk" PRIMARY KEY("user_id","group_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "eve_users" (
	"user_id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"image" text,
	CONSTRAINT "eve_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eve_events" ADD CONSTRAINT "eve_events_group_id_eve_groups_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."eve_groups"("group_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eve_user_events" ADD CONSTRAINT "eve_user_events_user_id_eve_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."eve_users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eve_user_events" ADD CONSTRAINT "eve_user_events_event_id_eve_events_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."eve_events"("event_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eve_user_groups" ADD CONSTRAINT "eve_user_groups_user_id_eve_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."eve_users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eve_user_groups" ADD CONSTRAINT "eve_user_groups_group_id_eve_groups_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."eve_groups"("group_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
