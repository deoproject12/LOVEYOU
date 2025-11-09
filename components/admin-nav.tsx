'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Menu,
  User,
  LogOut,
  Home,
  Camera,
  Settings,
  Moon,
  Sun,
  Heart,
  Calendar,
  BookOpen,
  Music,
  Utensils,
  Users
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

// Define the NavigationItem type
interface NavigationItem {
  id: number;
  title: string;
  path: string;
  icon: string;
  order: number;
  isVisible: boolean;
}

export default function AdminNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Check login status from localStorage
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const user = localStorage.getItem('user');

    setIsLoggedIn(isAuthenticated && !!user);
    setIsAdmin(isAuthenticated && !!user);
  }, []);

  useEffect(() => {
    // Load navigation items from API
    const loadNavigation = async () => {
      try {
        const response = await fetch('/api/admin/navigation');
        if (response.ok) {
          const navItems = await response.json();
          // Only include visible navigation items
          setNavigationItems(navItems.filter((item: NavigationItem) => item.isVisible));
        } else {
          // Default navigation items if API fails
          setNavigationItems([
            { id: 1, title: "Beranda", path: "/", icon: "Home", order: 0, isVisible: true },
            { id: 2, title: "Kisah Kita", path: "/timeline", icon: "Calendar", order: 1, isVisible: true },
            { id: 3, title: "Galeri", path: "/gallery", icon: "Camera", order: 2, isVisible: true },
            { id: 4, title: "Cerita Kita", path: "/story", icon: "BookOpen", order: 3, isVisible: true },
            { id: 5, title: "Buku Kenangan", path: "/memories", icon: "Heart", order: 4, isVisible: true },
            { id: 6, title: "Lagu Favorit", path: "/music", icon: "Music", order: 5, isVisible: true },
            { id: 7, title: "Makanan Favorit", path: "/food", icon: "Utensils", order: 6, isVisible: true },
            { id: 8, title: "Tentang Kami", path: "/about", icon: "Users", order: 7, isVisible: true },
          ]);
        }
      } catch (error) {
        console.error('Error loading navigation:', error);
        // Default navigation items if API fails
        setNavigationItems([
          { id: 1, title: "Beranda", path: "/", icon: "Home", order: 0, isVisible: true },
          { id: 2, title: "Kisah Kita", path: "/timeline", icon: "Calendar", order: 1, isVisible: true },
          { id: 3, title: "Galeri", path: "/gallery", icon: "Camera", order: 2, isVisible: true },
          { id: 4, title: "Cerita Kita", path: "/story", icon: "BookOpen", order: 3, isVisible: true },
          { id: 5, title: "Buku Kenangan", path: "/memories", icon: "Heart", order: 4, isVisible: true },
          { id: 6, title: "Lagu Favorit", path: "/music", icon: "Music", order: 5, isVisible: true },
          { id: 7, title: "Makanan Favorit", path: "/food", icon: "Utensils", order: 6, isVisible: true },
          { id: 8, title: "Tentang Kami", path: "/about", icon: "Users", order: 7, isVisible: true },
        ]);
      }
    };

    loadNavigation();
  }, []);

  const handleLogin = () => {
    // Redirect to login page
    window.location.href = '/sign-in';
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsAdmin(false);

    // Redirect to home page after logout
    window.location.href = '/';
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Function to get icon component by name
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-4 h-4 mr-1 inline" />;
      case 'Camera':
        return <Camera className="w-4 h-4 mr-1 inline" />;
      case 'Settings':
        return <Settings className="w-4 h-4 mr-1 inline" />;
      case 'Moon':
        return <Moon className="w-4 h-4 mr-1 inline" />;
      case 'Sun':
        return <Sun className="w-4 h-4 mr-1 inline" />;
      case 'Heart':
        return <Heart className="w-4 h-4 mr-1 inline" />;
      case 'Calendar':
        return <Calendar className="w-4 h-4 mr-1 inline" />;
      case 'BookOpen':
        return <BookOpen className="w-4 h-4 mr-1 inline" />;
      case 'Music':
        return <Music className="w-4 h-4 mr-1 inline" />;
      case 'Utensils':
        return <Utensils className="w-4 h-4 mr-1 inline" />;
      case 'Users':
        return <Users className="w-4 h-4 mr-1 inline" />;
      default:
        return <Heart className="w-4 h-4 mr-1 inline" />;
    }
  };

  // Function to get icon component for mobile menu
  const getMobileIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-4 h-4" />;
      case 'Camera':
        return <Camera className="w-4 h-4" />;
      case 'Settings':
        return <Settings className="w-4 h-4" />;
      case 'Moon':
        return <Moon className="w-4 h-4" />;
      case 'Sun':
        return <Sun className="w-4 h-4" />;
      case 'Heart':
        return <Heart className="w-4 h-4" />;
      case 'Calendar':
        return <Calendar className="w-4 h-4" />;
      case 'BookOpen':
        return <BookOpen className="w-4 h-4" />;
      case 'Music':
        return <Music className="w-4 h-4" />;
      case 'Utensils':
        return <Utensils className="w-4 h-4" />;
      case 'Users':
        return <Users className="w-4 h-4" />;
      default:
        return <Heart className="w-4 h-4" />;
    }
  };

  return (
    <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 w-8 h-8 rounded-full flex items-center justify-center">
              <Heart className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent">
              Abdullah & Nayla
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems
              .sort((a, b) => a.order - b.order) // Sort by order
              .map((item) => (
                <Link 
                  key={item.id} 
                  href={item.path} 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800 flex items-center"
                >
                  {getIcon(item.icon)}
                  {item.title}
                </Link>
              ))}
            {isAdmin && (
              <Link href="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800 flex items-center">
                <Settings className="w-4 h-4 mr-1 inline" />
                Dashboard
              </Link>
            )}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-8 w-8 rounded-full"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Login/Logout Button */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                  Admin
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="h-8 w-8 rounded-full"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleLogin}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <User className="w-4 h-4 mr-2" />
                Login Admin
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-8 w-8 rounded-full"
                  aria-label="Open menu"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>Menu Navigasi</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4">
                  {navigationItems
                    .sort((a, b) => a.order - b.order) // Sort by order
                    .map((item) => (
                      <Link
                        key={item.id}
                        href={item.path}
                        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800"
                      >
                        {getMobileIcon(item.icon)}
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  {isAdmin && (
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                  )}

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    {isLoggedIn ? (
                      <div className="flex flex-col space-y-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Admin</span>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={handleLogout}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={handleLogin}
                        className="w-full justify-start"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Login Admin
                      </Button>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}