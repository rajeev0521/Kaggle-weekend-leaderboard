import { Trophy, Github, Linkedin, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">Datapool Club</span>
                <span className="text-sm text-gray-400">Sharda University</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Empowering students to excel in data science and machine learning through weekly Kaggle competitions.
              Join us in the journey of continuous learning and innovation.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/leaderboard" className="hover:text-white transition-colors">Leaderboard</a></li>
              <li><a href="/competitions" className="hover:text-white transition-colors">Competitions</a></li>
              <li><a href="/register" className="hover:text-white transition-colors">Register</a></li>
              <li><a href="https://www.kaggle.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Kaggle</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-3">
              <SocialLink href="https://github.com/datapool-club" icon={Github} />
              <SocialLink href="https://linkedin.com/company/datapool-club" icon={Linkedin} />
              <SocialLink href="https://twitter.com/datapool_club" icon={Twitter} />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2025 Datapool Club, Sharda University. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  icon: any;
}

const SocialLink = ({ href, icon: Icon }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-slate-700 p-2 rounded-lg hover:bg-blue-600 transition-colors"
  >
    <Icon className="w-5 h-5" />
  </a>
);
