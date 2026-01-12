#!/usr/bin/env python3
"""
Analyze skin from base64 encoded images.
Usage: python analyze_base64.py <base64_string> [<base64_string2> ...]
Or paste base64 when prompted.
"""

import sys
import base64
import tempfile
import os
from analyzer import SkinAnalyzer, print_report


def decode_and_analyze(base64_strings):
    """Decode base64 images and run analysis"""
    analyzer = SkinAnalyzer()
    temp_paths = []

    try:
        for i, b64_string in enumerate(base64_strings):
            # Remove data URL prefix if present
            if ',' in b64_string:
                b64_string = b64_string.split(',')[1]

            # Remove whitespace
            b64_string = b64_string.strip().replace('\n', '').replace(' ', '')

            # Decode
            image_data = base64.b64decode(b64_string)

            # Save to temp file
            fd, temp_path = tempfile.mkstemp(suffix='.jpg')
            os.close(fd)
            with open(temp_path, 'wb') as f:
                f.write(image_data)
            temp_paths.append(temp_path)
            print(f"Imagen {i+1} decodificada correctamente")

        if not temp_paths:
            print("No se pudieron decodificar las imagenes")
            return

        # Run analysis
        results = analyzer.analyze_multiple(temp_paths)
        print_report(results)

    finally:
        # Cleanup
        for path in temp_paths:
            try:
                os.remove(path)
            except:
                pass


def main():
    if len(sys.argv) > 1:
        # Base64 strings provided as arguments
        decode_and_analyze(sys.argv[1:])
    else:
        # Interactive mode
        print("Pega el contenido base64 de tu imagen (termina con una linea vacia):")
        lines = []
        while True:
            try:
                line = input()
                if line == '':
                    break
                lines.append(line)
            except EOFError:
                break

        if lines:
            b64_string = ''.join(lines)
            decode_and_analyze([b64_string])
        else:
            print("No se proporciono ninguna imagen")


if __name__ == '__main__':
    main()
