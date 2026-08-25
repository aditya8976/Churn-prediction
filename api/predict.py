import os
import sys
import json
import io
from http.server import BaseHTTPRequestHandler
import pandas as pd

# Add current directory and backend directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'backend'))

try:
    from utils import predict_single, predict_batch, load_artifacts
except ImportError:
    from backend.utils import predict_single, predict_batch, load_artifacts

class handler(BaseHTTPRequestHandler):

    def _set_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    def do_OPTIONS(self):
        self.send_response(200)
        self._set_cors_headers()
        self.end_headers()

    def do_GET(self):
        self.send_response(200)
        self._set_cors_headers()
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        
        path = self.path
        if 'model-info' in path:
            try:
                _, metadata = load_artifacts()
                self.wfile.write(json.dumps(metadata).encode('utf-8'))
            except Exception as e:
                self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
        else:
            self.wfile.write(json.dumps({
                "status": "healthy",
                "service": "Vercel Customer Churn Serverless API",
                "endpoints": ["/api/predict", "/api/batch-predict", "/api/model-info"]
            }).encode('utf-8'))

    def do_POST(self):
        self._set_cors_headers()
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length)
        
        path = self.path
        
        try:
            if 'batch-predict' in path:
                # Handle CSV body or json payload
                content_type = self.headers.get('Content-Type', '')
                if 'text/csv' in content_type or body.startswith(b'customer_id') or b'age,' in body:
                    csv_str = body.decode('utf-8')
                    df = pd.read_csv(io.StringIO(csv_str))
                else:
                    data = json.loads(body.decode('utf-8'))
                    if isinstance(data, list):
                        df = pd.DataFrame(data)
                    elif 'data' in data:
                        df = pd.DataFrame(data['data'])
                    else:
                        raise ValueError("Batch request must be a CSV file or JSON array of customer objects")
                        
                results = predict_batch(df)
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(results).encode('utf-8'))
            else:
                data = json.loads(body.decode('utf-8'))
                result = predict_single(data)
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(result).encode('utf-8'))
                
        except Exception as e:
            self.send_response(400)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
