import React, { useRef, useState } from 'react';
import { Download, ArrowRight, Phone, Mail, Globe } from 'lucide-react';
import html2canvas from 'html2canvas';

interface ServiceCardProps {
  emoji: string;
  title: string;
  description: string;
  actionText: string;
}

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  action: string;
}

interface Service {
  emoji: string;
  title: string;
  description: string;
  actionText: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ emoji, title, description, actionText }) => (
  <div className="group bg-gradient-to-r from-white/10 to-white/5 p-4 rounded-xl hover:from-white/15 hover:to-white/10 transition-all duration-300 cursor-pointer">
    <div className="flex items-center gap-3 mb-1">
      <span className="text-2xl group-hover:scale-110 transition-transform">{emoji}</span>
      <h3 className="text-lg font-bold text-cyan-200">{title}</h3>
    </div>
    <p className="text-sm text-blue-100/90 mb-2">{description}</p>
    <div className="flex items-center gap-1 text-sm text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
      <span>{actionText}</span>
      <ArrowRight className="w-4 h-4" />
    </div>
  </div>
);

const ContactItem: React.FC<ContactItemProps> = ({ icon, label, value, action }) => (
  <div className="group flex items-center justify-between p-4 bg-gradient-to-r from-white/10 to-transparent rounded-xl hover:from-white/15 transition-all duration-300 cursor-pointer">
    <div className="flex items-center gap-3">
      <div className="text-cyan-200 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <div className="text-lg font-semibold text-cyan-200 group-hover:text-white transition-colors">{value}</div>
        <div className="text-xs text-blue-200/80">{label}</div>
      </div>
    </div>
    <div className="flex items-center gap-1 text-sm text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
      <span>{action}</span>
      <ArrowRight className="w-4 h-4" />
    </div>
  </div>
);

const DownloadableFlyer: React.FC = () => {
  const flyerRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState<boolean>(false);

  const services: Service[] = [
    {
      emoji: "💻",
      title: "Web Development",
      description: "Turn your ideas into stunning modern web applications",
      actionText: "Start building"
    },
    {
      emoji: "🤖",
      title: "AI Solutions",
      description: "Leverage AI to solve complex business challenges",
      actionText: "Explore AI"
    },
    {
      emoji: "🔗",
      title: "Blockchain Apps",
      description: "Build secure & innovative blockchain solutions",
      actionText: "Go decentralized"
    },
    {
      emoji: "👨‍🏫",
      title: "Tech Mentorship",
      description: "Accelerate your journey in tech with expert guidance",
      actionText: "Start learning"
    }
  ];

  const handleDownload = async (): Promise<void> => {
    if (!flyerRef.current) return;
    
    try {
      setDownloading(true);
      const canvas = await html2canvas(flyerRef.current);
      const blob = await new Promise<Blob>((resolve) => canvas.toBlob(blob => blob ? resolve(blob) : null, 'image/png', 1.0));
      
      if (!blob) throw new Error('Failed to create image');
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'CodeWithEdison-Flyer.png';
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
    <div className="max-w-md mx-auto space-y-4">
      {/* Interactive Download Button */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="group w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
      >
        <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span>{downloading ? 'Creating your flyer...' : 'Get Your Personal Copy'}</span>
      </button>

      {/* Flyer Content */}
      <div ref={flyerRef} className="w-full overflow-hidden p-0.5 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-3xl">
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl">
          {/* Header */}
          <div className="p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 blur-xl"></div>
            <div className="relative">
              <div className="w-28 h-28 mx-auto rounded-full border-4 border-cyan-200/20 overflow-hidden">
                <img
                  src="/me.png" 
                  alt="Edison Uwihanganye"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="mt-3 text-3xl font-bold bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 text-transparent bg-clip-text">
                CodeWithEdison
              </h1>
              <p className="mt-1 text-cyan-200 text-lg">Your Tech Journey Partner</p>
            </div>
          </div>

          {/* Interactive Services */}
          <div className="px-6 py-4 grid grid-cols-1 gap-3">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          {/* Interactive Contact Section */}
          <div className="p-6 space-y-3 bg-black/20">
            <ContactItem 
              icon={<Phone className="w-5 h-5" />}
              label="Call or WhatsApp"
              value="0788240303"
              action="Tap to call"
            />
            <ContactItem 
              icon={<Mail className="w-5 h-5" />}
              label="Send me an email"
              value="edsnkvn@gmail.com"
              action="Send message"
            />
            <ContactItem 
              icon={<Globe className="w-5 h-5" />}
              label="Visit my website"
              value="https://www.codewithedison.com"
              action="Visit now"
            />
            
            <div className="mt-6 text-center">
              <p className="text-lg">📍 Rwanda</p>
              <p className="mt-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-200">
                Ready to transform your tech journey?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadableFlyer;