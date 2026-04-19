import React, { useState, useEffect } from 'react';
import { Bell, BookOpen, Briefcase, Calculator, GraduationCap, Target, X, TrendingUp, DollarSign, FileText, Calendar, Sparkles, ChevronRight, Lightbulb } from 'lucide-react';
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
    color: 'from-amber-500 to-orange-500'
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
    color: 'from-indigo-500 to-blue-500'
  },
  default: {
    icon: Lightbulb,
    title: 'Stay on track this week',
    description: 'Keep moving with one focused step at a time across your study abroad journey.',
    action: 'Continue planning',
    actionId: null,
    color: 'from-blue-600 to-teal-500'
  }
};

const SmartNudges = ({ userJourneyStage = 'default', onNavigate }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentNudge, setCurrentNudge] = useState(null);
  const navigate = useNavigate();

  console.log('SmartNudges rendering, isVisible:', isVisible, 'isMinimized:', isMinimized);

  useEffect(() => {
    const nudge = nudgesByStage[userJourneyStage] || nudgesByStage.default;
    setCurrentNudge(nudge);
  }, [userJourneyStage]);

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
      navigate(`/app?tool=${currentNudge.actionId}`);
    }
    setIsMinimized(true);
  };

  const handleDismiss = () => {
    setIsVisible(false);
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

  useEffect(() => {
    const dismissedNudges = JSON.parse(localStorage.getItem('dismissedNudges') || '[]');
    if (dismissedNudges.includes(userJourneyStage)) {
      setIsVisible(false);
    }
  }, [userJourneyStage]);

  if (!isVisible) return null;

  const Icon = currentNudge?.icon || Lightbulb;

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm animate-slide-in-left">
      {isMinimized ? (
        // Minimized state - small button (Light Theme)
        <button
          onClick={handleRestore}
          className="group flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-xl border border-blue-200 shadow-lg px-4 py-2 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Bell size={12} />
          </div>
          <span className="text-xs text-slate-600 font-medium">New insight available</span>
          <Sparkles size={12} className="text-amber-500" />
        </button>
      ) : (
        // Expanded state - full nudge card (Light Theme)
        <div className="rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="relative">
            {/* Gradient accent line */}
            <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${currentNudge?.color || 'from-blue-600 to-teal-500'}`}></div>
            
            <div className="flex items-start gap-3 p-4">
              {/* Icon */}
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r ${currentNudge?.color || 'from-blue-600 to-teal-500'} shadow-md shrink-0`}>
                <Icon size={18} className="text-white" />
              </div>
              
              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
                    <Sparkles size={10} />
                    AI Smart Nudge
                  </div>
                  <button
                    onClick={handleDismiss}
                    className="text-slate-400 hover:text-slate-600 transition p-1"
                    aria-label="Dismiss"
                  >
                    <X size={14} />
                  </button>
                </div>
                <h3 className="mt-1 text-sm font-semibold text-slate-800">{currentNudge?.title}</h3>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">{currentNudge?.description}</p>
                
                {/* Action Button */}
                <button
                  onClick={handleAction}
                  className={`mt-3 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r ${currentNudge?.color || 'from-blue-600 to-teal-500'} px-3 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:scale-[1.02] group`}
                >
                  {currentNudge?.actionId === 'navigator' && <GraduationCap size={14} />}
                  {currentNudge?.actionId === 'roi' && <Calculator size={14} />}
                  {currentNudge?.actionId === 'loan' && <Briefcase size={14} />}
                  {currentNudge?.actionId === 'timeline' && <Calendar size={14} />}
                  {currentNudge?.actionId === 'admission' && <Target size={14} />}
                  {!currentNudge?.actionId && <Lightbulb size={14} />}
                  {currentNudge?.action}
                  <ChevronRight size={14} className="group-hover:translate-x-0.5 transition" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Progress bar for auto-minimize */}
          <div className="h-0.5 bg-slate-100">
            <div className={`h-full bg-gradient-to-r ${currentNudge?.color || 'from-blue-600 to-teal-500'} animate-shrink`}></div>
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