import { useLeaderboard } from '../hooks/useLeaderboard';
import { LeaderboardTable } from '../components/LeaderboardTable';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Trophy, Award, Star } from 'lucide-react';
import { LeaderboardEntry } from '../types';

export const LeaderboardPage = () => {
  const { data: profiles, isLoading, error } = useLeaderboard();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600">Failed to load leaderboard. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  const entries: LeaderboardEntry[] = (profiles || []).map((profile, index) => ({
    rank: index + 1,
    user: {
      id: profile.id,
      name: profile.full_name,
      email: '', // Not available from scraper
      kaggleUsername: profile.kaggle_username,
      totalScore: profile.points,
      rank: index + 1,
      badges: [], // Not available from scraper
    },
    totalScore: profile.points,
    competitionsCompleted: profile.competitions_entered,
    badges: [], // Not available from scraper
  }));

  const topThree = entries?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
            <Trophy className="w-5 h-5" />
            <span className="font-semibold">October 2025 Rankings</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Leaderboard</h1>
          <p className="text-xl text-gray-600">
            Celebrating our top performers in the Kaggle Weekend Series
          </p>
        </div>

        {topThree.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              Top 3 Champions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topThree.map((entry, index) => (
                <TopPerformerCard key={entry.user.id} entry={entry} rank={index + 1} />
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Award className="w-6 h-6 text-blue-600 mr-2" />
              All Rankings
            </h2>
            <span className="text-sm text-gray-500">{entries?.length || 0} Participants</span>
          </div>
          {entries && <LeaderboardTable entries={entries} />}
        </div>
      </div>
    </div>
  );
};

interface TopPerformerCardProps {
  entry: LeaderboardEntry;
  rank: number;
}

const TopPerformerCard = ({ entry, rank }: TopPerformerCardProps) => {
  const rankColors = {
    1: 'from-yellow-400 to-yellow-600',
    2: 'from-gray-300 to-gray-500',
    3: 'from-orange-400 to-orange-600',
  };

  const rankIcons = {
    1: '🥇',
    2: '🥈',
    3: '🥉',
  };

  return (
    <div className={`relative bg-gradient-to-br ${rankColors[rank as keyof typeof rankColors]} rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all`}>
      <div className="text-center">
        <div className="text-6xl mb-4">{rankIcons[rank as keyof typeof rankIcons]}</div>
        <h3 className="text-2xl font-bold mb-2">{entry.user.name}</h3>
        <p className="text-sm opacity-90 mb-4">@{entry.user.kaggleUsername}</p>
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
          <p className="text-4xl font-bold mb-1">{entry.totalScore}</p>
          <p className="text-sm opacity-90">Total Score</p>
        </div>
        <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
          <div>
            <p className="font-bold text-lg">{entry.competitionsCompleted}</p>
            <p className="opacity-90">Competitions</p>
          </div>
          <div className="w-px h-10 bg-white/30"></div>
          <div>
            <p className="font-bold text-lg">{entry.badges.length}</p>
            <p className="opacity-90">Badges</p>
          </div>
        </div>
      </div>
    </div>
  );
};
