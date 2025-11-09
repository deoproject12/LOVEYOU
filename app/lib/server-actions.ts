// app/lib/server-actions.ts
'use server';

import fs from 'fs/promises';
import path from 'path';

// Data file paths
const DATA_DIR = path.join(process.cwd(), 'app', 'data');
const GALLERY_FILE = path.join(DATA_DIR, 'gallery.json');
const MEMORIES_FILE = path.join(DATA_DIR, 'memories.json');
const QUOTES_FILE = path.join(DATA_DIR, 'quotes.json');

// Ensure data files exist with initial data
async function ensureDataFiles() {
  // Check if data directory exists, create if not
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }

  // Initialize gallery data if file doesn't exist
  try {
    await fs.access(GALLERY_FILE);
  } catch {
    const initialGallery = [
      {
        id: 1,
        imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
        caption: "Hari pertama kita bertemu",
        isFeatured: true
      },
      {
        id: 2,
        imageUrl: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=800&h=600&fit=crop",
        caption: "Kencan pertama yang tak terlupakan",
        isFeatured: false
      }
    ];
    await fs.writeFile(GALLERY_FILE, JSON.stringify(initialGallery, null, 2));
  }

  // Initialize memories data if file doesn't exist
  try {
    await fs.access(MEMORIES_FILE);
  } catch {
    const initialMemories = [
      {
        id: 1,
        title: "Pertemuan Pertama",
        content: "Hari itu adalah hari yang tak terlupakan ketika aku melihat senyummu pertama kalinya...",
        date: "2020-05-15",
        imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop"
      },
      {
        id: 2,
        title: "Kencan Pertama",
        content: "Kencan pertama kita di taman kota. Kita berbicara panjang lebar sampai malam hari...",
        date: "2020-06-20",
        imageUrl: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=800&h=600&fit=crop"
      }
    ];
    await fs.writeFile(MEMORIES_FILE, JSON.stringify(initialMemories, null, 2));
  }

  // Initialize quotes data if file doesn't exist
  try {
    await fs.access(QUOTES_FILE);
  } catch {
    const initialQuotes = [
      {
        id: 1,
        text: "Cinta bukan tentang menemukan seseorang yang sempurna, tapi tentang menemukan seseorang yang membuat kita ingin menjadi lebih baik.",
        author: "Abdullah",
        isFeatured: true
      },
      {
        id: 2,
        text: "Setiap hari bersamamu adalah hari yang tak ternilai harganya.",
        author: "Nayla",
        isFeatured: false
      }
    ];
    await fs.writeFile(QUOTES_FILE, JSON.stringify(initialQuotes, null, 2));
  }
}

// Gallery functions
export async function getGalleryItems() {
  await ensureDataFiles();
  const data = await fs.readFile(GALLERY_FILE, 'utf8');
  return JSON.parse(data);
}

export async function addGalleryItem(item: any) {
  await ensureDataFiles();
  const items = await getGalleryItems();
  const newId = items.length > 0 ? Math.max(...items.map((i: any) => i.id)) + 1 : 1;
  const newItem = { ...item, id: newId };
  items.push(newItem);
  await fs.writeFile(GALLERY_FILE, JSON.stringify(items, null, 2));
  return newItem;
}

export async function updateGalleryItem(id: number, item: any) {
  await ensureDataFiles();
  const items = await getGalleryItems();
  const index = items.findIndex((i: any) => i.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...item };
    await fs.writeFile(GALLERY_FILE, JSON.stringify(items, null, 2));
    return items[index];
  }
  throw new Error('Gallery item not found');
}

export async function deleteGalleryItem(id: number) {
  await ensureDataFiles();
  const items = await getGalleryItems();
  const filteredItems = items.filter((i: any) => i.id !== id);
  await fs.writeFile(GALLERY_FILE, JSON.stringify(filteredItems, null, 2));
  return true;
}

// Memories functions
export async function getMemories() {
  await ensureDataFiles();
  const data = await fs.readFile(MEMORIES_FILE, 'utf8');
  return JSON.parse(data);
}

export async function addMemory(memory: any) {
  await ensureDataFiles();
  const items = await getMemories();
  const newId = items.length > 0 ? Math.max(...items.map((i: any) => i.id)) + 1 : 1;
  const newMemory = { ...memory, id: newId, date: memory.date || new Date().toISOString().split('T')[0] };
  items.push(newMemory);
  await fs.writeFile(MEMORIES_FILE, JSON.stringify(items, null, 2));
  return newMemory;
}

export async function updateMemory(id: number, memory: any) {
  await ensureDataFiles();
  const items = await getMemories();
  const index = items.findIndex((i: any) => i.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...memory };
    await fs.writeFile(MEMORIES_FILE, JSON.stringify(items, null, 2));
    return items[index];
  }
  throw new Error('Memory not found');
}

export async function deleteMemory(id: number) {
  await ensureDataFiles();
  const items = await getMemories();
  const filteredItems = items.filter((i: any) => i.id !== id);
  await fs.writeFile(MEMORIES_FILE, JSON.stringify(filteredItems, null, 2));
  return true;
}

// Quotes functions
export async function getQuotes() {
  await ensureDataFiles();
  const data = await fs.readFile(QUOTES_FILE, 'utf8');
  return JSON.parse(data);
}

export async function addQuote(quote: any) {
  await ensureDataFiles();
  const items = await getQuotes();
  const newId = items.length > 0 ? Math.max(...items.map((i: any) => i.id)) + 1 : 1;
  const newQuote = { ...quote, id: newId };
  items.push(newQuote);
  await fs.writeFile(QUOTES_FILE, JSON.stringify(items, null, 2));
  return newQuote;
}

export async function updateQuote(id: number, quote: any) {
  await ensureDataFiles();
  const items = await getQuotes();
  const index = items.findIndex((i: any) => i.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...quote };
    await fs.writeFile(QUOTES_FILE, JSON.stringify(items, null, 2));
    return items[index];
  }
  throw new Error('Quote not found');
}

export async function deleteQuote(id: number) {
  await ensureDataFiles();
  const items = await getQuotes();
  const filteredItems = items.filter((i: any) => i.id !== id);
  await fs.writeFile(QUOTES_FILE, JSON.stringify(filteredItems, null, 2));
  return true;
}

// Navigation functions - using API calls instead of JSON files
export async function getNavigationItems() {
  try {
    // Get authentication token from localStorage (this will be handled in the client)
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    
    const response = await fetch('/api/admin/navigation', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching navigation items:', error);
    // Return default navigation items if API fails
    return [
      { id: 1, title: "Beranda", path: "/", icon: "Home", order: 0, isVisible: true },
      { id: 2, title: "Kisah Kita", path: "/timeline", icon: "Calendar", order: 1, isVisible: true },
      { id: 3, title: "Galeri", path: "/gallery", icon: "Camera", order: 2, isVisible: true },
      { id: 4, title: "Cerita Kita", path: "/story", icon: "BookOpen", order: 3, isVisible: true },
      { id: 5, title: "Buku Kenangan", path: "/memories", icon: "Heart", order: 4, isVisible: true },
      { id: 6, title: "Lagu Favorit", path: "/music", icon: "Music", order: 5, isVisible: true },
      { id: 7, title: "Makanan Favorit", path: "/food", icon: "Utensils", order: 6, isVisible: true },
      { id: 8, title: "Tentang Kami", path: "/about", icon: "Users", order: 7, isVisible: true },
    ];
  }
}

export async function addNavigationItem(item: any) {
  try {
    // Get authentication token from localStorage (this will be handled in the client)
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    
    const response = await fetch('/api/admin/navigation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding navigation item:', error);
    throw error;
  }
}

export async function updateNavigationItem(id: number, item: any) {
  try {
    // Get authentication token from localStorage (this will be handled in the client)
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    
    const response = await fetch(`/api/admin/navigation/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating navigation item:', error);
    throw error;
  }
}

export async function deleteNavigationItem(id: number) {
  try {
    // Get authentication token from localStorage (this will be handled in the client)
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    
    const response = await fetch(`/api/admin/navigation/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting navigation item:', error);
    throw error;
  }
}

// Page Content functions - using API calls
export async function getPageContent(pageName: string) {
  try {
    // Get authentication token from localStorage (this will be handled in the client)
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    
    const response = await fetch(`/api/admin/page-content?pageName=${encodeURIComponent(pageName)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data[0] || null; // Return the first item or null if not found
  } catch (error) {
    console.error('Error fetching page content:', error);
    // Return default content if API fails
    return null;
  }
}

export async function updatePageContent(content: any) {
  try {
    // Get authentication token from localStorage (this will be handled in the client)
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    
    const response = await fetch('/api/admin/page-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(content),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating page content:', error);
    throw error;
  }
}