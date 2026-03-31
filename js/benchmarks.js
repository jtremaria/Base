/**
 * AI Benchmarks Comparison App
 * Compara el rendimiento de los modelos de IA más populares
 * Datos actualizados a Enero 2025
 */

// ============================================
// DATA: Benchmarks Information
// ============================================

const BENCHMARKS = {
    mmlu_pro: {
        name: "MMLU-Pro",
        fullName: "MMLU Professional",
        category: "knowledge",
        description: "Versión mejorada de MMLU con preguntas más difíciles y 10 opciones en lugar de 4. Evalúa conocimiento experto en múltiples dominios.",
        maxScore: 100
    },
    gpqa_diamond: {
        name: "GPQA Diamond",
        fullName: "Graduate-Level Google-Proof Q&A (Diamond)",
        category: "knowledge",
        description: "Preguntas científicas de nivel doctoral en física, química y biología. Diseñadas para ser difíciles incluso para expertos.",
        maxScore: 100
    },
    simpleqa: {
        name: "SimpleQA",
        fullName: "Simple Question Answering",
        category: "knowledge",
        description: "Benchmark de OpenAI que mide la precisión factual. Evalúa si los modelos dan respuestas correctas a preguntas simples de hechos.",
        maxScore: 100
    },
    humaneval: {
        name: "HumanEval",
        fullName: "Human Evaluation (Code)",
        category: "coding",
        description: "Mide la capacidad de generar código funcional en Python. Incluye 164 problemas de programación con casos de prueba.",
        maxScore: 100
    },
    swe_bench: {
        name: "SWE-bench",
        fullName: "Software Engineering Benchmark",
        category: "coding",
        description: "Evalúa la capacidad de resolver issues reales de GitHub. Los modelos deben entender y modificar código en repositorios reales.",
        maxScore: 100
    },
    livecode_bench: {
        name: "LiveCodeBench",
        fullName: "Live Code Benchmark",
        category: "coding",
        description: "Benchmark de código actualizado continuamente con problemas nuevos de competencias de programación.",
        maxScore: 100
    },
    math_500: {
        name: "MATH-500",
        fullName: "Mathematics 500",
        category: "math",
        description: "Subconjunto de 500 problemas del benchmark MATH, cubriendo álgebra, geometría, teoría de números y más.",
        maxScore: 100
    },
    aime_2024: {
        name: "AIME 2024",
        fullName: "American Invitational Mathematics Examination",
        category: "math",
        description: "Problemas de la competencia AIME 2024. Matemáticas de competencia de nivel preparatoria avanzado.",
        maxScore: 100
    },
    gsm8k: {
        name: "GSM8K",
        fullName: "Grade School Math 8K",
        category: "math",
        description: "Problemas matemáticos de nivel escolar que requieren múltiples pasos de razonamiento.",
        maxScore: 100
    },
    arc_challenge: {
        name: "ARC-C",
        fullName: "AI2 Reasoning Challenge",
        category: "reasoning",
        description: "Preguntas de ciencias de nivel escolar que requieren razonamiento y conocimiento científico.",
        maxScore: 100
    },
    ifeval: {
        name: "IFEval",
        fullName: "Instruction Following Evaluation",
        category: "reasoning",
        description: "Mide qué tan bien los modelos siguen instrucciones específicas y restricciones de formato.",
        maxScore: 100
    },
    mmlu: {
        name: "MMLU",
        fullName: "Massive Multitask Language Understanding",
        category: "knowledge",
        description: "Evalúa conocimiento general en 57 materias académicas. Benchmark clásico ampliamente usado.",
        maxScore: 100
    },
    arena_hard: {
        name: "Arena-Hard",
        fullName: "Chatbot Arena Hard Auto",
        category: "language",
        description: "Benchmark derivado de Chatbot Arena con preguntas difíciles. Usa GPT-4 como juez automatizado.",
        maxScore: 100
    },
    mt_bench: {
        name: "MT-Bench",
        fullName: "Multi-Turn Benchmark",
        category: "language",
        description: "Evalúa conversaciones de múltiples turnos en diferentes categorías como razonamiento y creatividad.",
        maxScore: 10
    }
};

// ============================================
// DATA: AI Models and their scores (Enero 2025)
// ============================================

