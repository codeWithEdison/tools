import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Service } from '../types/flyer';
import { motion } from 'framer-motion';

interface ServiceCardProps extends Service {
  textColor?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  emoji, 
  title, 
  description, 
  actionText,
  textColor = 'white' 
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="group bg-gradient-to-r from-white/10 to-white/5 p-4 rounded-xl hover:from-white/15 hover:to-white/10 transition-all duration-300"
  >
    <div className="flex items-center gap-3 mb-1">
      <span className="text-2xl group-hover:scale-110 transition-transform">{emoji}</span>
      <h3 className="text-lg font-bold" style={{ color: textColor }}>{title}</h3>
    </div>
    <p className="text-sm opacity-90 mb-2" style={{ color: textColor }}>{description}</p>
    <div className="flex items-center gap-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: textColor }}>
      <span>{actionText}</span>
      <ArrowRight className="w-4 h-4" />
    </div>
  </motion.div>
);