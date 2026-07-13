import { View } from "react-native";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";

interface BallProps {
    id: number;
    x: number;
    y: number;
    size?: number;
    isPattern?: boolean;
    isPlaying?: boolean;
}

const BALL_COLORS = {
    pattern: { highlight: '#fda4af', base: '#E11D48', shadow: '#7f1d1d' },
    random:  { highlight: '#a5b4fc', base: '#4F46E5', shadow: '#1e1b4b' },
};

export function Ball({ id, x, y, size = 60, isPattern = false, isPlaying = false }: BallProps) {
    const colors = (isPattern && !isPlaying) ? BALL_COLORS.pattern : BALL_COLORS.random;
    const gradientId = `ball${id}`;

    return (
        <View
            style={{
                position: 'absolute',
                left: x - size / 2,
                top: y - size / 2,
                width: size,
                height: size,
                shadowColor: '#000',
                shadowOffset: { width: 3, height: 5 },
                shadowOpacity: 0.45,
                shadowRadius: 6,
                elevation: 8,
            }}
        >
            <Svg width={size} height={size}>
                <Defs>
                    <RadialGradient
                        id={gradientId}
                        cx="35%"
                        cy="30%"
                        r="70%"
                        fx="35%"
                        fy="30%"
                    >
                        <Stop offset="0%"   stopColor="#ffffff"       stopOpacity="0.95" />
                        <Stop offset="20%"  stopColor={colors.highlight} stopOpacity="1" />
                        <Stop offset="60%"  stopColor={colors.base}      stopOpacity="1" />
                        <Stop offset="100%" stopColor={colors.shadow}    stopOpacity="1" />
                    </RadialGradient>
                </Defs>
                <Circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#${gradientId})`} />
            </Svg>
        </View>
    );
}
