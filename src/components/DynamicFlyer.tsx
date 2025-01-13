import React, { useRef, useState, useEffect } from 'react';
import { Phone, Mail, Globe, Plus, Trash2, Upload } from 'lucide-react';
import html2canvas from 'html2canvas';
import { FlyerData } from '../types/flyer';
import { saveFlyer, getFlyers, deleteFlyer } from '../utils/localStorage'; 
import { defaultFlyer } from '../utils/defaultData';
import { ServiceCard } from './ServiceCard';
import { ContactItem } from './ContactItem';

export const DynamicFlyer: React.FC = () => {
  const flyerRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [savedFlyers, setSavedFlyers] = useState<FlyerData[]>([]);
  const [currentFlyer, setCurrentFlyer] = useState<FlyerData>(defaultFlyer);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    setSavedFlyers(getFlyers());
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCurrentFlyer(prev => ({
          ...prev,
          imageUrl: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const flyerToSave = {
      ...currentFlyer,
      createdAt: Date.now()
    };
    saveFlyer(flyerToSave);
    setSavedFlyers(getFlyers());
  };

  const handleDelete = (id: string) => {
    deleteFlyer(id);
    setSavedFlyers(getFlyers());
    if (currentFlyer.id === id) {
      setCurrentFlyer(defaultFlyer);
    }
  };

  const handleDownload = async () => {
    if (!flyerRef.current) return;
    
    try {
      setDownloading(true);
      const canvas = await html2canvas(flyerRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: null
      });
      
      const link = document.createElement('a');
      link.download = `${currentFlyer.name.replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Panel */}
        {!previewMode && (
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Basic Information</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  value={currentFlyer.name}
                  onChange={(e) => setCurrentFlyer(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Flyer Name"
                />
                <input
                  type="text"
                  value={currentFlyer.title}
                  onChange={(e) => setCurrentFlyer(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Your Name"
                />
                <input
                  type="text"
                  value={currentFlyer.subtitle}
                  onChange={(e) => setCurrentFlyer(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Professional Title"
                />
                
                {/* Image Upload */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src={currentFlyer.imageUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Color Theme */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Color Theme</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Primary Color</label>
                  <input
                    type="color"
                    value={currentFlyer.theme.primary}
                    onChange={(e) => setCurrentFlyer(prev => ({
                      ...prev,
                      theme: { ...prev.theme, primary: e.target.value }
                    }))}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Secondary Color</label>
                  <input
                    type="color"
                    value={currentFlyer.theme.secondary}
                    onChange={(e) => setCurrentFlyer(prev => ({
                      ...prev,
                      theme: { ...prev.theme, secondary: e.target.value }
                    }))}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Accent Color</label>
                  <input
                    type="color"
                    value={currentFlyer.theme.accent}
                    onChange={(e) => setCurrentFlyer(prev => ({
                      ...prev,
                      theme: { ...prev.theme, accent: e.target.value }
                    }))}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Services</h2>
                <button
                  onClick={() => setCurrentFlyer(prev => ({
                    ...prev,
                    services: [...prev.services, {
                      emoji: "✨",
                      title: "New Service",
                      description: "Describe your service here",
                      actionText: "Learn More"
                    }]
                  }))}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Service
                </button>
              </div>
              
              <div className="space-y-4">
                {currentFlyer.services.map((service, index) => (
                  <div key={index} className="p-4 border rounded dark:border-gray-700">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Service {index + 1}</span>
                      <button
                        onClick={() => setCurrentFlyer(prev => ({
                          ...prev,
                          services: prev.services.filter((_, i) => i !== index)
                        }))}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={service.emoji}
                        onChange={(e) => {
                          const newServices = [...currentFlyer.services];
                          newServices[index] = { ...service, emoji: e.target.value };
                          setCurrentFlyer(prev => ({ ...prev, services: newServices }));
                        }}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        placeholder="Emoji (e.g., 💻)"
                      />
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => {
                          const newServices = [...currentFlyer.services];
                          newServices[index] = { ...service, title: e.target.value };
                          setCurrentFlyer(prev => ({ ...prev, services: newServices }));
                        }}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        placeholder="Service Title"
                      />
                      <input
                        type="text"
                        value={service.description}
                        onChange={(e) => {
                          const newServices = [...currentFlyer.services];
                          newServices[index] = { ...service, description: e.target.value };
                          setCurrentFlyer(prev => ({ ...prev, services: newServices }));
                        }}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        placeholder="Service Description"
                      />
                      <input
                        type="text"
                        value={service.actionText}
                        onChange={(e) => {
                          const newServices = [...currentFlyer.services];
                          newServices[index] = { ...service, actionText: e.target.value };
                          setCurrentFlyer(prev => ({ ...prev, services: newServices }));
                        }}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        placeholder="Action Text"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <input
                  type="tel"
                  value={currentFlyer.contact.phone}
                  onChange={(e) => setCurrentFlyer(prev => ({
                    ...prev,
                    contact: { ...prev.contact, phone: e.target.value }
                  }))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Phone Number"
                />
                <input
                  type="email"
                  value={currentFlyer.contact.email}
                  onChange={(e) => setCurrentFlyer(prev => ({
                    ...prev,
                    contact: { ...prev.contact, email: e.target.value }
                  }))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Email Address"
                />
                <input
                  type="url"
                  value={currentFlyer.contact.website}
                  onChange={(e) => setCurrentFlyer(prev => ({
                    ...prev,
                    contact: { ...prev.contact, website: e.target.value }
                  }))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Website URL"
                />
                <input
                  type="text"
                  value={currentFlyer.contact.location}
                  onChange={(e) => setCurrentFlyer(prev => ({
                    ...prev,
                    contact: { ...prev.contact, location: e.target.value }
                  }))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Location"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Flyer
              </button>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {downloading ? 'Downloading...' : 'Download Flyer'}
              </button>
            </div>
          </div>
        )}

        {/* Preview Panel */}
        <div className="lg:sticky lg:top-4">
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="text-blue-600 hover:text-blue-700"
            >
              {previewMode ? 'Show Editor' : 'Full Preview'}
            </button>
          </div>

          {/* Flyer Preview */}
          <div
            ref={flyerRef}
            className="w-full overflow-hidden p-0.5 rounded-3xl"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${currentFlyer.theme.primary}, ${currentFlyer.theme.secondary}, ${currentFlyer.theme.accent})`
            }}
          >
            <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-black rounded-3xl">
              {/* Header */}
              <div className="p-6 text-center relative overflow-hidden">
                <div 
                  className="absolute inset-0 blur-xl opacity-50"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${currentFlyer.theme.primary}33, ${currentFlyer.theme.secondary}33, ${currentFlyer.theme.accent}33)`
                  }}
                ></div>
                <div className="relative">
                  <div className="w-28 h-28 mx-auto rounded-full border-4 overflow-hidden"
                    style={{ borderColor: `${currentFlyer.theme.accent}33` }}
                  >
                    <img
                      src={currentFlyer.imageUrl}
                      alt={currentFlyer.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h1 
                    className="mt-3 text-3xl font-bold bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${currentFlyer.theme.primary}, ${currentFlyer.theme.accent})`
                    }}
                  >
                    {currentFlyer.title}
                  </h1>
                  <p className="mt-1 text-lg" style={{ color: currentFlyer.theme.textPrimary }}>
                    {currentFlyer.subtitle}
                  </p>
                </div>
              </div>

              {/* Services */}
              <div className="px-6 py-4 grid grid-cols-1 gap-3">
                {currentFlyer.services.map((service, index) => (
                  <ServiceCard
                    key={index}
                    {...service}
                    textColor={currentFlyer.theme.textPrimary}
                  />
                ))}
              </div>

              {/* Contact */}
              <div className="p-6 space-y-3 bg-black/20">
                <ContactItem
                  icon={<Phone className="w-5 h-5" />}
                  label="Call or WhatsApp"
                  value={currentFlyer.contact.phone}
                  action="Tap to call"
                  textColor={currentFlyer.theme.textPrimary}
                />
                <ContactItem
                  icon={<Mail className="w-5 h-5" />}
                  label="Send me an email"
                  value={currentFlyer.contact.email}
                  action="Send message"
                  textColor={currentFlyer.theme.textPrimary}
                />
                <ContactItem
                  icon={<Globe className="w-5 h-5" />}
                  label="Visit my website"
                  value={currentFlyer.contact.website}
                  action="Visit now"
                  textColor={currentFlyer.theme.textPrimary}
                />

                <div className="mt-6 text-center">
                  <p className="text-lg" style={{ color: currentFlyer.theme.textPrimary }}>
                    📍 {currentFlyer.contact.location}
                  </p>
                  <p 
                    className="mt-2 font-bold bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${currentFlyer.theme.primary}, ${currentFlyer.theme.accent})`
                    }}
                  >
                    Ready to get started?
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Saved Flyers List */}
          {!previewMode && savedFlyers.length > 0 && (
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Saved Flyers</h2>
              <div className="space-y-2">
                {savedFlyers.map((flyer) => (
                  <div
                    key={flyer.id}
                    className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div>
                      <h3 className="font-medium">{flyer.name}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(flyer.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentFlyer(flyer)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(flyer.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicFlyer;