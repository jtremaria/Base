/**
 * AI Benchmarks Comparison App
 * Compara el rendimiento de los modelos de IA más populares
 */

// ============================================
// DATA: Benchmarks Information
// ============================================

const BENCHMARKS = {
    mmlu: {
        name: "MMLU",
        fullName: "Massive Multitask Language Understanding",
        category: "knowledge",
        description: "Evalúa el conocimiento general y la capacidad de razonamiento en 57 materias académicas, desde humanidades hasta ciencias exactas.",
        maxScore: 100
    },
    humaneval: {
        name: "HumanEval",
        fullName: "Human Evaluation (Code)",
        category: "coding",
        description: "Mide la capacidad de generar código funcional en Python. Incluye 164 problemas de programación con casos de prueba.",
        maxScore: 100
    },
    gsm8k: {
        name: "GSM8K",
        fullName: "Grade School Math 8K",
        category: "math",
        description: "Evalúa la resolución de problemas matemáticos de nivel escolar que requieren múltiples pasos de razonamiento.",
        maxScore: 100
    },
    math: {
        name: "MATH",
        fullName: "Mathematics Benchmark",
        category: "math",
        description: "Problemas matemáticos de competencia de nivel preparatoria y universidad, incluyendo álgebra, geometría y cálculo.",
        maxScore: 100
    },
    hellaswag: {
        name: "HellaSwag",
        fullName: "Harder Endings, Longer contexts",
        category: "reasoning",
        description: "Evalúa el razonamiento de sentido común al predecir la continuación más probable de una situación.",
        maxScore: 100
    },
    arc: {
        name: "ARC-Challenge",
        fullName: "AI2 Reasoning Challenge",
        category: "reasoning",
        description: "Preguntas de ciencias de nivel escolar que requieren razonamiento y conocimiento científico.",
        maxScore: 100
    },
    truthfulqa: {
        name: "TruthfulQA",
        fullName: "Truthful Question Answering",
        category: "knowledge",
        description: "Mide la tendencia del modelo a generar respuestas veraces y evitar información falsa o engañosa.",
        maxScore: 100
    },
    winogrande: {
        name: "Winogrande",
        fullName: "Winograd Schema Challenge - Large",
        category: "language",
        description: "Evalúa la comprensión del lenguaje natural mediante la resolución de ambigüedades pronominales.",
        maxScore: 100
    },
    gpqa: {
        name: "GPQA",
        fullName: "Graduate-Level Google-Proof Q&A",
        category: "knowledge",
        description: "Preguntas científicas de nivel doctoral diseñadas para ser difíciles incluso con acceso a búsqueda.",
        maxScore: 100
    },
    mtbench: {
        name: "MT-Bench",
        fullName: "Multi-Turn Benchmark",
        category: "language",
        description: "Evalúa la capacidad de mantener conversaciones coherentes y útiles en múltiples turnos.",
        maxScore: 10
    },
    mbpp: {
        name: "MBPP",
        fullName: "Mostly Basic Python Problems",
        category: "coding",
        description: "Conjunto de 974 problemas de programación en Python de dificultad básica a intermedia.",
        maxScore: 100
    },
    drop: {
        name: "DROP",
        fullName: "Discrete Reasoning Over Paragraphs",
        category: "reasoning",
        description: "Requiere razonamiento numérico y comprensión lectora para responder preguntas sobre textos.",
        maxScore: 100
    }
};

// ============================================
// DATA: AI Models and their scores
// ============================================

