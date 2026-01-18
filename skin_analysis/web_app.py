#!/usr/bin/env python3
"""
Web interface for Skin Health Analyzer
Run: python web_app.py
Then open http://localhost:5000
"""

from flask import Flask, render_template_string, request, jsonify
import os
import base64
import tempfile
from analyzer import SkinAnalyzer, print_report
import json

app = Flask(__name__)
analyzer = SkinAnalyzer()

HTML_TEMPLATE = '''
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Analizador de Salud de Piel</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
        }
        .card {
            background: white;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 2em;
        }
        .subtitle {
            color: #666;
            margin-bottom: 20px;
        }
        .warning {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
        }
        .upload-area {
            border: 3px dashed #ddd;
            border-radius: 12px;
            padding: 40px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-bottom: 20px;
        }
        .upload-area:hover {
            border-color: #667eea;
            background: #f8f9ff;
        }
        .upload-area.dragover {
            border-color: #667eea;
            background: #f0f3ff;
        }
        #fileInput {
            display: none;
        }
        .preview-container {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 20px;
        }
        .preview-item {
            position: relative;
            width: 120px;
            height: 120px;
        }
        .preview-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
        }
        .preview-item .remove {
            position: absolute;
            top: -8px;
            right: -8px;
            background: #ff4444;
            color: white;
            border: none;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            cursor: pointer;
            font-size: 14px;
        }
        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px 40px;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        }
        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }
        .results {
            display: none;
        }
        .results.visible {
            display: block;
        }
        .metric {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 15px;
        }
        .metric-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        .metric-name {
            font-weight: 600;
            color: #333;
        }
        .metric-value {
            font-size: 1.5em;
            font-weight: bold;
            color: #667eea;
        }
        .progress-bar {
            height: 10px;
            background: #e0e0e0;
            border-radius: 5px;
            overflow: hidden;
        }
        .progress-fill {
            height: 100%;
            border-radius: 5px;
            transition: width 0.5s ease;
        }
        .progress-fill.good { background: linear-gradient(90deg, #4CAF50, #8BC34A); }
        .progress-fill.medium { background: linear-gradient(90deg, #FFC107, #FF9800); }
        .progress-fill.low { background: linear-gradient(90deg, #f44336, #FF5722); }
        .metric-status {
            font-size: 0.9em;
            color: #666;
            margin-top: 8px;
        }
        .recommendations {
            background: #e8f5e9;
            border-radius: 12px;
            padding: 20px;
        }
        .recommendations h3 {
            color: #2e7d32;
            margin-bottom: 15px;
        }
        .recommendations ul {
            list-style: none;
        }
        .recommendations li {
            padding: 10px 0;
            border-bottom: 1px solid #c8e6c9;
            padding-left: 25px;
            position: relative;
        }
        .recommendations li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #4CAF50;
            font-weight: bold;
        }
        .recommendations li:last-child {
            border-bottom: none;
        }
        .loading {
            display: none;
            text-align: center;
            padding: 40px;
        }
        .loading.visible {
            display: block;
        }
        .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .skin-tone {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 20px;
            background: #667eea;
            color: white;
            font-weight: 500;
        }
        .spots-count {
            font-size: 2em;
            color: #ff9800;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>Analizador de Salud de Piel</h1>
            <p class="subtitle">Analiza tu piel usando inteligencia artificial</p>

            <div class="warning">
                <strong>Aviso Importante:</strong> Este analisis es solo para fines educativos y NO reemplaza el diagnostico de un dermatologo profesional. Siempre consulta con un especialista para preocupaciones de salud de la piel.
            </div>

            <div class="upload-area" id="uploadArea">
                <input type="file" id="fileInput" accept="image/*" multiple>
                <p style="font-size: 1.2em; margin-bottom: 10px;">Arrastra tus fotos aqui</p>
                <p style="color: #666;">o haz clic para seleccionar</p>
                <p style="color: #999; font-size: 0.9em; margin-top: 10px;">Soporta: JPG, PNG, WebP</p>
            </div>

            <div class="preview-container" id="previewContainer"></div>

            <button class="btn" id="analyzeBtn" disabled>Analizar Piel</button>
        </div>

        <div class="loading" id="loading">
            <div class="spinner"></div>
            <p>Analizando imagenes...</p>
        </div>

        <div class="results card" id="results">
            <h2 style="margin-bottom: 20px;">Resultados del Analisis</h2>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
                <div class="metric">
                    <div class="metric-name">Tono de Piel</div>
                    <div class="skin-tone" id="skinTone">-</div>
                </div>
                <div class="metric">
                    <div class="metric-name">Manchas Detectadas</div>
                    <div class="spots-count" id="spotsCount">0</div>
                </div>
            </div>

            <div class="metric">
                <div class="metric-header">
                    <span class="metric-name">Textura (Suavidad)</span>
                    <span class="metric-value" id="textureValue">0</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="textureBar" style="width: 0%"></div>
                </div>
                <div class="metric-status" id="textureStatus"></div>
            </div>

            <div class="metric">
                <div class="metric-header">
                    <span class="metric-name">Oleosidad</span>
                    <span class="metric-value" id="oilinessValue">0</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="oilinessBar" style="width: 0%"></div>
                </div>
                <div class="metric-status" id="oilinessStatus"></div>
            </div>

            <div class="metric">
                <div class="metric-header">
                    <span class="metric-name">Hidratacion</span>
                    <span class="metric-value" id="hydrationValue">0</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="hydrationBar" style="width: 0%"></div>
                </div>
                <div class="metric-status" id="hydrationStatus"></div>
            </div>

            <div class="metric">
                <div class="metric-header">
                    <span class="metric-name">Uniformidad del Color</span>
                    <span class="metric-value" id="uniformityValue">0</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="uniformityBar" style="width: 0%"></div>
                </div>
                <div class="metric-status" id="uniformityStatus"></div>
            </div>

            <div class="recommendations">
                <h3>Recomendaciones</h3>
                <ul id="recommendationsList"></ul>
            </div>
        </div>
    </div>

    <script>
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const previewContainer = document.getElementById('previewContainer');
        const analyzeBtn = document.getElementById('analyzeBtn');
        const loading = document.getElementById('loading');
        const results = document.getElementById('results');

        let selectedFiles = [];

        uploadArea.addEventListener('click', () => fileInput.click());

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            handleFiles(e.dataTransfer.files);
        });

        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });

        function handleFiles(files) {
            for (let file of files) {
                if (file.type.startsWith('image/')) {
                    selectedFiles.push(file);
                    addPreview(file);
                }
            }
            analyzeBtn.disabled = selectedFiles.length === 0;
        }

        function addPreview(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const div = document.createElement('div');
                div.className = 'preview-item';
                div.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <button class="remove" onclick="removeFile(${selectedFiles.length - 1})">&times;</button>
                `;
                previewContainer.appendChild(div);
            };
            reader.readAsDataURL(file);
        }

        function removeFile(index) {
            selectedFiles.splice(index, 1);
            updatePreviews();
            analyzeBtn.disabled = selectedFiles.length === 0;
        }

        function updatePreviews() {
            previewContainer.innerHTML = '';
            selectedFiles.forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const div = document.createElement('div');
                    div.className = 'preview-item';
                    div.innerHTML = `
                        <img src="${e.target.result}" alt="Preview">
                        <button class="remove" onclick="removeFile(${index})">&times;</button>
                    `;
                    previewContainer.appendChild(div);
                };
                reader.readAsDataURL(file);
            });
        }

        analyzeBtn.addEventListener('click', async () => {
            if (selectedFiles.length === 0) return;

            loading.classList.add('visible');
            results.classList.remove('visible');
            analyzeBtn.disabled = true;

            const formData = new FormData();
            selectedFiles.forEach((file, index) => {
                formData.append('images', file);
            });

            try {
                const response = await fetch('/analyze', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();
                displayResults(data);
            } catch (error) {
                alert('Error al analizar: ' + error.message);
            } finally {
                loading.classList.remove('visible');
                analyzeBtn.disabled = false;
            }
        });

        function displayResults(data) {
            if (data.error) {
                alert(data.error);
                return;
            }

            const summary = data.summary;

            document.getElementById('skinTone').textContent = summary.skin_tone.replace(/_/g, ' ');
            document.getElementById('spotsCount').textContent = summary.total_spots_detected;

            updateMetric('texture', summary.texture_score);
            updateMetric('oiliness', summary.oiliness_indicator);
            updateMetric('hydration', summary.hydration_indicator);
            updateMetric('uniformity', summary.uniformity_score);

            const recList = document.getElementById('recommendationsList');
            recList.innerHTML = data.recommendations.map(rec => `<li>${rec}</li>`).join('');

            results.classList.add('visible');
            results.scrollIntoView({ behavior: 'smooth' });
        }

        function updateMetric(name, value) {
            document.getElementById(name + 'Value').textContent = value.toFixed(1);
            const bar = document.getElementById(name + 'Bar');
            bar.style.width = value + '%';

            bar.className = 'progress-fill';
            if (value >= 70) bar.classList.add('good');
            else if (value >= 40) bar.classList.add('medium');
            else bar.classList.add('low');

            const status = document.getElementById(name + 'Status');
            if (name === 'texture') {
                status.textContent = value >= 70 ? 'Buena textura' : value >= 50 ? 'Textura moderada' : 'Textura a mejorar';
            } else if (name === 'oiliness') {
                status.textContent = value >= 60 ? 'Piel con tendencia grasa' : value >= 40 ? 'Piel mixta/normal' : 'Piel seca';
            } else if (name === 'hydration') {
                status.textContent = value >= 70 ? 'Buena hidratacion' : value >= 50 ? 'Hidratacion moderada' : 'Necesita mas hidratacion';
            } else if (name === 'uniformity') {
                status.textContent = value >= 70 ? 'Color uniforme' : value >= 50 ? 'Algunas variaciones' : 'Variaciones notables';
            }
        }
    </script>
</body>
</html>
'''

