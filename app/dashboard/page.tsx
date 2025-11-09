import AdminNav from '@/components/admin-nav';
import DashboardClient from './dashboard-client';
import { getGalleryItems, getMemories, getQuotes } from '../lib/server-actions';

export default async function AdminDashboard() {
  const [gallery, memories, quotes] = await Promise.all([
    getGalleryItems(),
    getMemories(),
    getQuotes()
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-pink-900/20 dark:via-gray-900 dark:to-rose-900/20">
      <AdminNav />
      <DashboardClient initialGallery={gallery} initialMemories={memories} initialQuotes={quotes} />
    </div>
  );
}