const AI_MODELS = [
    {
        id: "gpt4o",
        name: "GPT-4o",
        company: "OpenAI",
        color: "#10a37f",
        releaseDate: "2024-05",
        description: "Modelo multimodal flagship de OpenAI con capacidades de texto, imagen y audio.",
        scores: {
            mmlu: 88.7,
            humaneval: 90.2,
            gsm8k: 95.8,
            math: 76.6,
            hellaswag: 95.3,
            arc: 96.4,
            truthfulqa: 64.2,
            winogrande: 87.5,
            gpqa: 53.6,
            mtbench: 9.3,
            mbpp: 90.5,
            drop: 83.4
        }
    },
    {
        id: "gpt4turbo",
        name: "GPT-4 Turbo",
        company: "OpenAI",
        color: "#1a7f64",
        releaseDate: "2024-04",
        description: "Versión optimizada de GPT-4 con ventana de contexto de 128K tokens.",
        scores: {
            mmlu: 86.4,
            humaneval: 87.1,
            gsm8k: 93.0,
            math: 72.2,
            hellaswag: 95.1,
            arc: 95.6,
            truthfulqa: 62.8,
            winogrande: 86.2,
            gpqa: 49.1,
            mtbench: 9.1,
            mbpp: 87.6,
            drop: 81.2
        }
    },
    {
        id: "gpt35turbo",
        name: "GPT-3.5 Turbo",
        company: "OpenAI",
        color: "#5bb98c",
        releaseDate: "2023-03",
        description: "Modelo eficiente y rápido, ideal para tareas que no requieren el máximo rendimiento.",
        scores: {
            mmlu: 70.0,
            humaneval: 72.6,
            gsm8k: 77.4,
            math: 34.1,
            hellaswag: 85.5,
            arc: 85.2,
            truthfulqa: 47.0,
            winogrande: 81.6,
            gpqa: 28.2,
            mtbench: 7.9,
            mbpp: 77.4,
            drop: 64.1
        }
    },
    {
        id: "claude35sonnet",
        name: "Claude 3.5 Sonnet",
        company: "Anthropic",
        color: "#d97706",
        releaseDate: "2024-06",
        description: "Modelo equilibrado de Anthropic con excelente rendimiento en código y razonamiento.",
        scores: {
            mmlu: 88.7,
            humaneval: 92.0,
            gsm8k: 96.4,
            math: 71.1,
            hellaswag: 94.8,
            arc: 96.7,
            truthfulqa: 68.5,
            winogrande: 88.2,
            gpqa: 59.4,
            mtbench: 9.4,
            mbpp: 91.0,
            drop: 87.1
        }
    },
    {
        id: "claude3opus",
        name: "Claude 3 Opus",
        company: "Anthropic",
        color: "#b45309",
        releaseDate: "2024-03",
        description: "El modelo más potente de Anthropic, optimizado para tareas complejas de razonamiento.",
        scores: {
            mmlu: 86.8,
            humaneval: 84.9,
            gsm8k: 95.0,
            math: 60.1,
            hellaswag: 95.4,
            arc: 96.4,
            truthfulqa: 72.1,
            winogrande: 88.5,
            gpqa: 50.4,
            mtbench: 9.0,
            mbpp: 86.2,
            drop: 83.1
        }
    },
    {
        id: "claude3haiku",
        name: "Claude 3 Haiku",
        company: "Anthropic",
        color: "#fbbf24",
        releaseDate: "2024-03",
        description: "Modelo ligero y rápido de Anthropic para tareas que requieren baja latencia.",
        scores: {
            mmlu: 75.2,
            humaneval: 75.9,
            gsm8k: 88.9,
            math: 38.9,
            hellaswag: 85.9,
            arc: 89.2,
            truthfulqa: 56.2,
            winogrande: 74.7,
            gpqa: 33.3,
            mtbench: 8.1,
            mbpp: 80.4,
            drop: 68.3
        }
    },
    {
        id: "gemini15pro",
        name: "Gemini 1.5 Pro",
        company: "Google",
        color: "#4285f4",
        releaseDate: "2024-02",
        description: "Modelo multimodal de Google con ventana de contexto de hasta 1M tokens.",
        scores: {
            mmlu: 85.9,
            humaneval: 84.1,
            gsm8k: 91.7,
            math: 67.7,
            hellaswag: 92.5,
            arc: 94.4,
            truthfulqa: 60.1,
            winogrande: 85.1,
            gpqa: 46.2,
            mtbench: 9.0,
            mbpp: 84.2,
            drop: 78.9
        }
    },
    {
        id: "gemini20flash",
        name: "Gemini 2.0 Flash",
        company: "Google",
        color: "#34a853",
        releaseDate: "2024-12",
        description: "Última versión de Gemini optimizada para velocidad y eficiencia.",
        scores: {
            mmlu: 87.5,
            humaneval: 89.2,
            gsm8k: 94.1,
            math: 73.1,
            hellaswag: 93.8,
            arc: 95.8,
            truthfulqa: 65.8,
            winogrande: 86.7,
            gpqa: 55.2,
            mtbench: 9.2,
            mbpp: 88.6,
            drop: 82.4
        }
    },
    {
        id: "llama31405b",
        name: "Llama 3.1 405B",
        company: "Meta",
        color: "#0668E1",
        releaseDate: "2024-07",
        description: "El modelo open-source más grande de Meta con 405 mil millones de parámetros.",
        scores: {
            mmlu: 87.3,
            humaneval: 89.0,
            gsm8k: 96.8,
            math: 73.8,
            hellaswag: 94.9,
            arc: 96.1,
            truthfulqa: 58.4,
            winogrande: 86.8,
            gpqa: 50.7,
            mtbench: 9.1,
            mbpp: 88.6,
            drop: 84.8
        }
    },
    {
        id: "llama3170b",
        name: "Llama 3.1 70B",
        company: "Meta",
        color: "#4599e8",
        releaseDate: "2024-07",
        description: "Versión de 70B parámetros, equilibrio entre rendimiento y eficiencia.",
        scores: {
            mmlu: 83.6,
            humaneval: 80.5,
            gsm8k: 93.0,
            math: 64.1,
            hellaswag: 93.2,
            arc: 94.8,
            truthfulqa: 52.3,
            winogrande: 84.9,
            gpqa: 41.7,
            mtbench: 8.6,
            mbpp: 82.3,
            drop: 79.6
        }
    },
    {
        id: "mistrallarge",
        name: "Mistral Large",
        company: "Mistral AI",
        color: "#ff7000",
        releaseDate: "2024-02",
        description: "Modelo flagship de Mistral AI con fuerte rendimiento en razonamiento y código.",
        scores: {
            mmlu: 84.0,
            humaneval: 81.2,
            gsm8k: 91.2,
            math: 62.2,
            hellaswag: 89.2,
            arc: 94.0,
            truthfulqa: 54.6,
            winogrande: 84.7,
            gpqa: 44.1,
            mtbench: 8.7,
            mbpp: 80.5,
            drop: 76.3
        }
    },
    {
        id: "mixtral8x22b",
        name: "Mixtral 8x22B",
        company: "Mistral AI",
        color: "#ff9d4d",
        releaseDate: "2024-04",
        description: "Modelo Mixture of Experts con arquitectura sparse de 176B parámetros totales.",
        scores: {
            mmlu: 77.8,
            humaneval: 75.4,
            gsm8k: 87.9,
            math: 49.8,
            hellaswag: 88.4,
            arc: 91.3,
            truthfulqa: 50.2,
            winogrande: 82.1,
            gpqa: 36.2,
            mtbench: 8.4,
            mbpp: 78.6,
            drop: 73.2
        }
    },
    {
        id: "qwen25_72b",
        name: "Qwen 2.5 72B",
        company: "Alibaba",
        color: "#6236ff",
        releaseDate: "2024-09",
        description: "Modelo multilingüe de Alibaba con excelente rendimiento en chino e inglés.",
        scores: {
            mmlu: 86.1,
            humaneval: 86.4,
            gsm8k: 93.2,
            math: 72.5,
            hellaswag: 92.8,
            arc: 95.2,
            truthfulqa: 61.5,
            winogrande: 85.3,
            gpqa: 49.0,
            mtbench: 8.9,
            mbpp: 85.7,
            drop: 80.1
        }
    },
    {
        id: "deepseekv3",
        name: "DeepSeek V3",
        company: "DeepSeek",
        color: "#00d4aa",
        releaseDate: "2024-12",
        description: "Modelo MoE de DeepSeek con 671B parámetros totales y excelente eficiencia.",
        scores: {
            mmlu: 88.5,
            humaneval: 91.6,
            gsm8k: 96.2,
            math: 75.9,
            hellaswag: 94.2,
            arc: 96.0,
            truthfulqa: 63.8,
            winogrande: 87.1,
            gpqa: 58.1,
            mtbench: 9.2,
            mbpp: 90.2,
            drop: 85.6
        }
    },
    {
        id: "commandrplus",
        name: "Command R+",
        company: "Cohere",
        color: "#d946ef",
        releaseDate: "2024-04",
        description: "Modelo empresarial de Cohere optimizado para RAG y aplicaciones de búsqueda.",
        scores: {
            mmlu: 75.7,
            humaneval: 72.0,
            gsm8k: 84.2,
            math: 47.8,
            hellaswag: 86.5,
            arc: 89.8,
            truthfulqa: 54.2,
            winogrande: 80.2,
            gpqa: 35.8,
            mtbench: 8.2,
            mbpp: 75.1,
            drop: 70.4
        }
    }
];

