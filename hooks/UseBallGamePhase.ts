import { useState, useCallback, useRef } from 'react';
import { BALL_PHASES, BallPhase } from '../components/BallPatternGame/BallGamePhase';

export interface BallResultInfo {
    phaseComplete: boolean;
    passed: boolean;
    scoreChange: number;
    newScore: number;
    newSpeed: number;
}

export function useBallGamePhase() {
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [currentSet, setCurrentSet] = useState(1);
    const [speed, setSpeed] = useState(BALL_PHASES[0].initialSpeed);
    const [phaseScore, setPhaseScore] = useState(0);

    const phaseIndexRef = useRef(0);
    const currentSetRef = useRef(1);
    const speedRef = useRef(BALL_PHASES[0].initialSpeed);
    const phaseScoreRef = useRef(0);

    const startAttempt = useCallback(() => {
        const phase = BALL_PHASES[phaseIndexRef.current];
        currentSetRef.current = 1;
        speedRef.current = phase.initialSpeed;
        phaseScoreRef.current = 0;
        setCurrentSet(1);
        setSpeed(phase.initialSpeed);
        setPhaseScore(0);
    }, []);

    const onResult = useCallback((correct: boolean): BallResultInfo => {
        const phase = BALL_PHASES[phaseIndexRef.current];

        const scoreChange = correct ? phase.correct : -phase.incorrect;
        const newScore = Math.max(0, phaseScoreRef.current + scoreChange);
        phaseScoreRef.current = newScore;
        setPhaseScore(newScore);

        const rawSpeed = correct
            ? speedRef.current + phase.speedStep
            : speedRef.current - phase.speedStep;
        const newSpeed = parseFloat(Math.min(phase.maxSpeed, Math.max(phase.minSpeed, rawSpeed)).toFixed(1));
        speedRef.current = newSpeed;
        setSpeed(newSpeed);

        const isLastSet = currentSetRef.current >= phase.sets;

        if (isLastSet) {
            const passed = newScore >= phase.nextPhaseScore;
            return { phaseComplete: true, passed, scoreChange, newScore, newSpeed };
        }

        currentSetRef.current += 1;
        setCurrentSet(prev => prev + 1);
        return { phaseComplete: false, passed: false, scoreChange, newScore, newSpeed };
    }, []);

    const advancePhase = useCallback(() => {
        const nextIndex = Math.min(phaseIndexRef.current + 1, BALL_PHASES.length - 1);
        phaseIndexRef.current = nextIndex;
        setPhaseIndex(nextIndex);
        const nextPhase = BALL_PHASES[nextIndex];
        currentSetRef.current = 1;
        speedRef.current = nextPhase.initialSpeed;
        phaseScoreRef.current = 0;
        setCurrentSet(1);
        setSpeed(nextPhase.initialSpeed);
        setPhaseScore(0);
    }, []);

    const retryPhase = useCallback(() => {
        const phase = BALL_PHASES[phaseIndexRef.current];
        currentSetRef.current = 1;
        speedRef.current = phase.initialSpeed;
        phaseScoreRef.current = 0;
        setCurrentSet(1);
        setSpeed(phase.initialSpeed);
        setPhaseScore(0);
    }, []);

    return {
        currentPhase: BALL_PHASES[phaseIndex] as BallPhase,
        currentSet,
        speed,
        phaseScore,
        startAttempt,
        onResult,
        advancePhase,
        retryPhase,
    };
}
