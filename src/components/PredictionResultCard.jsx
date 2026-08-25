import React from 'react';
import { AlertOctagon, CheckCircle, Sparkles, Tag, Film, HeartHandshake, PlayCircle, Users, MessageSquare, TrendingUp, Share2, Award, Zap } from 'lucide-react';

export default function PredictionResultCard({ result }) {
  if (!result) return null;

  const isChurn = result.prediction === 1;
  const prob = result.churn_probability; // in %
  const riskLevel = result.risk_level;
  
  // Icon mapping for recommendations
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Tag': return Tag;
      case 'Film': return Film;
      case 'HeartHandshake': return HeartHandshake;
      case 'Sparkles': return Sparkles;
      case 'PlayCircle': return PlayCircle;
      case 'Users': return Users;
      case 'MessageSquare': return MessageSquare;
      case 'TrendingUp': return TrendingUp;
      case 'Share2': return Share2;
      case 'Award': return Award;
      default: return Zap;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Primary Result Banner */}
      <div className={`glass-card p-8 rounded-3xl border ${isChurn ? 'border-rose-200 dark:border-rose-500/40 bg-gradient-to-br from-rose-50/90 via-white to-rose-100/40 dark:from-rose-950/30 dark:via-slate-900 dark:to-slate-950' : 'border-emerald-200 dark:border-emerald-500/40 bg-gradient-to-br from-emerald-50/90 via-white to-emerald-100/40 dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-950'} relative overflow-hidden shadow-md`}>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left gauge / circular meter */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 pb-6 lg:pb-0 lg:pr-8">
            <div className="relative w-44 h-44 flex items-center justify-center">
              
              {/* SVG Circular Gauge */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#e2e8f0"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={isChurn ? "#DC2626" : "#059669"}
                  strokeWidth="8"
                  strokeDasharray={`${(prob / 100) * 251.2} 251.2`}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute flex flex-col items-center text-center">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{prob}%</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-extrabold mt-0.5">Churn Risk</span>
              </div>
            </div>

            <div className="mt-4 inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-extrabold shadow-sm" style={{ backgroundColor: isChurn ? '#FEF2F2' : '#ECFDF5', color: isChurn ? '#DC2626' : '#059669', border: `1px solid ${isChurn ? '#FECACA' : '#A7F3D0'}` }}>
              <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: isChurn ? '#DC2626' : '#059669' }}></span>
              <span>{riskLevel} RISK CATEGORY</span>
            </div>
          </div>

          {/* Right prediction detail */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isChurn ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30'}`}>
                  {isChurn ? <AlertOctagon className="w-7 h-7" /> : <CheckCircle className="w-7 h-7" />}
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {result.churn_label}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Confidence Score: <span className="font-bold text-slate-900 dark:text-white">{result.confidence_score}%</span></p>
                </div>
              </div>
            </div>

            {/* AI Explanation Box */}
            <div className="glass-card p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/80 space-y-2 shadow-sm">
              <h4 className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Business Interpretation</span>
              </h4>
              <p className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-medium">
                {result.explanation}
              </p>
            </div>

            {/* Feature impact summary */}
            <div className="flex flex-wrap gap-2 pt-1">
              {result.feature_impacts?.map((item, idx) => (
                <span key={idx} className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 font-medium">
                  <strong className="text-slate-900 dark:text-slate-100 font-bold">{item.feature}:</strong> {item.impact}
                </span>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Tailored Retention Recommendation Engine */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 space-y-6 shadow-sm bg-white dark:bg-slate-900">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 dark:bg-indigo-500/10 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-bold mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Automated Action Engine</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Recommended Retention Strategies</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Personalized intervention workflow based on predicted churn probability</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.recommendations?.map((rec, idx) => {
            const IconComponent = getIcon(rec.icon);
            return (
              <div key={idx} className="glass-card p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 transition-all duration-300 flex items-start space-x-4 shadow-sm bg-slate-50/50 dark:bg-slate-900/60">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-600/20 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5 shadow-sm">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{rec.title}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border border-slate-300 dark:border-slate-700">{rec.tag}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{rec.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
