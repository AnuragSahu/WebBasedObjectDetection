# model.py (contains YOLO logic)
from ultralytics import YOLO
from PIL import Image, ImageDraw
import os
import datetime

MODEL_PATH = "./yolov8n.pt"
OUTPUT_DIR = "./output_images"

if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

class ObjectDetectionModel:
    def __init__(self):
        self.model = YOLO(MODEL_PATH)

    def detect_objects(self, image: Image, conf_threshold=0.25):
        results = self.model.predict(source=image, save=False, conf=conf_threshold)
        detections = []
        draw = ImageDraw.Draw(image)
        for result in results[0].boxes.data.tolist():
            x1, y1, x2, y2, confidence, class_id = result
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

            detections.append({
                'x1': x1, 'y1': y1, 'x2': x2, 'y2': y2,
                'confidence': float(confidence),
                'class_id': int(class_id),
                'class_name': self.model.names[int(class_id)]
            })
            draw.rectangle([x1, y1, x2, y2], outline="red", width=3)
            draw.text((x1, y1 - 10), f"{self.model.names[int(class_id)]} {confidence:.2f}", fill="red")

        return detections, image

    def save_image(self, image: Image):
        timestamp = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
        output_filename = f"detected_{timestamp}.jpg"
        output_path = os.path.join(OUTPUT_DIR, output_filename)
        image.save(output_path)
        return output_path