@app.route('/')
def index():
    return render_template_string(HTML_TEMPLATE)


@app.route('/analyze', methods=['POST'])
def analyze():
    if 'images' not in request.files:
        return jsonify({'error': 'No se proporcionaron imagenes'})

    files = request.files.getlist('images')
    if not files or all(f.filename == '' for f in files):
        return jsonify({'error': 'No se seleccionaron archivos'})

    temp_paths = []

    try:
        # Save uploaded files temporarily
        for file in files:
            if file.filename:
                # Create temp file
                suffix = os.path.splitext(file.filename)[1]
                fd, temp_path = tempfile.mkstemp(suffix=suffix)
                os.close(fd)
                file.save(temp_path)
                temp_paths.append(temp_path)

        if not temp_paths:
            return jsonify({'error': 'No se pudieron procesar las imagenes'})

        # Run analysis
        results = analyzer.analyze_multiple(temp_paths)

        return jsonify(results)

    except Exception as e:
        return jsonify({'error': str(e)})

    finally:
        # Clean up temp files
        for path in temp_paths:
            try:
                os.remove(path)
            except:
                pass


if __name__ == '__main__':
    print("\n" + "=" * 50)
    print("  ANALIZADOR DE SALUD DE PIEL")
    print("=" * 50)
    print("\nAbre tu navegador en: http://localhost:5000")
    print("\nPresiona Ctrl+C para detener el servidor")
    print("=" * 50 + "\n")

    app.run(host='0.0.0.0', port=5000, debug=False)
