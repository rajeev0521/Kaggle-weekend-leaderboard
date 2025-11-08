import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, TrendingUp, Award, Target } from 'lucide-react';
import { BadgeCard } from '../components/BadgeCard';

export const ProfilePage = () => {
  const { username } = useParams();

  const mockUserData = {
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
        { id: 'b3', name: 'First Place', description: 'Won a competition', icon: '🏆' },
        { id: 'b4', name: 'Perfect Score', description: 'Achieved maximum score', icon: '💯' },
      ],
    },
    scoreHistory: [
      { competitionId: '1', competitionName: 'Titanic', score: 850, rank: 1, date: '2025-09-15' },
      { competitionId: '2', competitionName: 'House Prices', score: 920, rank: 2, date: '2025-09-22' },
      { competitionId: '3', competitionName: 'Digit Recognizer', score: 780, rank: 3, date: '2025-09-29' },
      { competitionId: '4', competitionName: 'Credit Risk', score: 890, rank: 1, date: '2025-10-06' },
    ],
    totalCompetitions: 12,
    averageScore: 821,
    bestRank: 1,
  };

  const chartData = mockUserData.scoreHistory.map((entry) => ({
    name: entry.competitionName,
    score: entry.score,
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 px-8 py-12">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-5xl">
                {mockUserData.user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">{mockUserData.user.name}</h1>
                <p className="text-blue-100 text-lg">@{mockUserData.user.kaggleUsername}</p>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                    <span className="text-white font-bold">Rank #{mockUserData.user.rank}</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                    <span className="text-white font-bold">{mockUserData.user.totalScore} pts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Trophy}
            label="Total Score"
            value={mockUserData.user.totalScore.toString()}
            color="blue"
          />
          <StatCard
            icon={Target}
            label="Competitions"
            value={mockUserData.totalCompetitions.toString()}
            color="green"
          />
          <StatCard
            icon={TrendingUp}
            label="Average Score"
            value={mockUserData.averageScore.toString()}
            color="yellow"
          />
          <StatCard
            icon={Award}
            label="Best Rank"
            value={`#${mockUserData.bestRank}`}
            color="purple"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
              Score Progress
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.75rem',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ fill: '#2563eb', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Award className="w-6 h-6 text-yellow-500 mr-2" />
              Badges
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {mockUserData.user.badges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} size="md" />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Competition History</h2>
          <div className="space-y-4">
            {mockUserData.scoreHistory.map((entry) => (
              <div
                key={entry.competitionId}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{entry.competitionName}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{entry.score}</p>
                    <p className="text-xs text-gray-500">Score</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">#{entry.rank}</p>
                    <p className="text-xs text-gray-500">Rank</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: any;
  label: string;
  value: string;
  color: 'blue' | 'green' | 'yellow' | 'purple';
}

const StatCard = ({ icon: Icon, label, value, color }: StatCardProps) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition-all">
      <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
};
