export type BallPatternType = "triangle" | "square" | "rhombus" | "trapezoid" | "pentagon";

export interface BallPhase {
    phase: number;
    sets: number;
    balls: number;
    initialSpeed: number;
    maxSpeed: number;
    minSpeed: number;
    speedStep: number;
    observeTime: number;
    patterns: BallPatternType[];
    correct: number;
    incorrect: number;
    nextPhaseScore: number;
    prevPhase: number;
}

export const BALL_PHASES: BallPhase[] = [
    {
        phase: 1,
        sets: 10,
        balls: 2,
        initialSpeed: 1.5,
        maxSpeed: 2.0,
        minSpeed: 1.0,
        speedStep: 0.1,
        observeTime: 10,
        patterns: ["triangle", "square", "rhombus", "trapezoid", "pentagon"],
        correct: 200,
        incorrect: 200,
        nextPhaseScore: 2000,
        prevPhase: -1,
    },
];

export const getBallPhaseByScore = (score: number): BallPhase => {
    for (let i = BALL_PHASES.length - 1; i >= 0; i--) {
        const phase = BALL_PHASES[i];
        if (phase.prevPhase !== -1 && score >= phase.prevPhase) {
            return phase;
        }
    }
    return BALL_PHASES[0];
};

export const PATTERN_LABELS: Record<BallPatternType, string> = {
    triangle: 'Triángulo',
    square: 'Cuadrado',
    rhombus: 'Rombo',
    trapezoid: 'Trapecio',
    pentagon: 'Pentágono',
};
