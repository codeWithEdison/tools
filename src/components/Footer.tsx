import { motion } from 'framer-motion';
import { Github, Twitter, Mail } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Footer = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      } p-6 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="font-bold text-lg">Code with Edison Tools</h3>
          <p className="text-sm opacity-75">Making development easier, one tool at a time</p>
        </div>

        <div className="flex space-x-6">
          <motion.a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="hover:text-blue-500 transition-colors"
          >
            <Github className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="hover:text-blue-500 transition-colors"
          >
            <Twitter className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="mailto:your@email.com"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="hover:text-blue-500 transition-colors"
          >
            <Mail className="w-6 h-6" />
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
};
export default Footer;