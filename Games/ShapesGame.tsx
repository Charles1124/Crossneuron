import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ShapeGameStyles as styles } from '../styles/ShapeGameStyles';
import { ShapeType, Shape } from "../components/ShapesGame/Shape";
import { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View, Text, ScrollView, Modal, TextInput } from "react-native";
import { Pause, Play, LogOut, Settings } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Timer } from "../components/ShapesGame/Timer"

type ShapesGameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ShapesGame'>;

type Props = {
    navigation: ShapesGameScreenNavigationProp
}

const SHAPES: ShapeType[] = ["circle", "square", "triangle", "star", "hexagon"];
const SHAPE_COLORS: Record<ShapeType, string> = {
    circle: "#FF6B6B",
    square: "#4ECDC4",
    triangle: "#FFD93D",
    star: "#b909ff",
    hexagon: "#1621bd",
}


export function ShapesGameScreen({ navigation }: Props) {

    const [configGame, setConfigGame] = useState(30);
    const [configRound, setConfigRound] = useState(5);
    const [gameTime, setGameTime] = useState(configGame);
    const [roundTime, setRoundTime] = useState(configRound);
    const [score, setScore] = useState(0);
    const [elegir, setElegir] = useState<ShapeType[]>([]);
    const [target, setTarget] = useState<ShapeType>("circle");
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [feedBack, setFeedBack] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [showSettings, setShowSettings] = useState(false);
    const [isPaused, setPaused] = useState(false);

    const generarNuevaRonda = useCallback(() => {
        const shuffled = [...SHAPES].sort(() => Math.random() - 0.5);
        const elegir = shuffled.slice(0, 3);
        const target = elegir[Math.floor(Math.random() * elegir.length)];

        setElegir(elegir);
        setTarget(target);
        setRoundTime(configRound);
        setFeedBack(null);
    }, [configGame, configRound]);

    const startGame = () => {
        setGameTime(configGame);
        setScore(0);
        setIsPlaying(true);
        setGameOver(false);
        generarNuevaRonda();
    }

    const togglePause = () => {
        setPaused(!isPaused);
    };

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    }

    const handleLeave = () => {
        navigation.goBack();
    };

    const handleAnswer = (selectedShape: ShapeType) => {
        if (!isPlaying || isPaused) return;

        if (selectedShape === target) {
            setScore((prev) => prev + 10);
            setFeedBack({ type: 'success', message: 'Correcto! +10 puntos' });
            setTimeout(() => {
                generarNuevaRonda();
                setFeedBack(null);
            }, 500);
        } else {
            setFeedBack({ type: 'error', message: 'Incorrecto!' });
            setTimeout(() => {
                generarNuevaRonda();
                setFeedBack(null);
            }, 1000);
        }
    };

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

    useEffect(() => {
        if (!isPlaying || isPaused) return

        const roundInterval = setInterval(() => {
            setRoundTime((prev) => {
                if (prev <= 0.1) {
                    generarNuevaRonda();
                    return configRound;
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
                            maxTime={configRound}
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
                                    <TextInput style={styles.input} keyboardType="numeric" value={configGame.toString()}
                                        onChangeText={(text) => setConfigGame(Number(text))} placeholder="Tiempo del juego (segundos)" />
                                    <Text style={styles.settingsLabel}> Segundos </Text>
                                    <TextInput style={styles.input} keyboardType="numeric" value={configRound.toString()}
                                        onChangeText={(text) => setConfigRound(Number(text))} placeholder="Tiempo de ronda (segundos)" />
                                    <Text style={styles.settingsLabel}> Segundos </Text>
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

                    {/* Pantalla Game Over*/}
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
                            <View style={styles.choiceSection}>
                                <Text style={styles.sectionTitle}> Elige la figura correcta </Text>
                                <View style={styles.shapesGrid}>
                                    {elegir.map((shape, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.shapeChoice}
                                            onPress={() => handleAnswer(shape)}>
                                            <Shape type={shape} size={80} color={SHAPE_COLORS[shape]} />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            <View style={styles.targetSection}>
                                <Text style={styles.sectionTitle}> Encuentra esta forma </Text>
                                <View style={styles.targetWrapper}>
                                    <Shape type={target} size={80} color={SHAPE_COLORS[target]} />
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}