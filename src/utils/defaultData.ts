import { FlyerData } from '../types/flyer';

export const defaultFlyer: FlyerData = {
  id: Date.now().toString(),
  name: 'My Professional Flyer',
  title: 'Your Name',
  subtitle: 'Professional Title | Expertise',
  services: [
    {
      emoji: "💻",
      title: "Service 1",
      description: "Description of your first service offering",
      actionText: "Learn More"
    }
  ],
  contact: {
    phone: "+123 456 789",
    email: "your@email.com",
    website: "www.yourwebsite.com",
    location: "City, Country"
  },
  theme: {
    primary: "#0891b2",
    secondary: "#1e40af",
    accent: "#a855f7",
    textPrimary: "#ffffff",
    textSecondary: "#94a3b8"
  },
  imageUrl: "/placeholder-avatar.png",
  createdAt: Date.now()
};
