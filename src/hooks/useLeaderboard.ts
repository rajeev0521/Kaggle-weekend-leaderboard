import { useQuery } from '@tanstack/react-query';
import { LeaderboardEntry } from '../types';

const mockLeaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    totalScore: 9850,
    competitionsCompleted: 12,
    user: {
      id: '1',
      name: 'Arjun Sharma',
      email: 'arjun@sharda.ac.in',
      kaggleUsername: 'arjun_datawiz',
      totalScore: 9850,
      rank: 1,
      badges: [
        { id: 'b1', name: 'Gold Medal', description: 'Top performer', icon: '🥇' },
        { id: 'b2', name: 'Streak Master', description: '10 competitions in a row', icon: '🔥' },
      ],
    },
    badges: [
      { id: 'b1', name: 'Gold Medal', description: 'Top performer', icon: '🥇' },
      { id: 'b2', name: 'Streak Master', description: '10 competitions in a row', icon: '🔥' },
    ],
  },
  {
    rank: 2,
    totalScore: 9420,
    competitionsCompleted: 11,
    user: {
      id: '2',
      name: 'Priya Verma',
      email: 'priya@sharda.ac.in',
      kaggleUsername: 'priya_ml_expert',
      totalScore: 9420,
      rank: 2,
      badges: [
        { id: 'b3', name: 'Silver Medal', description: 'Second place', icon: '🥈' },
      ],
    },
    badges: [
      { id: 'b3', name: 'Silver Medal', description: 'Second place', icon: '🥈' },
    ],
  },
  {
    rank: 3,
    totalScore: 8990,
    competitionsCompleted: 10,
    user: {
      id: '3',
      name: 'Rahul Kumar',
      email: 'rahul@sharda.ac.in',
      kaggleUsername: 'rahul_analytics',
      totalScore: 8990,
      rank: 3,
      badges: [
        { id: 'b4', name: 'Bronze Medal', description: 'Third place', icon: '🥉' },
      ],
    },
    badges: [
      { id: 'b4', name: 'Bronze Medal', description: 'Third place', icon: '🥉' },
    ],
  },
];

export const useLeaderboard = () => {
  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      try {
        const response = await fetch('http://localhost:8000/api/leaderboard');
        if (!response.ok) throw new Error('Failed to fetch leaderboard');
        return await response.json();
      } catch (error) {
        console.log('Using mock data:', error);
        return mockLeaderboardData;
      }
    },
  });
};
