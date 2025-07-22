import React from 'react';
import { motion } from 'framer-motion';
import { useReactToPrint } from 'react-to-print';
import { MdDownload, MdPrint } from 'react-icons/md';
import { useResume } from '../contexts/ResumeContext';

const DownloadButton = ({ resumeRef }) => {
  const { resumeData } = useResume();

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: `${resumeData.personalInfo.name || 'Resume'}_Resume`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0.5in;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        * {
          box-shadow: none !important;
        }
        .no-print {
          display: none !important;
        }
      }
    `,
    onBeforePrint: () => {
      console.log('Starting print process...');
      return Promise.resolve();
    },
    onAfterPrint: () => {
      console.log('Print process completed');
    },
    onPrintError: (errorLocation, error) => {
      console.error('Print error at:', errorLocation, error);
    },
  });

 const handleDownloadPDF = () => {
  console.log('Download PDF clicked');
  console.log('Resume ref current:', resumeRef?.current);

  if (!resumeRef?.current) {
    console.error('Resume reference not found');
    alert('Unable to generate PDF. Please make sure the resume preview is loaded.');
    return;
  }

  alert("💡 Tip: In the print settings, uncheck 'Headers and footers' to avoid extra text like URLs in the PDF.");

  try {
    handlePrint();
  } catch (error) {
    console.error('Error downloading PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};

const handlePrintResume = () => {
  console.log('Print resume clicked');
  console.log('Resume ref current:', resumeRef?.current);

  if (!resumeRef?.current) {
    console.error('Resume reference not found');
    alert('Unable to print. Please make sure the resume preview is loaded.');
    return;
  }

  alert("💡 Tip: In the print settings, uncheck 'Headers and footers' to avoid extra text like URLs in the printed resume.");

  try {
    handlePrint();
  } catch (error) {
    console.error('Error printing resume:', error);
    alert('Error printing resume. Please try again.');
  }
};


  const isEmpty = !resumeData.personalInfo.name && 
                 !resumeData.summary && 
                 resumeData.experience.length === 0 && 
                 resumeData.education.length === 0 && 
                 resumeData.skills.length === 0 && 
                 resumeData.projects.length === 0;

  return (
    <div className="space-y-3">
      <motion.button
        whileHover={{ scale: isEmpty ? 1 : 1.05 }}
        whileTap={{ scale: isEmpty ? 1 : 0.95 }}
        onClick={handleDownloadPDF}
        disabled={isEmpty}
        className={`
          w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200
          ${isEmpty 
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
          }
        `}
      >
        <MdDownload className="text-xl" />
        <span>Download PDF</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: isEmpty ? 1 : 1.02 }}
        whileTap={{ scale: isEmpty ? 1 : 0.98 }}
        onClick={handlePrintResume}
        disabled={isEmpty}
        className={`
          w-full flex items-center justify-center space-x-3 px-6 py-3 rounded-xl font-medium transition-all duration-200
          ${isEmpty 
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200 dark:border-gray-700' 
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
          }
        `}
      >
        <MdPrint className="text-lg" />
        <span>Print Resume</span>
      </motion.button>

      {isEmpty && (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Add your information to enable download
        </p>
      )}
    </div>
  );
};

export default DownloadButton;