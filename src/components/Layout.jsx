import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Home, DownloadCloud } from 'lucide-react'; // Removed MessageSquare, Users, LogIn, LogOut
import { Button } from '@/components/ui/button';
// import { supabase } from '@/lib/supabaseClient'; // Supabase no longer needed here for auth
// import { toast } from '@/components/ui/use-toast'; // Toast no longer needed here for auth

const navItems = [
  { path: "/", label: "Home", icon: <Home className="w-5 h-5 mr-1 sm:mr-2" /> },
  { path: "/recent-downloads", label: "Recent Downloads", icon: <DownloadCloud className="w-5 h-5 mr-1 sm:mr-2" /> },
];

const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-20 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center"
    >
      <div className="flex items-center justify-center sm:justify-start gap-3 mb-4 sm:mb-0">
        <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
        <Link to="/" className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
          Made by HACKERPRO
        </Link>
        <Sparkles className="w-8 h-8 text-pink-400 animate-pulse" />
      </div>
      <div className="flex items-center justify-center gap-4">
        <img className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-indigo-500 pulse-glow shadow-lg shadow-indigo-500/50" alt="HACKERPRO profile" src="https://images.unsplash.com/photo-1689608171753-44c0d5ee63d6" />
        {/* Login/Logout button removed */}
      </div>
    </motion.header>
  );
};

const Navigation = () => {
  const location = useLocation();
  return (
    <nav className="relative z-20 flex flex-wrap justify-center gap-2 sm:gap-4 p-3 bg-black/30 backdrop-blur-md shadow-lg rounded-b-xl mb-6">
      {navItems.map(item => (
        <Button key={item.path} asChild variant="ghost" className={`text-gray-300 hover:text-white hover:bg-white/10 transition-all px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg ${location.pathname === item.path ? 'text-indigo-400 font-semibold bg-white/5' : ''}`}>
          <Link to={item.path} className="flex items-center text-xs sm:text-sm">
            {item.icon} {item.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
};

const Footer = () => (
  <motion.footer 
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.5 }}
    className="relative z-10 mt-auto p-6 sm:p-8 text-center border-t border-indigo-400/20 bg-black/40 backdrop-blur-md"
  >
    <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 animate-pulse" />
      <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Made by HACKERPRO
      </span>
      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400 animate-pulse" />
    </div>
    <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
      <img className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-indigo-400 pulse-glow" alt="HACKERPRO footer profile" src="https://images.unsplash.com/photo-1568027763553-53a8cddd7c6f" />
    </div>
    <p className="text-gray-400 text-sm sm:text-base">
      Crafted with 💜 in the digital cosmos • © {new Date().getFullYear()} HACKERPRO
    </p>
  </motion.footer>
);

const Layout = ({ children }) => { // Removed user prop
  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col">
      <div className="galaxy-background" />
      <Header />
      <Navigation />
      <main className="relative z-10 container mx-auto px-4 py-2 sm:py-4 flex-grow flex flex-col items-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;