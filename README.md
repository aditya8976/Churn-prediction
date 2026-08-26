# 🛡️ ChurnGuard AI — Enterprise Customer Churn Prediction & Retention SaaS

🚀 **Preview**: [https://churn-prediction-eta.vercel.app/](https://churn-prediction-eta.vercel.app/)

[![Preview](https://img.shields.io/badge/Preview-Live%20Demo-000000?logo=vercel)](https://churn-prediction-eta.vercel.app/)
[![Python](https://img.shields.io/badge/Python-3.11%2B-blue?logo=python)](https://python.org)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.8.0-orange?logo=scikit-learn)](https://scikit-learn.org)
[![React](https://img.shields.io/badge/React-18.2-cyan?logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-blue?logo=tailwindcss)](https://tailwindcss.com)

**ChurnGuard AI** is a production-ready, commercial-grade AI SaaS web application that converts customer behavioral signals into real-time churn probability metrics, plain-English business explanations, and targeted retention intervention strategies.

Engineered directly from an exploratory **Jupyter Notebook (`Netflix_churn_predictor.ipynb`)**, this repository contains full model extraction, serialized pickle artifacts, a Vercel Serverless Python backend, and a modern Vite + React Glassmorphism interface.

---

## 🌟 Key Features

- **⚡ AI Churn Prediction Engine**: Real-time classification & probability calculation using a trained Scikit-Learn `Pipeline` (`ColumnTransformer` + `SelectKBest` + `RandomForest`).
- **📊 96.2% Benchmark Accuracy**: Validated metrics including 96.4% Precision, 99.4% Recall, 0.979 F1 Score, and 0.979 ROC-AUC.
- **💡 Explainable AI (XAI)**: Generates human-readable, business-friendly explanations pinpointing exact risk drivers (e.g. login drop, watch velocity, fee structure).
- **🎯 Tailored Retention Action Engine**: Automatically recommends personalized intervention strategies (20% discount vouchers, curated content digests, VIP check-in alerts).
- **📁 Batch CSV Scoring**: Drag-and-drop CSV file uploader to score thousands of customer accounts simultaneously, with filterable tables and one-click CSV export / PDF printing.
- **📈 Analytics Dashboard**: Visual charts (Donut breakdown, Risk Tier distribution, Probability Density, Content Genre churn rates).
- **🎨 Stripe & Vercel-Inspired UI**: Dark & Light mode theme switcher, glassmorphism card aesthetics, responsive navigation drawer, floating quick-action buttons.
- **🚀 One-Click Vercel Deployment**: Zero-config deployment setup via `vercel.json` routing both Vite frontend assets and Python Serverless API functions (`/api/predict`).

---

## 📐 System Architecture

```
                               ┌────────────────────────────────┐
                               │   Customer Behavioral Inputs   │
                               └───────────────┬────────────────┘
                                               │
                                               ▼
                               ┌────────────────────────────────┐
                               │   Vite + React 18 Frontend     │
                               │   (Glassmorphism / Tailwind)   │
                               └───────────────┬────────────────┘
                                               │
                                               ▼  POST /api/predict
                               ┌────────────────────────────────┐
                               │  Vercel Python Serverless API  │
                               │  (api/predict.py / app.py)     │
                               └───────────────┬────────────────┘
                                               │
                                               ▼
                               ┌────────────────────────────────┐
                               │     Scikit-Learn Pipeline      │
                               │ ┌────────────────────────────┐ │
                               │ │ ColumnTransformer (Encoder)│ │
                               │ ├────────────────────────────┤ │
                               │ │ SelectKBest (Chi2)         │ │
                               │ ├────────────────────────────┤ │
                               │ │ RandomForest Classifier    │ │
                               │ └────────────────────────────┘ │
                               └───────────────┬────────────────┘
                                               │
                                               ▼
               ┌───────────────────────────────┴───────────────────────────────┐
               │                                                               │
               ▼                                                               ▼
┌───────────────────────────────┐                               ┌───────────────────────────────┐
│     Probability & Risk        │                               │   AI Explanation & Strategy   │
│  (Gauge / Risk Category)      │                               │   (Plain English / Vouchers)  │
└───────────────────────────────┘                               └───────────────────────────────┘
```

---

## 📂 Repository Structure

```
customer-churn-prediction/
├── api/
│   └── predict.py                 # Vercel Python Serverless Function endpoint
│
├── backend/
│   ├── app.py                     # Flask server for local backend dev (port 5001)
│   ├── predict.py                 # Inference wrapper script
│   ├── requirements.txt           # Python backend dependencies
│   ├── train_and_export.py        # Model serialization script (exports .pkl files)
│   ├── utils.py                   # Model loading, XAI explanation & retention engine
│   └── model/
│       ├── model.pkl              # Trained classifier artifact
│       ├── scaler.pkl             # MinMaxScaler artifact
│       ├── encoder.pkl            # OneHotEncoder artifact
│       ├── pipeline.pkl           # Scikit-learn full pipeline
│       └── feature_columns.json   # Metadata, ranges, and confusion matrix stats
│
├── public/
│   └── favicon.svg                # Application branding icon
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx             # Sticky header with theme toggle & drawer
│   │   ├── Footer.jsx             # Enterprise footer with quick links
│   │   ├── HeroSection.jsx        # Landing hero with animated flow diagram
│   │   ├── ProblemSolution.jsx    # Business impact cards & stats
│   │   ├── FeaturesGrid.jsx       # Grid of 9 SaaS capabilities
│   │   ├── SinglePredictionForm.jsx # Input form with sample loaders & tooltips
│   │   ├── PredictionResultCard.jsx # Circular gauge, risk badge & recommendations
│   │   ├── BatchPrediction.jsx    # CSV uploader, data table, CSV download & print
│   │   ├── AnalyticsDashboard.jsx # Recharts (Donut, Bar, Area, Genre)
│   │   ├── ModelInfoPage.jsx      # Metrics table, confusion matrix & pipeline specs
│   │   ├── ExplainableAIPage.jsx  # Feature importance ranking & XAI breakdown
│   │   └── AuxiliaryPages.jsx     # FAQ, About, Privacy, Terms, Contact, 404
│   ├── App.jsx                    # Core application router & state management
│   ├── main.jsx                   # React DOM entrypoint
│   └── index.css                  # Tailwind styles & glassmorphism utilities
│
├── index.html                     # HTML root template
├── package.json                   # Node.js dependencies (Vite, React, Recharts, Tailwind)
├── tailwind.config.js             # Custom colors & keyframe animations
├── vite.config.js                 # Vite config with API proxy
├── vercel.json                    # Vercel deployment configuration
├── requirements.txt               # Root Python requirements for Vercel
└── README.md                      # Documentation
```

---

## 💻 Local Development Setup

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **Python**: 3.10 or higher
- **npm** or **yarn**

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/customer-churn-prediction.git
cd customer-churn-prediction
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Python Backend Dependencies

```bash
pip install -r backend/requirements.txt
```

### 4. Verify / Re-export ML Model Artifacts

```bash
python3 backend/train_and_export.py
```

### 5. Launch the Application

**Option A: Run Frontend with Vite Dev Server**
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

**Option B: Run Local Flask Server**
```bash
python3 backend/app.py
```
Backend API will start at `http://localhost:5001`.

---

## 🚀 One-Click Vercel Deployment

This project is configured to deploy natively on **Vercel** with zero extra build settings.

1. Push your code to a **GitHub** repository.
2. Log in to [Vercel](https://vercel.com).
3. Click **"New Project"** and select your GitHub repository.
4. Keep all build settings as default (Vercel automatically detects `vercel.json` and builds Vite + Python Serverless functions).
5. Click **"Deploy"**.

Your live URL will be active in under 2 minutes!

---

## 📖 API Documentation

### `POST /api/predict`
Calculates churn probability for a single customer profile.

**Request Body (JSON):**
```json
{
  "age": 45,
  "gender": "Male",
  "subscription_type": "Basic",
  "watch_hours": 3.5,
  "last_login_days": 42,
  "region": "North America",
  "monthly_fee": 8.99,
  "number_of_profiles": 1,
  "avg_watch_time_per_day": 0.15,
  "favorite_genre": "Action"
}
```

**Response (JSON):**
```json
{
  "prediction": 1,
  "churn_label": "Will Churn",
  "churn_probability": 99.97,
  "retain_probability": 0.03,
  "confidence_score": 100.0,
  "risk_level": "HIGH",
  "risk_color": "#EF4444",
  "explanation": "The customer is predicted to churn primarily due to prolonged inactivity (42 days since last login), very low daily watch engagement (~0.1 hrs/day)...",
  "recommendations": [
    {
      "title": "Tailored 20% Retention Discount",
      "description": "Offer a 20% discount on the next 3 billing cycles...",
      "tag": "Financial Incentive",
      "icon": "Tag"
    }
  ]
}
```

### `GET /api/model-info`
Returns model accuracy metrics, confusion matrix, and feature metadata.

---

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for details.
