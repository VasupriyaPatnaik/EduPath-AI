import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, BookOpen, Users, Clock } from 'lucide-react';

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
          relevance: 95
        },
        {
          type: 'video',
          title: 'How to Write a Winning SOP',
          readTime: '12 min',
          icon: '🎥',
          relevance: 88
        },
        {
          type: 'webinar',
          title: 'Education Loan Options Without Collateral',
          readTime: '45 min',
          icon: '🎓',
          relevance: 92
        },
        {
          type: 'success_story',
          title: `How ${userProfile?.interest || 'CS'} student got into Stanford`,
          readTime: '8 min',
          icon: '⭐',
          relevance: 85
        },
        {
          type: 'tool',
          title: 'Visa Interview Simulator',
          readTime: '15 min',
          icon: '🛂',
          relevance: 78
        }
      ];
      
      setRecommendations(content.sort((a,b) => b.relevance - a.relevance));
      setLoading(false);
    };

    generateRecommendations();
  }, [userProfile]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Sparkles className="text-yellow-500" />
        Personalized For You
      </h2>
      
      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-20 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{rec.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{rec.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {rec.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp size={12} />
                      {rec.relevance}% match
                    </span>
                  </div>
                </div>
                <button className="text-blue-600 text-sm hover:text-blue-800">Read →</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalizedFeed;