import React, { useRef, useState } from 'react';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';

const StudentFlyer: React.FC = () => {
  const flyerRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState<boolean>(false);

  const handleDownload = async (): Promise<void> => {
    if (!flyerRef.current) return;
    try {
      setDownloading(true);
      const canvas = await html2canvas(flyerRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      });
      const blob = await new Promise<Blob>((resolve) => 
        canvas.toBlob(blob => blob ? resolve(blob) : null, 'image/png', 1.0)
      );
      if (!blob) throw new Error('Failed to create image');
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Tech-Expert-Contact.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
      >
        <Download className="w-5 h-5" />
        Save Contact
      </button>

      <div 
        ref={flyerRef}
        className="bg-gradient-to-br from-blue-600 to-blue-900 text-white rounded-2xl overflow-hidden shadow-xl"
      >
        {/* Main Content */}
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full border-4 border-white/20 overflow-hidden flex-shrink-0">
              <img
                src="/me.png"
                alt="Tech Expert"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">CodeWithEdison</h1>
              <p className="text-blue-200 text-sm">Tech Expert & Project Guide</p>
            </div>
          </div>

          {/* Expertise Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Web Apps</span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Mobile</span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-sm">AI/ML</span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Blockchain</span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-sm">IOT</span> 
          </div>

          {/* Quick Stats */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="bg-black/20 p-2 rounded-xl text-center">
              <p className="text-lg font-bold">500+</p>
              <p className="text-xs text-blue-200">Projects Done</p>
            </div>
            <div className="bg-black/20 p-2 rounded-xl text-center">
              <p className="text-lg font-bold">100%</p>
              <p className="text-xs text-blue-200">Success Rate</p>
            </div>
          </div>
        </div>

        {/* Contact Section - Compact */}
        <div className="px-6 py-4 bg-black/20 text-center">
          <div className="flex justify-center gap-6">
            <a href="tel:0788240303" className="text-blue-200 hover:text-white transition-colors">
              📞 0788240303
            </a>
            <a href="https://www.codewithedison.com" className="text-blue-200 hover:text-white transition-colors">
              🌐 Website
            </a>
          </div>
          <p className="mt-2 text-sm font-medium">Transform your project into excellence!</p> 
        </div>
      </div>
    </div>
  );
};

export default StudentFlyer; 