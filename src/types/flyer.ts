export interface Service {
    emoji: string;
    title: string;
    description: string;
    actionText: string;
  }
  
  export interface Contact {
    phone: string;
    email: string;
    website: string;
    location: string;
  }
  
  export interface FlyerTheme {
    primary: string;
    secondary: string;
    accent: string;
    textPrimary: string;
    textSecondary: string;
  }
  
  export interface FlyerData {
    id: string;
    name: string;
    title: string;
    subtitle: string;
    services: Service[];
    contact: Contact;
    theme: FlyerTheme;
    imageUrl: string;
    createdAt: number;
  }