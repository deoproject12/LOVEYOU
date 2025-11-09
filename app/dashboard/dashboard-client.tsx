// app/dashboard/dashboard-client.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Users,
  Camera,
  Calendar,
  MessageCircle,
  Plus,
  Edit,
  Trash2,
  Upload,
  Heart,
  BarChart3,
  Settings,
  Music,
  Utensils,
  BookOpen
} from "lucide-react";
import { motion } from 'framer-motion';
import UploadPhoto from '@/components/upload-photo';
import {
  addGalleryItem as addGalleryItemAction,
  addMemory as addMemoryAction,
  addQuote as addQuoteAction,
  updateGalleryItem as updateGalleryItemAction,
  updateMemory as updateMemoryAction,
  updateQuote as updateQuoteAction,
  deleteGalleryItem as deleteGalleryItemAction,
  deleteMemory as deleteMemoryAction,
  deleteQuote as deleteQuoteAction
} from '../lib/server-actions';

interface GalleryItem {
  id: number;
  imageUrl: string;
  caption: string;
  isFeatured: boolean;
}

interface Memory {
  id: number;
  title: string;
  content: string;
  date: string;
  imageUrl: string;
}

interface Quote {
  id: number;
  text: string;
  author: string;
  isFeatured: boolean;
}

// Interface definitions for new entities
interface FavoriteFood {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  isFeatured: boolean;
}

interface FavoriteSong {
  id: number;
  title: string;
  artist: string;
  youtubeUrl: string;
  description: string;
  isFeatured: boolean;
}

interface MemoryBook {
  id: number;
  title: string;
  content: string;
  date: string;
  imageUrl: string;
}

interface NavigationItem {
  id: number;
  title: string;
  path: string;
  icon: string;
  order: number;
  isVisible: boolean;
}

