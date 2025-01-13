import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Download, Plus, Tag, Trash2, Edit, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface Quote {
  id: number;
  text: string;
  tags: string[];
  likes: number;
  date: string;
  category: QuoteCategory;
  author?: string;
  bgIndex: number;
}

interface QuoteFormData {
  text: string;
  tags: string;
  category: QuoteCategory;
  author?: string;
}

type QuoteCategory = 'motivation' | 'wisdom' | 'success' | 'life' | 'inspiration';

interface CardRef {
  [key: number]: HTMLDivElement | null;
}

// Constants
const CATEGORIES: QuoteCategory[] = ['motivation', 'wisdom', 'success', 'life', 'inspiration'];

const GRADIENTS = [
  'from-rose-100 to-teal-100',
  'from-amber-100 to-violet-100',
  'from-lime-100 to-rose-100',
  'from-indigo-100 to-pink-100',
  'from-blue-100 to-purple-100',
  'from-green-100 to-yellow-100'
] as const;

const QuoteCard: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<QuoteCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newQuote, setNewQuote] = useState<QuoteFormData>({
    text: '',
    tags: '',
    category: 'motivation',
    author: ''
  });

  const cardRefs = useRef<CardRef>({});

  // Load quotes from localStorage on mount
  useEffect(() => {
    const savedQuotes = localStorage.getItem('quotes');
    if (savedQuotes) {
      setQuotes(JSON.parse(savedQuotes));
    }
  }, []);

  // Save quotes to localStorage when updated
  useEffect(() => {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }, [quotes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuote.text.trim()) {
      if (editingQuote) {
        setQuotes(prev => prev.map(quote => 
          quote.id === editingQuote.id 
            ? {
                ...quote,
                text: newQuote.text,
                tags: newQuote.tags.split(' ').filter(tag => tag.startsWith('#')),
                category: newQuote.category,
                author: newQuote.author
              }
            : quote
        ));
      } else {
        setQuotes(prev => [...prev, {
          id: Date.now(),
          text: newQuote.text,
          tags: newQuote.tags.split(' ').filter(tag => tag.startsWith('#')),
          likes: 0,
          date: new Date().toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
          }),
          category: newQuote.category,
          author: newQuote.author,
          bgIndex: Math.floor(Math.random() * GRADIENTS.length)
        }]);
      }
      resetForm();
    }
  };

  const resetForm = () => {
    setNewQuote({
      text: '',
      tags: '',
      category: 'motivation',
      author: ''
    });
    setEditingQuote(null);
    setShowForm(false);
  };

  const handleEdit = (quote: Quote) => {
    setEditingQuote(quote);
    setNewQuote({
      text: quote.text,
      tags: quote.tags.join(' '),
      category: quote.category,
      author: quote.author || ''
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setQuotes(prev => prev.filter(quote => quote.id !== id));
  };

  const handleLike = (id: number) => {
    setQuotes(prev => prev.map(quote => 
      quote.id === id ? { ...quote, likes: quote.likes + 1 } : quote
    ));
  };

  const downloadCard = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const cardRef = cardRefs.current[id];
    if (cardRef) {
      try {
        const html2canvas = (await import('html2canvas')).default;
        const canvas = await html2canvas(cardRef);
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `quote-card-${id}.png`;
        link.href = url;
        link.click();
      } catch (error) {
        console.error('Error downloading card:', error);
      }
    }
  };

  const changeBackground = (id: number) => {
    setQuotes(prev => prev.map(quote => 
      quote.id === id 
        ? { ...quote, bgIndex: (quote.bgIndex + 1) % GRADIENTS.length }
        : quote
    ));
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesCategory = selectedCategory === 'all' || quote.category === selectedCategory;
    const matchesSearch = quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (quote.author && quote.author.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add New Quote
          </motion.button>

          <div className="flex gap-4 flex-wrap justify-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as QuoteCategory | 'all')}
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search quotes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {editingQuote ? 'Edit Quote' : 'Add New Quote'}
                  </h2>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quote Text
                    </label>
                    <textarea
                      value={newQuote.text}
                      onChange={(e) => setNewQuote(prev => ({ ...prev, text: e.target.value }))}
                      className="w-full p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your quote..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author (optional)
                    </label>
                    <input
                      type="text"
                      value={newQuote.author}
                      onChange={(e) => setNewQuote(prev => ({ ...prev, author: e.target.value }))}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Quote author"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (space-separated, start with #)
                    </label>
                    <input
                      type="text"
                      value={newQuote.tags}
                      onChange={(e) => setNewQuote(prev => ({ ...prev, tags: e.target.value }))}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="#inspiration #motivation"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={newQuote.category}
                      onChange={(e) => setNewQuote(prev => ({ ...prev, category: e.target.value as QuoteCategory }))}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {CATEGORIES.map(category => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {editingQuote ? 'Save Changes' : 'Add Quote'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredQuotes.map(quote => (
            <motion.div
              layout
              key={quote.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div
                ref={el => cardRefs.current[quote.id] = el}
                onClick={() => changeBackground(quote.id)}
                className={`relative group w-full bg-gradient-to-br ${GRADIENTS[quote.bgIndex]} p-6 rounded-3xl shadow-md text-gray-800 cursor-pointer transition-all duration-500 hover:shadow-lg`}
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(quote);
                      }}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(quote.id);
                      }}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-gray-600">{quote.date}</span>
                  <span className="text-xs font-medium px-3 py-1 bg-white bg-opacity-50 rounded-full">
                    {quote.category}
                  </span>
                </div>
                
                <div className="relative z-10">
                  <p className="text-base sm:text-lg font-medium text-center mb-4">
                    "{quote.text}"
                  </p>
                  
                  {quote.author && (
                    <p className="text-sm text-center text-gray-600 mb-4">
                      - {quote.author}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {quote.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-white bg-opacity-50 rounded-full flex items-center gap-1"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-center space-x-6">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(quote.id);
                      }}
                      className="flex items-center gap-1 text-gray-700 hover:text-red-500 transition-colors"
                    >
                      <Heart 
                        className={`w-4 h-4 ${quote.likes > 0 ? 'fill-red-500 text-red-500' : ''} 
                        transition-colors duration-300`} 
                      />
                      {quote.likes > 0 && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-xs"
                        >
                          {quote.likes}
                        </motion.span>
                      )}
                    </button>
                    <button 
                      className="text-gray-700 hover:text-blue-500 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button 
                      className="text-gray-700 hover:text-green-500 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button 
                      className="text-gray-700 hover:text-purple-500 transition-colors"
                      onClick={(e) => downloadCard(quote.id, e)}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredQuotes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              No quotes found. Try adjusting your search or category filter.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuoteCard;