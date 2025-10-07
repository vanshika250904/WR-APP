import React from 'react';
import { WellnessTip } from '../types';
import { Apple, Dumbbell, Moon, Brain, Droplet, Heart, Move, Users, Sparkles, ArrowRight, RefreshCw } from 'lucide-react';

interface TipsScreenProps {
  tips: WellnessTip[];
  onTipClick: (tip: WellnessTip) => void;
  onRegenerate: () => void;
  loading: boolean;
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

export const TipsScreen: React.FC<TipsScreenProps> = ({ tips, onTipClick, onRegenerate, loading }) => {
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6 animate-pulse">
            <Sparkles className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Generating Your Wellness Plan</h2>
          <p className="text-gray-600">AI is personalizing recommendations for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Your Personalized Wellness Plan
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            AI-generated recommendations tailored just for you
          </p>
          <button
            onClick={onRegenerate}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <RefreshCw className="w-5 h-5" />
            Generate New Tips
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => {
            const IconComponent = iconComponents[tip.icon] || Sparkles;

            return (
              <div
                key={tip.id}
                onClick={() => onTipClick(tip)}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] group"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeIn 0.5s ease-out forwards'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl group-hover:scale-110 transition-transform">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {tip.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {tip.shortDescription}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                    {tip.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
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
