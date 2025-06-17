import React from 'react';
import { motion } from 'framer-motion';
import { Download, Instagram, Rocket, Star, Video, ImageOff } from 'lucide-react'; // Removed ListPlus
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 1 + delay * 0.1 }}
    className="text-center p-4 glass-effect rounded-xl border border-indigo-400/20 hover:border-indigo-400/50 transition-all hover:shadow-indigo-500/30 shadow-lg"
  >
    <div className="text-4xl mb-3 text-indigo-400">{icon}</div>
    <h4 className="text-white font-semibold mb-1 text-lg">{title}</h4>
    <p className="text-gray-400 text-sm">{desc}</p>
  </motion.div>
);

const MediaThumbnail = ({ thumbnailUrl, mediaType }) => {
  const [imgError, setImgError] = React.useState(false);

  if (imgError || !thumbnailUrl) {
    return (
      <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-700/50 rounded-lg border-2 border-green-500/60 pulse-glow shadow-md flex flex-col items-center justify-center text-center p-2">
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
      className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-lg border-2 border-green-500/60 pulse-glow shadow-md"
      onError={() => setImgError(true)}
    />
  );
};


const DownloaderPage = () => {
  const [url, setUrl] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [downloadData, setDownloadData] = React.useState(null);
  const navigate = useNavigate();

  const handleDownload = async () => {
    if (!url.trim()) {
      toast({
        title: "Houston, we have a problem!",
        description: "Please enter a valid Instagram URL into the portal.",
        variant: "destructive",
      });
      return;
    }

    if (!url.includes('instagram.com')) {
      toast({
        title: "Invalid Trajectory!",
        description: "Please ensure you're using a valid Instagram URL.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setDownloadData(null);
    try {
      const response = await fetch(`https://api-aswin-sparky.koyeb.app/api/downloader/igdl?url=${encodeURIComponent(url)}`);
      const apiData = await response.json();
      
      if (apiData.status && apiData.data && apiData.data.length > 0) {
        const mediaItem = apiData.data[0];
        setDownloadData(mediaItem);
        toast({
          title: "Transmission Received!",
          description: "Your cosmic media is ready for download!",
        });
        
        const { error: logError } = await supabase
          .from('download_history')
          .insert([{ 
            media_url: mediaItem.url, 
            thumbnail_url: mediaItem.thumbnail,
            media_type: mediaItem.type,
            source_url: url,
            downloaded_at: new Date() 
          }]);

        if (logError) {
          console.error('Error logging download to Supabase:', logError);
          toast({
            title: "Log Error",
            description: "Failed to save to public download history. " + logError.message,
            variant: "destructive",
          });
        }

      } else {
        toast({
          title: "Signal Lost!",
          description: apiData.message || "Failed to fetch media. Double-check the URL or try another cosmic wave.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Cosmic Interference!",
        description: "A network anomaly occurred. Please try re-establishing connection.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
  
  const handleViewRecentDownloads = () => {
    navigate('/recent-downloads');
  };

  return (
     <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="max-w-3xl mx-auto w-full"
    >
      <div className="text-center mb-10">
        <motion.div className="floating mb-6">
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-full cosmic-gradient mb-6 pulse-glow shadow-xl shadow-indigo-500/30">
            <Instagram className="w-14 h-14 text-white" />
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold mb-5 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          InstaGalaxy Downloader
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg text-gray-300 mb-8 max-w-xl mx-auto"
        >
          Snag Instagram photos & videos from the farthest reaches of the digital universe. Fast, secure, and stellar! ✨
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <Card className="glass-effect border-indigo-500/40 shadow-2xl shadow-indigo-500/20 p-3 sm:p-4 rounded-xl">
          <CardHeader className="text-center pt-4 pb-2">
            <CardTitle className="text-3xl text-white flex items-center justify-center gap-3">
              <Rocket className="w-8 h-8 text-indigo-400 animate-pulse" />
              Launch Download Portal
            </CardTitle>
            <CardDescription className="text-gray-300 text-md sm:text-lg mt-1">
              Paste your Instagram URL into the portal below. All downloads are public.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 p-4">
            <div className="relative flex items-center">
              <Instagram className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-purple-400 pointer-events-none" />
              <Input
                placeholder="Enter Instagram URL (e.g., https://www.instagram.com/p/...)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-black/50 border-2 border-purple-600/70 text-white placeholder:text-gray-400/70 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/60 rounded-full py-3 sm:py-4 pl-14 pr-5 text-md sm:text-lg shadow-inner shadow-purple-600/40 transition-all duration-300 ease-in-out hover:border-purple-500"
              />
            </div>
             <Button
                onClick={handleDownload}
                disabled={loading}
                className="w-full cosmic-gradient hover:brightness-110 active:scale-95 transition-all duration-200 px-8 py-3 sm:py-4 text-md sm:text-lg rounded-full flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="flex items-center justify-center"
                  >
                    <Star className="w-6 h-6 text-white animate-spin" />
                    <span className="ml-2 font-semibold">Scanning Cosmos...</span>
                  </motion.div>
                ) : (
                  <>
                    <Download className="w-6 h-6 text-white group-hover:animate-bounce" />
                    <span className="font-semibold">Initiate Download</span>
                  </>
                )}
              </Button>


            {downloadData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8"
              >
                <Card className="glass-effect border-green-500/40 shadow-lg shadow-green-500/20 rounded-xl">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-center">
                      <div className="flex-shrink-0">
                        <MediaThumbnail thumbnailUrl={downloadData.thumbnail} mediaType={downloadData.type} />
                      </div>
                      
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                          {downloadData.type === 'video' ? '🎬 Galactic Video Acquired' : '🖼️ Cosmic Image Captured'}
                        </h3>
                        <p className="text-gray-300 mb-4 text-sm sm:text-base">
                          Your {downloadData.type} is ready for hyperspace jump to your device!
                        </p>
                        
                        <Button
                          onClick={() => handleDirectDownload(downloadData.url, downloadData.type)}
                          className="bg-gradient-to-r from-green-500 to-teal-500 hover:brightness-110 active:scale-95 transition-all duration-200 text-white font-semibold py-2 px-4 rounded-lg"
                        >
                          <Download className="w-5 h-5 mr-2" />
                          Download {downloadData.type}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <div className="grid grid-cols-1 gap-4 pt-6">
              <Button
                onClick={handleViewRecentDownloads}
                variant="outline"
                className="w-full glass-effect border-teal-500/60 text-teal-300 hover:bg-teal-500/20 hover:text-teal-200 hover:border-teal-400 transition-all duration-200 py-3 text-md rounded-lg flex items-center justify-center gap-2 group"
              >
                <Video className="w-5 h-5 group-hover:rotate-6 transition-transform"/>
                View Recent Captures
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <FeatureCard icon="⚡️" title="Warp Speed" desc="Downloads faster than a comet" delay={0} />
              <FeatureCard icon="🛡️" title="Stealth Shield" desc="Your privacy, our prime directive" delay={1} />
              <FeatureCard icon="🌌" title="Nebula HD" desc="Crystal clear, like distant stars" delay={2} />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default DownloaderPage;