import os
import json
import pickle
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, MinMaxScaler
from sklearn.pipeline import make_pipeline
from sklearn.feature_selection import SelectKBest, chi2
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix

def generate_netflix_churn_data(n_samples=5000, random_state=42):
    np.random.seed(random_state)
    
    genders = ['Male', 'Female', 'Other']
    sub_types = ['Basic', 'Standard', 'Premium']
    regions = ['North America', 'Europe', 'Asia', 'South America', 'Africa']
    genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Documentary', 'Romance']
    
    gender_choice = np.random.choice(genders, size=n_samples, p=[0.48, 0.48, 0.04])
    sub_choice = np.random.choice(sub_types, size=n_samples, p=[0.35, 0.45, 0.20])
    region_choice = np.random.choice(regions, size=n_samples, p=[0.30, 0.30, 0.20, 0.12, 0.08])
    genre_choice = np.random.choice(genres, size=n_samples, p=[0.22, 0.20, 0.20, 0.12, 0.12, 0.08, 0.06])
    
    age = np.random.randint(18, 71, size=n_samples)
    last_login_days = np.random.randint(1, 61, size=n_samples)
    number_of_profiles = np.random.randint(1, 6, size=n_samples)
    
    monthly_fee = np.where(sub_choice == 'Basic', 8.99, np.where(sub_choice == 'Standard', 13.99, 17.99))
    
    avg_watch_time_per_day = np.round(np.random.exponential(scale=1.2, size=n_samples), 2)
    avg_watch_time_per_day = np.clip(avg_watch_time_per_day, 0.01, 8.0)
    
    watch_hours = np.round(avg_watch_time_per_day * 30 * np.random.uniform(0.7, 1.3, size=n_samples), 2)
    
    # Calculate churn probability logic based on realistic signals
    # High last_login_days, low watch hours, high fee relative to profiles, basic sub -> higher churn risk
    score = (
        (last_login_days / 60.0) * 2.5 +
        (1.0 / (avg_watch_time_per_day + 0.1)) * 1.8 +
        (monthly_fee / 17.99) * 0.8 -
        (number_of_profiles * 0.4) -
        (watch_hours / 100.0) * 1.5 +
        np.where(sub_choice == 'Basic', 0.6, 0.0) +
        np.random.normal(0, 0.5, size=n_samples)
    )
    
    prob = 1 / (1 + np.exp(-score))
    churned = (prob > 0.48).astype(int)
    
    df = pd.DataFrame({
        'customer_id': [f"c-{10000+i}" for i in range(n_samples)],
        'age': age,
        'gender': gender_choice,
        'subscription_type': sub_choice,
        'watch_hours': watch_hours,
        'last_login_days': last_login_days,
        'region': region_choice,
        'monthly_fee': monthly_fee,
        'churned': churned,
        'number_of_profiles': number_of_profiles,
        'avg_watch_time_per_day': avg_watch_time_per_day,
        'favorite_genre': genre_choice
    })
    
    return df

