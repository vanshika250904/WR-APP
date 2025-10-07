import React, { useEffect, useState } from 'react';
import { WellnessTip, UserProfile } from '../types';
import { Apple, Dumbbell, Moon, Brain, Droplet, Heart, Move, Users, Sparkles, ArrowLeft, Bookmark, BookmarkCheck, Loader2 } from 'lucide-react';
import { aiService } from '../services/aiService';

interface DetailScreenProps {
  tip: WellnessTip;
  profile: UserProfile;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: (tip: WellnessTip) => void;
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

export const DetailScreen: React.FC<DetailScreenProps> = ({
  tip: initialTip,
  profile,
  onBack,
  isFavorite,
  onToggleFavorite
}) => {
  const [tip, setTip] = useState<WellnessTip>(initialTip);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadDetails = async () => {
      if (!initialTip.steps || !initialTip.detailedExplanation) {
        setLoading(true);
        const detailedTip = await aiService.generateDetailedTip(initialTip, profile);
        setTip(detailedTip);
        setLoading(false);
      }
    };

    loadDetails();
  }, [initialTip, profile]);

  const IconComponent = iconComponents[tip.icon] || Sparkles;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Tips
          </button>

          <button
            onClick={() => onToggleFavorite(tip)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
              isFavorite
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:shadow-lg'
            }`}
          >
            {isFavorite ? (
              <>
                <BookmarkCheck className="w-5 h-5" />
                Saved
              </>
            ) : (
              <>
                <Bookmark className="w-5 h-5" />
                Save Tip
              </>
            )}
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider opacity-90">
                  {tip.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mt-1">
                  {tip.title}
                </h1>
              </div>
            </div>
            <p className="text-lg opacity-95">
              {tip.shortDescription}
            </p>
          </div>

          <div className="p-8 md:p-12">
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading detailed guidance...</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Why This Matters For You
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {tip.detailedExplanation}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Step-by-Step Action Plan
                  </h2>
                  <div className="space-y-4">
                    {tip.steps?.map((step, index) => (
                      <div
                        key={index}
                        className="flex gap-4 p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl hover:shadow-md transition-shadow"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {index + 1}
                        </div>
                        <p className="text-gray-800 leading-relaxed flex-1 pt-1">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 p-6 bg-amber-50 border-2 border-amber-200 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                    Pro Tip
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Consistency is key! Start with just one step today and build from there.
                    Small, sustainable changes lead to lasting results. Track your progress daily
                    and celebrate each milestone along the way.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
