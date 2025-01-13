import { Layout, Quote, FileText, Code, Settings, LayoutDashboard } from 'lucide-react';

export const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'layout':
      return <Layout className="w-6 h-6" />;
    case 'layout-2':
      return <LayoutDashboard className="w-6 h-6" />; 
    case 'quote':
      return <Quote className="w-6 h-6" />;
    case 'file':
      return <FileText className="w-6 h-6" />;
    case 'code':
      return <Code className="w-6 h-6" />;
    case 'settings':
      return <Settings className="w-6 h-6" />;
    default:
      return <Code className="w-6 h-6" />;
  }
};
