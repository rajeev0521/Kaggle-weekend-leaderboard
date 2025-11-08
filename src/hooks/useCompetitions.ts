import { useQuery } from '@tanstack/react-query';
import { Competition } from '../types';

const mockCompetitions: Competition[] = [
  {
    id: '1',
    title: 'Titanic Survival Prediction',
    description: 'Classic machine learning problem - predict survival on the Titanic',
    startDate: '2025-10-05',
    endDate: '2025-10-12',
    status: 'active',
    kaggleUrl: 'https://www.kaggle.com/c/titanic',
    participants: 45,
  },
  {
    id: '2',
    title: 'House Price Prediction',
    description: 'Predict house prices using advanced regression techniques',
    startDate: '2025-09-28',
    endDate: '2025-10-05',
    status: 'completed',
    kaggleUrl: 'https://www.kaggle.com/c/house-prices-advanced-regression-techniques',
    participants: 52,
  },
  {
    id: '3',
    title: 'Digit Recognizer',
    description: 'Learn computer vision fundamentals with MNIST dataset',
    startDate: '2025-10-12',
    endDate: '2025-10-19',
    status: 'upcoming',
    kaggleUrl: 'https://www.kaggle.com/c/digit-recognizer',
    participants: 0,
  },
];

export const useCompetitions = () => {
  return useQuery({
    queryKey: ['competitions'],
    queryFn: async () => {
      try {
        const response = await fetch('http://localhost:8000/api/competitions');
        if (!response.ok) throw new Error('Failed to fetch competitions');
        return await response.json();
      } catch (error) {
        console.log('Using mock data:', error);
        return mockCompetitions;
      }
    },
  });
};

export const useCompetition = (id: string) => {
  return useQuery({
    queryKey: ['competition', id],
    queryFn: async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/competitions/${id}`);
        if (!response.ok) throw new Error('Failed to fetch competition');
        return await response.json();
      } catch (error) {
        console.log('Using mock data:', error);
        return mockCompetitions.find(c => c.id === id);
      }
    },
  });
};
