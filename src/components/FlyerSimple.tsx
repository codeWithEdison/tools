import React from 'react';
import { Phone, Mail, Globe } from 'lucide-react';

interface ContactInfoProps {
  icon: React.ReactNode;
  text: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, text }) => (
  <div className="flex items-center gap-2 text-cyan-200">
    {icon}
    <span className="text-lg">{text}</span>
  </div>
);

const StatusFlyer: React.FC = () => {
  return (
    // Using 9:16 aspect ratio for status/stories
    <div className="w-full max-w-sm mx-auto aspect-[9/16] bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-tl from-purple-600/20 via-blue-600/20 to-transparent"></div>
      </div>

      <div className="relative h-full flex flex-col justify-between p-8">
        {/* Header Section */}
        <div className="text-center">
          <div className="w-24 h-24 mx-auto rounded-full border-4 border-cyan-200/20 overflow-hidden mb-4">
            <img
              src="/api/placeholder/96/96"
              alt="Edison Uwihanganye"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-200 to-blue-200 text-transparent bg-clip-text mb-1">
            CodeWithEdison
          </h1>
          <p className="text-cyan-200 text-lg mb-4">Tech Expert & Mentor</p>
        </div>

        {/* Services Section - Compact Version */}
        <div className="space-y-2 bg-white/5 rounded-2xl p-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💻</span>
              <span className="text-cyan-200">Web Dev</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <span className="text-cyan-200">AI/ML</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔗</span>
              <span className="text-cyan-200">Blockchain</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">👨‍🏫</span>
              <span className="text-cyan-200">Mentorship</span>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="space-y-3">
          <ContactInfo 
            icon={<Phone className="w-5 h-5" />} 
            text="0788240303" 
          />
          <ContactInfo 
            icon={<Mail className="w-5 h-5" />} 
            text="edsnkvn@gmail.com" 
          />
          <ContactInfo 
            icon={<Globe className="w-5 h-5" />} 
            text="codewithedison.com" 
          />
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-lg">📍 Rwanda</p>
          <p className="text-cyan-200 font-bold mt-1">Let's build something amazing!</p>
        </div>
      </div>
    </div>
  );
};

export default StatusFlyer;