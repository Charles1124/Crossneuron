import { LayoutChangeEvent, View} from "react-native";
import { Ball } from "./Ball";
import { useCallback, useEffect, useRef, useState } from "react"; 
import { BallPatternComponents as styles } from "../../styles/BallPatternComponents"; 

interface BallState {
    id: number;
    x: number;
    y: number;
    isPattern: boolean;
}

interface GameArenaProps {
    isPlaying: boolean;
    patternBalls: number[];
    patternType: "circle" | "triangle" | "square";
    speed?: number;
}

const BALL_SIZE = 70;
const ARENA_PADDING = 50;
const ARENA_RADIUS = 80;
const BASE_PATTERN_SPEED = 0.015;
const BASE_RANDOM_SPEED = 1.5;

export function GameArena({ isPlaying, patternBalls, patternType, speed = 2 }: GameArenaProps) {
    const patternSpeed = BASE_PATTERN_SPEED * speed;
    const randomSpeed = BASE_RANDOM_SPEED * speed;
    const animationRef = useRef<number | null>(null);
    const timeRef = useRef(0);
    const randomDirectionsRef = useRef<{ vx: number; vy: number }[]>([]);
    const patternRef = useRef<{ x: number; y: number }[]>([]);
    const arenaDimensions = useRef({ width: 300, height: 300 });

    const [balls, setBalls] = useState<BallState[]>([
        { id: 0, x: 0, y: 0, isPattern: false },
        { id: 1, x: 0, y: 0, isPattern: false },
        { id: 2, x: 0, y: 0, isPattern: false },
    ])

    const initPositions = useCallback(
        (width: number, height: number) => {
            arenaDimensions.current = { width, height };
            const centerX = width / 2;
            const centerY = height / 2;

            setBalls((prev) =>
                prev.map((ball, index) => ({
                    ...ball,
                    x: centerX + (index - 1) * 120,
                    y: centerY,
                    isPattern: patternBalls.includes(ball.id),
                }))
            );
            patternRef.current = patternBalls.map((_, index) => ({
                x: centerX + (index === 0 ? -100 : 100),
                y: centerY,
            }));

            randomDirectionsRef.current = [0, 1, 2].map(() => {
                const angle = Math.random() * Math.PI * 2;
                return {
                    vx: Math.cos(angle) * randomSpeed,
                    vy: Math.sin(angle) * randomSpeed,
                };
            });
        }, [patternBalls, randomSpeed])

    const handleLayout = useCallback(
        (e: LayoutChangeEvent) => {
            const { width, height } = e.nativeEvent.layout;
            initPositions(width, height);
        }, [initPositions])

    useEffect(() => {
        setBalls((prev) =>
            prev.map((ball) => ({
                ...ball,
                isPattern: patternBalls.includes(ball.id),
            }))
        );
    }, [patternBalls]);

    const getPatternPosition = useCallback(
        (time: number, centerX: number, centerY: number, patternIndex: number) => {
            const offset = patternIndex * (Math.PI / 2);

            switch (patternType) {
                case "circle": {
                    return {
                        x: centerX + Math.cos(time + offset) * ARENA_RADIUS,
                        y: centerY + Math.sin(time + offset) * ARENA_RADIUS,
                    };
                }
                case "triangle": {
                    const t = ((time + offset) % (Math.PI * 2)) / (Math.PI * 2);
                    const vertices = [
                        { x: 0, y: -ARENA_RADIUS },
                        { x: ARENA_RADIUS * 0.866, y: ARENA_RADIUS * 0.5 },
                        { x: -ARENA_RADIUS * 0.866, y: ARENA_RADIUS * 0.5 },
                    ];
                    const segment = Math.floor(t * 3);
                    const segmentProgress = (t * 3) % 1;
                    const from = vertices[segment];
                    const to = vertices[(segment + 1) % 3];
                    return {
                        x: centerX + from.x + (to.x - from.x) * segmentProgress,
                        y: centerY + from.y + (to.y - from.y) * segmentProgress,
                    };
                }
                case "square": {
                    const t = ((time + offset) % (Math.PI * 2)) / (Math.PI * 2);
                    const halfSize = ARENA_RADIUS * 0.8;
                    const vertices = [
                        { x: -halfSize, y: -halfSize },
                        { x: halfSize, y: -halfSize },
                        { x: halfSize, y: halfSize },
                        { x: -halfSize, y: halfSize },
                    ];
                    const segment = Math.floor(t * 4);
                    const segmentProgress = (t * 4) % 1;
                    const from = vertices[segment];
                    const to = vertices[(segment + 1) % 4];
                    return {
                        x: centerX + from.x + (to.x - from.x) * segmentProgress,
                        y: centerY + from.y + (to.y - from.y) * segmentProgress,
                    };
                }
                default:
                    return { x: centerX, y: centerY };
            }
        }, [patternType])

    const updateRandomBall = useCallback(
        (ball: BallState, index: number): BallState => {
            const dir = randomDirectionsRef.current[index];
            if (!dir) return ball;

            const { width, height } = arenaDimensions.current;

            let newX = ball.x + dir.vx;
            let newY = ball.y + dir.vy;

            const minX = ARENA_PADDING + BALL_SIZE / 2;
            const maxX = width - ARENA_PADDING - BALL_SIZE / 2;
            const minY = ARENA_PADDING + BALL_SIZE / 2;
            const maxY = height - ARENA_PADDING - BALL_SIZE / 2;

            if (newX <= minX || newX >= maxX) {
                dir.vx *= -1;
                newX = Math.max(minX, Math.min(maxX, newX));
                dir.vy += (Math.random() - 0.5) * 0.5;
            }
            if (newY <= minY || newY >= maxY) {
                dir.vy *= -1;
                newY = Math.max(minY, Math.min(maxY, newY));
                dir.vx += (Math.random() - 0.5) * 0.5;
            }

            const currentSpeed = Math.sqrt(dir.vx * dir.vx + dir.vy * dir.vy);
            if (currentSpeed > randomSpeed * 1.5) {
                dir.vx = (dir.vx / currentSpeed) * randomSpeed;
                dir.vy = (dir.vy / currentSpeed) * randomSpeed;
            }

            return { ...ball, x: newX, y: newY };
        },
        [randomSpeed]);

    useEffect(() => {
        if (!isPlaying) {
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
            return;
        }

        const animate = () => {
            timeRef.current += patternSpeed;

            setBalls((prev) => {
                let patternIndex = 0;
                return prev.map((ball, index) => {
                    if (ball.isPattern) {
                        const center = patternRef.current[patternIndex] || {
                            x: arenaDimensions.current.width / 2,
                            y: arenaDimensions.current.height / 2,
                        };
                        const pos = getPatternPosition(
                            timeRef.current,
                            center.x,
                            center.y,
                            patternIndex
                        );
                        patternIndex++;
                        return { ...ball, x: pos.x, y: pos.y };
                    } else {
                        return updateRandomBall(ball, index);
                    }
                });
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
        };
    }, [isPlaying, getPatternPosition, updateRandomBall, patternSpeed]); 

    return(
        <View style={styles.arena} onLayout={handleLayout}>
            <View style={styles.grid} pointerEvents= "none"/>

            {balls.map((ball) => (
                <Ball 
                key={ball.id}
                id={ball.id}
                x={ball.x} 
                y={ball.y}
                size={BALL_SIZE}
                isPattern= {ball.isPattern}
                />
            ))}
        </View>
    );
};