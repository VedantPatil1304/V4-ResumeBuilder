import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Moon, Sun, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <div className="p-3 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-2xl shadow-xl">
                <FileText className="text-white text-3xl drop-shadow-lg" />
              </div>
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1 animate-bounce">
                <Sparkles className="text-white text-xs" fill="currentColor" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                V4 ResumeBuilder
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Professional • Modern • Free
              </p>
            </div>
          </motion.div>

          {/* Theme Toggle & Status */}
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full border border-green-200 dark:border-green-700"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700 dark:text-green-300">Live Preview</span>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="relative p-4 rounded-2xl bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 hover:from-gray-200 hover:via-gray-100 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:via-gray-600 dark:hover:to-gray-500 transition-all duration-500 shadow-xl hover:shadow-2xl border border-gray-200 dark:border-gray-600"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              {isDark ? (
                <Sun className="text-yellow-500 text-2xl drop-shadow-lg relative z-10" />
              ) : (
                <Moon className="text-gray-700 text-2xl drop-shadow-lg relative z-10" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;