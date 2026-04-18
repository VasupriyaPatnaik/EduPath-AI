import React, { useState, useEffect } from 'react';
import { Bell, BookOpen, Briefcase, Calculator, GraduationCap, Target, X, TrendingUp, DollarSign, FileText, Calendar, Sparkles, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const nudgesByStage = {
  exploration: {
    icon: GraduationCap,
    title: 'Explore universities that fit your profile',
    description: 'Compare programs, countries, and requirements before you apply.',
    action: 'Review recommendations',
    actionId: 'navigator',
    color: 'from-blue-500 to-cyan-500'
  },
  application: {
    icon: Target,
    title: 'Tighten your application plan',
    description: 'Check deadlines, admission criteria, and required documents now.',
    action: 'Update application checklist',
    actionId: 'timeline',
    color: 'from-orange-500 to-red-500'
  },
  loan: {
    icon: Briefcase,
    title: 'Check funding options early',
    description: 'Review loan eligibility, scholarships, and budget before committing.',
    action: 'Compare financing options',
    actionId: 'loan',
    color: 'from-purple-500 to-pink-500'
  },
  roi: {
    icon: Calculator,
    title: 'Calculate your education ROI',
    description: 'See how your investment pays off with our smart calculator.',
    action: 'Calculate ROI',
    actionId: 'roi',
    color: 'from-emerald-500 to-teal-500'
  },
  admission: {
    icon: FileText,
    title: 'Check your admission chances',
    description: 'AI-powered prediction based on your academic profile.',
    action: 'Predict Now',
    actionId: 'admission',
    color: 'from-indigo-500 to-purple-500'
  },
  default: {
    icon: Bell,
    title: 'Stay on track this week',
    description: 'Keep moving with one focused step at a time across your study abroad journey.',
    action: 'Continue planning',
    actionId: null,
    color: 'from-indigo-600 to-purple-600'
  }
};

const SmartNudges = ({ userJourneyStage = 'default', onNavigate }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentNudge, setCurrentNudge] = useState(null);
  const navigate = useNavigate();

  // Rotate through nudges based on stage or randomly
  useEffect(() => {
    const nudge = nudgesByStage[userJourneyStage] || nudgesByStage.default;
    setCurrentNudge(nudge);
  }, [userJourneyStage]);

  // Auto-hide nudge after 15 seconds (but not permanently)
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsMinimized(true);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, userJourneyStage]);

  const handleAction = () => {
    if (currentNudge?.actionId && onNavigate) {
      onNavigate(currentNudge.actionId);
      toast.success(`Opening ${currentNudge.title.split(' ')[0]} tool...`);
    } else if (currentNudge?.actionId) {
      // Fallback navigation if onNavigate not provided
      navigate(`/app?tool=${currentNudge.actionId}`);
    }
    setIsMinimized(true);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Store dismissal in localStorage to avoid showing same nudge again
    const dismissedNudges = JSON.parse(localStorage.getItem('dismissedNudges') || '[]');
    if (!dismissedNudges.includes(userJourneyStage)) {
      dismissedNudges.push(userJourneyStage);
      localStorage.setItem('dismissedNudges', JSON.stringify(dismissedNudges));
    }
  };

  const handleRestore = () => {
    setIsMinimized(false);
    setIsVisible(true);
  };

  // Check if this nudge was dismissed
  useEffect(() => {
    const dismissedNudges = JSON.parse(localStorage.getItem('dismissedNudges') || '[]');
    if (dismissedNudges.includes(userJourneyStage)) {
      setIsVisible(false);
    }
  }, [userJourneyStage]);

  if (!isVisible) return null;

  const Icon = currentNudge?.icon || Bell;

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm animate-slide-in-left">
      {isMinimized ? (
        // Minimized state - small button
        <button
          onClick={handleRestore}
          className="group flex items-center gap-2 rounded-full bg-[#1A2A4A]/95 backdrop-blur-xl border border-indigo-500/30 px-4 py-2 shadow-xl hover:bg-[#1E3060] transition-all duration-300"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
            <Bell size={12} />
          </div>
          <span className="text-xs text-indigo-200">New insight available</span>
          <Sparkles size={12} className="text-yellow-400" />
        </button>
      ) : (
        // Expanded state - full nudge card
        <div className={`rounded-2xl border border-indigo-500/20 bg-[#0A1628]/95 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-indigo-500/10`}>
          <div className="relative">
            {/* Gradient accent line */}
            <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${currentNudge?.color || 'from-indigo-600 to-purple-600'}`}></div>
            
            <div className="flex items-start gap-3 p-4">
              {/* Icon */}
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r ${currentNudge?.color || 'from-indigo-500 to-purple-600'}/20 text-indigo-300 shrink-0`}>
                <Icon size={20} />
              </div>
              
              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-indigo-300">
                    <Sparkles size={10} />
                    AI Smart Nudge
                  </div>
                  <button
                    onClick={handleDismiss}
                    className="text-indigo-400 hover:text-indigo-200 transition p-1"
                    aria-label="Dismiss"
                  >
                    <X size={14} />
                  </button>
                </div>
                <h3 className="mt-1 text-sm font-semibold text-white">{currentNudge?.title}</h3>
                <p className="mt-1 text-sm text-indigo-200/90 leading-relaxed">{currentNudge?.description}</p>
                
                {/* Action Button */}
                <button
                  onClick={handleAction}
                  className={`mt-3 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r ${currentNudge?.color || 'from-indigo-500 to-purple-600'} px-3 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:scale-[1.02] group`}
                >
                  {currentNudge?.actionId === 'navigator' && <GraduationCap size={14} />}
                  {currentNudge?.actionId === 'roi' && <Calculator size={14} />}
                  {currentNudge?.actionId === 'loan' && <Briefcase size={14} />}
                  {currentNudge?.actionId === 'timeline' && <Calendar size={14} />}
                  {currentNudge?.actionId === 'admission' && <Target size={14} />}
                  {!currentNudge?.actionId && <Bell size={14} />}
                  {currentNudge?.action}
                  <ChevronRight size={14} className="group-hover:translate-x-0.5 transition" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Progress bar for auto-minimize */}
          <div className="h-0.5 bg-indigo-500/20">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-shrink"></div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.3s ease-out;
        }
        
        .animate-shrink {
          animation: shrink 15s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default SmartNudges;