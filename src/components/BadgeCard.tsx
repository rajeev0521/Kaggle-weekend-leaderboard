import { Badge } from '../types';

interface BadgeCardProps {
  badge: Badge;
  size?: 'sm' | 'md' | 'lg';
}

export const BadgeCard = ({ badge, size = 'md' }: BadgeCardProps) => {
  const sizeClasses = {
    sm: 'p-2 text-xs',
    md: 'p-3 text-sm',
    lg: 'p-4 text-base',
  };

  const iconSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div
      className={`bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl ${sizeClasses[size]} border border-yellow-200 hover:shadow-lg transition-shadow group cursor-pointer`}
      title={badge.description}
    >
      <div className="flex flex-col items-center text-center space-y-1">
        <span className={`${iconSizes[size]} group-hover:scale-110 transition-transform`}>
          {badge.icon}
        </span>
        <span className="font-semibold text-gray-800 group-hover:text-yellow-700 transition-colors">
          {badge.name}
        </span>
      </div>
    </div>
  );
};
