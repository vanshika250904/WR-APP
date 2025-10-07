import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, Target } from 'lucide-react';

interface ProfileScreenProps {
  onComplete: (profile: UserProfile) => void;
}

const goalOptions = [
  'Weight Loss',
  'Muscle Gain',
  'Better Sleep',
  'Stress Relief',
  'More Energy',
  'Mental Clarity',
  'Overall Wellness'
];

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onComplete }) => {
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else if (selectedGoals.length < 3) {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (age && gender && selectedGoals.length > 0) {
      onComplete({
        age: parseInt(age),
        gender,
        goals: selectedGoals
      });
    }
  };

  const isValid = age && parseInt(age) > 0 && parseInt(age) < 120 && gender && selectedGoals.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Your Wellness Journey</h1>
          <p className="text-gray-600 text-lg">Let's personalize your experience</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-lg"
                min="1"
                max="120"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-lg appearance-none bg-white"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-emerald-600" />
              <label className="block text-sm font-semibold text-gray-700">
                Select Your Goals (Choose up to 3)
              </label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {goalOptions.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => toggleGoal(goal)}
                  className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    selectedGoals.includes(goal)
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {selectedGoals.length}/3 goals selected
            </p>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
              isValid
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Generate My Wellness Plan
          </button>
        </form>
      </div>
    </div>
  );
};
