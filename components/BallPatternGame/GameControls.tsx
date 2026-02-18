import { Play, RotateCcw, Check, Eye, Circle, Triangle, Square } from "lucide-react-native";
import { BallPatternComponents as styles } from "../../styles/BallPatternComponents";
import { TouchableOpacity, View, Text } from "react-native";


type PatternType = "circle" | "triangle" | "square";

interface GameControlsProps {
    gamePhase: "idle" | "preparing" | "observing" | "selecting" | "result";
    onStart: () => void;
    onCheck: () => void;
    onReset: () => void;
    selectedPattern: string | null;
    onPatternSelect: (type: string) => void;
    isCorrect?: boolean;
}

const patternOptions = [
    { type: "circle", icon: Circle, label: "Círculo" },
    { type: "triangle", icon: Triangle, label: "Triángulo" },
    { type: "square", icon: Square, label: "Cuadrado" },
];

export function GameControls({ gamePhase, onStart, onCheck, onReset, selectedPattern,
    onPatternSelect, isCorrect }: GameControlsProps) {
    return (
        <View style={styles.gameControls}>
            {gamePhase === "idle" && (
                <TouchableOpacity style={[styles.button, styles.buttonStart]} onPress={onStart}>
                    <Play style={styles.buttonIcon} size={20} />
                    <Text style={styles.buttonText}> Iniciar Juego </Text>
                </TouchableOpacity>
            )}

            {gamePhase === "observing" && (
                <View style={styles.observing}>
                    <Eye color="#a78bfa" style={styles.buttonIcon} size={20} />
                    <Text style={styles.observingText}> Observa las pelotas... </Text>
                </View>
            )}

            {gamePhase === "selecting" && (
                <View style={styles.selectingPhase}>
                    <Text style={styles.selectingQuestion}>
                        ¿Qué figura siguió la pelota?
                    </Text>

                    <View style={styles.patternOptions}>
                        {patternOptions.map(({ type, icon: Icon, label }) => {
                            const isSelected = selectedPattern === type;
                            return (
                                <TouchableOpacity
                                    key={type}
                                    onPress={() => onPatternSelect(type)}
                                    style={[
                                        styles.patternOption,
                                        isSelected && styles.patternOptionSelected,
                                    ]}
                                >
                                    <Icon
                                        color={isSelected ? "#a78bfa" : "#6b7280"}
                                        size={32}
                                    />
                                    <Text
                                        style={[
                                            styles.patternLabel,
                                            isSelected && styles.patternLabelSelected,
                                        ]}
                                    >
                                        {label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            styles.buttonCheck,
                            !selectedPattern && styles.buttonDisabled,
                        ]}
                        onPress={onCheck}
                        disabled={!selectedPattern}
                    >
                        <Check color="#fff" size={20} style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>Verificar</Text>
                    </TouchableOpacity>
                </View>
            )}
            {gamePhase === 'result' && (
                <View style={styles.result}>
                    <View style={[styles.resultMessage, isCorrect ? styles.resultCorrect : styles.resultIncorrect]}>
                        <Text style={styles.resultText}>  {isCorrect ? "¡Correcto! 🎉" : "Incorrecto 😔"} </Text>
                    </View>

                    <TouchableOpacity style={[styles.button, styles.buttonReset]} onPress={onReset}>
                        <RotateCcw color="#fff" size={20} style={styles.buttonIcon} />
                        <Text style={styles.buttonText}> Jugar de Nuevo </Text>
                    </TouchableOpacity>
                </View>
            )}


        </View>
    )
}