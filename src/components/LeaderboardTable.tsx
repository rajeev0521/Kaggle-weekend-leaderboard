import { useState } from 'react';
import { LeaderboardEntry } from '../types';
import { Trophy, TrendingUp, Award } from 'lucide-react';
import { BadgeCard } from './BadgeCard';
import { Link } from 'react-router-dom';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

type SortField = 'rank' | 'name' | 'score' | 'competitions';

export const LeaderboardTable = ({ entries }: LeaderboardTableProps) => {
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSorted = entries
    .filter(
      (entry) =>
        entry.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.user.kaggleUsername.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortField) {
        case 'rank':
          aValue = a.rank;
          bValue = b.rank;
          break;
        case 'name':
          aValue = a.user.name.toLowerCase();
          bValue = b.user.name.toLowerCase();
          break;
        case 'score':
          aValue = a.totalScore;
          bValue = b.totalScore;
          break;
        case 'competitions':
          aValue = a.competitionsCompleted;
          bValue = b.competitionsCompleted;
          break;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Trophy className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Trophy className="w-6 h-6 text-orange-600" />;
      default:
        return null;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200';
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
      case 3:
        return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200';
      default:
        return 'bg-white border-gray-100';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or Kaggle username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="space-y-3">
        {filteredAndSorted.map((entry) => (
          <div
            key={entry.user.id}
            className={`${getRankBg(entry.rank)} rounded-2xl p-4 border transition-all hover:shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-xl border border-gray-200">
                  {getRankIcon(entry.rank) || (
                    <span className="text-2xl font-bold text-gray-700">#{entry.rank}</span>
                  )}
                </div>

                <div className="flex-1">
                  <Link
                    to={`/profile/${entry.user.kaggleUsername}`}
                    className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {entry.user.name}
                  </Link>
                  <p className="text-sm text-gray-600">@{entry.user.kaggleUsername}</p>
                </div>

                <div className="hidden md:flex items-center space-x-6">
                  <div className="text-center">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span className="text-2xl font-bold text-gray-900">{entry.totalScore}</span>
                    </div>
                    <p className="text-xs text-gray-500">Total Score</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-green-600" />
                      <span className="text-2xl font-bold text-gray-900">{entry.competitionsCompleted}</span>
                    </div>
                    <p className="text-xs text-gray-500">Competitions</p>
                  </div>
                </div>

                {entry.badges.length > 0 && (
                  <div className="hidden lg:flex items-center space-x-2">
                    {entry.badges.slice(0, 3).map((badge) => (
                      <BadgeCard key={badge.id} badge={badge} size="sm" />
                    ))}
                    {entry.badges.length > 3 && (
                      <span className="text-sm text-gray-500 font-medium">
                        +{entry.badges.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="md:hidden mt-4 flex items-center justify-around pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{entry.totalScore}</p>
                <p className="text-xs text-gray-500">Score</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{entry.competitionsCompleted}</p>
                <p className="text-xs text-gray-500">Competitions</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{entry.badges.length}</p>
                <p className="text-xs text-gray-500">Badges</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