// ============================================
// APP STATE
// ============================================

const state = {
    selectedModels: AI_MODELS.map(m => m.id),
    selectedBenchmark: 'all',
    selectedCategory: 'all',
    sortBy: 'score',
    currentView: 'chart'
};

// ============================================
// CANVAS CHART RENDERER
// ============================================

class ChartRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.tooltip = null;
        this.setupCanvas();
        this.setupEvents();
    }

    setupCanvas() {
        const container = this.canvas.parentElement;
        const dpr = window.devicePixelRatio || 1;
        const rect = container.getBoundingClientRect();

        this.canvas.width = rect.width * dpr;
        this.canvas.height = 500 * dpr;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = '500px';

        this.ctx.scale(dpr, dpr);
        this.width = rect.width;
        this.height = 500;
    }

    setupEvents() {
        window.addEventListener('resize', () => {
            this.setupCanvas();
            this.render(this.lastData);
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (this.bars) {
                const rect = this.canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                this.handleHover(x, y);
            }
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.hideTooltip();
        });
    }

    handleHover(x, y) {
        let found = false;
        for (const bar of this.bars) {
            if (x >= bar.x && x <= bar.x + bar.width &&
                y >= bar.y && y <= bar.y + bar.height) {
                this.showTooltip(bar, x, y);
                found = true;
                break;
            }
        }
        if (!found) {
            this.hideTooltip();
        }
    }

    showTooltip(bar, x, y) {
        if (!this.tooltip) {
            this.tooltip = document.createElement('div');
            this.tooltip.className = 'tooltip';
            document.body.appendChild(this.tooltip);
        }

        const benchmark = BENCHMARKS[bar.benchmarkId];
        const maxScore = benchmark ? benchmark.maxScore : 100;

        this.tooltip.innerHTML = `
            <div class="tooltip-title">${bar.modelName}</div>
            <div>${bar.benchmarkName}</div>
            <div class="tooltip-value">${bar.value.toFixed(1)}${maxScore === 10 ? '/10' : '%'}</div>
        `;

        const rect = this.canvas.getBoundingClientRect();
        this.tooltip.style.display = 'block';
        this.tooltip.style.left = (rect.left + x + 10) + 'px';
        this.tooltip.style.top = (rect.top + y - 60) + 'px';
    }

    hideTooltip() {
        if (this.tooltip) {
            this.tooltip.style.display = 'none';
        }
    }

    render(data) {
        this.lastData = data;
        this.bars = [];

        const ctx = this.ctx;
        const { models, benchmarks } = data;

        // Clear canvas
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, this.width, this.height);

        if (models.length === 0 || benchmarks.length === 0) {
            ctx.fillStyle = '#94a3b8';
            ctx.font = '16px Segoe UI';
            ctx.textAlign = 'center';
            ctx.fillText('Selecciona al menos un modelo y benchmark', this.width / 2, this.height / 2);
            return;
        }

        const padding = { top: 40, right: 30, bottom: 100, left: 60 };
        const chartWidth = this.width - padding.left - padding.right;
        const chartHeight = this.height - padding.top - padding.bottom;

        // Calculate bar dimensions
        const groupWidth = chartWidth / benchmarks.length;
        const barWidth = Math.min((groupWidth - 20) / models.length, 40);
        const groupPadding = (groupWidth - barWidth * models.length) / 2;

        // Draw grid lines
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = padding.top + (chartHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(this.width - padding.right, y);
            ctx.stroke();

            // Y-axis labels
            ctx.fillStyle = '#94a3b8';
            ctx.font = '12px Segoe UI';
            ctx.textAlign = 'right';
            const value = 100 - (i * 20);
            ctx.fillText(value.toString(), padding.left - 10, y + 4);
        }

        // Draw bars
        benchmarks.forEach((benchmarkId, bIndex) => {
            const benchmark = BENCHMARKS[benchmarkId];
            const maxScore = benchmark ? benchmark.maxScore : 100;
            const groupX = padding.left + bIndex * groupWidth + groupPadding;

            models.forEach((model, mIndex) => {
                const score = model.scores[benchmarkId];
                if (score === undefined) return;

                const normalizedScore = maxScore === 10 ? score * 10 : score;
                const barHeight = (normalizedScore / 100) * chartHeight;
                const x = groupX + mIndex * barWidth;
                const y = padding.top + chartHeight - barHeight;

                // Draw bar
                ctx.fillStyle = model.color;
                ctx.beginPath();
                ctx.roundRect(x, y, barWidth - 2, barHeight, [4, 4, 0, 0]);
                ctx.fill();

                // Store bar for hover detection
                this.bars.push({
                    x: x,
                    y: y,
                    width: barWidth - 2,
                    height: barHeight,
                    modelName: model.name,
                    benchmarkId: benchmarkId,
                    benchmarkName: benchmark ? benchmark.name : benchmarkId,
                    value: score
                });
            });

            // X-axis labels
            ctx.fillStyle = '#94a3b8';
            ctx.font = '11px Segoe UI';
            ctx.textAlign = 'center';
            ctx.save();
            ctx.translate(groupX + (models.length * barWidth) / 2, this.height - padding.bottom + 15);
            ctx.rotate(-Math.PI / 4);
            ctx.fillText(benchmark ? benchmark.name : benchmarkId, 0, 0);
            ctx.restore();
        });

        // Draw Y-axis title
        ctx.fillStyle = '#94a3b8';
        ctx.font = '13px Segoe UI';
        ctx.save();
        ctx.translate(15, this.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Puntuación (%)', 0, 0);
        ctx.restore();
    }
}