const AI_MODELS = [
    // ===== OpenAI =====
    {
        id: "o1",
        name: "o1",
        company: "OpenAI",
        color: "#10a37f",
        releaseDate: "2024-12",
        description: "Modelo de razonamiento avanzado de OpenAI. Usa 'chain of thought' interno para problemas complejos.",
        scores: {
            mmlu_pro: 83.8,
            gpqa_diamond: 78.0,
            simpleqa: 47.0,
            humaneval: 92.4,
            swe_bench: 48.9,
            livecode_bench: 63.4,
            math_500: 96.4,
            aime_2024: 83.3,
            gsm8k: 97.2,
            arc_challenge: 97.8,
            ifeval: 91.2,
            mmlu: 92.3,
            arena_hard: 92.4,
            mt_bench: 9.5
        }
    },
    {
        id: "o1_mini",
        name: "o1-mini",
        company: "OpenAI",
        color: "#1a9f75",
        releaseDate: "2024-09",
        description: "Versión más rápida y económica de o1, optimizada para tareas de código y STEM.",
        scores: {
            mmlu_pro: 80.3,
            gpqa_diamond: 60.0,
            simpleqa: 29.0,
            humaneval: 92.4,
            swe_bench: 29.3,
            livecode_bench: 56.2,
            math_500: 90.0,
            aime_2024: 56.7,
            gsm8k: 94.8,
            arc_challenge: 96.2,
            ifeval: 85.8,
            mmlu: 85.2,
            arena_hard: 80.1,
            mt_bench: 9.1
        }
    },
    {
        id: "gpt4o",
        name: "GPT-4o",
        company: "OpenAI",
        color: "#2dd4bf",
        releaseDate: "2024-05",
        description: "Modelo multimodal flagship de OpenAI con capacidades de texto, imagen y audio.",
        scores: {
            mmlu_pro: 72.6,
            gpqa_diamond: 53.6,
            simpleqa: 38.4,
            humaneval: 90.2,
            swe_bench: 33.2,
            livecode_bench: 43.1,
            math_500: 76.6,
            aime_2024: 36.7,
            gsm8k: 95.8,
            arc_challenge: 96.4,
            ifeval: 84.3,
            mmlu: 88.7,
            arena_hard: 82.6,
            mt_bench: 9.3
        }
    },
    {
        id: "gpt4o_mini",
        name: "GPT-4o mini",
        company: "OpenAI",
        color: "#5eead4",
        releaseDate: "2024-07",
        description: "Versión compacta y económica de GPT-4o para aplicaciones de alto volumen.",
        scores: {
            mmlu_pro: 63.1,
            gpqa_diamond: 40.2,
            simpleqa: 24.1,
            humaneval: 87.0,
            swe_bench: 23.8,
            livecode_bench: 38.2,
            math_500: 70.2,
            aime_2024: 23.3,
            gsm8k: 93.2,
            arc_challenge: 93.1,
            ifeval: 80.1,
            mmlu: 82.0,
            arena_hard: 74.8,
            mt_bench: 8.7
        }
    },
    // ===== Anthropic =====
    {
        id: "claude_35_sonnet",
        name: "Claude 3.5 Sonnet",
        company: "Anthropic",
        color: "#d97706",
        releaseDate: "2024-10",
        description: "Modelo flagship de Anthropic (v2). Excelente en código, razonamiento y seguimiento de instrucciones.",
        scores: {
            mmlu_pro: 78.0,
            gpqa_diamond: 65.0,
            simpleqa: 28.1,
            humaneval: 93.7,
            swe_bench: 49.0,
            livecode_bench: 52.8,
            math_500: 78.3,
            aime_2024: 26.7,
            gsm8k: 96.4,
            arc_challenge: 96.7,
            ifeval: 90.1,
            mmlu: 88.7,
            arena_hard: 85.2,
            mt_bench: 9.4
        }
    },
    {
        id: "claude_35_haiku",
        name: "Claude 3.5 Haiku",
        company: "Anthropic",
        color: "#fbbf24",
        releaseDate: "2024-10",
        description: "Modelo rápido y económico de Anthropic. Ideal para tareas que requieren baja latencia.",
        scores: {
            mmlu_pro: 65.0,
            gpqa_diamond: 41.6,
            simpleqa: 18.2,
            humaneval: 88.1,
            swe_bench: 40.6,
            livecode_bench: 41.2,
            math_500: 69.3,
            aime_2024: 16.7,
            gsm8k: 92.0,
            arc_challenge: 93.8,
            ifeval: 82.4,
            mmlu: 78.2,
            arena_hard: 68.4,
            mt_bench: 8.5
        }
    },
    {
        id: "claude_3_opus",
        name: "Claude 3 Opus",
        company: "Anthropic",
        color: "#b45309",
        releaseDate: "2024-03",
        description: "Modelo más potente de la generación Claude 3. Optimizado para tareas complejas.",
        scores: {
            mmlu_pro: 72.5,
            gpqa_diamond: 50.4,
            simpleqa: 24.5,
            humaneval: 84.9,
            swe_bench: 22.0,
            livecode_bench: 35.8,
            math_500: 60.1,
            aime_2024: 16.7,
            gsm8k: 95.0,
            arc_challenge: 96.4,
            ifeval: 83.2,
            mmlu: 86.8,
            arena_hard: 72.1,
            mt_bench: 9.0
        }
    },
    // ===== Google =====
    {
        id: "gemini_2_flash",
        name: "Gemini 2.0 Flash",
        company: "Google",
        color: "#4285f4",
        releaseDate: "2024-12",
        description: "Última versión de Gemini. Modelo multimodal con capacidad nativa de ejecución de código.",
        scores: {
            mmlu_pro: 76.4,
            gpqa_diamond: 62.1,
            simpleqa: 26.3,
            humaneval: 89.2,
            swe_bench: 32.1,
            livecode_bench: 48.6,
            math_500: 80.2,
            aime_2024: 43.3,
            gsm8k: 94.1,
            arc_challenge: 95.8,
            ifeval: 87.2,
            mmlu: 87.5,
            arena_hard: 80.4,
            mt_bench: 9.2
        }
    },
    {
        id: "gemini_15_pro",
        name: "Gemini 1.5 Pro",
        company: "Google",
        color: "#34a853",
        releaseDate: "2024-02",
        description: "Modelo multimodal con ventana de contexto de hasta 2M tokens.",
        scores: {
            mmlu_pro: 75.8,
            gpqa_diamond: 58.6,
            simpleqa: 22.1,
            humaneval: 84.1,
            swe_bench: 28.8,
            livecode_bench: 42.3,
            math_500: 74.1,
            aime_2024: 26.7,
            gsm8k: 91.7,
            arc_challenge: 94.4,
            ifeval: 86.5,
            mmlu: 85.9,
            arena_hard: 78.2,
            mt_bench: 9.0
        }
    },
    // ===== Meta =====
    {
        id: "llama_33_70b",
        name: "Llama 3.3 70B",
        company: "Meta",
        color: "#0668E1",
        releaseDate: "2024-12",
        description: "Última versión de Llama. Rendimiento comparable a Llama 3.1 405B en un modelo más pequeño.",
        scores: {
            mmlu_pro: 68.9,
            gpqa_diamond: 50.5,
            simpleqa: 19.0,
            humaneval: 88.4,
            swe_bench: 26.2,
            livecode_bench: 44.8,
            math_500: 77.0,
            aime_2024: 26.7,
            gsm8k: 94.2,
            arc_challenge: 94.8,
            ifeval: 92.1,
            mmlu: 86.3,
            arena_hard: 70.2,
            mt_bench: 8.8
        }
    },
    {
        id: "llama_31_405b",
        name: "Llama 3.1 405B",
        company: "Meta",
        color: "#4599e8",
        releaseDate: "2024-07",
        description: "El modelo open-source más grande de Meta con 405B parámetros.",
        scores: {
            mmlu_pro: 73.4,
            gpqa_diamond: 51.1,
            simpleqa: 21.4,
            humaneval: 89.0,
            swe_bench: 29.6,
            livecode_bench: 43.2,
            math_500: 73.8,
            aime_2024: 23.3,
            gsm8k: 96.8,
            arc_challenge: 96.1,
            ifeval: 88.6,
            mmlu: 87.3,
            arena_hard: 74.5,
            mt_bench: 9.1
        }
    },
    // ===== xAI =====
    {
        id: "grok_2",
        name: "Grok-2",
        company: "xAI",
        color: "#1d9bf0",
        releaseDate: "2024-08",
        description: "Modelo flagship de xAI. Acceso a información en tiempo real a través de X (Twitter).",
        scores: {
            mmlu_pro: 76.2,
            gpqa_diamond: 56.4,
            simpleqa: 32.8,
            humaneval: 88.4,
            swe_bench: 31.2,
            livecode_bench: 45.6,
            math_500: 76.1,
            aime_2024: 33.3,
            gsm8k: 93.8,
            arc_challenge: 95.2,
            ifeval: 85.8,
            mmlu: 87.5,
            arena_hard: 80.1,
            mt_bench: 9.1
        }
    },
    // ===== DeepSeek =====
    {
        id: "deepseek_v3",
        name: "DeepSeek V3",
        company: "DeepSeek",
        color: "#00d4aa",
        releaseDate: "2024-12",
        description: "Modelo MoE con 671B parámetros totales. Excelente relación rendimiento/costo.",
        scores: {
            mmlu_pro: 81.2,
            gpqa_diamond: 59.1,
            simpleqa: 24.9,
            humaneval: 91.6,
            swe_bench: 42.0,
            livecode_bench: 55.8,
            math_500: 84.6,
            aime_2024: 39.2,
            gsm8k: 96.2,
            arc_challenge: 96.0,
            ifeval: 87.3,
            mmlu: 88.5,
            arena_hard: 85.6,
            mt_bench: 9.2
        }
    },
    {
        id: "deepseek_r1_lite",
        name: "DeepSeek R1-Lite",
        company: "DeepSeek",
        color: "#00b894",
        releaseDate: "2024-11",
        description: "Modelo de razonamiento de DeepSeek. Competidor directo de o1-preview.",
        scores: {
            mmlu_pro: 79.8,
            gpqa_diamond: 58.5,
            simpleqa: 22.3,
            humaneval: 89.8,
            swe_bench: 38.4,
            livecode_bench: 51.2,
            math_500: 91.6,
            aime_2024: 52.5,
            gsm8k: 95.8,
            arc_challenge: 95.6,
            ifeval: 84.2,
            mmlu: 85.4,
            arena_hard: 82.4,
            mt_bench: 9.0
        }
    },
    // ===== Mistral =====
    {
        id: "mistral_large_2",
        name: "Mistral Large 2",
        company: "Mistral AI",
        color: "#ff7000",
        releaseDate: "2024-07",
        description: "Modelo flagship de Mistral con 123B parámetros. Fuerte en código y razonamiento.",
        scores: {
            mmlu_pro: 69.4,
            gpqa_diamond: 53.1,
            simpleqa: 21.5,
            humaneval: 92.1,
            swe_bench: 28.8,
            livecode_bench: 44.2,
            math_500: 69.1,
            aime_2024: 20.0,
            gsm8k: 93.8,
            arc_challenge: 94.0,
            ifeval: 85.2,
            mmlu: 84.0,
            arena_hard: 76.2,
            mt_bench: 8.8
        }
    },
    // ===== Alibaba =====
    {
        id: "qwen_25_72b",
        name: "Qwen 2.5 72B",
        company: "Alibaba",
        color: "#6236ff",
        releaseDate: "2024-09",
        description: "Modelo multilingüe de Alibaba. Excelente en chino e inglés, fuerte en código.",
        scores: {
            mmlu_pro: 71.1,
            gpqa_diamond: 49.0,
            simpleqa: 18.4,
            humaneval: 86.4,
            swe_bench: 30.2,
            livecode_bench: 48.6,
            math_500: 80.0,
            aime_2024: 30.0,
            gsm8k: 93.2,
            arc_challenge: 95.2,
            ifeval: 86.8,
            mmlu: 86.1,
            arena_hard: 72.1,
            mt_bench: 8.9
        }
    },
    {
        id: "qwen_coder_25",
        name: "Qwen2.5-Coder 32B",
        company: "Alibaba",
        color: "#8b5cf6",
        releaseDate: "2024-11",
        description: "Modelo especializado en código de Alibaba. Líder en benchmarks de programación.",
        scores: {
            mmlu_pro: 58.2,
            gpqa_diamond: 38.2,
            simpleqa: 12.8,
            humaneval: 92.7,
            swe_bench: 35.8,
            livecode_bench: 54.2,
            math_500: 72.4,
            aime_2024: 20.0,
            gsm8k: 88.4,
            arc_challenge: 88.2,
            ifeval: 78.4,
            mmlu: 74.2,
            arena_hard: 65.8,
            mt_bench: 8.2
        }
    },
    // ===== Amazon =====
    {
        id: "nova_pro",
        name: "Amazon Nova Pro",
        company: "Amazon",
        color: "#ff9900",
        releaseDate: "2024-12",
        description: "Modelo multimodal de Amazon. Equilibrio entre capacidad y costo.",
        scores: {
            mmlu_pro: 62.8,
            gpqa_diamond: 42.1,
            simpleqa: 16.8,
            humaneval: 82.4,
            swe_bench: 22.4,
            livecode_bench: 36.8,
            math_500: 68.2,
            aime_2024: 20.0,
            gsm8k: 89.6,
            arc_challenge: 92.4,
            ifeval: 81.2,
            mmlu: 80.2,
            arena_hard: 62.4,
            mt_bench: 8.4
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

                // Draw bar with gradient
                const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
                gradient.addColorStop(0, model.color);
                gradient.addColorStop(1, model.color + '99');

                ctx.fillStyle = gradient;
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

    // Group models by company
    const companies = [...new Set(AI_MODELS.map(m => m.company))];

    companies.forEach(company => {
        const companyModels = AI_MODELS.filter(m => m.company === company);

        companyModels.forEach(model => {
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
                        ${getCompanyEmoji(model.company)}
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

function getCompanyEmoji(company) {
    const emojis = {
        'OpenAI': '🟢',
        'Anthropic': '🟠',
        'Google': '🔵',
        'Meta': '🔷',
        'xAI': '⚡',
        'DeepSeek': '🌊',
        'Mistral AI': '🌪️',
        'Alibaba': '☁️',
        'Amazon': '📦'
    };
    return emojis[company] || '🤖';
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
