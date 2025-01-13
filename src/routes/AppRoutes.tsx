import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import QuoteCard from '../components/QuoteCard';
import DynamicFlyer from '../components/DynamicFlyer';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="flyer-maker" element={<DynamicFlyer />} />  
        <Route path="quotes-maker" element={<QuoteCard/>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;