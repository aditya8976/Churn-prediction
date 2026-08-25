import React, { useState } from 'react';
import { User, CreditCard, Clock, Sparkles, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SinglePredictionForm({ onPredict, loading, sampleData, setFormData, formData }) {
  const [errors, setErrors] = useState({});

  const sampleHighRisk = {
    age: 42,
    gender: 'Male',
    subscription_type: 'Basic',
    watch_hours: 4.2,
    last_login_days: 48,
    region: 'North America',
    monthly_fee: 8.99,
    number_of_profiles: 1,
    avg_watch_time_per_day: 0.12,
    favorite_genre: 'Action'
  };

  const sampleLoyal = {
    age: 29,
    gender: 'Female',
    subscription_type: 'Premium',
    watch_hours: 68.5,
    last_login_days: 2,
    region: 'Europe',
    monthly_fee: 17.99,
    number_of_profiles: 4,
    avg_watch_time_per_day: 2.25,
    favorite_genre: 'Sci-Fi'
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? (value === '' ? '' : parseFloat(value)) : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (formData.age === '' || formData.age < 18 || formData.age > 100) {
      newErrors.age = 'Age must be between 18 and 100';
    }
    if (formData.watch_hours === '' || formData.watch_hours < 0) {
      newErrors.watch_hours = 'Watch hours must be 0 or greater';
    }
    if (formData.last_login_days === '' || formData.last_login_days < 0 || formData.last_login_days > 180) {
      newErrors.last_login_days = 'Last login days must be between 0 and 180';
    }
    if (formData.monthly_fee === '' || formData.monthly_fee <= 0) {
      newErrors.monthly_fee = 'Monthly fee must be greater than 0';
    }
    if (formData.avg_watch_time_per_day === '' || formData.avg_watch_time_per_day < 0) {
      newErrors.avg_watch_time_per_day = 'Avg watch time must be 0 or greater';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onPredict(formData);
    }
  };

  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-lg bg-white dark:bg-slate-900 relative">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4 mb-8">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
            <span>Customer Behavioral Input Form</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Configure customer parameters matching notebook feature columns</p>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFormData(sampleHighRisk)}
            className="px-3.5 py-2 rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:border-rose-500/30 dark:text-rose-300 text-xs font-bold flex items-center space-x-1.5 transition-all shadow-sm"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Load High Risk Sample</span>
          </button>
          
          <button
            type="button"
            onClick={() => setFormData(sampleLoyal)}
            className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-300 text-xs font-bold flex items-center space-x-1.5 transition-all shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Load Loyal Sample</span>
          </button>

          <button
            type="button"
            onClick={() => setFormData({
              age: 35,
              gender: 'Male',
              subscription_type: 'Standard',
              watch_hours: 22.0,
              last_login_days: 12,
              region: 'Europe',
              monthly_fee: 13.99,
              number_of_profiles: 2,
              avg_watch_time_per_day: 0.75,
              favorite_genre: 'Drama'
            })}
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center space-x-1 transition-all"
            title="Reset to default"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECTION 1: DEMOGRAPHICS */}
        <div>
          <h4 className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center space-x-1.5">
            <User className="w-4 h-4" />
            <span>1. Customer Demographics</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Age */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center justify-between">
                <span>Age (Years)</span>
                <span className="text-[10px] text-slate-400">18 - 100</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g. 35"
                className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border ${errors.age ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium text-sm transition-colors`}
              />
              {errors.age && <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-semibold">{errors.age}</p>}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Gender Category</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium text-sm transition-colors"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Region */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Geographic Region</label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium text-sm transition-colors"
              >
                <option value="North America">North America</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="South America">South America</option>
                <option value="Africa">Africa</option>
              </select>
            </div>

          </div>
        </div>

        {/* SECTION 2: SUBSCRIPTION PLAN */}
        <div>
          <h4 className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center space-x-1.5">
            <CreditCard className="w-4 h-4" />
            <span>2. Subscription & Billing</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Subscription Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Subscription Tier</label>
              <select
                name="subscription_type"
                value={formData.subscription_type}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium text-sm transition-colors"
              >
                <option value="Basic">Basic ($8.99/mo)</option>
                <option value="Standard">Standard ($13.99/mo)</option>
                <option value="Premium">Premium ($17.99/mo)</option>
              </select>
            </div>

            {/* Monthly Fee */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Monthly Fee ($)</label>
              <input
                type="number"
                step="0.01"
                name="monthly_fee"
                value={formData.monthly_fee}
                onChange={handleChange}
                placeholder="e.g. 13.99"
                className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border ${errors.monthly_fee ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium text-sm transition-colors`}
              />
              {errors.monthly_fee && <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-semibold">{errors.monthly_fee}</p>}
            </div>

            {/* Profiles */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Active Profiles (1 - 5)</label>
              <select
                name="number_of_profiles"
                value={formData.number_of_profiles}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium text-sm transition-colors"
              >
                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Profile{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>

          </div>
        </div>

        {/* SECTION 3: ENGAGEMENT METRICS */}
        <div>
          <h4 className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center space-x-1.5">
            <Clock className="w-4 h-4" />
            <span>3. Usage & Engagement Velocity</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Last Login Days */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center justify-between">
                <span>Days Since Last Login</span>
                <span className="text-[10px] text-slate-400">1 - 60 days</span>
              </label>
              <input
                type="number"
                name="last_login_days"
                value={formData.last_login_days}
                onChange={handleChange}
                placeholder="e.g. 14"
                className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border ${errors.last_login_days ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium text-sm transition-colors`}
              />
              {errors.last_login_days && <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-semibold">{errors.last_login_days}</p>}
            </div>

            {/* Total Watch Hours */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Total Monthly Watch Hrs</label>
              <input
                type="number"
                step="0.1"
                name="watch_hours"
                value={formData.watch_hours}
                onChange={handleChange}
                placeholder="e.g. 24.5"
                className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border ${errors.watch_hours ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium text-sm transition-colors`}
              />
              {errors.watch_hours && <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-semibold">{errors.watch_hours}</p>}
            </div>

            {/* Avg Watch Time Per Day */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Avg Watch Hrs / Day</label>
              <input
                type="number"
                step="0.01"
                name="avg_watch_time_per_day"
                value={formData.avg_watch_time_per_day}
                onChange={handleChange}
                placeholder="e.g. 0.85"
                className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border ${errors.avg_watch_time_per_day ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium text-sm transition-colors`}
              />
              {errors.avg_watch_time_per_day && <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-semibold">{errors.avg_watch_time_per_day}</p>}
            </div>

            {/* Favorite Genre */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Favorite Genre</label>
              <select
                name="favorite_genre"
                value={formData.favorite_genre}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium text-sm transition-colors"
              >
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Horror">Horror</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Documentary">Documentary</option>
                <option value="Romance">Romance</option>
              </select>
            </div>

          </div>
        </div>

        {/* Submit button */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running Pipeline Inference...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Predict Churn Risk</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
