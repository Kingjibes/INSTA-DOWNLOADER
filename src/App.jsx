import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import DownloaderPage from '@/pages/DownloaderPage';
import RecentDownloadsPage from '@/pages/RecentDownloadsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { Toaster } from '@/components/ui/toaster';
import { supabase } from '@/lib/supabaseClient'; 

function App() {
  const location = useLocation();
  
  React.useEffect(() => {
    const checkSupabaseConnection = async () => {
      try {
        const { error } = await supabase.from('download_history').select('id').limit(1); 
        if (error && error.message !== 'relation "public.download_history" does not exist' && !error.message.includes('JWT') && !error.message.includes('permission denied')) {
          console.error('Supabase connection error:', error);
        } else if (!error || error.message.includes('permission denied')) { // Permission denied is okay if anon doesn't have select rights on some tables by default
          console.log('Supabase connection successful or running with anon privileges.');
        }
      } catch (e) {
        console.error('Exception during Supabase connection check:', e);
      }
    };
    checkSupabaseConnection();
  }, []);

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<DownloaderPage />} />
          <Route path="/recent-downloads" element={<RecentDownloadsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
      <Toaster />
    </Layout>
  );
}

export default App;