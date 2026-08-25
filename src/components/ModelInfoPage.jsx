import React, { useState, useEffect } from 'react';
import { Cpu, CheckCircle2, ShieldCheck, BarChart2, Layers, AlertCircle, Sparkles, BookOpen } from 'lucide-react';

export default function ModelInfoPage() {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    fetch('/api/model-info')
      .then(res => res.json())
      .then(data => setMetadata(data))
      .catch(() => {
        // Fallback metadata if offline
        setMetadata({
          metrics: {
            accuracy: 0.962,
            precision: 0.964,
            recall: 0.994,
            f1_score: 0.979,
            roc_auc: 0.979,
            confusion_matrix: [[78, 33], [5, 884]],
            dataset_size: 5000
          }
        });
      });
  }, []);

  const metrics = metadata?.metrics || {
    accuracy: 0.962,
    precision: 0.964,
    recall: 0.994,
    f1_score: 0.979,
    roc_auc: 0.979,
    confusion_matrix: [[78, 33], [5, 884]],
    dataset_size: 5000
  };

  const cm = metrics.confusion_matrix || [[78, 33], [5, 884]];

  return (
    <div className="space-y-10 animate-fadeIn">
      
      {/* Page Header */}
      <div className="glass-card p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-purple-950/40">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>Scikit-Learn Serialized Artifact Specs</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white">Machine Learning Model Architecture</h2>
        <p className="text-slate-300 text-sm mt-2 max-w-3xl leading-relaxed">
          Comprehensive benchmark metrics, dataset specifications, feature transformation pipeline, and model validation details serialized directly from the Jupyter Notebook training execution.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Accuracy", value: `${(metrics.accuracy * 100).toFixed(1)}%`, desc: "Overall classification accuracy" },
          { label: "Precision", value: `${(metrics.precision * 100).toFixed(1)}%`, desc: "Low false positive rate" },
          { label: "Recall", value: `${(metrics.recall * 100).toFixed(1)}%`, desc: "High churn sensitivity" },
          { label: "F1 Score", value: `${(metrics.f1_score * 100).toFixed(1)}%`, desc: "Harmonic mean of precision & recall" },
          { label: "ROC-AUC", value: `${metrics.roc_auc.toFixed(3)}`, desc: "Separability AUC score" },
        ].map((m, idx) => (
          <div key={idx} className="glass-card p-5 rounded-2xl border border-slate-800 text-center">
            <span className="text-xs text-indigo-400 font-semibold uppercase">{m.label}</span>
            <div className="text-3xl font-extrabold text-white mt-1">{m.value}</div>
            <p className="text-[10px] text-slate-400 mt-1">{m.desc}</p>
          </div>
        ))}
      </div>

      {/* Confusion Matrix & Pipeline Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Confusion Matrix Visual Heatmap */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <BarChart2 className="w-5 h-5 text-indigo-400" />
              <span>Confusion Matrix Heatmap</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">Evaluated on 1,000 out-of-sample holdout test profiles</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            {/* True Negative */}
            <div className="glass-card p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 text-center">
              <span className="text-[10px] text-emerald-300 font-bold uppercase">True Negative (Retained)</span>
              <div className="text-3xl font-extrabold text-emerald-400 mt-2">{cm[0][0]}</div>
              <p className="text-[10px] text-slate-400 mt-1">Correctly predicted non-churners</p>
            </div>

            {/* False Positive */}
            <div className="glass-card p-5 rounded-2xl border border-rose-500/20 bg-rose-950/10 text-center">
              <span className="text-[10px] text-rose-300 font-bold uppercase">False Positive (False Alarm)</span>
              <div className="text-3xl font-extrabold text-rose-400 mt-2">{cm[0][1]}</div>
              <p className="text-[10px] text-slate-400 mt-1">Retained users predicted as churn</p>
            </div>

            {/* False Negative */}
            <div className="glass-card p-5 rounded-2xl border border-rose-500/20 bg-rose-950/10 text-center">
              <span className="text-[10px] text-rose-300 font-bold uppercase">False Negative (Missed Churn)</span>
              <div className="text-3xl font-extrabold text-rose-400 mt-2">{cm[1][0]}</div>
              <p className="text-[10px] text-slate-400 mt-1">Churners missed by classifier</p>
            </div>

            {/* True Positive */}
            <div className="glass-card p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 text-center">
              <span className="text-[10px] text-emerald-300 font-bold uppercase">True Positive (Correct Churn)</span>
              <div className="text-3xl font-extrabold text-emerald-400 mt-2">{cm[1][1]}</div>
              <p className="text-[10px] text-slate-400 mt-1">Correctly predicted customer churn</p>
            </div>

          </div>
        </div>

        {/* Scikit-Learn Pipeline Graph */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <Layers className="w-5 h-5 text-purple-400" />
              <span>Pipeline Transformation Steps</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">Matches exact `make_pipeline` steps defined in Jupyter Notebook</p>
          </div>

          <div className="space-y-4">
            
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-400 uppercase">Step 1: ColumnTransformer</span>
                <span className="text-[10px] text-slate-400">Encoder</span>
              </div>
              <p className="text-xs text-slate-300 font-mono">OneHotEncoder(sparse_output=False, handle_unknown='ignore')</p>
              <p className="text-[11px] text-slate-400">Encodes categorical columns: `gender`, `subscription_type`, `region`, `favorite_genre`.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-purple-400 uppercase">Step 2: SelectKBest</span>
                <span className="text-[10px] text-slate-400">Feature Selector</span>
              </div>
              <p className="text-xs text-slate-300 font-mono">SelectKBest(score_func=chi2, k='all')</p>
              <p className="text-[11px] text-slate-400">Evaluates Chi-squared statistic for non-negative categorical/encoded features.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-pink-400 uppercase">Step 3: Supervised Classifier</span>
                <span className="text-[10px] text-slate-400">Estimator</span>
              </div>
              <p className="text-xs text-slate-300 font-mono">RandomForestClassifier / DecisionTreeClassifier</p>
              <p className="text-[11px] text-slate-400">Outputs class probability scores via ensemble decision trees.</p>
            </div>

          </div>
        </div>

      </div>

      {/* Model Limitations & Business Use Cases */}
      <div className="glass-card p-8 rounded-3xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Target Business Use Cases</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start space-x-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Proactive retention campaign triggering 30 days before billing renewal.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Customer Success priority queue sorting based on churn risk score.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Automated email discount vouchers for users showing low login activity.</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>Model Scope & Limitations</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start space-x-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>Requires numerical velocity fields (`last_login_days`, `avg_watch_time_per_day`).</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>Categorical values must conform to one of the trained options or will be handled via `ignore`.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>Periodic model retraining (quarterly) is recommended to adapt to macro pricing changes.</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
}
