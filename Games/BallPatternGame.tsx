import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { BallPatternStyles as styles } from "../styles/BallPatternStyles";
import { PatternIndicator } from "../components/BallPatternGame/PatternIndicator";
import { useState, useRef, useCallback } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, TouchableOpacity, Modal, TextInput } from "react-native";

import { Pause, Play, LogOut, Settings } from "lucide-react-native";
import { GameArena } from "../components/BallPatternGame/GameArena";
import { GameControls } from "../components/BallPatternGame/GameControls";

type BallPatternNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
    navigation: BallPatternNavigationProp
}

type GamePhase = "idle" | "preparing" | "observing" | "selecting" | "result";
type PatternType = "circle" | "triangle" | "square";

export function BallPatternScreen({ navigation }: Props) {

    const [gamePhase, setGamePhase] = useState<GamePhase>("idle");
    const [patternBalls, setPatternBalls] = useState([]);
    const [patternType, setPatternType] = useState<PatternType>("circle");
    const [selectedPattern, setSelectedPattern] = useState(null);
    const [isCorrect, setIsCorrect] = useState(undefined);
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [isPaused, setIsPaused] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [configDuration, setConfigDuration] = useState(5);
    const [configSpeed, setConfigSpeed] = useState(2);

    const [duration, setDuration] = useState(5);
    const [speed, setSpeed] = useState(2);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const startGame = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        //Una pelota por patrón por el momento. 

        const allBallIds = [0, 1, 2];
        const shuffled = allBallIds.sort(() => Math.random() - 0.5);
        const selectedPatternBalls = shuffled.slice(0, 1);

        //Seleccionar un patrón random. 
        const patterns: PatternType[] = ["circle", "triangle", "square"];
        const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];

        setPatternBalls(selectedPatternBalls);
        setPatternType(randomPattern);
        setSelectedPattern(null);
        setIsCorrect(undefined);
        setGamePhase("preparing");
        setIsPaused(false);

        timeoutRef.current = setTimeout(() => {
            setGamePhase("observing");

            timeoutRef.current = setTimeout(() => {
                setGamePhase("selecting");
            }, duration * 1000);

        }, 1000)
    }, [duration]);

    const handlePatternSelect = useCallback((pattern: PatternType) => {
        if (gamePhase !== "selecting") return;

        setSelectedPattern(pattern);

    }, [gamePhase]);

    const checkAnswer = useCallback(() => {
        const correct = selectedPattern === patternType;

        setIsCorrect(correct);
        setScore((prev) => ({
            correct: prev.correct + (correct ? 1 : 0),
            total: prev.total + 1,
        }));
        setGamePhase("result");
    }, [selectedPattern, patternType]);

    const resetGame = useCallback(() => {
        setGamePhase("idle");
        setPatternBalls([]);
        setSelectedPattern(null);
        setIsCorrect(undefined);
    }, []);

    const titleText = {
        idle: "¿Listo para el desafío?",
        preparing: "Prepárate...",
        observing: "Observa con atención...",
        selecting: "¿Qué figura dibujó la pelota?",
        result: isCorrect ? "¡Excelente!" : "Inténtalo de nuevo",

    }[gamePhase];

    const subtitleText = {
        idle: "Una pelota se moverá siguiendo un patrón geométrico. Tu tarea es identificar qué figura dibujó.",
        preparing: "Las pelotas están a punto de moverse. Presta atención a la pelota roja.",
        observing: "Observa el movimiento de las pelotas. Una de ellas sigue un patrón.",
        selecting: "Selecciona la figura que crees que siguió la pelota.",
        result: isCorrect
            ? "¡Has identificado correctamente el patrón!"
            : "Patrón Incorrecto",
    }[gamePhase];

    const togglePause = () => {
        setIsPaused(!isPaused);
    }

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    }

    const handleLeave = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.gameActions}>
                {gamePhase === "observing" && (
                    <TouchableOpacity onPress={togglePause} style={styles.actionButton}>
                        {isPaused ? <Play size={20} color="#fff" /> : <Pause size={20} color="#fff" />}
                    </TouchableOpacity>
                )}
                {gamePhase === "idle" || gamePhase === "result" && (
                    <TouchableOpacity onPress={toggleSettings} style={[styles.actionButton, styles.settingButton]}>
                        <Settings size={23} color={"#fff"} />
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={handleLeave} style={[styles.actionButton, styles.leaveButton]}>
                    <LogOut size={20} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <View>
                    <Text style={styles.titleText}> Patrón Geométrico </Text>
                    <Text style={styles.textSubtitle}> Entrena tu atención </Text>
                </View>

                <View style={styles.scorePanel}>
                    <Text style={styles.scoreLabel}> Puntuación: {" "}</Text>
                    <Text style={styles.scoreValue}>{score.correct}/{score.total}</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
                <View style={styles.instructions}>
                    <Text style={styles.titleText}>{titleText}</Text>
                    <Text style={styles.textSubtitle}>{subtitleText}</Text>
                </View>

                {gamePhase === "result" && (
                    <View style={styles.centered}>
                        <PatternIndicator patternType={patternType} show />
                    </View>
                )}

                <GameArena
                    isPlaying={gamePhase === "observing" && !isPaused}
                    patternBalls={gamePhase === "idle" ? [] : patternBalls}
                    patternType={patternType}
                    speed={speed} />

                <GameControls
                    gamePhase={gamePhase}
                    onStart={startGame}
                    onCheck={checkAnswer}
                    onReset={resetGame}
                    selectedPattern={selectedPattern}
                    onPatternSelect={handlePatternSelect}
                    isCorrect={isCorrect ?? false} />

                <Modal visible={isPaused && gamePhase === "observing"} transparent animationType="fade">
                    <View style={styles.overlay}>
                        <View style={styles.pauseCard}>
                            <Text style={styles.pauseTitle}> Juego Pausado </Text>
                            <TouchableOpacity onPress={togglePause} style={styles.resumeButton}>
                                <Text style={styles.resumeButtonText}> Continuar </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal visible={showSettings && (gamePhase === "idle" || gamePhase === "result")} transparent animationType="fade">
                    <View style={styles.overlay}>
                        <View style={styles.settingsCard}>
                            <Text style={styles.settingsTitle}> Configuración del Juego </Text>
                            <View style={styles.settingsRow}>
                                <TextInput style={styles.input} keyboardType="numeric" value={configDuration.toString()}
                                    onChangeText={(text) => setConfigDuration(Number(text))} placeholder="Duración de la ronda(segundos)" />
                                <Text style={styles.settingsLabel}> Segundos </Text>
                                <TextInput style={styles.input} keyboardType="numeric" value={configSpeed.toString()}
                                    onChangeText={(text) => setConfigSpeed(Number(text))} placeholder="Velocidad de las pelotas" />
                                <Text style={styles.settingsLabel}> Velocidad </Text>
                            </View>
                            <TouchableOpacity onPress= {() => {setDuration(configDuration); setSpeed(configSpeed); toggleSettings();}} 
                              style={styles.resumeButton}>
                                <Text style={styles.resumeButtonText}> Guardar </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal> 

            </ScrollView>
        </SafeAreaView >
    )
}