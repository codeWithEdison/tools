import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toggleTheme } from '../store/themeSlice';
import { Tool } from '../types';
import { getIcon } from '../utils/icons';
import { Sun, Moon } from 'lucide-react';

const tools: Tool[] = [
  {
    id: 'flyer-maker',
    name: 'Flyer Maker',
    icon: 'layout',
    description: 'Create beautiful flyers',
    path: '/flyer-maker'
  },
  {
    id: 'quotes-maker',
    name: 'Quotes Maker',
    icon: 'quote',
    description: 'Generate styled quotes',
    path: '/quotes-maker'
  },
  {
    id: 'code-generator',
    name: 'Code Generator',
    icon: 'code',
    description: 'Generate code snippets',
    path: '/code-generator'
  }
  // Add more tools as needed
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100
      }
    })
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className={`w-64 h-screen ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      } p-4 flex flex-col justify-between transition-colors duration-300 border-r ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}
    >
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-xl font-bold">Code with Edison Tools</h1>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Development tools collection
          </p>
        </motion.div>
        
        <nav className="space-y-2">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              custom={index}
              variants={itemVariants}
            >
              <NavLink
                to={tool.path}
                className={({ isActive }) =>
                  `w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : isDarkMode
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-100'
                  }`
                }
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center w-full"
                >
                  <span className="mr-3">{getIcon(tool.icon)}</span>
                  <span>{tool.name}</span>
                </motion.div>
              </NavLink>
            </motion.div>
          ))}
        </nav>
      </div>

      <div className="border-t border-gray-700 pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => dispatch(toggleTheme())}
          className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${
            isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 mr-2" />
          ) : (
            <Moon className="w-5 h-5 mr-2" />
          )}
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;