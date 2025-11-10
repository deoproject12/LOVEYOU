// app/lib/client-actions.ts - Client-side functions that need browser APIs
'use client';

// Navigation functions - using API calls instead of JSON files
export async function getNavigationItems() {
  try {
    // Get authentication token from localStorage
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
    // Get authentication token from localStorage
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
    // Get authentication token from localStorage
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
    // Get authentication token from localStorage
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
    // Get authentication token from localStorage
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
    // Get authentication token from localStorage
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