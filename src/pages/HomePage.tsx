import { Link } from 'react-router-dom';
import { Trophy, Target, Users, Award, TrendingUp, Sparkles } from 'lucide-react';

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">Sharda University's Premier Data Science Community</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Datapool Club
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
                Kaggle Weekend Series
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Compete, learn, and master data science through weekly Kaggle challenges.
              Join your peers in the journey to becoming a data science champion.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link
                to="/register"
                className="group px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center space-x-2"
              >
                <Trophy className="w-6 h-6" />
                <span>Start Competing</span>
              </Link>
              <Link
                to="/leaderboard"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl font-bold text-lg transition-all border border-white/20"
              >
                View Leaderboard
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
              <StatCard number="150+" label="Active Participants" icon={Users} />
              <StatCard number="24+" label="Competitions Held" icon={Target} />
              <StatCard number="500+" label="Total Submissions" icon={TrendingUp} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to start your data science journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number={1}
              title="Register & Connect"
              description="Sign up with your Sharda University email and link your Kaggle account to get started."
              icon={Users}
              color="blue"
            />
            <StepCard
              number={2}
              title="Compete Weekly"
              description="Participate in carefully selected Kaggle competitions every weekend and submit your solutions."
              icon={Trophy}
              color="green"
            />
            <StepCard
              number={3}
              title="Climb the Ranks"
              description="Earn points, collect badges, and climb the leaderboard as you improve your skills."
              icon={Award}
              color="yellow"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 text-white text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Join the Competition?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Don't miss out on weekly challenges and the opportunity to learn from the best.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-xl font-bold text-lg transition-all"
              >
                Create Account
              </Link>
              <Link
                to="/competitions"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl font-bold text-lg transition-all border border-white/20"
              >
                View Competitions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface StatCardProps {
  number: string;
  label: string;
  icon: any;
}

const StatCard = ({ number, label, icon: Icon }: StatCardProps) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
    <Icon className="w-8 h-8 mb-3 text-yellow-300" />
    <div className="text-4xl font-bold mb-2">{number}</div>
    <div className="text-blue-100">{label}</div>
  </div>
);

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  icon: any;
  color: 'blue' | 'green' | 'yellow';
}

const StepCard = ({ number, title, description, icon: Icon, color }: StepCardProps) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
  };

  return (
    <div className="relative bg-white rounded-2xl p-8 shadow hover:shadow-xl transition-all">
      <div className={`absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
        {number}
      </div>
      <Icon className="w-12 h-12 text-gray-400 mb-4 mt-4" />
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};
