import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { motion } from 'framer-motion';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layout = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="flex">
        <Sidebar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1 p-8"
        >
          <Outlet />
        </motion.main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;