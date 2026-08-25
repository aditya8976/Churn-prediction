import React from 'react';
import { AlertOctagon, CheckCircle, ShieldAlert, Sparkles, Tag, Film, HeartHandshake, PlayCircle, Users, MessageSquare, TrendingUp, Share2, Award, Zap, HelpCircle } from 'lucide-react';

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
      <div className={`glass-card p-8 rounded-3xl border ${isChurn ? 'border-rose-500/40 bg-gradient-to-br from-rose-950/30 via-slate-900 to-slate-950 glow-danger' : 'border-emerald-500/40 bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-950 glow-success'} relative overflow-hidden`}>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left gauge / circular meter */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-800 pb-6 lg:pb-0 lg:pr-8">
            <div className="relative w-44 h-44 flex items-center justify-center">
              
              {/* SVG Circular Gauge */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={isChurn ? "#EF4444" : "#10B981"}
                  strokeWidth="8"
                  strokeDasharray={`${(prob / 100) * 251.2} 251.2`}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute flex flex-col items-center text-center">
                <span className="text-3xl font-extrabold text-white tracking-tight">{prob}%</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mt-0.5">Churn Risk</span>
              </div>
            </div>

            <div className="mt-4 inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: `${result.risk_color}20`, color: result.risk_color, border: `1px solid ${result.risk_color}40` }}>
              <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: result.risk_color }}></span>
              <span>{riskLevel} RISK CATEGORY</span>
            </div>
          </div>

          {/* Right prediction detail */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isChurn ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                  {isChurn ? <AlertOctagon className="w-7 h-7" /> : <CheckCircle className="w-7 h-7" />}
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {result.churn_label}
                  </h3>
                  <p className="text-xs text-slate-400">Confidence Score: <span className="font-semibold text-white">{result.confidence_score}%</span></p>
                </div>
              </div>
            </div>

            {/* AI Explanation Box */}
            <div className="glass-card p-4 sm:p-5 rounded-2xl border border-slate-700/60 bg-slate-900/80 space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Business Interpretation</span>
              </h4>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                {result.explanation}
              </p>
            </div>

            {/* Feature impact summary */}
            <div className="flex flex-wrap gap-2 pt-1">
              {result.feature_impacts?.map((item, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                  <strong className="text-slate-200">{item.feature}:</strong> {item.impact}
                </span>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Tailored Retention Recommendation Engine */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Automated Action Engine</span>
          </div>
          <h3 className="text-xl font-bold text-white">Recommended Retention Strategies</h3>
          <p className="text-xs text-slate-400">Personalized intervention workflow based on predicted churn probability</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.recommendations?.map((rec, idx) => {
            const IconComponent = getIcon(rec.icon);
            return (
              <div key={idx} className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{rec.title}</h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">{rec.tag}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{rec.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
