#!/usr/bin/env python3
"""
Skin Health Analyzer
Analyzes facial skin using computer vision techniques.

DISCLAIMER: This is for educational purposes only and does NOT replace
professional medical advice. Always consult a dermatologist for skin concerns.
"""

import cv2
import numpy as np
from PIL import Image
import os
import json
from dataclasses import dataclass, asdict
from typing import List, Tuple, Optional
import warnings

warnings.filterwarnings('ignore')


@dataclass
class SkinAnalysisResult:
    """Results from skin analysis"""
    image_path: str
    face_detected: bool
    skin_tone: dict
    spots_detected: int
    spot_locations: List[dict]
    texture_score: float  # 0-100, higher is smoother
    oiliness_indicator: float  # 0-100
    hydration_indicator: float  # 0-100
    uniformity_score: float  # 0-100
    recommendations: List[str]


class SkinAnalyzer:
    """Analyzes skin health from facial images"""

    def __init__(self):
        # Use OpenCV's Haar cascade for face detection (more compatible)
        self.face_cascade = cv2.CascadeClassifier(
            cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
        )

        # Skin tone categories based on Fitzpatrick scale approximation
        self.skin_tone_categories = {
            'muy_claro': (0, 80),
            'claro': (80, 120),
            'medio': (120, 160),
            'oliva': (160, 190),
            'moreno': (190, 220),
            'oscuro': (220, 256)
        }

    def load_image(self, image_path: str) -> Optional[np.ndarray]:
        """Load image from path"""
        if not os.path.exists(image_path):
            print(f"Error: Image not found at {image_path}")
            return None

        image = cv2.imread(image_path)
        if image is None:
            # Try with PIL for different formats
            try:
                pil_image = Image.open(image_path)
                image = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
            except Exception as e:
                print(f"Error loading image: {e}")
                return None

        return image

    def detect_face(self, image: np.ndarray) -> Tuple[bool, Optional[np.ndarray]]:
        """Detect face and create skin mask using Haar cascade"""
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        h, w = image.shape[:2]

        # Detect faces
        faces = self.face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(50, 50)
        )

        if len(faces) == 0:
            return False, None

        # Use the largest face detected
        face = max(faces, key=lambda f: f[2] * f[3])
        x, y, fw, fh = face

        # Create elliptical mask for face area (better approximation of face shape)
        mask = np.zeros((h, w), dtype=np.uint8)
        center = (x + fw // 2, y + fh // 2)
        axes = (fw // 2, int(fh * 0.6))  # Slightly taller ellipse

        cv2.ellipse(mask, center, axes, 0, 0, 360, 255, -1)

        # Exclude eye region (top 35% of face) and mouth (bottom 20%)
        eye_region_end = y + int(fh * 0.35)
        mouth_region_start = y + int(fh * 0.8)

        mask[:eye_region_end, :] = 0
        mask[mouth_region_start:, :] = 0

        return True, mask

    def detect_skin_pixels(self, image: np.ndarray) -> np.ndarray:
        """Detect skin pixels using color space analysis"""
        # Convert to different color spaces
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        ycrcb = cv2.cvtColor(image, cv2.COLOR_BGR2YCrCb)

        # HSV skin detection
        lower_hsv = np.array([0, 20, 70], dtype=np.uint8)
        upper_hsv = np.array([20, 255, 255], dtype=np.uint8)
        mask_hsv = cv2.inRange(hsv, lower_hsv, upper_hsv)

        # YCrCb skin detection
        lower_ycrcb = np.array([0, 133, 77], dtype=np.uint8)
        upper_ycrcb = np.array([255, 173, 127], dtype=np.uint8)
        mask_ycrcb = cv2.inRange(ycrcb, lower_ycrcb, upper_ycrcb)

        # Combine masks
        skin_mask = cv2.bitwise_and(mask_hsv, mask_ycrcb)

        # Clean up mask
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
        skin_mask = cv2.morphologyEx(skin_mask, cv2.MORPH_CLOSE, kernel)
        skin_mask = cv2.morphologyEx(skin_mask, cv2.MORPH_OPEN, kernel)

        return skin_mask

    def analyze_skin_tone(self, image: np.ndarray, mask: np.ndarray) -> dict:
        """Analyze skin tone from masked region"""
        # Apply mask to image
        masked_image = cv2.bitwise_and(image, image, mask=mask)

        # Get skin pixels only
        skin_pixels = image[mask > 0]

        if len(skin_pixels) == 0:
            return {'category': 'unknown', 'rgb': (0, 0, 0), 'brightness': 0}

        # Calculate average color
        avg_color = np.mean(skin_pixels, axis=0)
        b, g, r = avg_color

        # Calculate brightness (luminance)
        brightness = 0.299 * r + 0.587 * g + 0.114 * b

        # Determine skin tone category
        category = 'unknown'
        for cat, (low, high) in self.skin_tone_categories.items():
            if low <= brightness < high:
                category = cat
                break

        # Convert to HSV for additional info
        hsv_pixels = cv2.cvtColor(
            skin_pixels.reshape(-1, 1, 3).astype(np.uint8),
            cv2.COLOR_BGR2HSV
        )
        avg_hsv = np.mean(hsv_pixels.reshape(-1, 3), axis=0)

        return {
            'category': category,
            'rgb': (int(r), int(g), int(b)),
            'hsv': (float(avg_hsv[0]), float(avg_hsv[1]), float(avg_hsv[2])),
            'brightness': float(brightness)
        }

    def detect_spots(self, image: np.ndarray, mask: np.ndarray) -> Tuple[int, List[dict]]:
        """Detect potential spots, blemishes, or moles"""
        # Apply mask
        masked = cv2.bitwise_and(image, image, mask=mask)

        # Convert to grayscale
        gray = cv2.cvtColor(masked, cv2.COLOR_BGR2GRAY)

        # Apply bilateral filter to reduce noise while keeping edges
        filtered = cv2.bilateralFilter(gray, 9, 75, 75)

        # Detect spots using blob detection
        params = cv2.SimpleBlobDetector_Params()
        params.filterByArea = True
        params.minArea = 15
        params.maxArea = 500
        params.filterByCircularity = True
        params.minCircularity = 0.3
        params.filterByConvexity = True
        params.minConvexity = 0.5
        params.filterByInertia = True
        params.minInertiaRatio = 0.3

        detector = cv2.SimpleBlobDetector_create(params)

        # Invert image for dark spot detection
        inverted = cv2.bitwise_not(filtered)
        keypoints = detector.detect(inverted)

        # Also detect using adaptive thresholding for small spots
        thresh = cv2.adaptiveThreshold(
            filtered, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
            cv2.THRESH_BINARY_INV, 11, 2
        )
        thresh = cv2.bitwise_and(thresh, mask)

        # Find contours for additional spots
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        spots = []

        # Add blob keypoints
        for kp in keypoints:
            spots.append({
                'x': int(kp.pt[0]),
                'y': int(kp.pt[1]),
                'size': float(kp.size),
                'type': 'dark_spot'
            })

        # Add contour-based spots
        for contour in contours:
            area = cv2.contourArea(contour)
            if 20 < area < 300:
                M = cv2.moments(contour)
                if M["m00"] > 0:
                    cx = int(M["m10"] / M["m00"])
                    cy = int(M["m01"] / M["m00"])
                    spots.append({
                        'x': cx,
                        'y': cy,
                        'size': float(np.sqrt(area)),
                        'type': 'blemish'
                    })

        # Remove duplicates (spots too close to each other)
        unique_spots = []
        for spot in spots:
            is_duplicate = False
            for existing in unique_spots:
                dist = np.sqrt((spot['x'] - existing['x'])**2 + (spot['y'] - existing['y'])**2)
                if dist < 15:
                    is_duplicate = True
                    break
            if not is_duplicate:
                unique_spots.append(spot)

        return len(unique_spots), unique_spots

    def analyze_texture(self, image: np.ndarray, mask: np.ndarray) -> float:
        """Analyze skin texture smoothness (0-100, higher = smoother)"""
        # Apply mask
        masked = cv2.bitwise_and(image, image, mask=mask)
        gray = cv2.cvtColor(masked, cv2.COLOR_BGR2GRAY)

        # Calculate Laplacian variance (measure of texture/edges)
        laplacian = cv2.Laplacian(gray, cv2.CV_64F)
        laplacian_masked = laplacian[mask > 0]

        if len(laplacian_masked) == 0:
            return 50.0

        variance = np.var(laplacian_masked)

        # Normalize to 0-100 scale (lower variance = smoother skin)
        # Typical variance ranges from 50 (very smooth) to 500+ (very textured)
        smoothness = max(0, min(100, 100 - (variance / 5)))

        return float(smoothness)

    def analyze_oiliness(self, image: np.ndarray, mask: np.ndarray) -> float:
        """Estimate skin oiliness based on shine/highlights (0-100)"""
        # Convert to HSV
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

        # Extract value (brightness) channel
        v_channel = hsv[:, :, 2]
        v_masked = v_channel[mask > 0]

        if len(v_masked) == 0:
            return 50.0

        # Calculate percentage of high-brightness pixels (shine)
        threshold = 200
        shine_pixels = np.sum(v_masked > threshold)
        total_pixels = len(v_masked)

        shine_percentage = (shine_pixels / total_pixels) * 100

        # Also check saturation (oily skin often has lower saturation in bright areas)
        s_channel = hsv[:, :, 1]
        s_masked = s_channel[mask > 0]

        # Combine metrics
        oiliness = min(100, shine_percentage * 3)

        return float(oiliness)

    def analyze_hydration(self, image: np.ndarray, mask: np.ndarray) -> float:
        """Estimate skin hydration based on color and texture (0-100)"""
        # Well-hydrated skin tends to have more even color distribution
        skin_pixels = image[mask > 0]

        if len(skin_pixels) == 0:
            return 50.0

        # Calculate color variance (lower = more uniform = better hydrated)
        color_std = np.std(skin_pixels, axis=0)
        avg_std = np.mean(color_std)

        # Also check for redness (dehydrated skin can be redder)
        b, g, r = cv2.split(image)
        r_masked = r[mask > 0]
        g_masked = g[mask > 0]

        redness_ratio = np.mean(r_masked) / (np.mean(g_masked) + 1)

        # Combine metrics
        uniformity_score = max(0, min(100, 100 - avg_std))
        redness_penalty = max(0, (redness_ratio - 1) * 30)

        hydration = uniformity_score - redness_penalty
        hydration = max(0, min(100, hydration))

        return float(hydration)

    def calculate_uniformity(self, image: np.ndarray, mask: np.ndarray) -> float:
        """Calculate skin color uniformity (0-100)"""
        skin_pixels = image[mask > 0]

        if len(skin_pixels) == 0:
            return 50.0

        # Calculate coefficient of variation for each channel
        cv_scores = []
        for i in range(3):
            channel = skin_pixels[:, i]
            if np.mean(channel) > 0:
                cv = np.std(channel) / np.mean(channel)
                cv_scores.append(cv)

        avg_cv = np.mean(cv_scores) if cv_scores else 0.5

        # Convert to 0-100 scale (lower CV = more uniform = higher score)
        uniformity = max(0, min(100, 100 - (avg_cv * 200)))

        return float(uniformity)

    def generate_recommendations(self, result: dict) -> List[str]:
        """Generate skincare recommendations based on analysis"""
        recommendations = []

        # Texture recommendations
        if result['texture_score'] < 60:
            recommendations.append(
                "Considera usar exfoliantes suaves (AHA/BHA) para mejorar la textura de la piel"
            )

        # Oiliness recommendations
        if result['oiliness_indicator'] > 60:
            recommendations.append(
                "Tu piel muestra signos de oleosidad. Usa productos oil-free y considera niacinamida"
            )
        elif result['oiliness_indicator'] < 30:
            recommendations.append(
                "Tu piel parece seca. Aumenta la hidratacion con cremas mas ricas"
            )

        # Hydration recommendations
        if result['hydration_indicator'] < 50:
            recommendations.append(
                "Mejora la hidratacion bebiendo mas agua y usando acido hialuronico"
            )

        # Spots recommendations
        if result['spots_detected'] > 5:
            recommendations.append(
                "Se detectaron varias manchas/lunares. Usa protector solar SPF 50+ diariamente"
            )
            recommendations.append(
                "IMPORTANTE: Consulta un dermatologo para revision de lunares regularmente"
            )

        # Uniformity recommendations
        if result['uniformity_score'] < 60:
            recommendations.append(
                "Para mejorar la uniformidad, considera vitamina C o niacinamida"
            )

        # General recommendations
        recommendations.append(
            "Usa protector solar diariamente, incluso en dias nublados"
        )
        recommendations.append(
            "AVISO: Este analisis es educativo. Consulta un dermatologo para diagnosticos reales"
        )

        return recommendations

    def analyze(self, image_path: str) -> Optional[SkinAnalysisResult]:
        """Perform complete skin analysis on an image"""
        print(f"\nAnalizando: {image_path}")

        # Load image
        image = self.load_image(image_path)
        if image is None:
            return None

        # Detect face
        face_detected, face_mask = self.detect_face(image)

        if not face_detected:
            print("  No se detecto rostro, usando deteccion de piel por color...")
            face_mask = self.detect_skin_pixels(image)

        # Combine with skin detection for better accuracy
        skin_mask = self.detect_skin_pixels(image)
        combined_mask = cv2.bitwise_and(face_mask, skin_mask) if face_mask is not None else skin_mask

        # Check if we have enough skin pixels
        if np.sum(combined_mask > 0) < 1000:
            print("  Advertencia: Poca area de piel detectada")
            combined_mask = face_mask if face_mask is not None else skin_mask

        # Perform analysis
        print("  Analizando tono de piel...")
        skin_tone = self.analyze_skin_tone(image, combined_mask)

        print("  Detectando manchas y lunares...")
        spots_count, spot_locations = self.detect_spots(image, combined_mask)

        print("  Analizando textura...")
        texture_score = self.analyze_texture(image, combined_mask)

        print("  Estimando oleosidad...")
        oiliness = self.analyze_oiliness(image, combined_mask)

        print("  Estimando hidratacion...")
        hydration = self.analyze_hydration(image, combined_mask)

        print("  Calculando uniformidad...")
        uniformity = self.calculate_uniformity(image, combined_mask)

        # Generate recommendations
        result_dict = {
            'texture_score': texture_score,
            'oiliness_indicator': oiliness,
            'hydration_indicator': hydration,
            'uniformity_score': uniformity,
            'spots_detected': spots_count
        }
        recommendations = self.generate_recommendations(result_dict)

        return SkinAnalysisResult(
            image_path=image_path,
            face_detected=face_detected,
            skin_tone=skin_tone,
            spots_detected=spots_count,
            spot_locations=spot_locations[:20],  # Limit to 20 spots
            texture_score=texture_score,
            oiliness_indicator=oiliness,
            hydration_indicator=hydration,
            uniformity_score=uniformity,
            recommendations=recommendations
        )

    def analyze_multiple(self, image_paths: List[str]) -> dict:
        """Analyze multiple images and return aggregated results"""
        results = []

        for path in image_paths:
            result = self.analyze(path)
            if result:
                results.append(result)

        if not results:
            return {'error': 'No se pudieron analizar las imagenes'}

        # Aggregate results
        avg_texture = np.mean([r.texture_score for r in results])
        avg_oiliness = np.mean([r.oiliness_indicator for r in results])
        avg_hydration = np.mean([r.hydration_indicator for r in results])
        avg_uniformity = np.mean([r.uniformity_score for r in results])
        total_spots = sum([r.spots_detected for r in results])

        # Get most common skin tone
        tones = [r.skin_tone['category'] for r in results]
        most_common_tone = max(set(tones), key=tones.count)

        # Collect unique recommendations
        all_recommendations = []
        for r in results:
            all_recommendations.extend(r.recommendations)
        unique_recommendations = list(dict.fromkeys(all_recommendations))

        return {
            'images_analyzed': len(results),
            'summary': {
                'skin_tone': most_common_tone,
                'texture_score': round(avg_texture, 1),
                'oiliness_indicator': round(avg_oiliness, 1),
                'hydration_indicator': round(avg_hydration, 1),
                'uniformity_score': round(avg_uniformity, 1),
                'total_spots_detected': total_spots
            },
            'individual_results': [asdict(r) for r in results],
            'recommendations': unique_recommendations
        }


def print_report(analysis_results: dict):
    """Print a formatted report of the analysis"""
    print("\n" + "=" * 60)
    print("        REPORTE DE ANALISIS DE PIEL")
    print("=" * 60)
    print("\nAVISO IMPORTANTE: Este analisis es solo para fines educativos.")
    print("NO reemplaza el diagnostico de un dermatologo profesional.")
    print("=" * 60)

    if 'error' in analysis_results:
        print(f"\nError: {analysis_results['error']}")
        return

    summary = analysis_results['summary']

    print(f"\nImagenes analizadas: {analysis_results['images_analyzed']}")

    print("\n--- RESUMEN GENERAL ---")
    print(f"\nTono de piel: {summary['skin_tone'].replace('_', ' ').title()}")

    print(f"\nTextura (suavidad): {summary['texture_score']}/100")
    if summary['texture_score'] >= 70:
        print("  Estado: Buena textura")
    elif summary['texture_score'] >= 50:
        print("  Estado: Textura moderada")
    else:
        print("  Estado: Textura a mejorar")

    print(f"\nIndicador de oleosidad: {summary['oiliness_indicator']}/100")
    if summary['oiliness_indicator'] >= 60:
        print("  Estado: Piel con tendencia grasa")
    elif summary['oiliness_indicator'] >= 40:
        print("  Estado: Piel mixta/normal")
    else:
        print("  Estado: Piel seca")

    print(f"\nIndicador de hidratacion: {summary['hydration_indicator']}/100")
    if summary['hydration_indicator'] >= 70:
        print("  Estado: Buena hidratacion")
    elif summary['hydration_indicator'] >= 50:
        print("  Estado: Hidratacion moderada")
    else:
        print("  Estado: Necesita mas hidratacion")

    print(f"\nUniformidad del color: {summary['uniformity_score']}/100")
    if summary['uniformity_score'] >= 70:
        print("  Estado: Color uniforme")
    elif summary['uniformity_score'] >= 50:
        print("  Estado: Algunas variaciones")
    else:
        print("  Estado: Variaciones notables")

    print(f"\nManchas/lunares detectados: {summary['total_spots_detected']}")

    print("\n--- RECOMENDACIONES ---")
    for i, rec in enumerate(analysis_results['recommendations'], 1):
        print(f"\n{i}. {rec}")

    print("\n" + "=" * 60)
    print("Recuerda: Visita a un dermatologo para un analisis profesional")
    print("=" * 60)


def main():
    """Main function to run skin analysis"""
    import sys

    # Default to images directory
    images_dir = os.path.join(os.path.dirname(__file__), 'images')

    if len(sys.argv) > 1:
        # Use provided paths
        image_paths = sys.argv[1:]
    else:
        # Find images in images directory
        if os.path.exists(images_dir):
            supported_formats = ('.jpg', '.jpeg', '.png', '.bmp', '.webp')
            image_paths = [
                os.path.join(images_dir, f)
                for f in os.listdir(images_dir)
                if f.lower().endswith(supported_formats)
            ]
        else:
            print("Uso: python analyzer.py <imagen1> <imagen2> ...")
            print("  o coloca imagenes en la carpeta 'images/'")
            return

    if not image_paths:
        print("No se encontraron imagenes para analizar")
        return

    print(f"Imagenes a analizar: {len(image_paths)}")

    # Create analyzer and run analysis
    analyzer = SkinAnalyzer()
    results = analyzer.analyze_multiple(image_paths)

    # Print report
    print_report(results)

    # Save results to JSON
    output_path = os.path.join(os.path.dirname(__file__), 'analysis_results.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print(f"\nResultados guardados en: {output_path}")


if __name__ == '__main__':
    main()
