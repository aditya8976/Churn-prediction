import React from 'react';
import { ShieldAlert, Github, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">ChurnGuard AI</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Enterprise customer churn prediction engine powered by scikit-learn Machine Learning pipelines. Identify at-risk users before they leave.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-400 transition-all shadow-sm">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-400 transition-all shadow-sm">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-400 transition-all shadow-sm">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-extrabold text-sm mb-4 tracking-wider uppercase">Product Features</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><button onClick={() => setActiveTab('predict')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Single Customer Scoring</button></li>
              <li><button onClick={() => setActiveTab('batch')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Batch CSV Bulk Prediction</button></li>
              <li><button onClick={() => setActiveTab('analytics')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Interactive Analytics</button></li>
              <li><button onClick={() => setActiveTab('model-info')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Model Evaluation Metrics</button></li>
              <li><button onClick={() => setActiveTab('explainable-ai')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Explainable AI & SHAP</button></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-extrabold text-sm mb-4 tracking-wider uppercase">ML Architecture</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li className="flex items-center space-x-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><span>Scikit-Learn Pipeline</span></li>
              <li className="flex items-center space-x-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span><span>OneHotEncoder Categoricals</span></li>
              <li className="flex items-center space-x-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span><span>SelectKBest Chi2 Selection</span></li>
              <li className="flex items-center space-x-2"><span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span><span>RandomForest & DecisionTree</span></li>
              <li className="flex items-center space-x-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span><span>Vercel Serverless Function</span></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-extrabold text-sm mb-4 tracking-wider uppercase">Resources & Legal</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><button onClick={() => setActiveTab('about')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center justify-between w-full"><span>About Platform</span><ArrowUpRight className="w-3.5 h-3.5" /></button></li>
              <li><button onClick={() => setActiveTab('privacy')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => setActiveTab('terms')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms of Service</button></li>
              <li><button onClick={() => setActiveTab('contact')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact Engineering</button></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} ChurnGuard AI. Converted from Jupyter Notebook to Production Vercel SaaS.
          </div>
          <div className="flex items-center space-x-1">
            <span>Built with precision for enterprise customer retention</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
