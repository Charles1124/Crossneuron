import { useEffect, useRef } from "react";
import { Animated, View, Text } from "react-native"; 

import { ShapeGameComponents as styles } from "../../styles/ShapeGameComponents";

interface TimerProps {
    label: string;
    time: number;
    maxTime: number;
    variant?: "game" | "round";
}

export const Timer = ({ label, time, maxTime, variant = "game" }: TimerProps) => {

    const percentage = (time / maxTime) * 100;
    const low = percentage < 30;
    const mid = percentage >= 30 && percentage < 60;

    const widthAnim = useRef(new Animated.Value(100)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Animate width based on percentage
        Animated.timing(widthAnim, {
            toValue: percentage,
            duration: 100,
            useNativeDriver: false,
        }).start();
    }, [percentage, widthAnim]);

    useEffect(() => {
        if (low) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            pulseAnim.setValue(1);
        }
    }, [low, pulseAnim])

    const getBarColor = () => {
        if (low) return '#EF4444';
        if (mid) return '#F59E0B';
        return '#2283C4';
    }

    const getTextColor = () => {
        if (low) return '#EF4444';
        if (mid) return '#F59E0B';
        return '#1F2937';
    }

    return (
        <View style={[styles.container, variant === "game" ? styles.variantGame : styles.variantRound]}>
            <Text style={styles.label}>{label}</Text>

            <View style={styles.timeContainer}>
                <Animated.Text
                    style={[
                        styles.time,
                        {
                            color: getTextColor(),
                            transform: [{ scale: pulseAnim }]
                        }
                    ]}
                >
                    {Math.ceil(time)}
                </Animated.Text>
                <Text style={styles.unit}> s </Text>
            </View>

            <View style={styles.progressBar}>
                <Animated.View
                    style={[
                        styles.progressFill,
                        {
                            width: widthAnim.interpolate({
                                inputRange: [0, 100],
                                outputRange: ['0%', '100%'],
                            }),
                            backgroundColor: getBarColor(),
                        }
                    ]}
                />
            </View>
        </View>
    )
}