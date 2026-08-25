import os
import json
import pickle
import numpy as np
import pandas as pd

FEATURE_COLUMNS = [
    'age', 'gender', 'subscription_type', 'watch_hours', 
    'last_login_days', 'region', 'monthly_fee', 
    'number_of_profiles', 'avg_watch_time_per_day', 'favorite_genre'
]

def get_model_path():
    possible_paths = [
        os.path.join(os.path.dirname(__file__), 'model', 'pipeline.pkl'),
        os.path.join(os.path.dirname(__file__), '..', 'api', 'model', 'pipeline.pkl'),
        os.path.join(os.getcwd(), 'api', 'model', 'pipeline.pkl'),
        os.path.join(os.getcwd(), 'backend', 'model', 'pipeline.pkl'),
    ]
    for p in possible_paths:
        if os.path.exists(p):
            return p
    return None

def get_metadata_path():
    possible_paths = [
        os.path.join(os.path.dirname(__file__), 'model', 'feature_columns.json'),
        os.path.join(os.path.dirname(__file__), '..', 'api', 'model', 'feature_columns.json'),
        os.path.join(os.getcwd(), 'api', 'model', 'feature_columns.json'),
        os.path.join(os.getcwd(), 'backend', 'model', 'feature_columns.json'),
    ]
    for p in possible_paths:
        if os.path.exists(p):
            return p
    return None

_pipeline_cache = None
_metadata_cache = None

def load_artifacts():
    global _pipeline_cache, _metadata_cache
    if _pipeline_cache is not None and _metadata_cache is not None:
        return _pipeline_cache, _metadata_cache
        
    model_path = get_model_path()
    metadata_path = get_metadata_path()
    
    if not model_path or not os.path.exists(model_path):
        raise FileNotFoundError(f"Pipeline model file not found in search paths.")
        
    with open(model_path, 'rb') as f:
        _pipeline_cache = pickle.load(f)
        
    if metadata_path and os.path.exists(metadata_path):
        with open(metadata_path, 'r') as f:
            _metadata_cache = json.load(f)
    else:
        _metadata_cache = {}
        
    return _pipeline_cache, _metadata_cache

def generate_explanation(data, proba, risk_level):
    reasons = []
    
    last_login = float(data.get('last_login_days', 15))
    if last_login > 30:
        reasons.append(f"prolonged inactivity ({int(last_login)} days since last login)")
    elif last_login > 14:
        reasons.append(f"recent drop in login frequency ({int(last_login)} days idle)")
        
    watch_hours = float(data.get('watch_hours', 20))
    avg_daily = float(data.get('avg_watch_time_per_day', 1.0))
    if avg_daily < 0.3 or watch_hours < 5.0:
        reasons.append(f"very low daily watch engagement (~{avg_daily:.1f} hrs/day)")
        
    sub_type = str(data.get('subscription_type', 'Basic'))
    fee = float(data.get('monthly_fee', 9.99))
    if sub_type == 'Basic' and fee >= 8.99:
        reasons.append(f"low tier subscription with standard pricing (${fee:.2f}/mo)")
        
    profiles = int(data.get('number_of_profiles', 1))
    if profiles == 1:
        reasons.append("single user profile (lower household lock-in)")
        
    genre = str(data.get('favorite_genre', 'Drama'))

    if risk_level in ['HIGH', 'CRITICAL']:
        if reasons:
            explanation = (
                f"The customer is predicted to churn primarily due to {', '.join(reasons[:3])}. "
                f"These behavioral patterns closely align with historical user churn signals in the {genre} preference segment."
            )
        else:
            explanation = (
                "The customer exhibits subtle multi-factor risk indicators across activity velocity and pricing tier alignment, "
                "indicating a high probability of service cancellation in the upcoming billing cycle."
            )
    elif risk_level == 'MEDIUM':
        explanation = (
            f"The customer demonstrates moderate churn probability. While overall engagement is fair, factors like {reasons[0] if reasons else 'infrequent logins'} "
            "suggest an early risk window. Proactive retention intervention can prevent churn."
        )
    else:
        explanation = (
            f"The customer exhibits strong loyalty indicators with steady watch time ({watch_hours:.1f} total hours) "
            f"and active daily usage. Churn probability is low, making them a prime candidate for premium feature upsells."
        )
        
    return explanation

def generate_recommendations(risk_level, data):
    genre = data.get('favorite_genre', 'Drama')
    sub_type = data.get('subscription_type', 'Basic')
    
    if risk_level in ['HIGH', 'CRITICAL']:
        return [
            {
                "title": "Tailored 20% Retention Discount",
                "description": f"Offer a 20% discount on the next 3 billing cycles to increase immediate price-to-value satisfaction.",
                "tag": "Financial Incentive",
                "icon": "Tag"
            },
            {
                "title": f"Curated {genre} Content Digest",
                "description": f"Send an automated email showcase featuring upcoming top-rated releases in {genre}.",
                "tag": "Engagement Boost",
                "icon": "Film"
            },
            {
                "title": "Proactive VIP Support Check-in",
                "description": "Trigger a friendly customer feedback survey or dedicated support outreach within 48 hours.",
                "tag": "Customer Care",
                "icon": "HeartHandshake"
            },
            {
                "title": "Plan Value Upgrade Trial",
                "description": f"Provide a free 1-month upgrade from {sub_type} to enable multi-device streaming for household members.",
                "tag": "Feature Discovery",
                "icon": "Sparkles"
            }
        ]
    elif risk_level == 'MEDIUM':
        return [
            {
                "title": "Personalized Watch Recommendations",
                "description": "Push personalized top 5 trending titles direct to user home screen upon login.",
                "tag": "Product Experience",
                "icon": "PlayCircle"
            },
            {
                "title": "Extra Profile Sharing Promotion",
                "description": "Invite user to add family members with 1 extra profile slot included.",
                "tag": "Lock-in Strategy",
                "icon": "Users"
            },
            {
                "title": "Interactive Feedback Poll",
                "description": "Inquire about user satisfaction and streaming performance to identify potential friction.",
                "tag": "Feedback",
                "icon": "MessageSquare"
            }
        ]
    else:
        return [
            {
                "title": "Annual Plan Discount Upgrade",
                "description": "Offer 2 months free with an upgrade to annual billing for long-term retention lock-in.",
                "tag": "Upsell",
                "icon": "TrendingUp"
            },
            {
                "title": "Referral Rewards Program",
                "description": "Give 1 month free for every friend referred who signs up.",
                "tag": "Growth",
                "icon": "Share2"
            },
            {
                "title": "Early Access & Beta Features",
                "description": "Grant early access to new streaming UI updates and interactive content releases.",
                "tag": "VIP Loyalty",
                "icon": "Award"
            }
        ]