// ============================================
// UI FUNCTIONS
// ============================================

function initializeUI() {
    populateBenchmarkSelect();
    populateModelCheckboxes();
    setupEventListeners();
    updateLegend();
    renderBenchmarkInfo();
    renderModelCards();
    updateVisualization();
}

function populateBenchmarkSelect() {
    const select = document.getElementById('benchmark-select');
    Object.entries(BENCHMARKS).forEach(([id, benchmark]) => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = `${benchmark.name} (${getCategoryLabel(benchmark.category)})`;
        select.appendChild(option);
    });
}

function populateModelCheckboxes() {
    const container = document.getElementById('model-checkboxes');
    container.innerHTML = '';

    AI_MODELS.forEach(model => {
        const item = document.createElement('label');
        item.className = `checkbox-item ${state.selectedModels.includes(model.id) ? 'checked' : ''}`;
        item.innerHTML = `
            <input type="checkbox" value="${model.id}" ${state.selectedModels.includes(model.id) ? 'checked' : ''}>
            <span class="model-color" style="background: ${model.color}"></span>
            <span>${model.name}</span>
        `;

        const checkbox = item.querySelector('input');
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                state.selectedModels.push(model.id);
                item.classList.add('checked');
            } else {
                state.selectedModels = state.selectedModels.filter(id => id !== model.id);
                item.classList.remove('checked');
            }
            updateVisualization();
        });

        container.appendChild(item);
    });
}

