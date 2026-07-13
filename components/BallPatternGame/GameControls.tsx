import { Play, RotateCcw, Check } from "lucide-react-native";
import { BallPatternComponents as styles } from "../../styles/BallPatternComponents";
import { TouchableOpacity, View, Text } from "react-native";
import Svg, { Polygon, Rect } from "react-native-svg";
import { BallPatternType, PATTERN_LABELS } from "./BallGamePhase";

interface GameControlsProps {
    gamePhase: "idle" | "preparing" | "observing" | "selecting" | "result";
    onStart: () => void;
    onCheck: () => void;
    onReset: () => void;
    selectedPattern: BallPatternType | null;
    onPatternSelect: (type: BallPatternType) => void;
    isCorrect?: boolean;
    options: BallPatternType[];
    currentSet: number;
    totalSets: number;
    phaseScore: number;
    speed: number;
    scoreChange: number;
}

function PatternPreview({ type, size = 38, color = "#6b7280" }: { type: BallPatternType; size?: number; color?: string }) {
    const r = size * 0.4;
    const cx = size / 2;
    const cy = size / 2;
    const pts = (points: [number, number][]) => points.map(([x, y]) => `${x},${y}`).join(' ');

    switch (type) {
        case 'triangle':
            return (
                <Svg width={size} height={size}>
                    <Polygon points={pts([[cx, cy - r], [cx + r * 0.866, cy + r * 0.5], [cx - r * 0.866, cy + r * 0.5]])} fill={color} />
                </Svg>
            );
        case 'square': {
            const h = r * 0.85;
            return (
                <Svg width={size} height={size}>
                    <Rect x={cx - h} y={cy - h} width={h * 2} height={h * 2} fill={color} />
                </Svg>
            );
        }
        case 'rhombus':
            return (
                <Svg width={size} height={size}>
                    <Polygon points={pts([[cx, cy - r], [cx + r, cy], [cx, cy + r], [cx - r, cy]])} fill={color} />
                </Svg>
            );
        case 'trapezoid':
            return (
                <Svg width={size} height={size}>
                    <Polygon points={pts([[cx - r * 0.5, cy - r * 0.6], [cx + r * 0.5, cy - r * 0.6], [cx + r, cy + r * 0.6], [cx - r, cy + r * 0.6]])} fill={color} />
                </Svg>
            );
        case 'pentagon': {
            const pentPts = Array.from({ length: 5 }, (_, i) => {
                const angle = (2 * Math.PI * i / 5) - Math.PI / 2;
                return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
            }).join(' ');
            return (
                <Svg width={size} height={size}>
                    <Polygon points={pentPts} fill={color} />
                </Svg>
            );
        }
        default:
            return null;
    }
}

export function GameControls({
    gamePhase, onStart, onCheck, onReset, selectedPattern, onPatternSelect,
    isCorrect, options, currentSet, totalSets, phaseScore, speed, scoreChange,
}: GameControlsProps) {

    const isLastSet = currentSet >= totalSets;

    return (
        <View style={styles.gameControls}>
            {gamePhase === "idle" && (
                <TouchableOpacity style={[styles.button, styles.buttonStart]} onPress={onStart}>
                    <Play size={18} color="#fff" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>
                        {currentSet === 1 && phaseScore === 0 ? 'Iniciar' : `Set ${currentSet}`}
                    </Text>
                </TouchableOpacity>
            )}

            {gamePhase === "selecting" && (
                <View style={styles.selectingPhase}>
                    <Text style={styles.selectingQuestion}>¿Qué figura siguió la pelota?</Text>
                    <View style={styles.patternOptions}>
                        {options.map((type) => {
                            const isSelected = selectedPattern === type;
                            return (
                                <TouchableOpacity
                                    key={type}
                                    onPress={() => onPatternSelect(type)}
                                    style={[styles.patternOption, isSelected && styles.patternOptionSelected]}
                                >
                                    <PatternPreview
                                        type={type}
                                        size={38}
                                        color={isSelected ? "#a78bfa" : "#6b7280"}
                                    />
                                    <Text style={[styles.patternLabel, isSelected && styles.patternLabelSelected]}>
                                        {PATTERN_LABELS[type]}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonCheck, !selectedPattern && styles.buttonDisabled]}
                        onPress={onCheck}
                        disabled={!selectedPattern}
                    >
                        <Check color="#fff" size={18} style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>Verificar</Text>
                    </TouchableOpacity>
                </View>
            )}

            {gamePhase === 'result' && (
                <View style={styles.result}>
                    <View style={[styles.resultMessage, isCorrect ? styles.resultCorrect : styles.resultIncorrect]}>
                        <Text style={styles.resultText}>
                            {isCorrect ? `¡Correcto! +${scoreChange}` : `Incorrecto -${Math.abs(scoreChange)}`}
                        </Text>
                    </View>
                    <View style={styles.resultMeta}>
                        <Text style={styles.resultMetaText}>Set {currentSet}/{totalSets}  •  {phaseScore} pts  •  vel {speed.toFixed(1)}</Text>
                    </View>
                    <TouchableOpacity style={[styles.button, styles.buttonReset]} onPress={onReset}>
                        <RotateCcw color="#fff" size={18} style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>{isLastSet ? 'Ver Resultado' : 'Siguiente Set'}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}
