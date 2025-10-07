import React, { useState, useEffect } from 'react';
import { UserProfile, WellnessTip, Screen } from './types';
import { ProfileScreen } from './components/ProfileScreen';
import { TipsScreen } from './components/TipsScreen';
import { DetailScreen } from './components/DetailScreen';
import { FavoritesScreen } from './components/FavoritesScreen';
import { storage } from './utils/storage';
import { aiService } from './services/aiService';
import { Heart } from 'lucide-react';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('profile');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tips, setTips] = useState<WellnessTip[]>([]);
  const [selectedTip, setSelectedTip] = useState<WellnessTip | null>(null);
  const [favorites, setFavorites] = useState<WellnessTip[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedProfile = storage.getProfile();
    const savedFavorites = storage.getFavorites();
    setFavorites(savedFavorites);

    if (savedProfile) {
      setProfile(savedProfile);
      generateTips(savedProfile);
    }
  }, []);

  const generateTips = async (userProfile: UserProfile) => {
    setLoading(true);
    setCurrentScreen('tips');
    const generatedTips = await aiService.generateTips(userProfile);
    setTips(generatedTips);
    setLoading(false);
  };

  const handleProfileComplete = (userProfile: UserProfile) => {
    setProfile(userProfile);
    storage.saveProfile(userProfile);
    generateTips(userProfile);
  };

  const handleTipClick = (tip: WellnessTip) => {
    setSelectedTip(tip);
    setCurrentScreen('detail');
  };

  const handleBackToTips = () => {
    setCurrentScreen('tips');
    setSelectedTip(null);
  };

  const handleToggleFavorite = (tip: WellnessTip) => {
    if (storage.isFavorite(tip.id)) {
      storage.removeFavorite(tip.id);
    } else {
      storage.addFavorite(tip);
    }
    setFavorites(storage.getFavorites());
  };

  const handleRegenerate = () => {
    if (profile) {
      generateTips(profile);
    }
  };

  const handleViewFavorites = () => {
    setCurrentScreen('favorites');
  };

  const handleRemoveFavorite = (tipId: string) => {
    storage.removeFavorite(tipId);
    setFavorites(storage.getFavorites());
  };

  return (
    <div className="relative">
      {currentScreen === 'profile' && (
        <ProfileScreen onComplete={handleProfileComplete} />
      )}

      {currentScreen === 'tips' && (
        <>
          <TipsScreen
            tips={tips}
            onTipClick={handleTipClick}
            onRegenerate={handleRegenerate}
            loading={loading}
          />
          {favorites.length > 0 && (
            <button
              onClick={handleViewFavorites}
              className="fixed bottom-8 right-8 flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all font-semibold"
            >
              <Heart className="w-5 h-5" />
              View Saved ({favorites.length})
            </button>
          )}
        </>
      )}

      {currentScreen === 'detail' && selectedTip && profile && (
        <DetailScreen
          tip={selectedTip}
          profile={profile}
          onBack={handleBackToTips}
          isFavorite={storage.isFavorite(selectedTip.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {currentScreen === 'favorites' && (
        <FavoritesScreen
          favorites={favorites}
          onBack={handleBackToTips}
          onTipClick={handleTipClick}
          onRemoveFavorite={handleRemoveFavorite}
        />
      )}
    </div>
  );
}

export default App;
