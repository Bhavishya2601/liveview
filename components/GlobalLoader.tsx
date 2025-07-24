'use client'

import { useLoading } from '@/contexts/LoadingContext';
import { Loader2 } from 'lucide-react';

export default function GlobalLoader() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 flex items-center gap-3 shadow-lg">
        <Loader2 className="animate-spin h-12 w-12 text-black" />
      </div>
    </div>
  );
}