function setupEventListeners() {
    // Benchmark select
    document.getElementById('benchmark-select').addEventListener('change', (e) => {
        state.selectedBenchmark = e.target.value;
        updateVisualization();
    });

    // Category select
    document.getElementById('category-select').addEventListener('change', (e) => {
        state.selectedCategory = e.target.value;
        updateVisualization();
    });

    // Sort select
    document.getElementById('sort-select').addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        updateVisualization();
    });

    // View toggle
    document.getElementById('chart-view-btn').addEventListener('click', () => {
        state.currentView = 'chart';
        document.getElementById('chart-view-btn').classList.add('active');
        document.getElementById('table-view-btn').classList.remove('active');
        document.getElementById('chart-view').classList.add('active');
        document.getElementById('table-view').classList.remove('active');
    });

    document.getElementById('table-view-btn').addEventListener('click', () => {
        state.currentView = 'table';
        document.getElementById('table-view-btn').classList.add('active');
        document.getElementById('chart-view-btn').classList.remove('active');
        document.getElementById('table-view').classList.add('active');
        document.getElementById('chart-view').classList.remove('active');
        renderTable();
    });

    // Select all / Deselect all
    document.getElementById('select-all-btn').addEventListener('click', () => {
        state.selectedModels = AI_MODELS.map(m => m.id);
        document.querySelectorAll('.checkbox-item').forEach(item => {
            item.classList.add('checked');
            item.querySelector('input').checked = true;
        });
        updateVisualization();
    });

    document.getElementById('deselect-all-btn').addEventListener('click', () => {
        state.selectedModels = [];
        document.querySelectorAll('.checkbox-item').forEach(item => {
            item.classList.remove('checked');
            item.querySelector('input').checked = false;
        });
        updateVisualization();
    });
}

