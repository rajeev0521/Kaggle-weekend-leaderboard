import { Competition } from '../types';
import { Calendar, Users, ExternalLink } from 'lucide-react';

interface CompetitionCardProps {
  competition: Competition;
}

export const CompetitionCard = ({ competition }: CompetitionCardProps) => {
  const statusColors = {
    active: 'bg-green-100 text-green-700 border-green-200',
    completed: 'bg-gray-100 text-gray-700 border-gray-200',
    upcoming: 'bg-blue-100 text-blue-700 border-blue-200',
  };

  const statusLabels = {
    active: 'Active',
    completed: 'Completed',
    upcoming: 'Upcoming',
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition-all border border-gray-100 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                statusColors[competition.status]
              }`}
            >
              {statusLabels[competition.status]}
            </span>
            <span className="flex items-center text-sm text-gray-500">
              <Users className="w-4 h-4 mr-1" />
              {competition.participants}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {competition.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">{competition.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-2" />
          <span>
            {new Date(competition.startDate).toLocaleDateString()} -{' '}
            {new Date(competition.endDate).toLocaleDateString()}
          </span>
        </div>
        <a
          href={competition.kaggleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors"
        >
          <span>View on Kaggle</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
