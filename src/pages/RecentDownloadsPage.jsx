import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ImageOff, Trash2, Video, ExternalLink, Star } from 'lucide-react'; // Removed LogIn
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

const MediaPreview = ({ thumbnailUrl, mediaType }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError || !thumbnailUrl) {
    return (
      <div className="w-full h-40 bg-gray-700/50 rounded-t-lg flex flex-col items-center justify-center text-center p-2">
        <ImageOff className="w-12 h-12 text-gray-400 mb-2" />
        <p className="text-xs text-gray-300">
          {mediaType === 'video' ? 'Video Preview Unavailable' : 'Image Preview Unavailable'}
        </p>
      </div>
    );
  }
  return (
    <img
      src={thumbnailUrl}
      alt="Media thumbnail"
      className="w-full h-40 object-cover rounded-t-lg"
      onError={() => setImgError(true)}
    />
  );
};

const RecentDownloadsPage = () => { // Removed user prop
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchDownloads = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('download_history')
        .select('*')
        // .eq('user_id', user.id) // Removed user-specific filter
        .order('downloaded_at', { ascending: false })
        .limit(50); 

      if (error) {
        toast({
          title: 'Error Fetching Public History',
          description: error.message,
          variant: 'destructive',
        });
        setDownloads([]);
      } else {
        setDownloads(data || []);
      }
      setLoading(false);
    };

    fetchDownloads();
  }, []); // Removed user from dependency array

  const handleDirectDownload = (downloadUrl, type) => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `ig_media_${type}_${Date.now()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Download Initiated!",
      description: `Your ${type} is warping to your device.`,
    });
  };

  const handleDelete = async (id) => {
    // Note: Deleting items from a public list might be undesirable.
    // For now, this will attempt to delete based on 'id' only.
    // In a real public scenario, you might want to disable deletion or use an admin role.
    setDeletingId(id);
    const { error } = await supabase
      .from('download_history')
      .delete()
      .eq('id', id);
      // .eq('user_id', user.id); // Removed user-specific condition for deletion
    
    if (error) {
      toast({
        title: 'Error Deleting Item',
        description: "Could not delete item. " + error.message,
        variant: 'destructive',
      });
    } else {
      setDownloads(downloads.filter(item => item.id !== id));
      toast({
        title: 'Item Deleted',
        description: 'The download record has been removed from public history.',
      });
    }
    setDeletingId(null);
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Star className="w-12 h-12 text-indigo-400 animate-spin" />
        <p className="ml-4 text-xl text-white">Loading Public Cosmic Archives...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto w-full"
    >
      <div className="text-center mb-10">
        <Video className="w-16 h-16 text-indigo-400 mx-auto mb-4 animate-pulse" />
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Recent Public Captures
        </h1>
        <p className="text-lg text-gray-300 mt-2">
          A public log of recently downloaded media from the Instagram galaxy.
        </p>
      </div>

      {downloads.length === 0 ? (
        <Card className="glass-effect border-indigo-500/40 shadow-xl shadow-indigo-500/20 p-8 rounded-xl text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Archive Empty</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              No media has been downloaded yet. Be the first to start the public collection!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {downloads.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-effect border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 flex flex-col h-full">
                <CardHeader className="p-0">
                  <MediaPreview thumbnailUrl={item.thumbnail_url} mediaType={item.media_type} />
                </CardHeader>
                <CardContent className="p-4 flex flex-col flex-grow">
                  <CardTitle className="text-lg text-white mb-1 capitalize truncate" title={item.media_type}>
                    {item.media_type || 'Media'}
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-400 mb-3">
                    Captured: {new Date(item.downloaded_at).toLocaleDateString()}
                  </CardDescription>
                  
                  <div className="mt-auto space-y-2">
                     <Button
                      onClick={() => handleDirectDownload(item.media_url, item.media_type)}
                      className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:brightness-110 text-white text-sm py-2"
                      size="sm"
                    >
                      <Download className="w-4 h-4 mr-2" /> Download Again
                    </Button>
                    {item.source_url && (
                       <Button
                        variant="outline"
                        onClick={() => window.open(item.source_url, '_blank')}
                        className="w-full border-indigo-500/60 text-indigo-300 hover:bg-indigo-500/20 hover:text-indigo-200 text-sm py-2"
                        size="sm"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" /> View Source
                      </Button>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          className="w-full bg-red-700/80 hover:bg-red-600 text-white text-sm py-2"
                          size="sm"
                          disabled={deletingId === item.id}
                          title="Delete this item from public history (irreversible)"
                        >
                          {deletingId === item.id ? (
                            <Star className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4 mr-2" />
                          )}
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="glass-effect border-red-500/50">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-red-400">Confirm Deletion</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-300">
                            Are you sure you want to remove this item from the public download history? This action cannot be undone and affects all users.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="hover:bg-gray-700/50">Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            Confirm Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default RecentDownloadsPage;