function getCategoryLabel(category) {
    const labels = {
        reasoning: 'Razonamiento',
        coding: 'Programación',
        math: 'Matemáticas',
        knowledge: 'Conocimiento',
        language: 'Lenguaje'
    };
    return labels[category] || category;
}

function getFilteredBenchmarks() {
    let benchmarks = Object.keys(BENCHMARKS);

    if (state.selectedBenchmark !== 'all') {
        benchmarks = [state.selectedBenchmark];
    } else if (state.selectedCategory !== 'all') {
        benchmarks = benchmarks.filter(id => BENCHMARKS[id].category === state.selectedCategory);
    }

    return benchmarks;
}

function getFilteredModels() {
    let models = AI_MODELS.filter(m => state.selectedModels.includes(m.id));

    if (state.sortBy === 'score') {
        const benchmarks = getFilteredBenchmarks();
        models.sort((a, b) => {
            const avgA = benchmarks.reduce((sum, id) => sum + (a.scores[id] || 0), 0) / benchmarks.length;
            const avgB = benchmarks.reduce((sum, id) => sum + (b.scores[id] || 0), 0) / benchmarks.length;
            return avgB - avgA;
        });
    } else if (state.sortBy === 'name') {
        models.sort((a, b) => a.name.localeCompare(b.name));
    } else if (state.sortBy === 'company') {
        models.sort((a, b) => a.company.localeCompare(b.company) || a.name.localeCompare(b.name));
    }

    return models;
}

function updateVisualization() {
    const models = getFilteredModels();
    const benchmarks = getFilteredBenchmarks();

    if (window.chartRenderer) {
        window.chartRenderer.render({ models, benchmarks });
    }

    updateLegend();

    if (state.currentView === 'table') {
        renderTable();
    }
}

function updateLegend() {
    const legend = document.getElementById('chart-legend');
    const models = getFilteredModels();

    legend.innerHTML = models.map(model => `
        <div class="legend-item">
            <span class="legend-color" style="background: ${model.color}"></span>
            <span>${model.name}</span>
        </div>
    `).join('');
}

