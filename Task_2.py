import cv2
import torch
import numpy as np
import os
from pathlib import Path
import time

class YOLOTrafficSignDetector:
    def __init__(self, model_type='yolov5s', confidence_threshold=0.5):
        """
        Inicjalizacja detektora znaków drogowych YOLO
        
        Args:
            model_type: Typ modelu ('yolov5s', 'yolov5m', 'yolov5l', 'yolov8n')
            confidence_threshold: Próg pewności detekcji
        """
        self.confidence_threshold = confidence_threshold
        self.model_type = model_type
        self.model = None
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        
        # Mapowanie klas na znaki drogowe
        self.target_classes = {
            'stop': ['stop sign', 'stop'],
            'yield': ['yield', 'give way', 'priority', 'ustąp pierwszeństwa']
        }
        
        # Kolory dla różnych typów znaków
        self.colors = {
            'stop': (0, 0, 255),      # Czerwony
            'yield': (0, 165, 255),   # Pomarańczowy
            'other': (0, 255, 0)      # Zielony
        }
        
        self.load_model()
    
    def load_model(self):
        """
        Ładowanie modelu YOLO
        """
        print(f"🤖 Ładowanie modelu {self.model_type}...")
        
        try:
            if 'yolov8' in self.model_type.lower():
                # YOLOv8 z ultralytics
                try:
                    from ultralytics import YOLO
                    self.model = YOLO(f'{self.model_type}.pt')
                    print(f"✅ Załadowano YOLOv8: {self.model_type}")
                except ImportError:
                    print("❌ Błąd: Zainstaluj ultralytics: pip install ultralytics")
                    self.load_yolov5_fallback()
            else:
                # YOLOv5 z torch.hub
                self.model = torch.hub.load('ultralytics/yolov5', self.model_type, pretrained=True)
                self.model.to(self.device)
                print(f"✅ Załadowano YOLOv5: {self.model_type}")
                
        except Exception as e:
            print(f"❌ Błąd ładowania modelu: {e}")
            print("🔄 Próba załadowania modelu zapasowego...")
            self.load_yolov5_fallback()
    
    def load_yolov5_fallback(self):
        """
        Zapasowe ładowanie modelu YOLOv5
        """
        try:
            self.model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)
            self.model.to(self.device)
            print("✅ Załadowano zapasowy model YOLOv5s")
        except Exception as e:
            print(f"❌ Krytyczny błąd: {e}")
            print("💡 Sprawdź połączenie internetowe i spróbuj ponownie")
    
    def preprocess_image(self, image, target_size=640):
        """
        Przygotowanie obrazu dla modelu YOLO
        
        Args:
            image: Obraz wejściowy
            target_size: Docelowy rozmiar obrazu
            
        Returns:
            Przeskalowany obraz
        """
        h, w = image.shape[:2]
        
        # Zachowanie proporcji przy skalowaniu
        if h > w:
            new_h, new_w = target_size, int(w * target_size / h)
        else:
            new_h, new_w = int(h * target_size / w), target_size
        
        resized = cv2.resize(image, (new_w, new_h))
        return resized
    
    def classify_sign_type(self, class_name):
        """
        Klasyfikuje wykryty obiekt jako STOP, USTĄP lub inny
        
        Args:
            class_name: Nazwa klasy z modelu
            
        Returns:
            Typ znaku ('stop', 'yield', 'other')
        """
        class_name_lower = class_name.lower()
        
        for sign_type, keywords in self.target_classes.items():
            for keyword in keywords:
                if keyword in class_name_lower:
                    return sign_type
        
        return 'other'
    
    def detect_signs(self, image):
        """
        Wykrywa znaki drogowe na obrazie
        
        Args:
            image: Obraz wejściowy (BGR)
            
        Returns:
            Lista wykrytych znaków
        """
        if self.model is None:
            return []
        
        # Przygotowanie obrazu
        processed_image = self.preprocess_image(image)
        
        try:
            # Detekcja obiektów
            if 'yolov8' in str(type(self.model)).lower():
                # YOLOv8
                results = self.model(processed_image, conf=self.confidence_threshold)
                detections = self.parse_yolov8_results(results, image.shape)
            else:
                # YOLOv5
                results = self.model(processed_image)
                detections = self.parse_yolov5_results(results, image.shape, processed_image.shape)
            
            return detections
            
        except Exception as e:
            print(f"❌ Błąd detekcji: {e}")
            return []
    
    def parse_yolov5_results(self, results, original_shape, processed_shape):
        """
        Parsuje wyniki YOLOv5
        
        Args:
            results: Wyniki z modelu YOLOv5
            original_shape: Kształt oryginalnego obrazu
            processed_shape: Kształt przetworzonego obrazu
            
        Returns:
            Lista wykrytych obiektów
        """
        detections = []
        
        # Współczynniki skalowania
        scale_x = original_shape[1] / processed_shape[1]
        scale_y = original_shape[0] / processed_shape[0]
        
        # Przetwarzanie wyników
        for *box, conf, cls in results.xyxy[0].cpu().numpy():
            if conf >= self.confidence_threshold:
                # Przeskalowanie współrzędnych
                x1, y1, x2, y2 = box
                x1, x2 = int(x1 * scale_x), int(x2 * scale_x)
                y1, y2 = int(y1 * scale_y), int(y2 * scale_y)
                
                # Nazwa klasy
                class_name = self.model.names[int(cls)]
                sign_type = self.classify_sign_type(class_name)
                
                detections.append({
                    'bbox': [x1, y1, x2, y2],
                    'confidence': float(conf),
                    'class': class_name,
                    'sign_type': sign_type,
                    'center': ((x1 + x2) // 2, (y1 + y2) // 2)
                })
        
        return detections
    
    def parse_yolov8_results(self, results, original_shape):
        """
        Parsuje wyniki YOLOv8
        
        Args:
            results: Wyniki z modelu YOLOv8
            original_shape: Kształt oryginalnego obrazu
            
        Returns:
            Lista wykrytych obiektów
        """
        detections = []
        
        for result in results:
            boxes = result.boxes
            if boxes is not None:
                for box in boxes:
                    conf = float(box.conf[0])
                    if conf >= self.confidence_threshold:
                        # Współrzędne (już przeskalowane)
                        x1, y1, x2, y2 = map(int, box.xyxy[0])
                        
                        # Nazwa klasy
                        cls_id = int(box.cls[0])
                        class_name = result.names[cls_id]
                        sign_type = self.classify_sign_type(class_name)
                        
                        detections.append({
                            'bbox': [x1, y1, x2, y2],
                            'confidence': conf,
                            'class': class_name,
                            'sign_type': sign_type,
                            'center': ((x1 + x2) // 2, (y1 + y2) // 2)
                        })
        
        return detections
    
    def draw_detections(self, image, detections):
        """
        Rysuje wykryte znaki na obrazie
        
        Args:
            image: Obraz wejściowy
            detections: Lista wykrytych obiektów
            
        Returns:
            Obraz z naniesionymi ramkami
        """
        result_image = image.copy()
        
        for detection in detections:
            x1, y1, x2, y2 = detection['bbox']
            confidence = detection['confidence']
            class_name = detection['class']
            sign_type = detection['sign_type']
            
            # Wybór koloru ramki
            color = self.colors.get(sign_type, self.colors['other'])
            
            # Rysowanie ramki
            cv2.rectangle(result_image, (x1, y1), (x2, y2), color, 3)
            
            # Przygotowanie tekstu
            if sign_type == 'stop':
                label = f"STOP ({confidence:.1f}%)"
            elif sign_type == 'yield':
                label = f"USTĄP PIERWSZEŃSTWA ({confidence:.1f}%)"
            else:
                label = f"{class_name} ({confidence:.1f}%)"
            
            # Tło dla tekstu
            (text_width, text_height), _ = cv2.getTextSize(
                label, cv2.FONT_HERSHEY_SIMPLEX, 0.7, 2
            )
            cv2.rectangle(result_image, (x1, y1 - text_height - 10), 
                         (x1 + text_width, y1), color, -1)
            
            # Tekst
            cv2.putText(result_image, label, (x1, y1 - 5),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
        
        return result_image
    
    def process_image(self, image_path, save_result=True):
        """
        Główna funkcja przetwarzająca obraz
        
        Args:
            image_path: Ścieżka do obrazu
            save_result: Czy zapisać wynik
            
        Returns:
            Słownik z wynikami
        """
        if not os.path.exists(image_path):
            return {"error": "Plik nie istnieje"}
        
        # Wczytanie obrazu
        image = cv2.imread(image_path)
        if image is None:
            return {"error": "Nie można wczytać obrazu"}
        
        print(f"🔍 Analizowanie obrazu: {image_path}")
        print(f"📐 Rozmiar obrazu: {image.shape[1]}x{image.shape[0]}")
        
        # Pomiar czasu detekcji
        start_time = time.time()
        
        # Detekcja znaków
        detections = self.detect_signs(image)
        
        detection_time = time.time() - start_time
        
        # Filtrowanie na STOP i USTĄP PIERWSZEŃSTWA
        target_detections = [d for d in detections if d['sign_type'] in ['stop', 'yield']]
        
        print(f"⏱️  Czas detekcji: {detection_time:.2f}s")
        print(f"🎯 Wykryto obiektów: {len(detections)}")
        print(f"🚦 Znaki STOP/USTĄP: {len(target_detections)}")
        
        # Wyświetlenie wyników
        print("\n📊 WYNIKI DETEKCJI:")
        print("="*60)
        
        if target_detections:
            for i, detection in enumerate(target_detections, 1):
                sign_name = "STOP" if detection['sign_type'] == 'stop' else "USTĄP PIERWSZEŃSTWA"
                print(f"🚦 Znak {i}: {sign_name}")
                print(f"   📈 Pewność: {detection['confidence']:.1f}%")
                print(f"   📍 Pozycja: {detection['center']}")
                print(f"   📦 Ramka: {detection['bbox']}")
                print("-" * 40)
        else:
            print("❌ Nie wykryto znaków STOP ani USTĄP PIERWSZEŃSTWA")
        
        # Rysowanie wyników
        result_image = self.draw_detections(image, target_detections)
        
        # Zapisanie wyniku
        if save_result and target_detections:
            output_path = image_path.rsplit('.', 1)[0] + '_yolo_result.jpg'
            cv2.imwrite(output_path, result_image)
            print(f"💾 Wynik zapisano: {output_path}")
        
        return {
            "detections": target_detections,
            "all_detections": detections,
            "result_image": result_image,
            "detection_time": detection_time,
            "total_signs": len(target_detections)
        }
    
    def process_video(self, video_path, output_path=None):
        """
        Przetwarzanie wideo w czasie rzeczywistym
        
        Args:
            video_path: Ścieżka do wideo
            output_path: Ścieżka zapisu wynikowego wideo
        """
        cap = cv2.VideoCapture(video_path)
        
        if not cap.isOpened():
            print(f"❌ Nie można otworzyć wideo: {video_path}")
            return
        
        # Parametry wideo
        fps = int(cap.get(cv2.CAP_PROP_FPS))
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        
        print(f"🎬 Przetwarzanie wideo: {video_path}")
        print(f"📐 Rozdzielczość: {width}x{height}, FPS: {fps}")
        print(f"⏱️  Całkowity czas: {total_frames/fps:.1f}s")
        
        # Zapis wideo (opcjonalnie)
        if output_path:
            fourcc = cv2.VideoWriter_fourcc(*'mp4v')
            out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
        
        frame_count = 0
        
        try:
            while True:
                ret, frame = cap.read()
                if not ret:
                    break
                
                frame_count += 1
                
                # Detekcja co n-tą klatkę (dla wydajności)
                if frame_count % 5 == 0:  # Co 5. klatka
                    detections = self.detect_signs(frame)
                    target_detections = [d for d in detections if d['sign_type'] in ['stop', 'yield']]
                    frame = self.draw_detections(frame, target_detections)
                
                # Wyświetlanie postępu
                if frame_count % 30 == 0:
                    progress = (frame_count / total_frames) * 100
                    print(f"📈 Postęp: {progress:.1f}%")
                
                # Zapis klatki
                if output_path:
                    out.write(frame)
                
                # Wyświetlanie (opcjonalnie)
                cv2.imshow('YOLO Traffic Sign Detection', frame)
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
        
        except KeyboardInterrupt:
            print("\n⏹️  Przerwano przez użytkownika")
        
        finally:
            cap.release()
            if output_path:
                out.release()
            cv2.destroyAllWindows()
            
            print(f"✅ Przetworzono {frame_count} klatek")

def main():
    """
    Funkcja główna - przykład użycia
    """
    print("🚀 System detekcji znaków YOLO")
    print("=" * 50)
    
    # Inicjalizacja detektora
    detector = YOLOTrafficSignDetector(
        model_type='yolov5s',  # lub 'yolov8n'
        confidence_threshold=0.5
    )
    
    # Przykłady obrazów do testowania
    test_images = [
        "stop.jpeg",
        "stop_2.jpeg",
        "ustap.jpg",
        "ustap_2.jpg"
    ]
    
    print("\n🖼️  Testowanie na obrazach:")
    for image_path in test_images:
        if os.path.exists(image_path):
            print(f"\n{'='*60}")
            result = detector.process_image(image_path)
            
            if "error" in result:
                print(f"❌ Błąd: {result['error']}")
            else:
                print(f"✅ Wykryto {result['total_signs']} znaków docelowych")
                print(f"⏱️  Czas przetwarzania: {result['detection_time']:.2f}s")
        else:
            print(f"⚠️  Plik {image_path} nie istnieje")
    
    print(f"\n{'='*60}")
    print("💡 Instrukcje użycia:")
    print("1. Umieść obrazy w tym samym katalogu co skrypt")
    print("2. Uruchom: python yolo_detection.py")
    print("3. Lub użyj: detector.process_image('ścieżka_do_obrazu.jpg')")
    print("4. Dla wideo: detector.process_video('wideo.mp4', 'wynik.mp4')")

if __name__ == "__main__":
    # Sprawdzenie wymaganych bibliotek
    try:
        import torch
        import cv2
        print("✅ PyTorch i OpenCV dostępne")
    except ImportError as e:
        print(f"❌ Brak wymaganych bibliotek: {e}")
        print("\n📋 Instalacja wymaganych bibliotek:")
        print("pip install torch torchvision")
        print("pip install opencv-python")
        print("pip install ultralytics  # dla YOLOv8")
        print("\nLub tylko YOLOv5:")
        print("pip install torch opencv-python")
        exit(1)
    
    main()