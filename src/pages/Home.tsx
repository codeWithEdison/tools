import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getIcon } from '../utils/icons';
import { Tool } from '../types';

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
];

const Home = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4"
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Welcome to Code with Edison Tools</h1>
        <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Choose a tool to get started
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link key={tool.id} to={tool.path}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-6 rounded-lg shadow-lg ${
                isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center mb-4">
                {getIcon(tool.icon)}
                <h2 className="text-xl font-semibold ml-3">{tool.name}</h2>
              </div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {tool.description}
              </p>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default Home;