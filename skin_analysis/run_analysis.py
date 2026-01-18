#!/usr/bin/env python3
"""
Quick script to run skin analysis on images.
Place your images in the 'images/' folder and run this script.
"""

import os
import sys

# Add parent directory to path
sys.path.insert(0, os.path.dirname(__file__))

from analyzer import SkinAnalyzer, print_report
import json


def run():
    images_dir = os.path.join(os.path.dirname(__file__), 'images')

    # Find all images
    supported_formats = ('.jpg', '.jpeg', '.png', '.bmp', '.webp', '.gif')

    if not os.path.exists(images_dir):
        os.makedirs(images_dir)
        print(f"Carpeta creada: {images_dir}")
        print("Por favor, coloca tus imagenes en esta carpeta y ejecuta de nuevo.")
        return

    image_files = [
        os.path.join(images_dir, f)
        for f in os.listdir(images_dir)
        if f.lower().endswith(supported_formats)
    ]

    if not image_files:
        print(f"No se encontraron imagenes en: {images_dir}")
        print(f"Formatos soportados: {', '.join(supported_formats)}")
        print("\nPor favor, copia tus fotos a la carpeta 'images/' y ejecuta de nuevo.")
        return

    print(f"Encontradas {len(image_files)} imagen(es)")
    for img in image_files:
        print(f"  - {os.path.basename(img)}")

    # Run analysis
    analyzer = SkinAnalyzer()
    results = analyzer.analyze_multiple(image_files)

    # Print report
    print_report(results)

    # Save results
    output_path = os.path.join(os.path.dirname(__file__), 'analysis_results.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print(f"\nResultados guardados en: {output_path}")


if __name__ == '__main__':
    run()