function renderTable() {
    const models = getFilteredModels();
    const benchmarks = getFilteredBenchmarks();

    // Header
    const header = document.getElementById('table-header');
    header.innerHTML = `
        <th>Modelo</th>
        <th>Compañía</th>
        ${benchmarks.map(id => `<th>${BENCHMARKS[id].name}</th>`).join('')}
        <th>Promedio</th>
    `;

    // Body
    const body = document.getElementById('table-body');
    body.innerHTML = models.map(model => {
        const scores = benchmarks.map(id => {
            const score = model.scores[id];
            const maxScore = BENCHMARKS[id].maxScore;
            const normalized = maxScore === 10 ? score * 10 : score;
            return { score, normalized, maxScore };
        });

        const avg = scores.reduce((sum, s) => sum + s.normalized, 0) / scores.length;

        return `
            <tr>
                <td>
                    <span class="model-badge">
                        <span class="color-dot" style="background: ${model.color}"></span>
                        ${model.name}
                    </span>
                </td>
                <td>${model.company}</td>
                ${scores.map(s => `
                    <td class="score-cell">
                        <span class="score-bar" style="width: ${s.normalized}%; background: ${model.color}"></span>
                        <span class="score-value ${getScoreClass(s.normalized)}">
                            ${s.score !== undefined ? s.score.toFixed(1) : 'N/A'}${s.maxScore === 10 ? '' : '%'}
                        </span>
                    </td>
                `).join('')}
                <td class="score-cell">
                    <span class="score-value ${getScoreClass(avg)}">${avg.toFixed(1)}%</span>
                </td>
            </tr>
        `;
    }).join('');
}

function getScoreClass(score) {
    if (score >= 85) return 'score-high';
    if (score >= 70) return 'score-medium';
    return 'score-low';
}

function renderBenchmarkInfo() {
    const container = document.getElementById('benchmark-descriptions');
    container.innerHTML = Object.entries(BENCHMARKS).map(([id, benchmark]) => `
        <div class="info-card">
            <h4>${benchmark.name}</h4>
            <span class="category-tag">${getCategoryLabel(benchmark.category)}</span>
            <p><strong>${benchmark.fullName}</strong></p>
            <p>${benchmark.description}</p>
        </div>
    `).join('');
}

function renderModelCards() {
    const container = document.getElementById('model-cards');
    const benchmarks = Object.keys(BENCHMARKS);

    container.innerHTML = AI_MODELS.map(model => {
        const avgScore = benchmarks.reduce((sum, id) => {
            const score = model.scores[id];
            const maxScore = BENCHMARKS[id].maxScore;
            return sum + (maxScore === 10 ? score * 10 : score);
        }, 0) / benchmarks.length;

        const bestBenchmark = benchmarks.reduce((best, id) => {
            const score = model.scores[id];
            const maxScore = BENCHMARKS[id].maxScore;
            const normalized = maxScore === 10 ? score * 10 : score;
            if (!best || normalized > best.normalized) {
                return { id, score, normalized, name: BENCHMARKS[id].name };
            }
            return best;
        }, null);

        return `
            <div class="model-card" style="border-left: 4px solid ${model.color}">
                <div class="model-card-header">
                    <div class="model-card-color" style="background: ${model.color}20; color: ${model.color}">
                        🤖
                    </div>
                    <div>
                        <h4>${model.name}</h4>
                        <span class="company">${model.company}</span>
                    </div>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 10px;">
                    ${model.description}
                </p>
                <div class="stats">
                    <div class="stat">
                        <span class="stat-label">Promedio: </span>
                        <span class="stat-value">${avgScore.toFixed(1)}%</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Mejor en: </span>
                        <span class="stat-value">${bestBenchmark.name}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Lanzamiento: </span>
                        <span class="stat-value">${model.releaseDate}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize chart renderer
    const canvas = document.getElementById('benchmark-chart');
    window.chartRenderer = new ChartRenderer(canvas);

    // Initialize UI
    initializeUI();
});
