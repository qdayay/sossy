import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, Download, X } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFPreviewProps {
  file: File | string;
  onRemove: () => void;
}

export function PDFPreview({ file, onRemove }: PDFPreviewProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    setError('Error loading PDF. Please try again.');
    console.error('PDF Load Error:', error);
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-gray-50">
      <div className="flex items-center justify-between p-3 border-b bg-white">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">
            {typeof file === 'string' ? 'PDF Document' : file.name}
          </span>
          {typeof file === 'string' ? null : (
            <span className="text-xs text-gray-500">
              ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.open(typeof file === 'string' ? file : URL.createObjectURL(file))}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
            title="Download PDF"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={onRemove}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
            title="Remove PDF"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {error ? (
        <div className="p-4 text-center text-red-600 text-sm">{error}</div>
      ) : (
        <div className="relative">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            className="flex justify-center p-4"
          >
            <Page 
              pageNumber={pageNumber} 
              width={300}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>

          {numPages && numPages > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
              <button
                onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                disabled={pageNumber <= 1}
                className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm">
                {pageNumber} / {numPages}
              </span>
              <button
                onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
                disabled={pageNumber >= numPages}
                className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}