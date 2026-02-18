import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useCallback, useState, useEffect } from "react";
import { ColorsGameStyles as styles } from "../styles/ColoresGameStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pause, Play, LogOut, Settings } from "lucide-react-native";
import { TouchableOpacity, View, Text, ScrollView, Modal, TextInput } from "react-native";

type ColorsGameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
    navigation: ColorsGameScreenNavigationProp
}

export function ColorsGameScreen({ navigation }: Props) {

    const [configGame, setConfigGame] = useState(30);
    const [configRound, setConfigRound] = useState(5);
    const [configInterval, setConfigInterval] = useState(3);

    const [isPaused, setPaused] = useState(false);
    const [currentColor, setCurrentColor] = useState("black");
    const [isInterval, setIsInterval] = useState(false);
    const [gameTime, setGameTime] = useState(configGame);
    const [roundTime, setRoundTime] = useState(configRound);
    const [intervalTime, setIntervalTime] = useState(configInterval);
    const [isPlaying, setisPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const colores = [
        "red",
        "blue",
        "yellow",
        "purple",
    ]

    const getRandomColor = () => {
        return colores[Math.floor(Math.random() * colores.length)]; 
    }

    const generarNuevaRonda = useCallback(() => {
        setIsInterval(false);
        setCurrentColor(getRandomColor());
        setRoundTime(configRound);
        setIntervalTime(configInterval);
    }, [configRound, configInterval])

    const startGame = () => {
        setIsInterval(false);
        setGameTime(configGame);
        setRoundTime(configRound)
        setisPlaying(true)
        setGameOver(false)
        setCurrentColor(getRandomColor());
        setIntervalTime(configInterval);
    }

    const togglePause = () => {
        setPaused(!isPaused);
    };

    const toggleSettings = () => {
        setSettingsOpen(!settingsOpen);
    }

    const handleLeave = () => {
        navigation.goBack();
    };

    useEffect(() => {
        if (!isPlaying || isPaused) return;

        const gameInterval = setInterval(() => {
            setGameTime((prev) => {
                if (prev <= 0.1) {
                    setisPlaying(false);
                    setGameOver(true);
                    return 0;
                }
                return prev - 0.1;
            });
        }, 100);
        return () => clearInterval(gameInterval);
    }, [isPlaying, isPaused]);

    useEffect(() => {
        if (!isPlaying || isPaused || !isInterval) return;

        const gameInterval = setInterval(() => {
            setIntervalTime((prev) => {
                if (prev <= 0.1) {
                    generarNuevaRonda();
                    return configInterval;
                }
                return prev - 0.1;
            });
        }, 100);
        return () => clearInterval(gameInterval);
    }, [isPlaying, isPaused, isInterval, generarNuevaRonda, configInterval]);

    useEffect(() => {
        if (!isPlaying || isPaused || isInterval) return;

        const roundInterval = setInterval(() => {
            setRoundTime((prev) => {
                if (prev <= 0.1) {
                    setIsInterval(true);
                    setCurrentColor("black");
                    return configRound;
                }
                return prev - 0.1;
            });
        }, 100);
        return () => clearInterval(roundInterval);
    }, [isPlaying, isPaused, isInterval, configRound])

    // Durante el juego, mostrar pantalla fullscreen de color
    if (isPlaying && !gameOver) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: currentColor }}>
                <View style={{ flex: 1, justifyContent: 'flex-start', paddingTop: 20, paddingRight: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
                        {!isPaused && (
                            <TouchableOpacity onPress={togglePause} style={styles.actionButton}>
                                <Pause size={20} color="#fff" />
                            </TouchableOpacity>
                        )}
                        {isPaused && (
                            <TouchableOpacity onPress={togglePause} style={styles.actionButton}>
                                <Play size={20} color="#fff" />
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={handleLeave} style={[styles.actionButton, styles.leaveButton]}>
                            <LogOut size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

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
            </SafeAreaView>
        );
    }
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
                        <Text style={styles.title}> Ejercicio Colores </Text>
                    </View>

                    {/* Pantalla de Inicio */}
                    {!isPlaying && !gameOver && (
                        <View style={styles.startScreen}>
                            <TouchableOpacity onPress={startGame} style={styles.startButton}>
                                <Text style={styles.startButtonText}> Comenzar </Text>
                            </TouchableOpacity>
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

                    <Modal visible={settingsOpen && !(isPlaying && !gameOver)} transparent animationType="fade">
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
                                    <TextInput style={styles.input} keyboardType="numeric" value={configInterval.toString()}
                                        onChangeText={(text) => setConfigInterval(Number(text))} placeholder="Tiempo intervalo (segundos)" />
                                    <Text style={styles.settingsLabel}> Segundos </Text>
                                </View>
                                <TouchableOpacity onPress={toggleSettings} style={styles.resumeButton}>
                                    <Text style={styles.resumeButtonText}> Guardar </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {gameOver && (
                        <View style={styles.gameOver}>
                            <View style={styles.gameOverCard}>
                                <Text style={styles.gameOverTitle}> Juego Terminado! </Text>
                                <TouchableOpacity onPress={startGame} style={styles.restartButton}>
                                    <Text style={styles.restartButtonText}> Volver a jugar </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
