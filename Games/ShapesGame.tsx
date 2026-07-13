import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ShapeGameStyles as styles } from '../styles/ShapeGameStyles';
import { ShapeType, Shape } from "../components/ShapesGame/Shape";
import { useCallback, useEffect, useRef, useState } from "react";
import { TouchableOpacity, View, Text, ScrollView, Modal, TextInput } from "react-native";
import { Pause, Play, LogOut, Settings } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Timer } from "../components/ShapesGame/Timer";
import { useGamePhase } from "../hooks/UseGamePhase";

type ShapesGameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ShapesGame'>;

type Props = {
    navigation: ShapesGameScreenNavigationProp;
}

const SHAPES: ShapeType[] = ["circle", "square", "triangle", "star", "hexagon"];
const SHAPE_COLORS: Record<ShapeType, string> = {
    circle: "#FF6B6B",
    square: "#4ECDC4",
    triangle: "#FFD93D",
    star: "#b909ff",
    hexagon: "#1621bd",
    oval: "#000000",
    rectangle: "#808080",
    pentagon: "#1621bd",
};

export function ShapesGameScreen({ navigation }: Props) {

    const [configGame, setConfigGame] = useState(90);
    const [gameTime, setGameTime] = useState(90);
    const [roundTime, setRoundTime] = useState(5);
    const [score, setScore] = useState(0);
    const [elegir, setElegir] = useState<ShapeType[]>([]);
    const [target, setTarget] = useState<ShapeType[]>([]);
    const [selected, setSelected] = useState<ShapeType[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [feedBack, setFeedBack] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [showSettings, setShowSettings] = useState(false);
    const [isPaused, setPaused] = useState(false);
    const [streak, setStreak] = useState(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [inhibition, setInhibition] = useState<ShapeType | null>(null);

    const { currentPhase, check, savedScore, saveScore } = useGamePhase();

    // Refs para evitar closures stale
    const currentPhaseRef = useRef(currentPhase);
    const roundTimeRef = useRef(roundTime);
    const isFirstRender = useRef(true);
    const roundsStartTimeRef = useRef<number>(0);
    const targetRef = useRef(target);
    const selectedRef = useRef(selected);
    const scoreRef = useRef(score);
    const streakRef = useRef(streak);
    const inhibitionRef = useRef(inhibition);

    useEffect(() => { currentPhaseRef.current = currentPhase; }, [currentPhase]);
    useEffect(() => { roundTimeRef.current = roundTime; }, [roundTime]);

    useEffect(() => { targetRef.current = target; }, [target]);
    useEffect(() => { selectedRef.current = selected; }, [selected]);
    useEffect(() => { inhibitionRef.current = inhibition; }, [inhibition]);

    useEffect(() => { streakRef.current = streak; }, [streak]);
    useEffect(() => { scoreRef.current = score; }, [score]);

    const generarNuevaRonda = useCallback(() => {
        const phase = currentPhaseRef.current;
        const shuffled = [...(phase.shapes as ShapeType[])].sort(() => Math.random() - 0.5);
        const nuevoTarget = shuffled.slice(0, phase.target);
        const remaining = shuffled.filter(s => !nuevoTarget.includes(s));
        const distractors = remaining.slice(0, phase.distractors);
        const seleccion = [...nuevoTarget, ...distractors].sort(() => Math.random() - 0.5) as ShapeType[];

        let newInhibition: ShapeType | null = null;
        if (phase.inhibition && Math.random() < 0.4) {
            newInhibition = nuevoTarget[Math.floor(Math.random() * nuevoTarget.length)];
        }

        inhibitionRef.current = newInhibition;

        setElegir(seleccion);
        setTarget(nuevoTarget);
        setInhibition(inhibitionRef.current);
        setSelected([]);
        setRoundTime(phase.roundTime);
        roundsStartTimeRef.current = phase.roundTime;
        setFeedBack(null);
    }, []);

    const startGame = () => {
        setGameTime(configGame);
        setScore(savedScore);
        setIsPlaying(true);
        setGameOver(false);
        generarNuevaRonda();
    };

    const togglePause = () => setPaused(!isPaused);
    const toggleSettings = () => setShowSettings(!showSettings);
    const handleLeave = () => navigation.goBack();

    const handleAnswer = (selectedShape: ShapeType) => {
        if (!isPlaying || isPaused || feedBack !== null) return;

        const phase = currentPhaseRef.current;
        const isTarget = targetRef.current.includes(selectedShape);
        const alreadySelected = selectedRef.current.includes(selectedShape);

        if (alreadySelected) return;

        if (isTarget) {

            if (selectedShape === inhibitionRef.current) {
                const newScore = Math.max(0, scoreRef.current - phase.incorrect);

                setScore(newScore);
                saveScore(newScore);
                check(newScore);
                setFeedBack({ type: 'error', message: `Incorrecto! -${phase.incorrect} puntos` });
                timeoutRef.current = setTimeout(() => generarNuevaRonda(), 1000);
                return;
            }

            const newSelected = [...selectedRef.current, selectedShape];
            setSelected(newSelected);
            const validTargets = phase.target - (inhibitionRef.current ? 1 : 0);

            if (newSelected.length === validTargets) {
                const elapsed = phase.roundTime - roundTimeRef.current;
                const racha = phase.streak ? streakRef.current : 0;
                const isBonus = elapsed <= phase.bonusTime;
                const points = (isBonus ? phase.correctBonus : phase.correct) + racha;
                const newScore = scoreRef.current + points;

                if (phase.streak) streakRef.current += 10;

                setScore(newScore);
                saveScore(newScore);
                check(newScore); // fix: también se llama al acertar para subir de fase
                setFeedBack({ type: 'success', message: `Correcto! +${points} puntos` });
                timeoutRef.current = setTimeout(() => {
                    setFeedBack(null);
                    generarNuevaRonda();
                }, 500);
            }
        } else {
            const newScore = Math.max(0, scoreRef.current - phase.incorrect);

            if (phase.streak) streakRef.current = 0;
            setScore(newScore);
            saveScore(newScore);
            check(newScore);
            setFeedBack({ type: 'error', message: `Incorrecto! -${phase.incorrect} puntos` });
            timeoutRef.current = setTimeout(() => generarNuevaRonda(), 1000);
        }
    };

    // Cambio de fase: generar nueva ronda con las reglas actualizadas
    // isFirstRender evita que se dispare al montar el componente
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (isPlaying && !isPaused) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setTimeout(() => generarNuevaRonda(), 300);
        }
    }, [currentPhase]);

    // Timer del juego
    useEffect(() => {
        if (!isPlaying || isPaused) return;

        const gameInterval = setInterval(() => {
            setGameTime((prev) => {
                if (prev <= 0.1) {
                    setIsPlaying(false);
                    setGameOver(true);
                    return 0;
                }
                return prev - 0.1;
            });
        }, 100);
        return () => clearInterval(gameInterval);
    }, [isPlaying, isPaused]);

    // Timer de ronda
    useEffect(() => {
        if (!isPlaying || isPaused) return;

        const roundInterval = setInterval(() => {
            setRoundTime((prev) => {
                if (prev <= 0.1) {
                    generarNuevaRonda();
                    return currentPhaseRef.current.roundTime; // fix: usa la fase actual, no configRound
                }
                return prev - 0.1;
            });
        }, 100);
        return () => clearInterval(roundInterval);
    }, [isPlaying, isPaused, generarNuevaRonda]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.container}>
                    <View style={styles.gameActions}>
                        {isPlaying && !gameOver && (
                            <TouchableOpacity onPress={togglePause} style={styles.actionButton}>
                                {isPaused ? <Play size={20} color="#fff" /> : <Pause size={20} color="#fff" />}
                            </TouchableOpacity>
                        )}
                        {!isPlaying && (
                            <TouchableOpacity onPress={toggleSettings} style={[styles.actionButton, styles.settingButton]}>
                                <Settings size={23} color={"#fff"} />
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={handleLeave} style={[styles.actionButton, styles.leaveButton]}>
                            <LogOut size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.title}> Juego de Figuras </Text>
                        <Text style={styles.subtitle}>Encuentre la figura correcta antes de que se acabe el tiempo</Text>
                    </View>

                    <View style={styles.statsBar}>
                        <Timer
                            label="Tiempo del juego"
                            time={gameTime}
                            maxTime={configGame}
                            variant="game"
                        />
                        <Timer
                            label="Tiempo de ronda"
                            time={roundTime}
                            maxTime={currentPhase.roundTime}
                            variant="round"
                        />
                    </View>

                    {feedBack && (
                        <View style={[styles.feedbackToast, feedBack.type === 'success' ? styles.feedbackSuccess : styles.feedbackError]}>
                            <Text style={styles.feedbackText}>{feedBack.message}</Text>
                        </View>
                    )}

                    <Modal visible={isPaused && isPlaying && !gameOver} transparent animationType="fade">
                        <View style={styles.overlay}>
                            <View style={styles.pauseCard}>
                                <Text style={styles.pauseTitle}> Juego Pausado </Text>
                                <TouchableOpacity onPress={togglePause} style={styles.resumeButton}>
                                    <Text style={styles.resumeButtonText}> Continuar </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <Modal visible={showSettings && !(isPlaying && !gameOver)} transparent animationType="fade">
                        <View style={styles.overlay}>
                            <View style={styles.settingsCard}>
                                <Text style={styles.settingsTitle}> Configuración del Juego </Text>
                                <View style={styles.settingsRow}>
                                    <TextInput
                                        style={styles.input}
                                        keyboardType="numeric"
                                        value={configGame.toString()}
                                        onChangeText={(text) => setConfigGame(Number(text))}
                                        placeholder="Tiempo del juego (segundos)"
                                    />
                                    <Text style={styles.settingsLabel}> Tiempo del Juego (s) </Text>
                                </View>
                                <TouchableOpacity onPress={toggleSettings} style={styles.resumeButton}>
                                    <Text style={styles.resumeButtonText}> Guardar </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {/* Pantalla de Inicio */}
                    {!isPlaying && !gameOver && (
                        <View style={styles.startScreen}>
                            <TouchableOpacity onPress={startGame} style={styles.startButton}>
                                <Text style={styles.startButtonText}> Comenzar </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Pantalla Game Over */}
                    {gameOver && (
                        <View style={styles.gameOver}>
                            <View style={styles.gameOverCard}>
                                <Text style={styles.gameOverTitle}> Juego Terminado !</Text>
                                <Text style={styles.gameOverScore}> {score} </Text>
                                <Text style={styles.gameOverLabel}> Puntos </Text>
                                <TouchableOpacity onPress={startGame} style={styles.restartButton}>
                                    <Text style={styles.restartButtonText}> Jugar de Nuevo </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {/* Playing Area */}
                    {isPlaying && !isPaused && (
                        <View style={styles.playingArea}>
                            <View style={styles.targetSection}>
                                <Text style={styles.sectionTitle}> {target.length > 1 ? 'Encuentra las formas' : 'Encuentra esta forma'} </Text>
                                <View style={styles.targetWrapper}>
                                    {target.map((t, index) => (
                                        <View key={index} style={[t === inhibition && styles.shapeInhibition]}>
                                            <Shape type={t} size={80} color={SHAPE_COLORS[t]} />
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <View style={styles.choiceSection}>
                                <Text style={styles.sectionTitle}> Elige la figura correcta </Text>
                                <View style={styles.shapesGrid}>
                                    {elegir.map((shape, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[styles.shapeChoice, selected.includes(shape) && styles.shapeSelected]}
                                            onPress={() => handleAnswer(shape)}>
                                            <Shape type={shape} size={80} color={SHAPE_COLORS[shape]} />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}