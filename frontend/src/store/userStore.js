import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      onboardingCompleted: false,
      userProfile: {
        interest: '',
        budget: '',
        academicScore: 70,
        preferredCountries: []
      },
      recommendations: [],
      loanApplications: [],
      
      setUser: (user) => set({ user, isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false }),
      
      updateProfile: (profile) => set((state) => ({ 
        userProfile: { ...state.userProfile, ...profile } 
      })),
      
      setRecommendations: (recs) => set({ recommendations: recs }),
      
      addLoanApplication: (application) => set((state) => ({
        loanApplications: [...state.loanApplications, application]
      })),
      
      completeOnboarding: () => set({ onboardingCompleted: true })
    }),
    {
        name: 'edupath_ai_storage'
    }
  )
);

export default useUserStore;