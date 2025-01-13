import { FlyerData } from '../types/flyer';

const FLYERS_KEY = 'saved_flyers';

export const saveFlyer = (flyer: FlyerData): void => {
  const flyers = getFlyers();
  const existingIndex = flyers.findIndex(f => f.id === flyer.id);
  
  if (existingIndex >= 0) {
    flyers[existingIndex] = flyer;
  } else {
    flyers.push(flyer);
  }
  
  localStorage.setItem(FLYERS_KEY, JSON.stringify(flyers));
};

export const getFlyers = (): FlyerData[] => {
  try {
    const flyers = localStorage.getItem(FLYERS_KEY);
    return flyers ? JSON.parse(flyers) : [];
  } catch (error) {
    console.error('Error loading flyers:', error);
    return [];
  }
};

export const deleteFlyer = (id: string): void => {
  const flyers = getFlyers();
  const updatedFlyers = flyers.filter(flyer => flyer.id !== id);
  localStorage.setItem(FLYERS_KEY, JSON.stringify(updatedFlyers));
};