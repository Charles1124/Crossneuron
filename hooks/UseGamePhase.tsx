import { useState, useCallback, useRef, useEffect } from 'react';
import { GAME_PHASES, GamePhase, getPhaseByScore } from '../components/ShapesGame/GamePhase';
import { getUserProfile, saveShapeScore } from '../services/firestoreServices';
import { useAuth } from '../context/AuthContext';

const SCORE_STORAGE_KEY = 'shapes_game_score';

interface UseGamePhaseReturn {
    currentPhase: GamePhase;
    phaseIndex: number;
    savedScore: number;
    check: (score: number) => void;
    saveScore: (score: number) => void;
}

export const useGamePhase = (): UseGamePhaseReturn => {
    const { user } = useAuth();
    const [currentPhase, setCurrentPhase] = useState<GamePhase>(GAME_PHASES[0]);
    const [savedScore, setSavedScore] = useState<number>(0);

    const currentPhaseRef = useRef(currentPhase);
    useEffect(() => { currentPhaseRef.current = currentPhase; }, [currentPhase]);

    const phaseIndex = GAME_PHASES.indexOf(currentPhase);

    // Cargar Firestore al montar. 
    useEffect(() => {
        const load = async () => {
            if (!user) return;
            try {
                const profile = await getUserProfile(user.uid);
                if (profile) {
                    const score = profile.shapesGame.score;
                    setSavedScore(score);
                    setCurrentPhase(getPhaseByScore(score));
                }
            } catch (e) {
                console.warn('Error cargando score:', e);
            }
        };
        load();
    }, []);

    const saveScore = useCallback((score: number) => {
        setSavedScore(score);
        if(user) saveShapeScore(user.uid, score); 
    }, []);

    const check = useCallback((newScore: number) => {
        const phase = currentPhaseRef.current;
        const index = GAME_PHASES.indexOf(phase);

        if (phase.nextPhase !== -1 && newScore >= phase.nextPhase) {
            const next = GAME_PHASES[index + 1];
            if (next) {
                currentPhaseRef.current = next;
                setCurrentPhase(next);
            }
            return;
        }

        if (phase.prevPhase !== -1 && newScore < phase.prevPhase) {
            const prev = GAME_PHASES[index - 1];
            if (prev) {
                currentPhaseRef.current = prev;
                setCurrentPhase(prev);
            }
            return;
        }
    }, []);

    return { currentPhase, phaseIndex, savedScore, check, saveScore };
};