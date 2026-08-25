import React from 'react';
import { Sparkles, ArrowRight, Play, Database, Cpu, Activity, Lightbulb, Target, Zap } from 'lucide-react';

export default function HeroSection({ setActiveTab }) {
  const flowSteps = [
    { title: "Customer Data", desc: "Demographics & usage velocity", icon: Database, color: "from-blue-500 to-indigo-600" },
    { title: "Data Preprocessing", desc: "OneHotEncoder & Scaling", icon: Cpu, color: "from-indigo-600 to-violet-600" },
    { title: "ML Engine", desc: "Chi2 SelectKBest + RandomForest", icon: Zap, color: "from-violet-600 to-purple-600" },
    { title: "Probability Score", desc: "Precise % risk calculation", icon: Activity, color: "from-rose-500 to-red-600" },
    { title: "Business Insights", desc: "Plain English explanation", icon: Lightbulb, color: "from-amber-500 to-orange-500" },
    { title: "Retention Strategy", desc: "Targeted discounts & check-ins", icon: Target, color: "from-emerald-500 to-teal-600" },
  ];

  return (
    <div className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      
      {/* Soft ambient background glows for light theme */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-indigo-100/60 dark:bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-violet-100/50 dark:bg-purple-600/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-400 text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Machine Learning Model Trained & Serialized</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
            AI-Powered <br />
            <span className="gradient-text">Customer Churn Prediction</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
            Predict customer churn before it happens and help businesses retain valuable customers using production-ready Machine Learning.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('predict')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-xl shadow-indigo-500/25 transition-all duration-300 flex items-center justify-center space-x-3 group transform hover:-translate-y-0.5"
            >
              <span>Try Prediction Demo</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('batch')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-400 text-slate-700 dark:text-slate-200 font-bold text-base shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
              <span>Batch CSV Upload</span>
            </button>
          </div>
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16 max-w-5xl mx-auto">
          {[
            { label: "Model Accuracy", value: "96.2%", sub: "Validated on 1,000+ test samples" },
            { label: "Recall Rate", value: "99.4%", sub: "High churn detection sensitivity" },
            { label: "ROC-AUC Score", value: "0.979", sub: "Excellent class discrimination" },
            { label: "Inference Speed", value: "< 15ms", sub: "Optimized Vercel serverless API" },
          ].map((stat, idx) => (
            <div key={idx} className="glass-card p-5 rounded-2xl text-center border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 transition-all shadow-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{stat.value}</div>
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-1 uppercase tracking-wider">{stat.label}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Animated Solution Flowchart Diagram */}
        <div className="mt-20">
          <div className="text-center mb-8">
            <h3 className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">Architectural Workflow</h3>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">How Our AI Model Works End-to-End</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {flowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative group">
                  <div className="glass-card p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 transition-all duration-300 h-full flex flex-col items-center text-center shadow-sm">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${step.color} flex items-center justify-center text-white shadow-md mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold text-slate-400 mb-1">STEP 0{idx + 1}</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{step.title}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight font-medium">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
