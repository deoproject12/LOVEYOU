import { pgTable, serial, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

// Table for admin users (if we need separate admin authentication)
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(), // In production, this should be hashed
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  lastLogin: timestamp("last_login"),
});

// Table for memories/stories timeline
export const memories = pgTable("memories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  date: timestamp("date").notNull(),
  imageUrl: text("image_url"), // URL to the memory's image
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Table for gallery items
export const gallery = pgTable("gallery", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"), // Optional caption for the image
  isFeatured: boolean("is_featured").default(false), // Whether to feature this in homepage
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Table for love quotes or messages
export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  author: text("author"), // Who said the quote (Abdullah, Nayla, etc.)
  isFeatured: boolean("is_featured").default(false), // Whether to show on homepage
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Table for AI-generated captions
export const aiCaptions = pgTable("ai_captions", {
  id: serial("id").primaryKey(),
  imageId: integer("image_id").references(() => gallery.id, { onDelete: "cascade" }),
  memoryId: integer("memory_id").references(() => memories.id, { onDelete: "cascade" }),
  caption: text("caption").notNull(),
  generatedAt: timestamp("generated_at").defaultNow().notNull(),
  modelUsed: text("model_used"), // Which AI model was used
});

// Table for favorite foods
export const favoriteFoods = pgTable("favorite_foods", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // Name of the food
  description: text("description"), // Description of the food
  imageUrl: text("image_url"), // URL to an image of the food
  isFeatured: boolean("is_featured").default(false), // Whether to feature on homepage
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Table for favorite songs
export const favoriteSongs = pgTable("favorite_songs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(), // Title of the song
  artist: text("artist"), // Artist name
  youtubeUrl: text("youtube_url"), // YouTube URL for the song
  description: text("description"), // Description of why it's special
  isFeatured: boolean("is_featured").default(false), // Whether to feature on homepage
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Table for memory books
export const memoryBooks = pgTable("memory_books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(), // Title of the memory book
  content: text("content").notNull(), // Content of the memory book
  date: timestamp("date"), // Date associated with the memory
  imageUrl: text("image_url"), // Optional image for the memory book
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Table for favorite movies
export const favoriteMovies = pgTable("favorite_movies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(), // Title of the movie
  director: text("director"), // Director of the movie
  description: text("description"), // Description of the movie
  imageUrl: text("image_url"), // Image URL for the movie
  isFeatured: boolean("is_featured").default(false), // Whether to feature on homepage
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Table to track site visitors (optional for statistics)
export const visitors = pgTable("visitors", {
  id: serial("id").primaryKey(),
  ip: text("ip"), // Visitor IP
  userAgent: text("user_agent"), // Browser info
  visitedAt: timestamp("visited_at").defaultNow().notNull(),
  verified: boolean("verified").default(false), // Whether they passed the "siapa cowo terganteng" test
});

// Table for navigation menu items
export const navigation = pgTable("navigation", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(), // Title of the navigation item
  path: text("path").notNull(), // URL path for the navigation item
  icon: text("icon"), // Optional icon name for the navigation item
  order: integer("order").default(0), // Order of the navigation item in the menu
  isVisible: boolean("is_visible").default(true), // Whether the navigation item is visible
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Table for editable page content
export const pageContent = pgTable("page_content", {
  id: serial("id").primaryKey(),
  pageName: text("page_name").notNull(), // Name of the page (e.g., 'timeline', 'story', 'about', 'memories')
  title: text("title"), // Page title
  subtitle: text("subtitle"), // Page subtitle
  content: text("content"), // Main content of the page
  imageUrl: text("image_url"), // Main image for the page
  heroImageUrl: text("hero_image_url"), // Hero image for the page
  metaDescription: text("meta_description"), // Meta description for SEO
  isPublished: boolean("is_published").default(true), // Whether the content is published
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});