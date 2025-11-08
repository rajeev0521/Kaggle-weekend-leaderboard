import { useCompetitions } from '../hooks/useCompetitions';
import { CompetitionCard } from '../components/CompetitionCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Trophy, Target } from 'lucide-react';

export const CompetitionPage = () => {
  const { data: competitions, isLoading, error } = useCompetitions();

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
            <p className="text-red-600">Failed to load competitions. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  const activeCompetitions = competitions?.filter((c) => c.status === 'active') || [];
  const upcomingCompetitions = competitions?.filter((c) => c.status === 'upcoming') || [];
  const completedCompetitions = competitions?.filter((c) => c.status === 'completed') || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
            <Target className="w-5 h-5" />
            <span className="font-semibold">Kaggle Weekend Series</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Competitions</h1>
          <p className="text-xl text-gray-600">
            Weekly challenges to sharpen your data science skills
          </p>
        </div>

        {activeCompetitions.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Trophy className="w-7 h-7 text-green-600" />
              <h2 className="text-3xl font-bold text-gray-900">Active Competitions</h2>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                {activeCompetitions.length}
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeCompetitions.map((competition) => (
                <CompetitionCard key={competition.id} competition={competition} />
              ))}
            </div>
          </section>
        )}

        {upcomingCompetitions.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Target className="w-7 h-7 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Upcoming Competitions</h2>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                {upcomingCompetitions.length}
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingCompetitions.map((competition) => (
                <CompetitionCard key={competition.id} competition={competition} />
              ))}
            </div>
          </section>
        )}

        {completedCompetitions.length > 0 && (
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <Trophy className="w-7 h-7 text-gray-600" />
              <h2 className="text-3xl font-bold text-gray-900">Past Competitions</h2>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                {completedCompetitions.length}
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {completedCompetitions.map((competition) => (
                <CompetitionCard key={competition.id} competition={competition} />
              ))}
            </div>
          </section>
        )}

        {!activeCompetitions.length && !upcomingCompetitions.length && !completedCompetitions.length && (
          <div className="text-center py-20">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No competitions yet</h3>
            <p className="text-gray-500">Check back soon for new challenges!</p>
          </div>
        )}
      </div>
    </div>
  );
};
