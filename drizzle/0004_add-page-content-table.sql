CREATE TABLE "page_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"page_name" text NOT NULL,
	"title" text,
	"subtitle" text,
	"content" text,
	"image_url" text,
	"hero_image_url" text,
	"meta_description" text,
	"is_published" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
