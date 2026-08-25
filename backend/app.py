import io
import json
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import predict_single, predict_batch, load_artifacts

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        "status": "healthy",
        "service": "Customer Churn Prediction API",
        "version": "1.0.0"
    }), 200

@app.route('/api/model-info', methods=['GET'])
def model_info():
    try:
        _, metadata = load_artifacts()
        return jsonify(metadata), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        if not data:
            return jsonify({"error": "No input JSON data provided"}), 400
            
        result = predict_single(data)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/batch-predict', methods=['POST'])
def batch_predict():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded. Key 'file' is required."}), 400
            
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400
            
        if not file.filename.endswith('.csv'):
            return jsonify({"error": "File must be a CSV format"}), 400
            
        content = file.read().decode('utf-8')
        df = pd.read_csv(io.StringIO(content))
        
        results = predict_batch(df)
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Starting Flask API Server on port 5001...")
    app.run(host='0.0.0.0', port=5001, debug=True)
