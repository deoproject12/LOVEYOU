CREATE TABLE "navigation" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"path" text NOT NULL,
	"icon" text,
	"order" integer DEFAULT 0,
	"is_visible" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
