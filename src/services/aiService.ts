import { UserProfile, WellnessTip } from '../types';

const iconMap: Record<string, string> = {
  nutrition: 'apple',
  exercise: 'dumbbell',
  sleep: 'moon',
  mental: 'brain',
  hydration: 'droplet',
  mindfulness: 'heart',
  stretching: 'move',
  social: 'users'
};

export const aiService = {
  async generateTips(profile: UserProfile): Promise<WellnessTip[]> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const ageGroup = profile.age < 30 ? 'young adult' : profile.age < 50 ? 'middle-aged adult' : 'senior';
    const goalText = profile.goals.join(', ');

    const tipTemplates = [
      {
        category: 'nutrition',
        title: 'Balanced Meal Planning',
        shortDescription: `Optimize your nutrition for ${goalText} with a personalized meal approach`,
        detailedExplanation: `As a ${ageGroup}, your nutritional needs are unique. Focus on whole foods that support ${goalText}. Your metabolism and nutrient requirements at age ${profile.age} benefit from specific dietary patterns.`,
        steps: [
          'Start each day with a protein-rich breakfast (20-30g protein)',
          'Include colorful vegetables in every meal for antioxidants',
          'Choose complex carbohydrates like quinoa, sweet potatoes, and oats',
          'Add healthy fats from avocados, nuts, and olive oil',
          'Stay consistent with meal timing to regulate metabolism'
        ]
      },
      {
        category: 'exercise',
        title: 'Personalized Workout Routine',
        shortDescription: `Age-appropriate exercises designed for ${profile.gender}s to achieve ${profile.goals[0] || 'wellness'}`,
        detailedExplanation: `For ${profile.gender}s at age ${profile.age}, combining strength and cardio is essential. Your fitness routine should align with ${goalText} while respecting your body's recovery needs.`,
        steps: [
          'Begin with 10-minute warm-up: light cardio and dynamic stretches',
          'Perform 20-30 minutes of moderate-intensity exercise 5x per week',
          'Include 2-3 days of strength training targeting major muscle groups',
          'End with 5-10 minutes of cool-down stretching',
          'Track progress weekly and adjust intensity gradually'
        ]
      },
      {
        category: 'sleep',
        title: 'Sleep Optimization Strategy',
        shortDescription: 'Improve sleep quality to enhance recovery and achieve your wellness goals',
        detailedExplanation: `Quality sleep becomes increasingly important as we age. At ${profile.age}, your body needs 7-9 hours of restorative sleep to support ${goalText}. Sleep directly impacts hormone regulation, recovery, and mental clarity.`,
        steps: [
          'Set a consistent bedtime and wake time (even on weekends)',
          'Create a dark, cool environment (65-68°F is optimal)',
          'Avoid screens 1 hour before bed (blue light disrupts melatonin)',
          'Practice a relaxing pre-sleep routine: reading or gentle stretching',
          'Limit caffeine after 2 PM and alcohol before bedtime'
        ]
      },
      {
        category: 'mental',
        title: 'Mental Wellness Practices',
        shortDescription: 'Build resilience and mental clarity tailored to your life stage',
        detailedExplanation: `Mental health is foundational to achieving ${goalText}. For ${ageGroup}s, stress management and cognitive health are priorities. Your mental wellness directly influences physical health outcomes.`,
        steps: [
          'Practice daily gratitude: write down 3 things you\'re grateful for',
          'Set aside 15 minutes for meditation or deep breathing',
          'Limit news and social media to reduce information overload',
          'Engage in a hobby or creative activity that brings joy',
          'Connect with friends or loved ones regularly'
        ]
      },
      {
        category: 'hydration',
        title: 'Hydration Blueprint',
        shortDescription: 'Optimal water intake strategy for your body and activity level',
        detailedExplanation: `Proper hydration is crucial for ${goalText}. Your body composition and activity level determine ideal water intake. As a ${ageGroup}, maintaining hydration supports metabolism, skin health, and energy levels.`,
        steps: [
          'Calculate your baseline: drink half your body weight in ounces daily',
          'Start your day with 16 oz of water before coffee or breakfast',
          'Keep a reusable water bottle with you at all times',
          'Add 12-16 oz for every 30 minutes of exercise',
          'Monitor urine color: pale yellow indicates good hydration'
        ]
      }
    ];

    return tipTemplates.slice(0, 5).map((template, index) => ({
      id: `tip-${Date.now()}-${index}`,
      ...template,
      icon: iconMap[template.category] || 'sparkles'
    }));
  },

  async generateDetailedTip(tip: WellnessTip, profile: UserProfile): Promise<WellnessTip> {
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      ...tip,
      detailedExplanation: tip.detailedExplanation || `Detailed guidance for ${tip.title} tailored to your profile.`,
      steps: tip.steps || [
        'Step 1: Begin with awareness of your current habits',
        'Step 2: Set a realistic, measurable goal',
        'Step 3: Create a daily routine around this practice',
        'Step 4: Track your progress and adjust as needed',
        'Step 5: Celebrate small wins along the way'
      ]
    };
  }
};
