import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { BallPatternStyles as styles } from "../styles/BallPatternStyles";
import { useState, useRef, useCallback, useEffect } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Modal, useWindowDimensions } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

import { Pause, Play, LogOut, Smartphone } from "lucide-react-native";
import { GameArena } from "../components/BallPatternGame/GameArena";
import { GameControls } from "../components/BallPatternGame/GameControls";
import { BallPatternType } from "../components/BallPatternGame/BallGamePhase";
import { useBallGamePhase } from "../hooks/UseBallGamePhase";

type BallPatternNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
    navigation: BallPatternNavigationProp;
}

type GamePhase = "idle" | "preparing" | "observing" | "selecting" | "result";

function generateOptions(correct: BallPatternType, pool: BallPatternType[]): BallPatternType[] {
    const wrong = pool.filter(p => p !== correct).sort(() => Math.random() - 0.5).slice(0, 2);
    return [correct, ...wrong].sort(() => Math.random() - 0.5);
}

export function BallPatternScreen({ navigation }: Props) {

    const { currentPhase, currentSet, speed, phaseScore, startAttempt, onResult, advancePhase, retryPhase } = useBallGamePhase();

    const [gamePhase, setGamePhase] = useState<GamePhase>("idle");
    const [patternBalls, setPatternBalls] = useState<number[]>([]);
    const [patternType, setPatternType] = useState<BallPatternType>("triangle");
    const [selectedPattern, setSelectedPattern] = useState<BallPatternType | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
    const [isPaused, setIsPaused] = useState(false);
    const [options, setOptions] = useState<BallPatternType[]>([]);
    const [lastScoreChange, setLastScoreChange] = useState(0);
    const [phaseCompleteData, setPhaseCompleteData] = useState<{ passed: boolean; score: number; needed: number } | null>(null);
    const [pendingPhaseComplete, setPendingPhaseComplete] = useState<{ passed: boolean; score: number; needed: number } | null>(null);

    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastPatternTypeRef = useRef<BallPatternType | null>(null);
    const lastPatternBallRef = useRef<number | null>(null);

    useEffect(() => {
        ScreenOrientation.unlockAsync();
        return () => {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        };
    }, []);

    const startGame = useCallback(async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        const ballIds = Array.from({ length: currentPhase.balls }, (_, i) => i);
        const availableBalls = ballIds.filter(id => id !== lastPatternBallRef.current);
        const patternBallId = availableBalls[Math.floor(Math.random() * availableBalls.length)];

        const availablePatterns = currentPhase.patterns.filter(p => p !== lastPatternTypeRef.current);
        const randomPattern = availablePatterns[Math.floor(Math.random() * availablePatterns.length)];

        lastPatternBallRef.current = patternBallId;
        lastPatternTypeRef.current = randomPattern;

        setPatternBalls([patternBallId]);
        setPatternType(randomPattern);
        setOptions(generateOptions(randomPattern, currentPhase.patterns));
        setSelectedPattern(null);
        setIsCorrect(undefined);
        setGamePhase("preparing");
        setIsPaused(false);

        timeoutRef.current = setTimeout(() => {
            setGamePhase("observing");
            timeoutRef.current = setTimeout(() => {
                setGamePhase("selecting");
            }, currentPhase.observeTime * 1000);
        }, 1000);
    }, [currentPhase]);

    const handlePatternSelect = useCallback((pattern: BallPatternType) => {
        if (gamePhase !== "selecting") return;
        setSelectedPattern(pattern);
    }, [gamePhase]);

    const checkAnswer = useCallback(() => {
        const correct = selectedPattern === patternType;
        const result = onResult(correct);

        setIsCorrect(correct);
        setLastScoreChange(result.scoreChange);
        setGamePhase("result");

        if (result.phaseComplete) {
            setPendingPhaseComplete({
                passed: result.passed,
                score: result.newScore,
                needed: currentPhase.nextPhaseScore,
            });
        }
    }, [selectedPattern, patternType, onResult, currentPhase]);

    const resetGame = useCallback(() => {
        if (pendingPhaseComplete) {
            setPhaseCompleteData(pendingPhaseComplete);
            setPendingPhaseComplete(null);
        } else {
            startGame();
        }
    }, [pendingPhaseComplete, startGame]);

    const handleNextPhase = () => {
        advancePhase();
        setPhaseCompleteData(null);
        setPatternBalls([]);
        setGamePhase("idle");
        lastPatternTypeRef.current = null;
        lastPatternBallRef.current = null;
    };

    const handleRetry = () => {
        retryPhase();
        setPhaseCompleteData(null);
        setPatternBalls([]);
        setGamePhase("idle");
        lastPatternTypeRef.current = null;
        lastPatternBallRef.current = null;
    };

    const handleStartAttempt = () => {
        startAttempt();
        startGame();
    };

    const togglePause = () => setIsPaused(!isPaused);
    const handleLeave = () => navigation.goBack();

    const gameControlsProps = {
        onStart: handleStartAttempt,
        onCheck: checkAnswer,
        onReset: resetGame,
        selectedPattern,
        onPatternSelect: handlePatternSelect,
        isCorrect: isCorrect ?? false,
        options,
        currentSet,
        totalSets: currentPhase.sets,
        phaseScore,
        speed,
        scoreChange: Math.abs(lastScoreChange),
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {gamePhase === "idle" && (
                <View style={styles.header}>
                    <Text style={styles.titleText}>Patrón Geométrico</Text>
                    <Text style={styles.textSubtitle}>Entrena tu atención</Text>
                </View>
            )}

            <View style={[styles.arenaWrapper, gamePhase === "idle" && { marginTop: 10 }]}>
                <GameArena
                    isPlaying={gamePhase === "observing" && !isPaused}
                    patternBalls={gamePhase === "idle" ? [] : patternBalls}
                    patternType={patternType}
                    speed={speed}
                    ballCount={currentPhase.balls}
                />

                <View style={styles.actionsOverlay}>
                    {gamePhase === "observing" && (
                        <TouchableOpacity onPress={togglePause} style={styles.actionButton}>
                            {isPaused ? <Play size={20} color="#fff" /> : <Pause size={20} color="#fff" />}
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={handleLeave} style={[styles.actionButton, styles.leaveButton]}>
                        <LogOut size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                {(gamePhase === "idle" || gamePhase === "selecting" || gamePhase === "result") && (
                    <View style={[styles.controlsOverlay, gamePhase !== "idle" && styles.controlsOverlayActive]}>
                        <GameControls gamePhase={gamePhase} {...gameControlsProps} />
                    </View>
                )}
            </View>

            <Modal visible={isPaused && gamePhase === "observing"} transparent animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.pauseCard}>
                        <Text style={styles.pauseTitle}>Juego Pausado</Text>
                        <TouchableOpacity onPress={togglePause} style={styles.resumeButton}>
                            <Text style={styles.resumeButtonText}>Continuar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={phaseCompleteData !== null} transparent animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.pauseCard}>
                        {phaseCompleteData?.passed ? (
                            <>
                                <Text style={[styles.pauseTitle, { color: '#059669' }]}>¡Fase {currentPhase.phase} Superada!</Text>
                                <Text style={styles.settingsLabel}>{phaseCompleteData.score} / {phaseCompleteData.needed} puntos</Text>
                                <TouchableOpacity onPress={handleNextPhase} style={styles.resumeButton}>
                                    <Text style={styles.resumeButtonText}>Siguiente Fase</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <Text style={[styles.pauseTitle, { color: '#dc2626' }]}>¡Inténtalo de Nuevo!</Text>
                                <Text style={styles.settingsLabel}>
                                    Obtuviste {phaseCompleteData?.score} pts{'\n'}Necesitas {phaseCompleteData?.needed} pts
                                </Text>
                                <TouchableOpacity onPress={handleRetry} style={styles.resumeButton}>
                                    <Text style={styles.resumeButtonText}>Repetir Fase</Text>
                                </TouchableOpacity>
                            </>
                        )}
                        <TouchableOpacity onPress={handleLeave} style={[styles.resumeButton, { backgroundColor: '#374151', marginTop: 8 }]}>
                            <Text style={styles.resumeButtonText}>Salir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {!isLandscape && (
                <View style={styles.orientationOverlay}>
                    <View style={styles.orientationIconContainer}>
                        <Smartphone size={64} color="#7c3aed" style={{ transform: [{ rotate: '90deg' }] }} />
                    </View>
                    <Text style={styles.orientationTitle}>Gira tu dispositivo</Text>
                    <Text style={styles.orientationSubtitle}>Este juego se juega en modo horizontal</Text>
                    <TouchableOpacity onPress={handleLeave} style={styles.orientationLeaveButton}>
                        <Text style={styles.orientationLeaveText}>Volver al menú</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}
