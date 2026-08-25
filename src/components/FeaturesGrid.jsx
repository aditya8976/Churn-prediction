import React from 'react';
import { Cpu, Gauge, Sparkles, BarChart2, FileSpreadsheet, Download, Smartphone, LineChart, ShieldCheck } from 'lucide-react';

export default function FeaturesGrid({ setActiveTab }) {
  const features = [
    {
      title: "AI Churn Prediction",
      desc: "Supervised Random Forest & Decision Tree ML model trained on behavioral velocity.",
      icon: Cpu,
      tab: 'predict'
    },
    {
      title: "Risk Analysis & Scoring",
      desc: "Instant categorization into High, Medium, or Low risk tiers with probability gauges.",
      icon: Gauge,
      tab: 'predict'
    },
    {
      title: "Explainable AI (XAI)",
      desc: "Plain-English summaries explaining exact feature drivers behind every risk score.",
      icon: Sparkles,
      tab: 'explainable-ai'
    },
    {
      title: "Batch CSV Prediction",
      desc: "Score thousands of customer records in seconds via CSV drag-and-drop file upload.",
      icon: FileSpreadsheet,
      tab: 'batch'
    },
    {
      title: "Interactive Analytics",
      desc: "Real-time charts (Pie, Bar, Line) visualizing churn distribution and genre metrics.",
      icon: BarChart2,
      tab: 'analytics'
    },
    {
      title: "Retention Recommendations",
      desc: "Automated campaign recommendations (discounts, content digests, VIP check-ins).",
      icon: ShieldCheck,
      tab: 'predict'
    },
    {
      title: "Model Metrics & Evaluation",
      desc: "Transparent accuracy (96.2%), recall, ROC-AUC score, and confusion matrix heatmap.",
      icon: LineChart,
      tab: 'model-info'
    },
    {
      title: "Export & PDF Summaries",
      desc: "Download scored predictions as CSV or print professional executive PDF reports.",
      icon: Download,
      tab: 'batch'
    },
    {
      title: "Responsive SaaS Layout",
      desc: "Stripe & Vercel-inspired Glassmorphism UI with light and dark mode toggles.",
      icon: Smartphone,
      tab: 'hero'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h3 className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Enterprise Capabilities</h3>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Built for Modern Data Teams & Marketers</h2>
          <p className="text-slate-600 dark:text-slate-400 text-base font-medium">
            Everything you need to predict, understand, and prevent customer churn across your platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                onClick={() => setActiveTab(item.tab)}
                className="glass-card p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md bg-white dark:bg-slate-900"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-600/15 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-medium">{item.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore Feature</span>
                  <span className="ml-1">→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
