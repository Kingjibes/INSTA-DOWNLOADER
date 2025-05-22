import React from 'react';
    import { motion } from 'framer-motion';

    const LoadingScreen = () => {
      return (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="relative w-40 h-40"
          >
            <motion.div
              className="absolute inset-0 border-4 border-purple-400 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 border-4 border-blue-400 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.h1
                className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                H
              </motion.h1>
            </div>
          </motion.div>
        </div>
      );
    };

    export default LoadingScreen;