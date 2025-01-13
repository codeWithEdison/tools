import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  action: string;
  textColor?: string;
}

export const ContactItem: React.FC<ContactItemProps> = ({ 
  icon, 
  label, 
  value, 
  action,
  textColor = 'white'
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="group flex items-center justify-between p-4 bg-gradient-to-r from-white/10 to-transparent rounded-xl hover:from-white/15 transition-all duration-300"
  >
    <div className="flex items-center gap-3">
      <div className="group-hover:scale-110 transition-transform" style={{ color: textColor }}>
        {icon}
      </div>
      <div>
        <div className="text-lg font-semibold group-hover:opacity-90 transition-opacity" style={{ color: textColor }}>
          {value}
        </div>
        <div className="text-xs opacity-80" style={{ color: textColor }}>
          {label}
        </div>
      </div>
    </div>
    <div className="flex items-center gap-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: textColor }}>
      <span>{action}</span>
      <ArrowRight className="w-4 h-4" />
    </div>
  </motion.div>
);