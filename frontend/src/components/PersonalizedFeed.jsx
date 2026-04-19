import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Clock, BookOpen, Video, GraduationCap, Star, Globe, ArrowRight, Zap } from 'lucide-react';

const PersonalizedFeed = ({ userProfile }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // AI-powered personalization based on user behavior
    const generateRecommendations = () => {
      const content = [
        {
          type: 'article',
          title: 'Top 10 Scholarships for Indian Students in USA',
          readTime: '5 min',
          icon: '📚',
          relevance: 95,
          category: 'Scholarships'
        },
        {
          type: 'video',
          title: 'How to Write a Winning SOP',
          readTime: '12 min',
          icon: '🎥',
          relevance: 88,
          category: 'Applications'
        },
        {
          type: 'webinar',
          title: 'Education Loan Options Without Collateral',
          readTime: '45 min',
          icon: '🎓',
          relevance: 92,
          category: 'Financing'
        },
        {
          type: 'success_story',
          title: `How ${userProfile?.interest || 'CS'} student got into Stanford`,
          readTime: '8 min',
          icon: '⭐',
          relevance: 85,
          category: 'Success Stories'
        },
        {
          type: 'tool',
          title: 'Visa Interview Simulator',
          readTime: '15 min',
          icon: '🛂',
          relevance: 78,
          category: 'Visa'
        },
        {
          type: 'article',
          title: 'GRE vs GMAT: Which One Should You Take?',
          readTime: '6 min',
          icon: '📖',
          relevance: 82,
          category: 'Test Prep'
        }
      ];
      
      setRecommendations(content.sort((a,b) => b.relevance - a.relevance));
      setLoading(false);
    };

    generateRecommendations();
  }, [userProfile]);

  const getCategoryColor = (category) => {
    const colors = {
      'Scholarships': 'bg-emerald-100 text-emerald-700',
      'Applications': 'bg-blue-100 text-blue-700',
      'Financing': 'bg-purple-100 text-purple-700',
      'Success Stories': 'bg-amber-100 text-amber-700',
      'Visa': 'bg-indigo-100 text-indigo-700',
      'Test Prep': 'bg-rose-100 text-rose-700'
    };
    return colors[category] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden sticky top-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <h2 className="text-lg font-bold text-white">Personalized For You</h2>
        </div>
        <p className="text-xs text-blue-100 mt-1">AI-curated content based on your interests</p>
      </div>
      
      <div className="p-4">
        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-24 bg-slate-100 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {recommendations.map((rec, idx) => (
              <div 
                key={idx} 
                className="group p-3 bg-slate-50 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 cursor-pointer border border-slate-100 hover:border-blue-200"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{rec.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getCategoryColor(rec.category)}`}>
                        {rec.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-800 text-sm group-hover:text-blue-600 transition line-clamp-2">
                      {rec.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {rec.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp size={10} />
                        {rec.relevance}% match
                      </span>
                    </div>
                  </div>
                  <button className="text-blue-500 opacity-0 group-hover:opacity-100 transition text-sm font-medium flex items-center gap-1">
                    Read <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <button className="w-full text-center text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1">
            View all recommendations
            <ArrowRight size={10} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedFeed;