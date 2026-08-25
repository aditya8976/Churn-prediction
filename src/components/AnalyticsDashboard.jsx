import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';
import { Users, AlertTriangle, ShieldCheck, Activity, BarChart3, TrendingUp } from 'lucide-react';

export default function AnalyticsDashboard({ predictionHistory }) {
  
  // Sample aggregations or from history
  const totalCount = predictionHistory.length > 0 ? predictionHistory.length : 1248;
  const churnCount = predictionHistory.length > 0 ? predictionHistory.filter(h => h.prediction === 1).length : 382;
  const retainCount = totalCount - churnCount;
  const avgProb = predictionHistory.length > 0 
    ? Math.round(predictionHistory.reduce((acc, h) => acc + h.churn_probability, 0) / totalCount) 
    : 34.6;

  const pieData = [
    { name: 'Predicted Churn', value: churnCount, color: '#EF4444' },
    { name: 'Predicted Retain', value: retainCount, color: '#10B981' }
  ];

  const riskData = [
    { name: 'Critical (>75%)', count: 185, color: '#DC2626' },
    { name: 'High (60-75%)', count: 197, color: '#EF4444' },
    { name: 'Medium (40-60%)', count: 312, color: '#F59E0B' },
    { name: 'Low (<40%)', count: 554, color: '#10B981' }
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
        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
          <BarChart3 className="w-6 h-6 text-indigo-400" />
          <span>Real-Time Churn Analytics Dashboard</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">Aggregate predictive insights and risk distribution across platform accounts</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase">Total Predictions</span>
            <div className="text-3xl font-extrabold text-white mt-1">{totalCount.toLocaleString()}</div>
            <span className="text-[11px] text-emerald-400 font-medium">+12% from last week</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-rose-500/30 bg-rose-950/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-rose-300 font-semibold uppercase">Predicted Churn</span>
            <div className="text-3xl font-extrabold text-rose-400 mt-1">{churnCount}</div>
            <span className="text-[11px] text-rose-300 font-medium">{Math.round((churnCount/totalCount)*100)}% overall churn rate</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-emerald-300 font-semibold uppercase">Predicted Retained</span>
            <div className="text-3xl font-extrabold text-emerald-400 mt-1">{retainCount}</div>
            <span className="text-[11px] text-emerald-300 font-medium">{Math.round((retainCount/totalCount)*100)}% healthy account base</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-amber-500/30 bg-amber-950/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-amber-300 font-semibold uppercase">Avg Churn Probability</span>
            <div className="text-3xl font-extrabold text-amber-400 mt-1">{avgProb}%</div>
            <span className="text-[11px] text-amber-300 font-medium">Model baseline: 0.48 cutoff</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Activity className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Donut Churn Breakdown */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
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
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 text-xs pt-2 border-t border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              <span className="text-slate-300">Will Churn ({churnCount})</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-slate-300">Will Retain ({retainCount})</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Risk Level Distribution Bar Chart */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span>Risk Tier Categorization</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
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
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
            <span>Probability Density Distribution</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={probDistributionData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="probColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="range" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="users" stroke="#6366f1" fillOpacity={1} fill="url(#probColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Churn Rate by Favorite Genre */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-pink-500"></span>
            <span>Churn Rate % by Favorite Content Genre</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={genreRiskData} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="genre" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} unit="%" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="churnRate" fill="#ec4899" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