export default function DashboardClient({
  initialGallery,
  initialMemories,
  initialQuotes
}: {
  initialGallery: GalleryItem[];
  initialMemories: Memory[];
  initialQuotes: Quote[];
}) {
  const [activeTab, setActiveTab] = useState("memories");
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [memories, setMemories] = useState<Memory[]>(initialMemories);
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [foods, setFoods] = useState<FavoriteFood[]>([]);
  const [songs, setSongs] = useState<FavoriteSong[]>([]);
  const [memoryBooks, setMemoryBooks] = useState<MemoryBook[]>([]);
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [pageContent, setPageContent] = useState<any>(null);
  const [newMemory, setNewMemory] = useState({ title: "", content: "", date: "", imageUrl: "" });
  const [newGalleryItem, setNewGalleryItem] = useState({ imageUrl: "", caption: "", isFeatured: false });
  const [newQuote, setNewQuote] = useState({ text: "", author: "", isFeatured: false });
  const [newFood, setNewFood] = useState({ name: "", description: "", imageUrl: "", isFeatured: false });
  const [newSong, setNewSong] = useState({ title: "", artist: "", youtubeUrl: "", description: "", isFeatured: false });
  const [newMemoryBook, setNewMemoryBook] = useState({ title: "", content: "", date: "", imageUrl: "" });
  const [newNavigationItem, setNewNavigationItem] = useState({ title: "", path: "", icon: "", order: 0, isVisible: true });
  const [newPageContent, setNewPageContent] = useState({ 
    pageName: "", 
    title: "", 
    subtitle: "", 
    content: "", 
    imageUrl: "", 
    heroImageUrl: "", 
    metaDescription: "",
    isPublished: true 
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [dialogEntityType, setDialogEntityType] = useState<"memory" | "gallery" | "quote" | "food" | "song" | "memoryBook" | "navigation" | "pageContent" | null>(null);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  // Check authentication status and redirect if not authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      // Redirect to sign-in page if not authenticated
      window.location.href = '/sign-in';
    }
  }, []);

  // Load navigation items on component mount
  useEffect(() => {
    const loadNavigationItems = async () => {
      if (typeof window !== 'undefined') {
        try {
          const { getNavigationItems } = await import('../lib/server-actions');
          const navItems = await getNavigationItems();
          setNavigationItems(navItems);
        } catch (error) {
          console.error('Error loading navigation items:', error);
        }
      }
    };
    
    loadNavigationItems();
  }, []);

  // Gallery functions
  const handleAddGalleryItem = async () => {
    if (dialogType === "gallery-upload-complete") {
      const newItem = await addGalleryItemAction(newGalleryItem);
      setGallery([...gallery, newItem]);
      setNewGalleryItem({ imageUrl: "", caption: "", isFeatured: false });
      setIsDialogOpen(false);
      setDialogType("");
    } else if (dialogType === "gallery-url") {
      const newItem = await addGalleryItemAction(newGalleryItem);
      setGallery([...gallery, newItem]);
      setNewGalleryItem({ imageUrl: "", caption: "", isFeatured: false });
      setIsDialogOpen(false);
      setDialogType("");
    }
  };

  const handleUpdateGalleryItem = async (id: number) => {
    try {
      const { updateGalleryItem } = await import('../lib/server-actions');
      const updatedItem = await updateGalleryItem(id, newGalleryItem);
      setGallery(gallery.map(item => item.id === id ? updatedItem : item));
      setNewGalleryItem({ imageUrl: "", caption: "", isFeatured: false });
      setIsDialogOpen(false);
      setDialogType("");
      setDialogEntityType(null);
    } catch (error) {
      console.error('Error updating gallery item:', error);
      alert('Failed to update gallery item');
    }
  };

  const handleDeleteGalleryItem = async (id: number) => {
    await deleteGalleryItemAction(id);
    setGallery(gallery.filter(item => item.id !== id));
  };

  // Memory functions
  const handleAddMemory = async () => {
    const newMem = await addMemoryAction({
      ...newMemory,
      date: newMemory.date || new Date().toISOString().split('T')[0]
    });
    setMemories([...memories, newMem]);
    setNewMemory({ title: "", content: "", date: "", imageUrl: "" });
    setIsDialogOpen(false);
    setDialogEntityType(null);
  };

  const handleUpdateMemory = async (id: number) => {
    const { updateMemory: updateMemoryAction } = await import('../lib/server-actions');
    const updatedItem = await updateMemoryAction(id, newMemory);
    setMemories(memories.map(item => item.id === id ? updatedItem : item));
    setNewMemory({ title: "", content: "", date: "", imageUrl: "" });
    setIsDialogOpen(false);
    setDialogEntityType(null);
  };

  const handleDeleteMemory = async (id: number) => {
    await deleteMemoryAction(id);
    setMemories(memories.filter(item => item.id !== id));
  };

  // Quote functions
  const handleAddQuote = async () => {
    const newQ = await addQuoteAction(newQuote);
    setQuotes([...quotes, newQ]);
    setNewQuote({ text: "", author: "", isFeatured: false });
    setIsDialogOpen(false);
    setDialogEntityType(null);
  };

  const handleUpdateQuote = async (id: number) => {
    const { updateQuote: updateQuoteAction } = await import('../lib/server-actions');
    const updatedItem = await updateQuoteAction(id, newQuote);
    setQuotes(quotes.map(item => item.id === id ? updatedItem : item));
    setNewQuote({ text: "", author: "", isFeatured: false });
    setIsDialogOpen(false);
    setDialogEntityType(null);
  };

  const handleDeleteQuote = async (id: number) => {
    await deleteQuoteAction(id);
    setQuotes(quotes.filter(item => item.id !== id));
  };

  // Food functions
  const handleAddFood = async () => {
    // This would call server actions to add food
    // For now using mock implementation
    const newF: FavoriteFood = {
      id: foods.length + 1,
      ...newFood
    };
    setFoods([...foods, newF]);
    setNewFood({ name: "", description: "", imageUrl: "", isFeatured: false });
    setIsDialogOpen(false);
    setDialogEntityType(null);
  };

  const handleDeleteFood = async (id: number) => {
    setFoods(foods.filter(item => item.id !== id));
  };

  // Song functions
  const handleAddSong = async () => {
    // This would call server actions to add song
    // For now using mock implementation
    const newS: FavoriteSong = {
      id: songs.length + 1,
      ...newSong
    };
    setSongs([...songs, newS]);
    setNewSong({ title: "", artist: "", youtubeUrl: "", description: "", isFeatured: false });
    setIsDialogOpen(false);
    setDialogEntityType(null);
  };

  const handleDeleteSong = async (id: number) => {
    setSongs(songs.filter(item => item.id !== id));
  };

  // Memory Book functions
  const handleAddMemoryBook = async () => {
    // This would call server actions to add memory book
    // For now using mock implementation
    const newMB: MemoryBook = {
      id: memoryBooks.length + 1,
      ...newMemoryBook
    };
    setMemoryBooks([...memoryBooks, newMB]);
    setNewMemoryBook({ title: "", content: "", date: "", imageUrl: "" });
    setIsDialogOpen(false);
    setDialogEntityType(null);
  };

  const handleDeleteMemoryBook = async (id: number) => {
    setMemoryBooks(memoryBooks.filter(item => item.id !== id));
  };

  // Navigation functions
  const handleAddNavigationItem = async () => {
    if (!newNavigationItem.title || !newNavigationItem.path) {
      alert('Title and path are required');
      return;
    }
    
    try {
      const { addNavigationItem } = await import('../lib/server-actions');
      const newItem = await addNavigationItem(newNavigationItem);
      setNavigationItems([...navigationItems, newItem]);
      setNewNavigationItem({ title: "", path: "", icon: "", order: 0, isVisible: true });
      setIsDialogOpen(false);
      setDialogEntityType(null);
    } catch (error) {
      console.error('Error adding navigation item:', error);
      alert('Failed to add navigation item');
    }
  };

  const handleUpdateNavigationItem = async (id: number) => {
    try {
      const { updateNavigationItem } = await import('../lib/server-actions');
      const updatedItem = await updateNavigationItem(id, newNavigationItem);
      
      setNavigationItems(navigationItems.map(item => 
        item.id === id ? updatedItem : item
      ));
      setNewNavigationItem({ title: "", path: "", icon: "", order: 0, isVisible: true });
      setIsDialogOpen(false);
      setDialogEntityType(null);
    } catch (error) {
      console.error('Error updating navigation item:', error);
      alert('Failed to update navigation item');
    }
  };

  // Page Content functions
  const handlePageContentSelect = async (pageName: string) => {
    try {
      const { getPageContent } = await import('../lib/server-actions');
      const content = await getPageContent(pageName);
      
      if (content) {
        setPageContent(content);
        setNewPageContent({
          pageName: content.pageName,
          title: content.title || '',
          subtitle: content.subtitle || '',
          content: content.content || '',
          imageUrl: content.imageUrl || '',
          heroImageUrl: content.heroImageUrl || '',
          metaDescription: content.metaDescription || '',
          isPublished: content.isPublished
        });
      } else {
        // If no content exists, create a default structure
        setPageContent({ pageName, id: null });
        setNewPageContent({
          pageName,
          title: '',
          subtitle: '',
          content: '',
          imageUrl: '',
          heroImageUrl: '',
          metaDescription: '',
          isPublished: true
        });
      }
    } catch (error) {
      console.error('Error loading page content:', error);
      alert('Failed to load page content');
    }
  };

  const handleUpdatePageContent = async () => {
    if (!newPageContent.pageName) {
      alert('Page name is required');
      return;
    }
    
    try {
      const { updatePageContent } = await import('../lib/server-actions');
      const updatedContent = await updatePageContent(newPageContent);
      
      // Update the local state
      setPageContent(updatedContent);
      alert('Konten halaman berhasil diperbarui!');
    } catch (error) {
      console.error('Error updating page content:', error);
      alert('Gagal memperbarui konten halaman');
    }
  };

  const handleDeleteNavigationItem = async (id: number) => {
    if (!confirm('Are you sure you want to delete this navigation item?')) {
      return;
    }
    
    try {
      const { deleteNavigationItem } = await import('../lib/server-actions');
      await deleteNavigationItem(id);
      setNavigationItems(navigationItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting navigation item:', error);
      alert('Failed to delete navigation item');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Dashboard Admin</h1>
            <p className="text-gray-600 dark:text-gray-400">Kelola kenangan dan konten romantis</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Pengaturan
            </Button>
            <Button
              onClick={() => {
                // Clear authentication data
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('user');
                // Redirect to home page
                window.location.href = '/';
              }}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
            >
              <Heart className="w-4 h-4 mr-2" />
              Keluar
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-pink-50 to-white dark:from-pink-900/20 dark:to-gray-800 border-pink-200 dark:border-pink-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900/30">
                  <Calendar className="w-6 h-6 text-pink-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Kenangan</p>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{memories.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-rose-50 to-white dark:from-rose-900/20 dark:to-gray-800 border-rose-200 dark:border-rose-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-rose-100 dark:bg-rose-900/30">
                  <Camera className="w-6 h-6 text-rose-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Galeri</p>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{gallery.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 border-purple-200 dark:border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <Utensils className="w-6 h-6 text-purple-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Makanan</p>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{foods.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 border-blue-200 dark:border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Music className="w-6 h-6 text-blue-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Lagu</p>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{songs.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <Card className="bg-white dark:bg-gray-800 border-pink-200 dark:border-pink-700">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-8 bg-pink-50 dark:bg-gray-700">
            <TabsTrigger value="memories" className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Kenangan
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center">
              <Camera className="w-4 h-4 mr-2" />
              Galeri
            </TabsTrigger>
            <TabsTrigger value="quotes" className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              Quotes
            </TabsTrigger>
            <TabsTrigger value="foods" className="flex items-center">
              <Utensils className="w-4 h-4 mr-2" />
              Makanan
            </TabsTrigger>
            <TabsTrigger value="songs" className="flex items-center">
              <Music className="w-4 h-4 mr-2" />
              Lagu
            </TabsTrigger>
            <TabsTrigger value="memoryBooks" className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Buku Kenangan
            </TabsTrigger>
            <TabsTrigger value="navigation" className="flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Navigasi
            </TabsTrigger>
            <TabsTrigger value="pageContent" className="flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Konten Halaman
            </TabsTrigger>
          </TabsList>

          {/* Memories Tab */}
          <TabsContent value="memories" className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Kenangan</h2>
              <Dialog open={isDialogOpen && (dialogEntityType === "memory" || dialogType === "memory-edit")} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {setDialogEntityType("memory"); setDialogType("memory");}} className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Kenangan
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {dialogType === "memory-edit" ? "Edit Kenangan" : "Tambah Kenangan Baru"}
                    </DialogTitle>
                    <DialogDescription>
                      {dialogType === "memory-edit" 
                        ? "Edit kenangan penting dalam perjalanan cinta kalian" 
                        : "Tambahkan kenangan penting dalam perjalanan cinta kalian"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Judul</Label>
                      <Input
                        id="title"
                        value={newMemory.title}
                        onChange={(e) => setNewMemory({...newMemory, title: e.target.value})}
                        placeholder="Judul kenangan"
                      />
                    </div>
                    <div>
                      <Label htmlFor="date">Tanggal</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newMemory.date}
                        onChange={(e) => setNewMemory({...newMemory, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="imageUrl">URL Gambar</Label>
                      <Input
                        id="imageUrl"
                        value={newMemory.imageUrl}
                        onChange={(e) => setNewMemory({...newMemory, imageUrl: e.target.value})}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="content">Deskripsi</Label>
                      <Textarea
                        id="content"
                        value={newMemory.content}
                        onChange={(e) => setNewMemory({...newMemory, content: e.target.value})}
                        placeholder="Deskripsi kenangan..."
                        rows={4}
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={dialogType === "memory-edit" ? () => editingItemId && handleUpdateMemory(editingItemId) : handleAddMemory} 
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                  >
                    {dialogType === "memory-edit" ? "Update Kenangan" : "Simpan Kenangan"}
                  </Button>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {memories.map((memory) => (
                <Card key={memory.id} className="overflow-hidden bg-gradient-to-br from-pink-50 to-white dark:from-pink-900/20 dark:to-gray-800">
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">{memory.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{memory.date}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setDialogEntityType('memory');
                            setDialogType('memory-edit');
                            setEditingItemId(memory.id);
                            setNewMemory({
                              title: memory.title,
                              content: memory.content,
                              date: memory.date,
                              imageUrl: memory.imageUrl || ''
                            });
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Anda yakin ingin menghapus kenangan ini?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tindakan ini tidak dapat dibatalkan. Kenangan akan dihapus secara permanen.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteMemory(memory.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">{memory.content.substring(0, 100)}...</p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Galeri</h2>
              <div className="flex space-x-2">
                <Dialog open={isDialogOpen && (dialogType === "gallery-url" || dialogType === "gallery-edit")} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {setDialogType("gallery-url"); setIsDialogOpen(true);}}
                      variant="outline"
                      className="flex items-center"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Dari URL
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {dialogType === "gallery-edit" ? "Edit Foto" : "Tambah Foto dari URL"}
                      </DialogTitle>
                      <DialogDescription>
                        {dialogType === "gallery-edit" 
                          ? "Edit foto dalam galeri" 
                          : "Masukkan URL gambar untuk ditambahkan ke galeri"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="galleryImageUrl">URL Gambar</Label>
                        <Input
                          id="galleryImageUrl"
                          value={newGalleryItem.imageUrl}
                          onChange={(e) => setNewGalleryItem({...newGalleryItem, imageUrl: e.target.value})}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      <div>
                        <Label htmlFor="galleryCaption">Caption</Label>
                        <Input
                          id="galleryCaption"
                          value={newGalleryItem.caption}
                          onChange={(e) => setNewGalleryItem({...newGalleryItem, caption: e.target.value})}
                          placeholder="Deskripsi foto..."
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isFeatured"
                          checked={newGalleryItem.isFeatured}
                          onChange={(e) => setNewGalleryItem({...newGalleryItem, isFeatured: e.target.checked})}
                        />
                        <Label htmlFor="isFeatured">Tampilkan di halaman utama</Label>
                      </div>
                    </div>
                    <Button
                      onClick={dialogType === "gallery-edit" ? () => editingItemId && handleUpdateGalleryItem(editingItemId) : handleAddGalleryItem}
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                    >
                      {dialogType === "gallery-edit" ? "Update Foto" : "Simpan Foto"}
                    </Button>
                  </DialogContent>
                </Dialog>
                <Dialog open={isDialogOpen && (dialogType === "gallery-upload" || dialogType === "gallery-edit-upload")} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {setDialogType("gallery-upload"); setIsDialogOpen(true);}}
                      className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 flex items-center"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Foto
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {dialogType === "gallery-edit-upload" ? "Edit Foto" : "Upload Foto Baru"}
                      </DialogTitle>
                      <DialogDescription>
                        {dialogType === "gallery-edit-upload" 
                          ? "Edit foto dalam galeri" 
                          : "Pilih foto dari perangkat Anda untuk ditambahkan ke galeri"}
                      </DialogDescription>
                    </DialogHeader>
                    <UploadPhoto
                      onUploadComplete={(photoUrl) => {
                        setNewGalleryItem({...newGalleryItem, imageUrl: photoUrl});
                        setDialogType(dialogType === "gallery-edit-upload" ? "gallery-upload-complete-edit" : "gallery-upload-complete"); // Change dialog type to show completion
                      }}
                    />
                    {(dialogType === "gallery-upload-complete" || dialogType === "gallery-upload-complete-edit") && (
                      <>
                        <div className="space-y-4 pt-4">
                          <div>
                            <Label htmlFor="uploadCaption">Caption</Label>
                            <Input
                              id="uploadCaption"
                              value={newGalleryItem.caption}
                              onChange={(e) => setNewGalleryItem({...newGalleryItem, caption: e.target.value})}
                              placeholder="Deskripsi foto..."
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="uploadIsFeatured"
                              checked={newGalleryItem.isFeatured}
                              onChange={(e) => setNewGalleryItem({...newGalleryItem, isFeatured: e.target.checked})}
                            />
                            <Label htmlFor="uploadIsFeatured">Tampilkan di halaman utama</Label>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => {
                              setDialogType(dialogType === "gallery-edit-upload" ? "gallery-edit-upload" : "gallery-upload");
                              setNewGalleryItem({ imageUrl: newGalleryItem.imageUrl, caption: "", isFeatured: false });
                            }}
                            variant="outline"
                            className="flex-1"
                          >
                            Upload Lagi
                          </Button>
                          <Button
                            onClick={dialogType === "gallery-upload-complete-edit" ? () => editingItemId && handleUpdateGalleryItem(editingItemId) : handleAddGalleryItem}
                            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 flex-1"
                          >
                            {dialogType === "gallery-upload-complete-edit" ? "Update Foto" : "Simpan Foto"}
                          </Button>
                        </div>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative aspect-square">
                    <img
                      src={item.imageUrl}
                      alt={item.caption}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{item.caption}</p>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs px-2 py-1 rounded-full ${item.isFeatured ? 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                        {item.isFeatured ? 'Unggulan' : 'Reguler'}
                      </span>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setDialogEntityType('gallery');
                            setDialogType('gallery-edit');
                            setEditingItemId(item.id);
                            setNewGalleryItem({
                              imageUrl: item.imageUrl,
                              caption: item.caption || '',
                              isFeatured: item.isFeatured
                            });
                            // Open the URL edit dialog for editing
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Anda yakin ingin menghapus foto ini?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tindakan ini tidak dapat dibatalkan. Foto akan dihapus secara permanen dari galeri.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteGalleryItem(item.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Quotes Tab */}
          <TabsContent value="quotes" className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Quotes Cinta</h2>
              <Dialog open={isDialogOpen && (dialogEntityType === "quote" || dialogType === "quote-edit")} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {setDialogEntityType("quote"); setDialogType("quote");}} className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Quote
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {dialogType === "quote-edit" ? "Edit Quote" : "Tambah Quote Baru"}
                    </DialogTitle>
                    <DialogDescription>
                      {dialogType === "quote-edit" 
                        ? "Edit kutipan cinta yang penuh makna" 
                        : "Tambahkan kutipan cinta yang penuh makna"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="quoteText">Quote</Label>
                      <Textarea
                        id="quoteText"
                        value={newQuote.text}
                        onChange={(e) => setNewQuote({...newQuote, text: e.target.value})}
                        placeholder="Tulis kutipan cinta di sini..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="quoteAuthor">Penulis</Label>
                      <Input
                        id="quoteAuthor"
                        value={newQuote.author}
                        onChange={(e) => setNewQuote({...newQuote, author: e.target.value})}
                        placeholder="Penulis quote"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="quoteFeatured"
                        checked={newQuote.isFeatured}
                        onChange={(e) => setNewQuote({...newQuote, isFeatured: e.target.checked})}
                      />
                      <Label htmlFor="quoteFeatured">Tampilkan di halaman utama</Label>
                    </div>
                  </div>
                  <Button 
                    onClick={dialogType === "quote-edit" ? () => editingItemId && handleUpdateQuote(editingItemId) : handleAddQuote} 
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                  >
                    {dialogType === "quote-edit" ? "Update Quote" : "Simpan Quote"}
                  </Button>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quotes.map((quote) => (
                <Card key={quote.id} className="p-6 bg-gradient-to-br from-pink-50 to-white dark:from-pink-900/20 dark:to-gray-800">
                  <div className="flex items-start">
                    <Heart className="w-5 h-5 text-pink-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="italic text-gray-700 dark:text-gray-300 mb-3">"{quote.text}"</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-pink-600 dark:text-pink-400">- {quote.author}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${quote.isFeatured ? 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                          {quote.isFeatured ? 'Unggulan' : 'Reguler'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setDialogEntityType('quote');
                        setDialogType('quote-edit');
                        setEditingItemId(quote.id);
                        setNewQuote({
                          text: quote.text,
                          author: quote.author || '',
                          isFeatured: quote.isFeatured
                        });
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Anda yakin ingin menghapus quote ini?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Quote akan dihapus secara permanen.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeleteQuote(quote.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Hapus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Foods Tab */}
          <TabsContent value="foods" className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Makanan Favorit</h2>
              <Dialog open={isDialogOpen && dialogEntityType === "food"} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {setDialogEntityType("food"); setDialogType("food");}} className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Makanan
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tambah Makanan Favorit</DialogTitle>
                    <DialogDescription>
                      Tambahkan makanan favorit yang spesial bagi kalian berdua
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="foodName">Nama Makanan</Label>
                      <Input
                        id="foodName"
                        value={newFood.name}
                        onChange={(e) => setNewFood({...newFood, name: e.target.value})}
                        placeholder="Nama makanan favorit"
                      />
                    </div>
                    <div>
                      <Label htmlFor="foodDescription">Deskripsi</Label>
                      <Textarea
                        id="foodDescription"
                        value={newFood.description}
                        onChange={(e) => setNewFood({...newFood, description: e.target.value})}
                        placeholder="Deskripsi tentang makanan ini dan kenapa spesial..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="foodImageUrl">URL Gambar</Label>
                      <Input
                        id="foodImageUrl"
                        value={newFood.imageUrl}
                        onChange={(e) => setNewFood({...newFood, imageUrl: e.target.value})}
                        placeholder="https://example.com/makanan.jpg"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="foodIsFeatured"
                        checked={newFood.isFeatured}
                        onChange={(e) => setNewFood({...newFood, isFeatured: e.target.checked})}
                      />
                      <Label htmlFor="foodIsFeatured">Tampilkan di halaman utama</Label>
                    </div>
                  </div>
                  <Button onClick={handleAddFood} className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                    Simpan Makanan
                  </Button>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {foods.map((food) => (
                <Card key={food.id} className="p-4 bg-gradient-to-br from-rose-50 to-white dark:from-rose-900/20 dark:to-gray-800">
                  {food.imageUrl && (
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                      <img
                        src={food.imageUrl}
                        alt={food.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">{food.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 mb-3">{food.description}</p>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${food.isFeatured ? 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                      {food.isFeatured ? 'Unggulan' : 'Reguler'}
                    </span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteFood(food.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Songs Tab */}
          <TabsContent value="songs" className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Lagu Favorit</h2>
              <Dialog open={isDialogOpen && dialogEntityType === "song"} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {setDialogEntityType("song"); setDialogType("song");}} className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Lagu
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tambah Lagu Favorit</DialogTitle>
                    <DialogDescription>
                      Tambahkan lagu yang spesial bagi kalian berdua
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="songTitle">Judul Lagu</Label>
                      <Input
                        id="songTitle"
                        value={newSong.title}
                        onChange={(e) => setNewSong({...newSong, title: e.target.value})}
                        placeholder="Judul lagu"
                      />
                    </div>
                    <div>
                      <Label htmlFor="songArtist">Artis</Label>
                      <Input
                        id="songArtist"
                        value={newSong.artist}
                        onChange={(e) => setNewSong({...newSong, artist: e.target.value})}
                        placeholder="Nama artis/pencipta"
                      />
                    </div>
                    <div>
                      <Label htmlFor="songUrl">URL YouTube</Label>
                      <Input
                        id="songUrl"
                        value={newSong.youtubeUrl}
                        onChange={(e) => setNewSong({...newSong, youtubeUrl: e.target.value})}
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="songDescription">Deskripsi</Label>
                      <Textarea
                        id="songDescription"
                        value={newSong.description}
                        onChange={(e) => setNewSong({...newSong, description: e.target.value})}
                        placeholder="Alasan lagu ini spesial bagi kalian..."
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="songIsFeatured"
                        checked={newSong.isFeatured}
                        onChange={(e) => setNewSong({...newSong, isFeatured: e.target.checked})}
                      />
                      <Label htmlFor="songIsFeatured">Tampilkan di halaman utama</Label>
                    </div>
                  </div>
                  <Button onClick={handleAddSong} className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                    Simpan Lagu
                  </Button>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {songs.map((song) => (
                <Card key={song.id} className="p-4 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800">
                  <div className="flex items-start">
                    <Music className="w-6 h-6 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">{song.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{song.artist}</p>
                      {song.youtubeUrl && (
                        <div className="mt-2">
                          <a 
                            href={song.youtubeUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Putar Lagu
                          </a>
                        </div>
                      )}
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{song.description}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${song.isFeatured ? 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                      {song.isFeatured ? 'Unggulan' : 'Reguler'}
                    </span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteSong(song.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Memory Books Tab */}
          <TabsContent value="memoryBooks" className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Buku Kenangan</h2>
              <Dialog open={isDialogOpen && dialogEntityType === "memoryBook"} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {setDialogEntityType("memoryBook"); setDialogType("memoryBook");}} className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Buku
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tambah Buku Kenangan</DialogTitle>
                    <DialogDescription>
                      Tambahkan cerita kenangan yang ingin kalian abadikan
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="memoryBookTitle">Judul</Label>
                      <Input
                        id="memoryBookTitle"
                        value={newMemoryBook.title}
                        onChange={(e) => setNewMemoryBook({...newMemoryBook, title: e.target.value})}
                        placeholder="Judul kenangan"
                      />
                    </div>
                    <div>
                      <Label htmlFor="memoryBookDate">Tanggal</Label>
                      <Input
                        id="memoryBookDate"
                        type="date"
                        value={newMemoryBook.date}
                        onChange={(e) => setNewMemoryBook({...newMemoryBook, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="memoryBookImageUrl">URL Gambar</Label>
                      <Input
                        id="memoryBookImageUrl"
                        value={newMemoryBook.imageUrl}
                        onChange={(e) => setNewMemoryBook({...newMemoryBook, imageUrl: e.target.value})}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="memoryBookContent">Isi Kenangan</Label>
                      <Textarea
                        id="memoryBookContent"
                        value={newMemoryBook.content}
                        onChange={(e) => setNewMemoryBook({...newMemoryBook, content: e.target.value})}
                        placeholder="Ceritakan kenangan indah itu di sini..."
                        rows={5}
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddMemoryBook} className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                    Simpan Buku
                  </Button>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {memoryBooks.map((book) => (
                <Card key={book.id} className="p-4 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">{book.title}</h3>
                    {book.date && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(book.date).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    )}
                  </div>
                  {book.imageUrl && (
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                      <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{book.content.substring(0, 150)}...</p>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteMemoryBook(book.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Navigation Tab */}
          <TabsContent value="navigation" className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Navigasi</h2>
              <Dialog open={isDialogOpen && dialogEntityType === "navigation"} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    onClick={() => {
                      setDialogEntityType("navigation"); 
                      setDialogType("navigation");
                    }} 
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Item Navigasi
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tambah Item Navigasi Baru</DialogTitle>
                    <DialogDescription>
                      Tambahkan item navigasi untuk ditampilkan di menu utama
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="navTitle">Judul</Label>
                      <Input
                        id="navTitle"
                        value={newNavigationItem.title}
                        onChange={(e) => setNewNavigationItem({...newNavigationItem, title: e.target.value})}
                        placeholder="Judul navigasi"
                      />
                    </div>
                    <div>
                      <Label htmlFor="navPath">Path</Label>
                      <Input
                        id="navPath"
                        value={newNavigationItem.path}
                        onChange={(e) => setNewNavigationItem({...newNavigationItem, path: e.target.value})}
                        placeholder="/path/navigasi"
                      />
                    </div>
                    <div>
                      <Label htmlFor="navIcon">Ikon (opsional)</Label>
                      <Input
                        id="navIcon"
                        value={newNavigationItem.icon}
                        onChange={(e) => setNewNavigationItem({...newNavigationItem, icon: e.target.value})}
                        placeholder="Nama ikon (misal: Home, Calendar, dll)"
                      />
                    </div>
                    <div>
                      <Label htmlFor="navOrder">Urutan</Label>
                      <Input
                        id="navOrder"
                        type="number"
                        value={newNavigationItem.order}
                        onChange={(e) => setNewNavigationItem({...newNavigationItem, order: parseInt(e.target.value) || 0})}
                        placeholder="Nomor urutan"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="navIsVisible"
                        checked={newNavigationItem.isVisible}
                        onChange={(e) => setNewNavigationItem({...newNavigationItem, isVisible: e.target.checked})}
                      />
                      <Label htmlFor="navIsVisible">Tampilkan di menu</Label>
                    </div>
                  </div>
                  <Button onClick={handleAddNavigationItem} className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                    Simpan Navigasi
                  </Button>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {navigationItems
                .sort((a, b) => a.order - b.order) // Sort by order
                .map((item) => (
                <Card key={item.id} className="p-4 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">{item.title}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">#{item.order}</span>
                  </div>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    <p>Path: {item.path}</p>
                    {item.icon && <p>Icon: {item.icon}</p>}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${item.isVisible ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                      {item.isVisible ? 'Tampil' : 'Sembunyi'}
                    </span>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setDialogEntityType('navigation');
                          setDialogType('navigation-edit');
                          setEditingItemId(item.id);
                          setNewNavigationItem({
                            title: item.title,
                            path: item.path,
                            icon: item.icon || '',
                            order: item.order,
                            isVisible: item.isVisible
                          });
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Anda yakin ingin menghapus item navigasi ini?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tindakan ini tidak dapat dibatalkan. Item navigasi akan dihapus dari menu.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteNavigationItem(item.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Page Content Management Tab */}
          <TabsContent value="pageContent" className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Pengelolaan Konten Halaman</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Atur konten untuk halaman-halaman utama seperti Timeline, Cerita Kita, Buku Kenangan, dan Tentang Kami
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Button 
                  onClick={() => handlePageContentSelect('timeline')}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 p-4 text-left"
                >
                  <div className="font-semibold">Kisah Kita (Timeline)</div>
                  <div className="text-sm opacity-80">Kelola konten halaman kisah cinta</div>
                </Button>
                <Button 
                  onClick={() => handlePageContentSelect('story')}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 p-4 text-left"
                >
                  <div className="font-semibold">Cerita Kita</div>
                  <div className="text-sm opacity-80">Kelola konten halaman cerita</div>
                </Button>
                <Button 
                  onClick={() => handlePageContentSelect('memories')}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 p-4 text-left"
                >
                  <div className="font-semibold">Buku Kenangan</div>
                  <div className="text-sm opacity-80">Kelola konten halaman kenangan</div>
                </Button>
                <Button 
                  onClick={() => handlePageContentSelect('about')}
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 p-4 text-left"
                >
                  <div className="font-semibold">Tentang Kami</div>
                  <div className="text-sm opacity-80">Kelola konten halaman tentang kami</div>
                </Button>
              </div>
              
              {pageContent && (
                <Card className="bg-gradient-to-br from-pink-50 to-white dark:from-pink-900/20 dark:to-gray-800">
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Mengelola Konten: {pageContent.pageName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="pageTitle">Judul Halaman</Label>
                        <Input
                          id="pageTitle"
                          value={newPageContent.title}
                          onChange={(e) => setNewPageContent({...newPageContent, title: e.target.value})}
                          placeholder="Judul halaman"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pageSubtitle">Sub Judul</Label>
                        <Input
                          id="pageSubtitle"
                          value={newPageContent.subtitle}
                          onChange={(e) => setNewPageContent({...newPageContent, subtitle: e.target.value})}
                          placeholder="Sub judul halaman"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pageImageUrl">URL Gambar</Label>
                        <Input
                          id="pageImageUrl"
                          value={newPageContent.imageUrl}
                          onChange={(e) => setNewPageContent({...newPageContent, imageUrl: e.target.value})}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pageHeroImageUrl">URL Gambar Hero</Label>
                        <Input
                          id="pageHeroImageUrl"
                          value={newPageContent.heroImageUrl}
                          onChange={(e) => setNewPageContent({...newPageContent, heroImageUrl: e.target.value})}
                          placeholder="https://example.com/hero-image.jpg"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pageMetaDescription">Deskripsi Meta (SEO)</Label>
                        <Input
                          id="pageMetaDescription"
                          value={newPageContent.metaDescription}
                          onChange={(e) => setNewPageContent({...newPageContent, metaDescription: e.target.value})}
                          placeholder="Deskripsi halaman untuk SEO"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pageContentArea">Konten Halaman</Label>
                        <Textarea
                          id="pageContentArea"
                          value={newPageContent.content}
                          onChange={(e) => setNewPageContent({...newPageContent, content: e.target.value})}
                          placeholder="Konten utama halaman..."
                          rows={6}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="pageIsPublished"
                          checked={newPageContent.isPublished}
                          onChange={(e) => setNewPageContent({...newPageContent, isPublished: e.target.checked})}
                        />
                        <Label htmlFor="pageIsPublished">Terbitkan halaman</Label>
                      </div>
                      <Button 
                        onClick={handleUpdatePageContent}
                        className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                      >
                        Simpan Perubahan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}