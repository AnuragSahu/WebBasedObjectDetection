# controller.py (handles request logic)
from flask import request, jsonify
from model import ObjectDetectionModel
from PIL import Image

class ObjectDetectionController:
    def __init__(self):
        self.model = ObjectDetectionModel()

    def detect_objects(self):
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400

        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        image = Image.open(file.stream).convert('RGB')
        detections, processed_image = self.model.detect_objects(image)
        image_path = self.model.save_image(processed_image)

        return jsonify({
            'message': 'Image processed and saved successfully.',
            'detections': detections,
            'image_path': image_path
        })
