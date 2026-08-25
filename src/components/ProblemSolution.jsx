import React from 'react';
import { AlertTriangle, TrendingDown, DollarSign, Users, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ProblemSolution({ setActiveTab }) {
  return (
    <section className="py-16 bg-white dark:bg-slate-950/60 border-t border-b border-slate-200/80 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 dark:bg-rose-500/10 dark:border-rose-500/20 dark:text-rose-400 text-xs font-bold shadow-sm">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>The $136B SaaS Churn Challenge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Why Customer Churn Destroys Business Value
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-medium">
            Customer churn refers to the percentage of subscribers or users who discontinue their subscriptions within a given time period. Acquiring new customers costs 5x to 25x more than retaining existing ones.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-card p-6 rounded-2xl border border-rose-200 dark:border-rose-500/20 bg-rose-50/50 dark:bg-rose-950/10 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center text-rose-600 dark:text-rose-400 mb-4">
              <TrendingDown className="w-6 h-6" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">5% to 7%</div>
            <h3 className="text-sm font-bold text-rose-700 dark:text-rose-300 mb-2">Average Monthly SaaS Churn</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Without active intervention, a subscription company loses nearly half its revenue base every 12 to 18 months due to silent churn.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-amber-200 dark:border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/10 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
              <DollarSign className="w-6 h-6" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">5x Costlier</div>
            <h3 className="text-sm font-bold text-amber-700 dark:text-amber-300 mb-2">Acquisition vs Retention</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Acquiring a new user costs significantly more than engaging existing accounts. Increasing retention by just 5% can boost profits by 25% to 95%.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/10 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">68% Preventable</div>
            <h3 className="text-sm font-bold text-emerald-700 dark:text-emerald-300 mb-2">Early Warning Intervention</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Over two-thirds of churned users exhibit clear early indicators (drop in login days, reduced watch hours) 30 days before canceling.
            </p>
          </div>
        </div>

        {/* How ChurnGuard Solves It */}
        <div className="glass-card p-8 sm:p-10 rounded-3xl border border-indigo-100 dark:border-indigo-500/30 bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80 dark:from-indigo-950/40 dark:via-slate-900 dark:to-purple-950/40 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>The AI Solution</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Turn Predictive Signals into Targeted Retention Campaigns
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium">
                ChurnGuard AI translates raw user behavior logs (watch time, login velocity, fee structure, profile counts) into real-time churn probability metrics with plain-English business explanations and instant retention actions.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  "Automated OneHotEncoding & Chi2 Feature Selection pipeline",
                  "Explainable AI: See exact drivers behind every churn prediction",
                  "Tailored Retention Strategies: Discounts, content feeds & VIP support",
                  "CSV Batch Processing for large customer databases"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('predict')}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-lg shadow-indigo-500/20 flex items-center space-x-2 transition-all"
                >
                  <span>Test Prediction Pipeline</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-sm bg-white dark:bg-slate-900">
              <div className="flex items-center justify-between text-xs border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="font-extrabold text-slate-900 dark:text-slate-200">Live Model Inference Workflow</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-[10px] font-bold">READY</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 font-medium">
                  <span className="text-slate-500 dark:text-slate-400">Input Data:</span>
                  <span className="text-indigo-600 dark:text-indigo-300 font-mono font-bold">Last Login: 42 days, Watch: 0.15h/day</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 font-medium">
                  <span className="text-slate-500 dark:text-slate-400">Model Output:</span>
                  <span className="text-rose-600 dark:text-rose-400 font-extrabold font-mono">99.97% Churn Risk (HIGH)</span>
                </div>
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-500/30 text-rose-800 dark:text-rose-200 text-[11px] leading-relaxed font-medium">
                  "Customer exhibits prolonged inactivity (42 days) and dropped watch time. Action: Trigger 20% retention discount."
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
