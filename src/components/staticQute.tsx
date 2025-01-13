import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Code, Brain, Rocket,} from 'lucide-react';

const InteractiveStory: React.FC = () => {
//   const [currentPage, setCurrentPage] = useState(0);
  const [likes, setLikes] = useState(0);

  const pages = [
    {
      emoji: '💕',
      bgColor: 'bg-pink-50',
      text: "When I was in low secondary, I had a massive crush on this girl. So, I mustered all my courage, rehearsed my lines like I was preparing for a Shakespeare play... 🎭",
      icon: <Heart className="text-red-500" />,
      interactive: (
        <motion.div 
          className="flex flex-col items-center space-y-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xl font-script">
            "To code, or not to code... 🤔"
          </div>
          <div className="flex space-x-2">
            {Array(3).fill(0).map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
              >
                <Heart 
                  className={`w-6 h-6 ${likes > i ? 'text-red-500 fill-red-500' : 'text-gray-300'}`} 
                  onClick={() => setLikes(i + 1)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )
    },
    {
      emoji: '💻',
      bgColor: 'bg-blue-50',
      text: "...and she rejected me faster than a Wi-Fi signal in a basement. Instead of crying, I decided to focus on something that wouldn't break my heart—coding! 📚",
      icon: <Code className="text-blue-500" />,
      interactive: (
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white p-4 rounded-lg shadow-lg text-sm font-mono">
            <div className="text-gray-500">// Error in relationship.js</div>
            <div className="text-red-500">HeartbreakError: Love not found 💔</div>
            <div className="text-green-500">Solution: Learn to code instead! 💻</div>
          </div>
        </motion.div>
      )
    },
    {
      emoji: '🧮',
      bgColor: 'bg-green-50',
      text: "I threw myself into Math and coding, and suddenly, I was solving equations like they were pizza orders. Life was becoming an algorithm I could finally understand! 🍕",
      icon: <Brain className="text-green-500" />,
      interactive: (
        <motion.div 
          className="grid grid-cols-3 gap-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {Array(9).fill(0).map((_, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 bg-green-400 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity
              }}
            />
          ))}
        </motion.div>
      )
    },
    {
      emoji: '🤖',
      bgColor: 'bg-purple-50',
      text: "Now, I think about how that heartbreak led me to build my biggest project ever! Who needs love when you can build AI that orders pizza automatically? 🍕",
      icon: <Rocket className="text-purple-500" />,
      interactive: (
        <motion.div 
          className="flex flex-col items-center space-y-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-white p-4 rounded-lg shadow-lg"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Rocket className="w-12 h-12 text-purple-500" />
          </motion.div>
          <div className="text-center font-mono text-sm">
            {[
              "Ordering emergency pizza... 🍕",
              "Computing happiness.js... 😊",
              "npm install better-life 🚀",
              "git commit -m 'Fixed broken heart' ❤️"
            ][Math.floor(Math.random() * 4)]}
          </div>
        </motion.div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pages.map((page, index) => (
            <motion.div
              key={index}
              className={`${page.bgColor} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-3xl">{page.emoji}</div>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {page.icon}
                </motion.div>
              </div>

              <p className="text-gray-700 mb-6">{page.text}</p>

              <div className="flex justify-center mt-4 min-h-[100px]">
                {page.interactive}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8 text-gray-500 text-sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Sometimes the best code comes from a broken heart! 💝
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveStory;