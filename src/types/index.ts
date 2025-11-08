export interface User {
  id: string;
  name: string;
  email: string;
  kaggleUsername: string;
  totalScore: number;
  rank: number;
  badges: Badge[];
  avatar?: string;
}

export interface Competition {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'upcoming';
  kaggleUrl: string;
  participants: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate?: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  totalScore: number;
  competitionsCompleted: number;
  badges: Badge[];
}

export interface Submission {
  id: string;
  userId: string;
  competitionId: string;
  score: number;
  submittedAt: string;
  rank: number;
}

export interface UserStats {
  user: User;
  scoreHistory: Array<{
    competitionId: string;
    competitionName: string;
    score: number;
    rank: number;
    date: string;
  }>;
  totalCompetitions: number;
  averageScore: number;
  bestRank: number;
}
