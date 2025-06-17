import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center justify-center h-full text-center p-4"
  >
    <Rocket className="w-28 h-28 sm:w-36 sm:h-36 text-indigo-400 mb-6 animate-bounce" />
    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">404 - Lost in the Cosmos</h1>
    <p className="text-gray-300 mb-8 text-lg sm:text-xl max-w-md">
      Oops! It seems this page has drifted into an uncharted nebula.
    </p>
    <Button asChild className="cosmic-gradient hover:brightness-110 active:scale-95 transition-all duration-200 py-3 px-6 text-md rounded-lg">
      <Link to="/">
        <Home className="w-5 h-5 mr-2" />
        Return to Home Base
      </Link>
    </Button>
  </motion.div>
);

export default NotFoundPage;