def predict_single(data):
    pipe, metadata = load_artifacts()
    
    # Prepare row
    row = {}
    for col in FEATURE_COLUMNS:
        if col in data:
            row[col] = data[col]
        else:
            # default fallback
            row[col] = metadata.get('numerical_ranges', {}).get(col, {}).get('default', 0) if col in metadata.get('numerical_features', []) else 'Basic'
            
    df_row = pd.DataFrame([row])[FEATURE_COLUMNS]
    
    # Predict
    pred_class = int(pipe.predict(df_row)[0])
    probabilities = pipe.predict_proba(df_row)[0]
    churn_prob = float(probabilities[1]) # probability of class 1 (churn)
    
    prob_percent = round(churn_prob * 100, 2)
    
    if churn_prob >= 0.70:
        risk_level = "HIGH"
        risk_color = "#EF4444"
    elif churn_prob >= 0.40:
        risk_level = "MEDIUM"
        risk_color = "#F59E0B"
    else:
        risk_level = "LOW"
        risk_color = "#10B981"
        
    confidence_score = round(max(probabilities) * 100, 1)
    explanation = generate_explanation(row, churn_prob, risk_level)
    recommendations = generate_recommendations(risk_level, row)
    
    # Feature importance approximation for transparency
    feature_impacts = [
        {"feature": "Last Login Days", "impact": f"+{min(85, int(row['last_login_days'] * 1.3))}% risk", "type": "negative" if row['last_login_days'] > 20 else "positive"},
        {"feature": "Avg Daily Watch Time", "impact": f"{row['avg_watch_time_per_day']} hrs/day", "type": "positive" if row['avg_watch_time_per_day'] > 1.0 else "negative"},
        {"feature": "Monthly Fee", "impact": f"${row['monthly_fee']}/mo", "type": "neutral"},
        {"feature": "Profiles", "impact": f"{row['number_of_profiles']} profile(s)", "type": "positive" if row['number_of_profiles'] > 1 else "negative"},
        {"feature": "Subscription", "impact": str(row['subscription_type']), "type": "neutral"}
    ]
    
    return {
        "prediction": pred_class,
        "churn_label": "Will Churn" if pred_class == 1 else "Will Retain",
        "churn_probability": prob_percent,
        "retain_probability": round((1.0 - churn_prob) * 100, 2),
        "confidence_score": confidence_score,
        "risk_level": risk_level,
        "risk_color": risk_color,
        "explanation": explanation,
        "recommendations": recommendations,
        "feature_impacts": feature_impacts,
        "input_summary": row
    }

def predict_batch(df_input):
    pipe, _ = load_artifacts()
    
    # Validate missing columns
    for col in FEATURE_COLUMNS:
        if col not in df_input.columns:
            raise ValueError(f"Missing required feature column: {col}")
            
    df_features = df_input[FEATURE_COLUMNS].copy()
    
    preds = pipe.predict(df_features)
    probas = pipe.predict_proba(df_features)[:, 1]
    
    results = []
    for idx, row in df_input.iterrows():
        prob = float(probas[idx])
        pred = int(preds[idx])
        prob_pct = round(prob * 100, 1)
        
        if prob >= 0.70:
            risk = "HIGH"
        elif prob >= 0.40:
            risk = "MEDIUM"
        else:
            risk = "LOW"
            
        res_item = dict(row)
        res_item["churn_prediction"] = "Will Churn" if pred == 1 else "Will Retain"
        res_item["churn_probability_%"] = prob_pct
        res_item["risk_level"] = risk
        res_item["suggested_action"] = "Send 20% Discount Offer" if risk == "HIGH" else ("Send Engagement Email" if risk == "MEDIUM" else "Upsell Premium Plan")
        results.append(res_item)
        
    total = len(results)
    churn_count = sum(1 for r in results if r["churn_prediction"] == "Will Churn")
    high_risk_count = sum(1 for r in results if r["risk_level"] == "HIGH")
    avg_prob = round(sum(r["churn_probability_%"] for r in results) / max(1, total), 2)
    
    return {
        "summary": {
            "total_customers": total,
            "predicted_churn_count": churn_count,
            "predicted_retain_count": total - churn_count,
            "churn_rate_percent": round((churn_count / max(1, total)) * 100, 1),
            "high_risk_count": high_risk_count,
            "average_churn_probability": avg_prob
        },
        "predictions": results
    }
