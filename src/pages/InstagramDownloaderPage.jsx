import React, { useState } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { useToast } from '@/components/ui/use-toast';
    import { Download, Loader2, Link as LinkIcon, Film, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

    const InstagramDownloaderPage = () => {
      const [url, setUrl] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const [videoInfo, setVideoInfo] = useState(null);
      const [error, setError] = useState(null);
      const { toast } = useToast();

      const API_BASE_URL = 'https://apis.davidcyriltech.my.id/instagram?url=';

      const isValidInstagramUrl = (inputUrl) => {
        try {
          const parsedUrl = new URL(inputUrl);
          return parsedUrl.hostname.includes('instagram.com') && (parsedUrl.pathname.includes('/reel/') || parsedUrl.pathname.includes('/p/') || parsedUrl.pathname.includes('/tv/'));
        } catch (e) {
          return false;
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setVideoInfo(null);

        if (!url.trim()) {
          setError('Please enter an Instagram video URL.');
          toast({ title: 'Input Error', description: 'URL field cannot be empty.', variant: 'destructive', duration: 3000 });
          return;
        }

        if (!isValidInstagramUrl(url)) {
          setError('Invalid Instagram URL. Please provide a link to a specific Reel, Post, or TV video.');
          toast({ title: 'Invalid URL', description: 'Please use a valid Instagram video link (reel, post, or tv).', variant: 'destructive', duration: 4000 });
          return;
        }
        
        setIsLoading(true);
        try {
          const response = await fetch(`${API_BASE_URL}${encodeURIComponent(url)}`);
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: "An unknown error occurred while fetching." }));
            throw new Error(errorData.message || `Failed to fetch video. Server responded with status: ${response.status}`);
          }
          const data = await response.json();

          if (data.success && data.downloadUrl) {
            setVideoInfo(data);
            toast({ title: 'Success!', description: 'Your video is ready for download.', className: 'bg-gradient-to-r from-green-500 to-teal-500 text-white', duration: 3000 });
          } else {
            throw new Error(data.message || 'Could not retrieve download link. The API might not support this content or the URL is incorrect.');
          }
        } catch (err) {
          console.error("API Error:", err);
          let errorMessage = err.message || 'An unexpected error occurred. Please try again.';
          if (errorMessage.toLowerCase().includes("failed to fetch")) {
             errorMessage = "Network error. Could not connect to the download service. Please check your internet connection or try again later.";
          } else if (errorMessage.includes("The API might not support this content")) {
             errorMessage = "This Instagram link might not be a downloadable video, or it could be private/unavailable.";
          }
          setError(errorMessage);
          toast({ title: 'Download Failed', description: errorMessage, variant: 'destructive', duration: 5000 });
        } finally {
          setIsLoading(false);
        }
      };

      const handleReset = () => {
        setUrl('');
        setVideoInfo(null);
        setError(null);
        toast({ title: 'Form Cleared', description: 'You can now enter a new URL.', duration: 2000 });
      };
      
      const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "circOut" } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "circIn" } }
      };
      
      const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "backOut" } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: "backIn" } }
      };

      return (
        <motion.div 
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 selection:bg-purple-500 selection:text-white"
        >
          <motion.div
            variants={cardVariants}
            className="w-full max-w-2xl bg-slate-800/70 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl border border-purple-500/40"
          >
            <div className="text-center mb-8">
              <motion.div 
                initial={{ scale: 0.5, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 180, damping: 12 }}
                className="inline-block p-3.5 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-full mb-5 shadow-lg hover:shadow-pink-500/50 transition-shadow"
              >
                <Film size={36} className="text-white" />
              </motion.div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 mb-2">
                InstaReel Downloader
              </h1>
              <p className="text-gray-400/90 mt-2 text-sm sm:text-base">
                Paste any public Instagram Reel, Post, or TV video link to download.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative flex items-center">
                <LinkIcon size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <Input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="e.g., https://www.instagram.com/reel/..."
                  className="bg-slate-700/80 border-slate-600/70 text-gray-200 focus:ring-pink-500 focus:border-pink-500 h-12 pl-11 pr-12 text-base rounded-lg shadow-sm transition-colors focus:bg-slate-700"
                  aria-label="Instagram Video URL"
                />
                {url && (
                  <motion.button
                    type="button"
                    onClick={handleReset}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-400 p-1"
                    aria-label="Clear input"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ rotate: 90 }}
                  >
                    <RefreshCw size={18} />
                  </motion.button>
                )}
              </div>
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 text-lg rounded-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] focus:ring-4 focus:ring-purple-400/50 flex items-center justify-center shadow-md hover:shadow-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={24} className="animate-spin mr-2.5" /> Processing...
                  </>
                ) : (
                  <>
                    <Download size={22} className="mr-2.5" /> Get Video
                  </>
                )}
              </Button>
            </form>

            <AnimatePresence>
              {error && (
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mt-6 p-4 bg-red-900/30 border border-red-600/50 rounded-lg text-red-300 flex items-start space-x-3 shadow-md"
                  role="alert"
                >
                  <AlertTriangle size={24} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-200">Download Error</h3>
                    <p className="text-sm">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {videoInfo && (
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mt-8 p-5 sm:p-6 bg-slate-700/60 border border-purple-500/50 rounded-lg shadow-lg"
                >
                  <div className="flex items-center text-green-400 mb-3.5">
                    <CheckCircle size={28} className="mr-2.5 text-green-300" />
                    <h2 className="text-xl sm:text-2xl font-semibold">Video Ready!</h2>
                  </div>
                  
                  {videoInfo.filename && (
                    <p className="text-gray-300/90 mb-1.5 text-sm truncate" title={videoInfo.filename}>
                      <span className="font-medium text-purple-300">Filename:</span> {videoInfo.filename}
                    </p>
                  )}
                  <p className="text-gray-300/90 mb-4 text-sm">
                    <span className="font-medium text-purple-300">Type:</span> {videoInfo.type ? videoInfo.type.toUpperCase() : 'N/A'}
                  </p>
                  
                  <a
                    href={videoInfo.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={videoInfo.filename || `instagram_video.${videoInfo.type || 'mp4'}`}
                    className="w-full block"
                  >
                    <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3 text-lg rounded-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] focus:ring-4 focus:ring-green-400/50 flex items-center justify-center shadow-md hover:shadow-lg">
                      <Download size={22} className="mr-2.5" /> Download Now
                    </Button>
                  </a>
                  <p className="text-xs text-gray-500/80 mt-3 text-center">
                    Tip: If download doesn't start, right-click the button and select "Save Link As...".
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      );
    };

    export default InstagramDownloaderPage;