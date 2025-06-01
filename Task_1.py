import cv2
import pytesseract
import numpy as np
import os
from PIL import Image
import re

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

class SpeedLimitOCR:
    def __init__(self):
        """
        Inicjalizacja klasy do rozpoznawania ograniczeń prędkości
        """
        # Konfiguracja Tesseract dla rozpoznawania cyfr
        self.tesseract_config = r'--oem 3 --psm 8 -c tessedit_char_whitelist=0123456789'
        
    def preprocess_image(self, image):
        """
        Przetwarzanie wstępne obrazu przed OCR
        
        Args:
            image: Obraz wejściowy (BGR)
            
        Returns:
            Przetworzony obraz w odcieniach szarości
        """
        # Konwersja do odcieni szarości
        if len(image.shape) == 3:
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        else:
            gray = image.copy()
        
        # Filtracja Gaussa - usunięcie szumów
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)
        
        # Normalizacja kontrastu
        normalized = cv2.normalize(blurred, None, 0, 255, cv2.NORM_MINMAX)
        
        # Progowanie adaptacyjne
        thresh = cv2.adaptiveThreshold(
            normalized, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
            cv2.THRESH_BINARY, 11, 2
        )
        
        # Operacje morfologiczne - czyszczenie obrazu
        kernel = np.ones((2, 2), np.uint8)
        cleaned = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
        cleaned = cv2.morphologyEx(cleaned, cv2.MORPH_OPEN, kernel)
        
        return cleaned
    
    def detect_circular_signs(self, image):
        """
        Wykrywa okrągłe znaki drogowe używając transformaty Hough
        
        Args:
            image: Obraz wejściowy
            
        Returns:
            Lista wykrytych kół (x, y, promień)
        """
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) if len(image.shape) == 3 else image
        
        # Wykrywanie krawędzi
        edges = cv2.Canny(gray, 50, 150, apertureSize=3)
        
        # Transformata Hough dla okręgów
        circles = cv2.HoughCircles(
            edges,
            cv2.HOUGH_GRADIENT,
            dp=1,
            minDist=50,
            param1=50,
            param2=30,
            minRadius=20,
            maxRadius=200
        )
        
        if circles is not None:
            circles = np.round(circles[0, :]).astype("int")
            return circles
        
        return []
    
    def extract_roi(self, image, x, y, radius):
        """
        Wydobywa region zainteresowania (ROI) wokół wykrytego znaku
        
        Args:
            image: Obraz wejściowy
            x, y: Współrzędne środka
            radius: Promień znaku
            
        Returns:
            Wyciętą część obrazu
        """
        # Zwiększ obszar o 20% dla lepszego OCR
        margin = int(radius * 0.2)
        x1 = max(0, x - radius - margin)
        y1 = max(0, y - radius - margin)
        x2 = min(image.shape[1], x + radius + margin)
        y2 = min(image.shape[0], y + radius + margin)
        
        roi = image[y1:y2, x1:x2]
        return roi
    
    def perform_ocr(self, image):
        """
        Wykonuje OCR na przygotowanym obrazie
        
        Args:
            image: Przetworzony obraz
            
        Returns:
            Rozpoznany tekst i poziom pewności
        """
        try:
            # OCR z konfiguracją dla cyfr
            text = pytesseract.image_to_string(image, config=self.tesseract_config)
            
            # Oczyszczenie wyniku - tylko cyfry
            digits = re.findall(r'\d+', text)
            
            if digits:
                speed_limit = digits[0]
                
                # Sprawdź czy to prawdopodobne ograniczenie prędkości
                speed_val = int(speed_limit)
                if speed_val in [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140]:
                    # Oblicz poziom pewności (uproszczony)
                    confidence = self.calculate_confidence(image, speed_limit)
                    return speed_limit, confidence
            
            return None, 0
            
        except Exception as e:
            print(f"Błąd OCR: {e}")
            return None, 0
    
    def calculate_confidence(self, image, detected_text):
        """
        Oblicza poziom pewności rozpoznania (uproszczony)
        
        Args:
            image: Obraz
            detected_text: Rozpoznany tekst
            
        Returns:
            Poziom pewności (0-100)
        """
        # Podstawowy pomiar jakości na podstawie kontrastu i ostrości
        laplacian_var = cv2.Laplacian(image, cv2.CV_64F).var()
        
        # Im wyższa wariancja Laplacjan, tym ostrzejszy obraz
        if laplacian_var > 500:
            confidence = 90
        elif laplacian_var > 100:
            confidence = 75
        else:
            confidence = 60
            
        return min(95, confidence)
    
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
        
        original_image = image.copy()
        results = []
        
        print("🔍 Rozpoczynanie analizy obrazu...")
        print("📁 Plik:", image_path)
        
        # Wykryj okrągłe znaki
        circles = self.detect_circular_signs(image)
        
        if len(circles) == 0:
            print("⚠️  Nie wykryto okrągłych znaków, analizuję cały obraz...")
            
            # Jeśli nie ma okrągłych znaków, analizuj cały obraz
            processed = self.preprocess_image(image)
            speed_limit, confidence = self.perform_ocr(processed)
            
            if speed_limit:
                results.append({
                    "speed_limit": speed_limit,
                    "confidence": confidence,
                    "region": "cały obraz"
                })
        else:
            print(f"🎯 Wykryto {len(circles)} okrągłych znaków")
            
            # Analizuj każdy wykryty znak
            for i, (x, y, r) in enumerate(circles):
                print(f"   Analizuję znak {i+1}: środek=({x},{y}), promień={r}")
                
                # Wydobądź ROI
                roi = self.extract_roi(image, x, y, r)
                
                if roi.size > 0:
                    # Przetwarzanie wstępne ROI
                    processed_roi = self.preprocess_image(roi)
                    
                    # OCR na ROI
                    speed_limit, confidence = self.perform_ocr(processed_roi)
                    
                    if speed_limit:
                        results.append({
                            "speed_limit": speed_limit,
                            "confidence": confidence,
                            "region": f"znak {i+1}",
                            "position": (x, y),
                            "radius": r
                        })
                        
                        # Narysuj wyniki na oryginalnym obrazie
                        cv2.circle(original_image, (x, y), r, (0, 255, 0), 3)
                        cv2.circle(original_image, (x, y), 2, (0, 255, 0), 3)
                        
                        # Dodaj tekst z wynikiem
                        text = f"{speed_limit} km/h ({confidence:.1f}%)"
                        cv2.putText(original_image, text, (x-50, y-r-20), 
                                   cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
        
        # Wyświetlenie wyników
        print("\n📊 WYNIKI ANALIZY:")
        print("="*50)
        
        if results:
            for result in results:
                print(f"🚗 Ograniczenie prędkości: {result['speed_limit']} km/h")
                print(f"📈 Pewność: {result['confidence']:.1f}%")
                print(f"📍 Region: {result['region']}")
                print("-" * 30)
        else:
            print("❌ Nie wykryto żadnych ograniczeń prędkości")
        
        # Zapisanie wyniku
        if save_result and results:
            output_path = image_path.rsplit('.', 1)[0] + '_ocr_result.jpg'
            cv2.imwrite(output_path, original_image)
            print(f"💾 Wynik zapisano: {output_path}")
        
        return {
            "results": results,
            "processed_image": original_image,
            "total_detections": len(results)
        }

def main():
    """
    Funkcja główna - przykład użycia
    """
    # Inicjalizacja detektora
    ocr_detector = SpeedLimitOCR()
    
    # Przykłady obrazów do testowania
    test_images = [
        "image.jpg",
        "speed.jpg", 
        "predkosc.jpg"
    ]
    
    print("🚀 System OCR ograniczeń prędkości")
    print("=" * 50)
    
    for image_path in test_images:
        if os.path.exists(image_path):
            print(f"\n🔍 Przetwarzanie: {image_path}")
            result = ocr_detector.process_image(image_path)
            
            if "error" in result:
                print(f"❌ Błąd: {result['error']}")
            else:
                print(f"✅ Wykryto {result['total_detections']} ograniczeń")
        else:
            print(f"⚠️  Plik {image_path} nie istnieje")
    
    print("\n" + "="*50)
    print("Aby przetestować własny obraz, użyj:")
    print("ocr_detector.process_image('ścieżka_do_obrazu.jpg')")

if __name__ == "__main__":
    # Instrukcje instalacji wymaganych bibliotek
    print("📋 Wymagane biblioteki:")
    print("pip install opencv-python pytesseract pillow numpy")
    print("Dodatkowo: zainstaluj Tesseract OCR z https://github.com/tesseract-ocr/tesseract")
    print("\n")
    
    main()