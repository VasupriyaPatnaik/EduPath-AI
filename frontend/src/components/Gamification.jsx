import React, { useState, useEffect } from 'react';
import { Award, Flame, Star, Target, CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';
import CountUp from 'react-countup';

const Gamification = ({ userActivity }) => {
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [dailyTasks, setDailyTasks] = useState([
    { id: 1, task: "Complete profile", points: 50, completed: false, icon: "📝" },
    { id: 2, task: "Get AI recommendations", points: 100, completed: false, icon: "🤖" },
    { id: 3, task: "Calculate ROI", points: 75, completed: false, icon: "💰" },
    { id: 4, task: "Chat with AI mentor", points: 50, completed: false, icon: "💬" },
    { id: 5, task: "Check loan eligibility", points: 100, completed: false, icon: "🏦" }
  ]);

  // Load saved data
  useEffect(() => {
    const savedPoints = localStorage.getItem('edupath_ai_points');
    const savedStreak = localStorage.getItem('edupath_ai_streak');
    const lastLogin = localStorage.getItem('edupath_ai_last_login');
    const savedBadges = localStorage.getItem('edupath_ai_badges');
    
    if (savedPoints) setPoints(parseInt(savedPoints));
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedBadges) setBadges(JSON.parse(savedBadges));
    
    // Check streak
    if (lastLogin) {
      const last = new Date(lastLogin);
      const today = new Date();
      const diffDays = Math.floor((today - last) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        setStreak(prev => prev + 1);
        addPoints(50, "Daily streak bonus!");
      } else if (diffDays > 1) {
        setStreak(1);
      }
    } else {
      setStreak(1);
    }
    localStorage.setItem('edupath_ai_last_login', new Date().toISOString());
  }, []);

  // Save points
  useEffect(() => {
    localStorage.setItem('edupath_ai_points', points);
    localStorage.setItem('edupath_ai_streak', streak);
    localStorage.setItem('edupath_ai_badges', JSON.stringify(badges));
    
    // Update level (every 500 points)
    const newLevel = Math.floor(points / 500) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [points, streak, badges, level]);

  const addPoints = (amount, reason) => {
    setPoints(prev => prev + amount);
    // Show toast notification
    const event = new CustomEvent('pointsEarned', { detail: { points: amount, reason } });
    window.dispatchEvent(event);
  };

  const completeTask = (taskId) => {
    setDailyTasks(prev => prev.map(task => 
      task.id === taskId && !task.completed 
        ? { ...task, completed: true }
        : task
    ));
    const task = dailyTasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      addPoints(task.points, `Completed: ${task.task}`);
      
      // Check for badge
      const completedCount = dailyTasks.filter(t => t.completed).length + 1;
      if (completedCount === 3 && !badges.includes('task_master')) {
        setBadges(prev => [...prev, 'task_master']);
        addPoints(200, "Earned 'Task Master' badge!");
      }
    }
  };

  const badgesList = [
    { id: 'welcome', name: 'Welcome Aboard', icon: '🎓', requirement: 'Complete profile' },
    { id: 'explorer', name: 'University Explorer', icon: '🌍', requirement: 'Get 5 recommendations' },
    { id: 'roi_expert', name: 'ROI Expert', icon: '📊', requirement: 'Calculate ROI 3 times' },
    { id: 'loan_ready', name: 'Loan Ready', icon: '🏦', requirement: 'Check loan eligibility' },
    { id: 'task_master', name: 'Task Master', icon: '⭐', requirement: 'Complete 3 daily tasks' },
    { id: 'streak_7', name: '7-Day Warrior', icon: '🔥', requirement: '7 day login streak' }
  ];

  const nextLevelPoints = level * 500;
  const progress = ((points % 500) / 500) * 100;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {showConfetti && <Confetti />}
      
      {/* Main Widget Button */}
      <div className="relative">
        <button 
          onClick={() => {
            const widget = document.getElementById('gamification-widget');
            if (widget) widget.classList.toggle('hidden');
          }}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <Award size={24} />
          {points > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {Math.floor(points/100)}
            </span>
          )}
        </button>

        {/* Expanded Widget */}
        <div id="gamification-widget" className="hidden absolute bottom-16 right-0 w-96 bg-white rounded-xl shadow-2xl border overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">Your Progress</h3>
              <div className="flex items-center gap-2">
                <Flame className="text-orange-300" size={16} />
                <span className="font-bold">{streak} day streak</span>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Level {level}</span>
                <span>{points % 500}/{nextLevelPoints - (level-1)*500} XP</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-2">
                <div className="bg-white rounded-full h-2" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>

          {/* Points Display */}
          <div className="bg-gray-50 p-4 border-b">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Points</span>
              <span className="text-2xl font-bold text-yellow-600">
                <CountUp end={points} duration={1} />
              </span>
            </div>
          </div>

          {/* Daily Tasks */}
          <div className="p-4 border-b">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Target size={16} />
              Daily Quests
            </h4>
            <div className="space-y-2">
              {dailyTasks.map(task => (
                <div key={task.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{task.icon}</span>
                    <div>
                      <p className={`text-sm ${task.completed ? 'line-through text-gray-400' : ''}`}>
                        {task.task}
                      </p>
                      <p className="text-xs text-yellow-600">+{task.points} XP</p>
                    </div>
                  </div>
                  {!task.completed ? (
                    <button
                      onClick={() => completeTask(task.id)}
                      className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Complete
                    </button>
                  ) : (
                    <CheckCircle size={16} className="text-green-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="p-4 max-h-48 overflow-y-auto">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Star size={16} />
              Achievements
            </h4>
            <div className="flex flex-wrap gap-2">
              {badgesList.map(badge => (
                <div
                  key={badge.id}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    badges.includes(badge.id)
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                  title={badge.requirement}
                >
                  <span>{badge.icon}</span>
                  <span>{badge.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Referral Link */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
            <p className="text-sm font-semibold mb-2">Invite Friends, Earn Points!</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={`${window.location.origin}/ref/${Math.random().toString(36).substr(2, 8)}`}
                readOnly
                className="flex-1 text-xs p-2 border rounded"
              />
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamification;