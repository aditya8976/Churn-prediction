import React from 'react';
import { Sparkles, Cpu, Eye, Activity, ShieldCheck } from 'lucide-react';

export default function ExplainableAIPage() {
  const featureWeights = [
    { name: "last_login_days", weight: 32.5, desc: "Days elapsed since user last accessed service", impact: "High Risk Trigger (>25 days)" },
    { name: "avg_watch_time_per_day", weight: 24.8, desc: "Average daily streaming hours", impact: "Low Risk Anchor (>1.5 hrs)" },
    { name: "watch_hours", weight: 18.2, desc: "Total monthly accumulated watch time", impact: "Engagement Velocity Indicator" },
    { name: "monthly_fee", weight: 9.4, desc: "Monthly subscription price ($)", impact: "Price Sensitivity vs Plan Tier" },
    { name: "number_of_profiles", weight: 6.5, desc: "Total active streaming profile slots", impact: "Household Lock-in Factor" },
    { name: "subscription_type", weight: 4.8, desc: "Basic, Standard, or Premium tier", impact: "Feature Availability" },
    { name: "favorite_genre", weight: 2.3, desc: "Preferred content category", impact: "Catalog Relevancy" },
    { name: "age", weight: 1.5, desc: "Customer age demographic", impact: "Baseline Demographic" },
  ];

  return (
    <div className="space-y-10 animate-fadeIn">
      
      {/* Header */}
      <div className="glass-card p-8 rounded-3xl border border-purple-100 dark:border-slate-800 bg-gradient-to-r from-purple-50/90 via-white to-indigo-50/90 dark:from-purple-950/40 dark:via-slate-900 dark:to-indigo-950/40 shadow-sm">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 text-xs font-bold mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Transparent Machine Learning</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Explainable AI & Model Interpretability</h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 max-w-3xl leading-relaxed font-medium">
          No black boxes. Understand precisely how our Scikit-Learn pipeline weighs behavioral velocity, subscription pricing, and daily watch patterns to calculate individual customer churn probabilities.
        </p>
      </div>

      {/* Feature Importance Weights Bar Ranking */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 space-y-6 shadow-sm bg-white dark:bg-slate-900">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Feature Importance Weighting Ranking</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Relative feature contribution calculated across Random Forest decision tree split gains</p>
        </div>

        <div className="space-y-4">
          {featureWeights.map((f, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-slate-900 dark:text-white">{f.name}</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{f.weight}% importance</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                  style={{ width: `${f.weight * 2.8}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-0.5 font-medium">
                <span>{f.desc}</span>
                <span className="text-slate-700 dark:text-slate-300 font-bold">{f.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SHAP & Interpretability Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-card p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-3 shadow-sm bg-white dark:bg-slate-900">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-600/20 dark:text-indigo-400 flex items-center justify-center border border-indigo-200 dark:border-indigo-500/30 shadow-sm">
            <Eye className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Local Prediction Drivers</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            For every single prediction, our inference engine isolates the top positive and negative behavioral drivers (e.g. 42 days inactive = +45% churn risk).
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-3 shadow-sm bg-white dark:bg-slate-900">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-600/20 dark:text-purple-400 flex items-center justify-center border border-purple-200 dark:border-purple-500/30 shadow-sm">
            <Cpu className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Non-Linear Interactions</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Decision tree splits capture non-linear relationships, such as high monthly fee combined with low profile sharing creating compounding churn risk.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-3 shadow-sm bg-white dark:bg-slate-900">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-600/20 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-500/30 shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Actionable Explanations</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Technical feature weights are automatically translated into plain-English summaries suitable for non-technical customer success managers.
          </p>
        </div>

      </div>

    </div>
  );
}
