'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VerificationCheck({ children, currentPath }: {
  children: React.ReactNode;
  currentPath?: string;
}) {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState<boolean | null>(null); // null means loading
  const [isClient, setIsClient] = useState(false);

  // Skip verification check for these routes
  const skipVerification = ["/verify", "/sign-in", "/sign-up", "/api"];

  useEffect(() => {
    setIsClient(true);
    
    // If current path is one that should skip verification, set isVerified to true immediately
    if (currentPath && skipVerification.some(path => currentPath.startsWith(path))) {
      setIsVerified(true);
      return;
    }

    const checkVerification = () => {
      const verified = localStorage.getItem('verified') === 'true';
      setIsVerified(verified);

      if (!verified) {
        router.push('/verify');
      }
    };

    // Add a small delay to allow the UI to render before redirecting
    const timer = setTimeout(checkVerification, 100);

    return () => clearTimeout(timer);
  }, [router, currentPath, skipVerification]);

  // To prevent hydration errors, ensure the same content is rendered during SSR and initial client render
  // Show loading state initially for all cases, then conditionally render based on state after hydration
  if (!isClient || isVerified === null) {
    // Loading state - render consistently for both server and client initial render
    return (
      <div className="min-h-screen flex items-center justify-center" suppressHydrationWarning>
        <div className="text-center" suppressHydrationWarning>
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500" suppressHydrationWarning></div>
          <p className="mt-4 text-lg text-pink-600" suppressHydrationWarning>Memeriksa verifikasi...</p>
        </div>
      </div>
    );
  }

  // After initial hydration, render conditionally based on path and verification status
  if (currentPath && skipVerification.some(path => currentPath.startsWith(path))) {
    // If path should skip verification, render children
    return <>{children}</>;
  }

  if (isVerified === false) {
    // If not verified, we'll redirect via useEffect, but just in case
    return null;
  }

  // If verified, render children
  return <>{children}</>;
}