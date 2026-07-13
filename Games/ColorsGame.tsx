import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useCallback, useState, useEffect } from "react";
import { ColorsGameStyles as styles } from "../styles/ColoresGameStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pause, Play, LogOut, Settings } from "lucide-react-native";
import { TouchableOpacity, View, Text, ScrollView, Modal, TextInput } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

type ColorsGameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
    navigation: ColorsGameScreenNavigationProp
}

const colores = [
    { color: "#ff0000", nombre: "Rojo" },
    { color: "#00ff00", nombre: "Verde" },
    { color: "#ffff00", nombre: "Amarillo" },
    { color: "#0000ff", nombre: "Azul" },
    { color: "#fc830b", nombre: "Naranja" },
    { color: "#ff40b4", nombre: "Rosa" },
    { color: "#ffffff", nombre: "Blanco" },
]

export function ColorsGameScreen({ navigation }: Props) {

    const [configGame, setConfigGame] = useState(30);
    const [configRound, setConfigRound] = useState(5);
    const [configInterval, setConfigInterval] = useState(3000);

    const [isPaused, setPaused] = useState(false);
    const [currentColor, setCurrentColor] = useState("black");
    const [isInterval, setIsInterval] = useState(false);
    const [gameTime, setGameTime] = useState(configGame);
    const [roundTime, setRoundTime] = useState(configRound);
    const [intervalTime, setIntervalTime] = useState(configInterval);
    const [isPlaying, setisPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [coloresActivos, setColoresActivos] = useState(colores.map(c => c.color))
    const [repeticiones, setRepeticiones] = useState(0); 
    const [consecutivo, setConsecutivo]= useState(0); 
    const [ultimoColor, setUltimoColor]= useState<string | null>(null); 

    const toggleColor = (color: string) => {
        setColoresActivos(prev =>
            prev.includes(color)
                ? prev.filter(c => c !== color)
                : [...prev, color]
        );
    };


    const getRandomColor = useCallback(() => {
        const disponibles = coloresActivos.length > 0 ? coloresActivos : colores.map(c => c.color); 
        const filtrados= (consecutivo >= 2 && ultimoColor) 
        ? disponibles.filter(c => c !== ultimoColor) 
        : disponibles;  

        const selected= filtrados[Math.floor(Math.random() * filtrados.length)];
        
        if(selected === ultimoColor){
            setConsecutivo(prev => prev + 1); 
        } else {
            setConsecutivo(1); 
            setUltimoColor(selected);
        }

        return selected; 
    }, [coloresActivos, consecutivo, ultimoColor]);

    const generarNuevaRonda = useCallback(() => {
        setIsInterval(false);
        setCurrentColor(getRandomColor());
        setRoundTime(configRound);
        setIntervalTime(configInterval / 1000);
    }, [configRound, configInterval, getRandomColor])

    const startGame = () => {
        setRepeticiones(prev => prev + 1);
        setIsInterval(false);
        setGameTime(configGame);
        setRoundTime(configRound)
        setisPlaying(true)
        setGameOver(false)
        setCurrentColor(getRandomColor());
        setIntervalTime(configInterval / 1000); 
        setConsecutivo(0); 
        setUltimoColor(null);
    }

    const togglePause = () => {
        setPaused(!isPaused);
    };

    const toggleSettings = () => {
        setSettingsOpen(!settingsOpen);
    }

    const handleLeave = () => {

        if (!isPlaying && !gameOver && !isPaused) {
            navigation.goBack();
            return;
        }
        else {
            setPaused(false);
            setisPlaying(false);
            setGameOver(false);
        }
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
                            <Text style={styles.pauseTitle}> PAUSA </Text>
                            <Text style={styles.cardLabel}> Tiempo </Text>
                            <Text style={styles.cardTime}>
                                {String(Math.floor(gameTime / 60)).padStart(2, '0')}:
                                {String(Math.floor((configGame - gameTime) % 60)).padStart(2, '0')}
                            </Text>
                            <View style={styles.pauseProgressBar}>
                                <View style={styles.pauseProgressTrack}>
                                    <View style={[styles.pauseProgressFill, { width: `${(gameTime / configGame) * 100}%` }]} />
                                </View>
                            </View>
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

                    <Modal visible={settingsOpen && !(isPlaying && !gameOver)} transparent animationType="fade">
                        <View style={styles.overlay}>
                            <View style={styles.settingsCard}>
                                <Text style={styles.settingsTitle}> Configuración </Text>
                                <View style={styles.settingsRow}>
                                    <TextInput style={styles.input} keyboardType="numeric" value={configGame.toString()}
                                        onChangeText={(text) => setConfigGame(Number(text))} placeholder="Tiempo del juego (segundos)" />
                                    <Text style={styles.settingsLabel}> Tiempo del Juego (s) </Text>
                                    <TextInput style={styles.input} keyboardType="numeric" value={configRound.toString()}
                                        onChangeText={(text) => setConfigRound(Number(text))} placeholder="Tiempo de ronda (segundos)" />
                                    <Text style={styles.settingsLabel}> Tiempo por Color (s) </Text>
                                    <TextInput style={styles.input} keyboardType="numeric" value={configInterval.toString()}
                                        onChangeText={(text) => setConfigInterval(Number(text))} placeholder="Tiempo intervalo (segundos)" />
                                    <Text style={styles.settingsLabel}> Tiempo Intervalo (ms) </Text>
                                </View>
                                <Text style={styles.settingsLabel}> Colores </Text>
                                {colores.map((item) => (
                                    <TouchableOpacity
                                        key={item.color}
                                        onPress={() => toggleColor(item.color)}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginVertical: 10,
                                            gap: 12,
                                        }}
                                    >
                                        <View style={{
                                            width: 17,
                                            height: 17,
                                            borderRadius: 4,
                                            borderWidth: 2,
                                            borderColor: "#000",
                                            backgroundColor: coloresActivos.includes(item.color) ? "#2bff00" : "#fff",
                                        }} />

                                        <View style={{
                                            width: 18,
                                            height: 18,
                                            backgroundColor: item.color,
                                            borderRadius: 4,
                                            borderWidth: 1,
                                            borderColor: "#ccc",
                                        }} />
                                        <Text style={{ width: 80 }}>{item.nombre}</Text>
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity onPress={toggleSettings} style={styles.resumeButton}>
                                    <Text style={styles.resumeButtonText}> Guardar </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {gameOver && (
                        <View style={styles.gameOver}>
                            <View style={styles.gameOverCard}>
                                <LinearGradient
                                    colors={['#ff0000', '#ffff00', '#00ff00']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.gradientBar}
                                />
                                <Text style={styles.gameOverTitle}> RESUMEN </Text>
                                <Text style={styles.cardLabel}>Tiempo</Text>
                                <Text style={styles.cardTime}>
                                    {String(Math.floor(gameTime / 60)).padStart(2, '0')}:
                                    {String(Math.floor((configGame - gameTime) % 60)).padStart(2, '0')}
                                </Text>
                                <Text style={styles.cardLabel}>Repeticiones</Text>
                                <Text style={styles.cardTime}>{String(repeticiones).padStart(2, '0')}</Text>
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
