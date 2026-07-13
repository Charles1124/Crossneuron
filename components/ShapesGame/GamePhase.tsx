export interface GamePhase {
    phase: number; 
    distractors: number; 
    target: number; 
    roundTime: number; 
    bonusTime: number; 
    correctBonus: number; 
    correct: number; 
    incorrect: number;
    nextPhase: number; 
    prevPhase: number;  
    shapes: string[];  
    streak: boolean;  
    inhibition: boolean; 
}

export const GAME_PHASES: GamePhase[] = [
    {
        phase: 1, 
        distractors: 1, 
        target: 1, 
        roundTime: 5, 
        bonusTime: 2, 
        correctBonus: 200, 
        correct: 100, 
        incorrect: 100, 
        nextPhase: 2000,  
        prevPhase: -1, 
        shapes: ["circle", "square", "triangle", "star", "hexagon"],
        streak: false, 
        inhibition: false, 
    }, 
    {
        phase: 2, 
        distractors: 2, 
        target: 1,
        roundTime: 5, 
        bonusTime: 2, 
        correctBonus: 200, 
        correct: 100, 
        incorrect: 100, 
        nextPhase: 4500, 
        prevPhase: 2000,
        shapes: ["circle", "square", "triangle", "star", "hexagon"],
        streak: false,
        inhibition: false, 
    },
    {
        phase: 3, 
        distractors: 3, 
        target: 1, 
        roundTime: 5, 
        bonusTime: 2, 
        correctBonus: 200, 
        correct: 100, 
        incorrect: 100, 
        nextPhase: 9000, 
        prevPhase: 4500, 
        shapes: ["circle", "square", "triangle", "star", "hexagon", "oval", "rectangle"],
        streak: false,
        inhibition: false, 
    }, 
    {
        phase: 4, 
        distractors: 4, 
        target: 1, 
        roundTime: 5,
        bonusTime: 2, 
        correctBonus: 200, 
        correct: 100, 
        incorrect: 100, 
        nextPhase: 18000, 
        prevPhase: 9000, 
        shapes: ["circle", "square", "triangle", "star", "hexagon", "oval", "rectangle", "pentagon"],
        streak: false,
        inhibition: false, 
    }, 
    {
        phase: 5, 
        distractors: 3, 
        target: 2,
        roundTime: 5,
        bonusTime: 2, 
        correctBonus: 200, 
        correct: 100, 
        incorrect: 100, 
        nextPhase: 36000, 
        prevPhase: 18000, 
        shapes: ["circle", "square", "triangle", "star", "hexagon", "oval", "rectangle"], 
        streak: false,
        inhibition: false, 
    }, 
    {
      phase: 6, 
      distractors: 3, 
      target: 2, 
      roundTime: 5, 
      bonusTime: 2, 
      correctBonus: 200, 
      correct: 100, 
      incorrect: 100, 
      nextPhase: 72000, 
      prevPhase: 36000, 
      shapes: ["circle", "square", "triangle", "star", "hexagon", "oval", "rectangle", "pentagon"] , 
      streak: true, 
      inhibition: false, 
    },
    {
      phase: 7, 
      distractors: 3, 
      target: 2, 
      roundTime: 4, 
      bonusTime: 2, 
      correctBonus: 200, 
      correct: 100, 
      incorrect: 100, 
      nextPhase: 90000, 
      prevPhase: 72000, 
      shapes: ["circle", "square", "triangle", "star", "hexagon", "oval", "rectangle", "pentagon"],
      streak: true, 
      inhibition: false, 
    }, 
    {
      phase: 8, 
      distractors: 3, 
      target: 2, 
      roundTime: 4, 
      bonusTime: 2, 
      correctBonus: 200, 
      correct: 100, 
      incorrect: 100, 
      nextPhase: 130000, 
      prevPhase: 90000, 
      shapes: ["circle", "square", "triangle", "star", "hexagon", "oval", "rectangle", "pentagon"],
      streak: true, 
      inhibition: true, 
    }, 
    {
      phase: 9, 
      distractors: 4, 
      target: 2, 
      roundTime: 4, 
      bonusTime: 2, 
      correctBonus: 200, 
      correct: 100, 
      incorrect: 100, 
      nextPhase: 180000, 
      prevPhase: 130000, 
      shapes: ["circle", "square", "triangle", "star", "hexagon", "oval", "rectangle", "pentagon"],
      streak: true, 
      inhibition: true, 
    }, 
    {
      phase: 10, 
      distractors: 3, 
      target: 3, 
      roundTime: 5, 
      bonusTime: 2, 
      correctBonus: 200, 
      correct: 100, 
      incorrect: 100, 
      nextPhase: 212000, 
      prevPhase: 180000, 
      shapes: ["circle", "square", "triangle", "star", "hexagon", "oval", "rectangle", "pentagon"],
      streak: true, 
      inhibition: true, 
    },
    {
      phase: 11, 
      distractors: 3, 
      target: 3, 
      roundTime: 4, 
      bonusTime: 2, 
      correctBonus: 200, 
      correct: 100, 
      incorrect: 100, 
      nextPhase: 300000, 
      prevPhase: 180000, 
      shapes: ["circle", "square", "triangle", "star", "hexagon", "oval", "rectangle", "pentagon"],
      streak: true, 
      inhibition: true, 
    }
];

export const getPhaseByScore= (score: number): GamePhase => {
    for (let i= GAME_PHASES.length - 1; i>=0; i--){
        const phase= GAME_PHASES[i]; 
        if(phase.prevPhase !== -1 && score >= phase.prevPhase){
            return phase; 
        }
    }
    return GAME_PHASES[0]; 
}; 