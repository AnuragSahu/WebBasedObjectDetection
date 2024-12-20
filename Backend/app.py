# app.py (entry point)
from flask import Flask
from controller import ObjectDetectionController
from flask_cors import CORS

app = Flask(__name__)
controller = ObjectDetectionController()

CORS(app)

@app.route('/detect', methods=['POST'])
def detect():
    return controller.detect_objects()


@app.route('/test', methods=['GET'])
def test():
    return {"Status" : "OK"}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
