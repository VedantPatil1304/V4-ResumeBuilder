import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ResumeProvider } from './contexts/ResumeContext';
import Navbar from './components/Navbar';
import ResumeForm from './components/ResumeForm';
import LivePreview from './components/LivePreview';
import DownloadButton from './components/DownloadButton';

function AppContent() {
  const resumeRef = useRef(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10 transition-all duration-500">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/5 to-cyan-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <Navbar />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mb-6 leading-tight">
              Create Your Perfect
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                Dream Resume
              </span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Build a stunning, professional resume in minutes with our intuitive builder.
            <br />
            <span className="text-lg text-gray-500 dark:text-gray-600">
              ✨ Real-time preview • 📱 Mobile-friendly • 🎨 Beautiful templates • 📄 PDF export
            </span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full border border-green-200 dark:border-green-700">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-700 dark:text-green-300">100% Free</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full border border-blue-200 dark:border-blue-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">No Sign-up Required</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full border border-purple-200 dark:border-purple-700">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">Privacy First</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8 hover:shadow-3xl transition-all duration-500">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gradient-to-r from-blue-200/50 via-purple-200/50 to-pink-200/50 dark:border-gray-700/50">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Resume Information
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Fill in your details to create your perfect resume</p>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full border border-green-200 dark:border-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">Auto-saved</span>
                </div>
              </div>
              <ResumeForm />
            </div>
          </motion.div>

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-32 space-y-8">
              {/* Download Buttons */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8 hover:shadow-3xl transition-all duration-500">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                    <FileText className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Export Resume
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Download as PDF or print</p>
                  </div>
                </div>
                <DownloadButton resumeRef={resumeRef} />
              </div>

              {/* Live Preview */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8 hover:shadow-3xl transition-all duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                      <div className="w-5 h-5 bg-white rounded-sm"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        Live Preview
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">See changes instantly</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">Live</span>
                  </div>
                </div>

                <div className="transform scale-75 origin-top-left w-full h-96 overflow-hidden rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-inner bg-white dark:bg-gray-900">
                  <div className="transform scale-133 origin-top-left h-full overflow-y-auto">
                    <LivePreview ref={resumeRef} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
         <motion.footer
      className="w-full px-4 py-6 bg-transparent text-sm text-center text-gray-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        <span className="px-4 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700">
          <span role="img" aria-label="paint">🎨</span> Designed in React
        </span>
        <span className="px-4 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500">
          <span role="img" aria-label="paint brush">🖌️</span> Tailwind + Framer Motion
        </span>
        <span className="px-4 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-700">
          <span role="img" aria-label="lock">🔐</span> Your data stays local
        </span>
      </div>

      <div className="text-xs text-gray-400">
        <p>Built with ❤️ by Vedant Patil</p>
      </div>
    </motion.footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ResumeProvider>
        <AppContent />
      </ResumeProvider>
    </ThemeProvider>
  );
}

export default App;