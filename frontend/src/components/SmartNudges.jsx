import React, { useState, useEffect } from 'react';
import { Bell, X, ArrowRight, Clock, Target } from 'lucide-react';

const SmartNudges = ({ userJourneyStage }) => {
  const [nudges, setNudges] = useState([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // AI-driven nudges based on user behavior
    const generateNudges = () => {
      const nudgeLibrary = {
        exploration: [
          { message: "🎯 Complete your profile to get personalized university matches!", action: "Complete Profile", priority: 1 },
          { message: "📊 80% of students who use ROI calculator make better decisions", action: "Try Now", priority: 2 }
        ],
        application: [
          { message: "⏰ Deadlines approaching! Get your application timeline now", action: "Generate Timeline", priority: 1 },
          { message: "✍️ Don't forget to start your Statement of Purpose", action: "Get AI Help", priority: 2 }
        ],
        loan: [
          { message: "🏦 Check loan eligibility - 85% of students qualify", action: "Check Now", priority: 1 },
          { message: "💰 Compare interest rates from 15+ banks", action: "Compare", priority: 2 }
        ]
      };

      const stage = userJourneyStage || 'exploration';
      const relevantNudges = nudgeLibrary[stage] || nudgeLibrary.exploration;
      setNudges(relevantNudges.sort((a,b) => a.priority - b.priority));
    };

    generateNudges();
    
    // Show nudge every 30 seconds
    const interval = setInterval(() => {
      setShow(true);
      setTimeout(() => setShow(false), 10000);
    }, 30000);
    
    return () => clearInterval(interval);
  }, [userJourneyStage]);

  if (!show || nudges.length === 0) return null;

  return (
    <div className="fixed bottom-20 left-4 z-50 animate-bounce">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg shadow-xl max-w-sm overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-2">
              <Bell size={18} className="mt-0.5" />
              <div>
                <p className="text-sm font-medium">{nudges[0].message}</p>
                <button className="mt-2 text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition flex items-center gap-1">
                  {nudges[0].action}
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
            <button onClick={() => setShow(false)} className="text-white/70 hover:text-white">
              <X size={14} />
            </button>
          </div>
        </div>
        <div className="h-1 bg-white/30">
          <div className="h-full bg-white animate-progress" style={{ width: '100%', animation: 'shrink 10s linear forwards' }}></div>
        </div>
      </div>
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
        .animate-progress {
          animation: shrink 10s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default SmartNudges;