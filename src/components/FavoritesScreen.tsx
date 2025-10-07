import React from 'react';
import { WellnessTip } from '../types';
import { Apple, Dumbbell, Moon, Brain, Droplet, Heart, Move, Users, Sparkles, ArrowLeft, BookmarkX, ArrowRight } from 'lucide-react';

interface FavoritesScreenProps {
  favorites: WellnessTip[];
  onBack: () => void;
  onTipClick: (tip: WellnessTip) => void;
  onRemoveFavorite: (tipId: string) => void;
}

const iconComponents: Record<string, React.FC<{ className?: string }>> = {
  apple: Apple,
  dumbbell: Dumbbell,
  moon: Moon,
  brain: Brain,
  droplet: Droplet,
  heart: Heart,
  move: Move,
  users: Users,
  sparkles: Sparkles
};

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  favorites,
  onBack,
  onTipClick,
  onRemoveFavorite
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-xl font-semibold hover:shadow-lg transition-all mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Tips
          </button>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Your Saved Tips
            </h1>
            <p className="text-gray-600 text-lg">
              {favorites.length === 0
                ? 'No favorites yet. Start saving tips that resonate with you!'
                : `${favorites.length} ${favorites.length === 1 ? 'tip' : 'tips'} saved for quick access`}
            </p>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mb-6">
              <Heart className="w-12 h-12 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Favorites Yet</h2>
            <p className="text-gray-600 mb-6">
              Browse wellness tips and save your favorites for easy access
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((tip, index) => {
              const IconComponent = iconComponents[tip.icon] || Sparkles;

              return (
                <div
                  key={tip.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all group relative"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeIn 0.5s ease-out forwards'
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFavorite(tip.id);
                    }}
                    className="absolute top-4 right-4 p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    title="Remove from favorites"
                  >
                    <BookmarkX className="w-5 h-5" />
                  </button>

                  <div
                    onClick={() => onTipClick(tip)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl group-hover:scale-110 transition-transform">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all mt-4" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 pr-8">
                      {tip.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                      {tip.shortDescription}
                    </p>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                        {tip.category}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
