import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';
import { Users, AlertTriangle, ShieldCheck, Activity, BarChart3 } from 'lucide-react';

export default function AnalyticsDashboard({ predictionHistory }) {
  
  // Sample aggregations or from history
  const totalCount = predictionHistory.length > 0 ? predictionHistory.length : 1248;
  const churnCount = predictionHistory.length > 0 ? predictionHistory.filter(h => h.prediction === 1).length : 382;
  const retainCount = totalCount - churnCount;
  const avgProb = predictionHistory.length > 0 
    ? Math.round(predictionHistory.reduce((acc, h) => acc + h.churn_probability, 0) / totalCount) 
    : 34.6;

  const pieData = [
    { name: 'Predicted Churn', value: churnCount, color: '#DC2626' },
    { name: 'Predicted Retain', value: retainCount, color: '#059669' }
  ];

  const riskData = [
    { name: 'Critical (>75%)', count: 185, color: '#B91C1C' },
    { name: 'High (60-75%)', count: 197, color: '#DC2626' },
    { name: 'Medium (40-60%)', count: 312, color: '#D97706' },
    { name: 'Low (<40%)', count: 554, color: '#059669' }
  ];

  const probDistributionData = [
    { range: '0-10%', users: 240 },
    { range: '10-20%', users: 180 },
    { range: '20-30%', users: 134 },
    { range: '30-40%', users: 95 },
    { range: '40-50%', users: 110 },
    { range: '50-60%', users: 142 },
    { range: '60-70%', users: 115 },
    { range: '70-80%', users: 122 },
    { range: '80-90%', users: 80 },
    { range: '90-100%', users: 30 }
  ];

  const genreRiskData = [
    { genre: 'Action', churnRate: 38 },
    { genre: 'Comedy', churnRate: 29 },
    { genre: 'Drama', churnRate: 24 },
    { genre: 'Horror', churnRate: 42 },
    { genre: 'Sci-Fi', churnRate: 21 },
    { genre: 'Documentary', churnRate: 18 },
    { genre: 'Romance', churnRate: 35 }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <BarChart3 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <span>Real-Time Churn Analytics Dashboard</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Aggregate predictive insights and risk distribution across platform accounts</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm bg-white dark:bg-slate-900">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-extrabold uppercase">Total Predictions</span>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{totalCount.toLocaleString()}</div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">+12% from last week</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-600/20 dark:text-indigo-400 flex items-center justify-center border border-indigo-200 dark:border-indigo-500/30">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-950/10 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-rose-700 dark:text-rose-300 font-extrabold uppercase">Predicted Churn</span>
            <div className="text-3xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">{churnCount}</div>
            <span className="text-[11px] text-rose-600 dark:text-rose-300 font-bold">{Math.round((churnCount/totalCount)*100)}% overall churn rate</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 flex items-center justify-center border border-rose-200 dark:border-rose-500/30">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/10 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-emerald-700 dark:text-emerald-300 font-extrabold uppercase">Predicted Retained</span>
            <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{retainCount}</div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-300 font-bold">{Math.round((retainCount/totalCount)*100)}% healthy account base</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/10 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-amber-700 dark:text-amber-300 font-extrabold uppercase">Avg Churn Probability</span>
            <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">{avgProb}%</div>
            <span className="text-[11px] text-amber-600 dark:text-amber-300 font-bold">Model baseline: 0.48 cutoff</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 flex items-center justify-center border border-amber-200 dark:border-amber-500/30">
            <Activity className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Donut Churn Breakdown */}
        <div className="glass-card p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 space-y-4 shadow-sm bg-white dark:bg-slate-900">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <span>Overall Churn vs Retention Breakdown</span>
          </h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a', fontWeight: 'bold' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 text-xs pt-2 border-t border-slate-100 dark:border-slate-800 font-semibold">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-600"></span>
              <span className="text-slate-700 dark:text-slate-300">Will Churn ({churnCount})</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
              <span className="text-slate-700 dark:text-slate-300">Will Retain ({retainCount})</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Risk Level Distribution Bar Chart */}
        <div className="glass-card p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 space-y-4 shadow-sm bg-white dark:bg-slate-900">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
            <span>Risk Tier Categorization</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} fontWeight={600} />
                <YAxis stroke="#64748b" fontSize={11} fontWeight={600} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a', fontWeight: 'bold' }} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Probability Distribution Area Chart */}
        <div className="glass-card p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 space-y-4 shadow-sm bg-white dark:bg-slate-900">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <span>Probability Density Distribution</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={probDistributionData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="probColorLight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="range" stroke="#64748b" fontSize={10} fontWeight={600} />
                <YAxis stroke="#64748b" fontSize={11} fontWeight={600} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a', fontWeight: 'bold' }} />
                <Area type="monotone" dataKey="users" stroke="#4f46e5" fillOpacity={1} fill="url(#probColorLight)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Churn Rate by Favorite Genre */}
        <div className="glass-card p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 space-y-4 shadow-sm bg-white dark:bg-slate-900">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-600"></span>
            <span>Churn Rate % by Favorite Content Genre</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={genreRiskData} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="genre" stroke="#64748b" fontSize={11} fontWeight={600} />
                <YAxis stroke="#64748b" fontSize={11} unit="%" fontWeight={600} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a', fontWeight: 'bold' }} />
                <Bar dataKey="churnRate" fill="#db2777" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