def train_and_export():
    print("Generating Netflix customer churn dataset...")
    df = generate_netflix_churn_data(5000)
    
    # Matching exact features from notebook:
    # X_train features: age, gender, subscription_type, watch_hours, last_login_days, region, monthly_fee, number_of_profiles, avg_watch_time_per_day, favorite_genre
    X = df[['age', 'gender', 'subscription_type', 'watch_hours', 'last_login_days', 'region', 'monthly_fee', 'number_of_profiles', 'avg_watch_time_per_day', 'favorite_genre']]
    y = df['churned']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    print(f"X_train shape: {X_train.shape}, X_test shape: {X_test.shape}")
    
    # Categorical indices in X: gender (1), subscription_type (2), region (5), favorite_genre (9)
    categorical_indices = [1, 2, 5, 9]
    categorical_cols = ['gender', 'subscription_type', 'region', 'favorite_genre']
    numerical_cols = ['age', 'watch_hours', 'last_login_days', 'monthly_fee', 'number_of_profiles', 'avg_watch_time_per_day']
    
    # Fit encoder & scaler separately for export as requested
    encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
    encoder.fit(X_train[categorical_cols])
    
    scaler = MinMaxScaler()
    scaler.fit(X_train[numerical_cols])
    
    # Construct exact ColumnTransformer pipeline from notebook
    transformation1 = ColumnTransformer([
        ('trf1', OneHotEncoder(sparse_output=False, handle_unknown='ignore'), categorical_indices)
    ], remainder='passthrough')
    
    transformation2 = SelectKBest(score_func=chi2, k='all')
    
    # RandomForest for higher accuracy and smooth predict_proba
    classifier = RandomForestClassifier(n_estimators=120, max_depth=12, random_state=42)
    
    pipe = make_pipeline(transformation1, transformation2, classifier)
    print("Fitting scikit-learn pipeline...")
    pipe.fit(X_train, y_train)
    
    # Evaluate
    y_pred = pipe.predict(X_test)
    y_proba = pipe.predict_proba(X_test)[:, 1]
    
    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred)
    rec = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    roc_auc = roc_auc_score(y_test, y_proba)
    cm = confusion_matrix(y_test, y_pred).tolist()
    
    print(f"Model Metrics:")
    print(f"  Accuracy:  {acc:.4f}")
    print(f"  Precision: {prec:.4f}")
    print(f"  Recall:    {rec:.4f}")
    print(f"  F1 Score:  {f1:.4f}")
    print(f"  ROC-AUC:   {roc_auc:.4f}")
    print(f"  Confusion Matrix: {cm}")
    
    # Create export directories
    dirs = ['backend/model', 'api/model']
    for d in dirs:
        os.makedirs(d, exist_ok=True)
        
        # Save artifacts
        with open(os.path.join(d, 'model.pkl'), 'wb') as f:
            pickle.dump(classifier, f)
            
        with open(os.path.join(d, 'scaler.pkl'), 'wb') as f:
            pickle.dump(scaler, f)
            
        with open(os.path.join(d, 'encoder.pkl'), 'wb') as f:
            pickle.dump(encoder, f)
            
        with open(os.path.join(d, 'pipeline.pkl'), 'wb') as f:
            pickle.dump(pipe, f)
            
        feature_metadata = {
            "features": list(X.columns),
            "categorical_features": categorical_cols,
            "numerical_features": numerical_cols,
            "categorical_options": {
                "gender": ["Male", "Female", "Other"],
                "subscription_type": ["Basic", "Standard", "Premium"],
                "region": ["North America", "Europe", "Asia", "South America", "Africa"],
                "favorite_genre": ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Documentary", "Romance"]
            },
            "numerical_ranges": {
                "age": {"min": 18, "max": 70, "default": 35},
                "watch_hours": {"min": 0.0, "max": 120.0, "default": 15.5},
                "last_login_days": {"min": 1, "max": 60, "default": 12},
                "monthly_fee": {"min": 8.99, "max": 17.99, "default": 13.99},
                "number_of_profiles": {"min": 1, "max": 5, "default": 2},
                "avg_watch_time_per_day": {"min": 0.01, "max": 8.0, "default": 0.85}
            },
            "metrics": {
                "accuracy": round(acc, 4),
                "precision": round(prec, 4),
                "recall": round(rec, 4),
                "f1_score": round(f1, 4),
                "roc_auc": round(roc_auc, 4),
                "confusion_matrix": cm,
                "dataset_size": len(df),
                "test_size": len(y_test)
            }
        }
        
        with open(os.path.join(d, 'feature_columns.json'), 'w') as f:
            json.dump(feature_metadata, f, indent=2)
            
    print("All model artifacts exported successfully to backend/model/ and api/model/!")

if __name__ == '__main__':
    train_and_export()
