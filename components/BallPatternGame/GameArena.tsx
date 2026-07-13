import { LayoutChangeEvent, View } from "react-native";
import { Ball } from "./Ball";
import { useCallback, useEffect, useRef, useState } from "react";
import { BallPatternComponents as styles } from "../../styles/BallPatternComponents";
import { BallPatternType } from "./BallGamePhase";

interface BallState {
    id: number;
    x: number;
    y: number;
    isPattern: boolean;
}

interface GameArenaProps {
    isPlaying: boolean;
    patternBalls: number[];
    patternType: BallPatternType;
    speed?: number;
    ballCount?: number;
}

const BALL_SIZE = 50;
const ARENA_PADDING = 10;
const ARENA_RADIUS = 80;
const BASE_PATTERN_SPEED = 0.015;
const BASE_RANDOM_SPEED = 1.5;

const cos36 = Math.cos(Math.PI / 5);
const cos72 = Math.cos(2 * Math.PI / 5);

const CENTER_LINE_TIMES: Record<BallPatternType, { right: number; left: number }> = {
    triangle: { right: (4 * Math.PI) / 9,  left: (14 * Math.PI) / 9 },
    square:   { right: (3 * Math.PI) / 4,  left: (7  * Math.PI) / 4 },
    rhombus:  { right: Math.PI / 2,         left: (3  * Math.PI) / 2 },
    trapezoid:{ right: (3 * Math.PI) / 4,  left: (7  * Math.PI) / 4 },
    pentagon: {
        right: 2 * Math.PI * (0.2 + 0.2 * (cos72 / (cos72 + cos36))),
        left:  2 * Math.PI * (0.6 + 0.2 * (cos36 / (cos72 + cos36))),
    },
};

export function GameArena({ isPlaying, patternBalls, patternType, speed = 2, ballCount = 3 }: GameArenaProps) {
    const patternSpeed = BASE_PATTERN_SPEED * speed;
    const randomSpeed = BASE_RANDOM_SPEED * speed;
    const animationRef = useRef<number | null>(null);
    const timeRef = useRef(0);
    const randomDirectionsRef = useRef<{ vx: number; vy: number }[]>([]);
    const patternRef = useRef<{ x: number; y: number }[]>([]);
    const arenaDimensions = useRef({ width: 300, height: 300 });
    const patternBallsRef = useRef(patternBalls);
    patternBallsRef.current = patternBalls;

    const [balls, setBalls] = useState<BallState[]>(() =>
        Array.from({ length: ballCount }, (_, i) => ({ id: i, x: 0, y: 0, isPattern: false }))
    );

    useEffect(() => {
        setBalls(Array.from({ length: ballCount }, (_, i) => ({ id: i, x: 0, y: 0, isPattern: false })));
    }, [ballCount]);

    const getPatternPosition = useCallback(
        (time: number, centerX: number, centerY: number, patternIndex: number) => {
            const offset = patternIndex * (Math.PI / 2);
            const r = ARENA_RADIUS;

            switch (patternType) {
                case "triangle": {
                    const t = ((time + offset) % (Math.PI * 2)) / (Math.PI * 2);
                    const vertices = [
                        { x: 0, y: -r },
                        { x: r * 0.866, y: r * 0.5 },
                        { x: -r * 0.866, y: r * 0.5 },
                    ];
                    const seg = Math.floor(t * 3);
                    const prog = (t * 3) % 1;
                    const from = vertices[seg];
                    const to = vertices[(seg + 1) % 3];
                    return { x: centerX + from.x + (to.x - from.x) * prog, y: centerY + from.y + (to.y - from.y) * prog };
                }
                case "square": {
                    const t = ((time + offset) % (Math.PI * 2)) / (Math.PI * 2);
                    const h = r * 0.8;
                    const vertices = [
                        { x: -h, y: -h }, { x: h, y: -h }, { x: h, y: h }, { x: -h, y: h },
                    ];
                    const seg = Math.floor(t * 4);
                    const prog = (t * 4) % 1;
                    const from = vertices[seg];
                    const to = vertices[(seg + 1) % 4];
                    return { x: centerX + from.x + (to.x - from.x) * prog, y: centerY + from.y + (to.y - from.y) * prog };
                }
                case "rhombus": {
                    const t = ((time + offset) % (Math.PI * 2)) / (Math.PI * 2);
                    const vertices = [
                        { x: 0, y: -r }, { x: r, y: 0 }, { x: 0, y: r }, { x: -r, y: 0 },
                    ];
                    const seg = Math.floor(t * 4);
                    const prog = (t * 4) % 1;
                    const from = vertices[seg];
                    const to = vertices[(seg + 1) % 4];
                    return { x: centerX + from.x + (to.x - from.x) * prog, y: centerY + from.y + (to.y - from.y) * prog };
                }
                case "trapezoid": {
                    const t = ((time + offset) % (Math.PI * 2)) / (Math.PI * 2);
                    const vertices = [
                        { x: -r * 0.5, y: -r * 0.6 },
                        { x:  r * 0.5, y: -r * 0.6 },
                        { x:  r,       y:  r * 0.6 },
                        { x: -r,       y:  r * 0.6 },
                    ];
                    const seg = Math.floor(t * 4);
                    const prog = (t * 4) % 1;
                    const from = vertices[seg];
                    const to = vertices[(seg + 1) % 4];
                    return { x: centerX + from.x + (to.x - from.x) * prog, y: centerY + from.y + (to.y - from.y) * prog };
                }
                case "pentagon": {
                    const t = ((time + offset) % (Math.PI * 2)) / (Math.PI * 2);
                    const vertices = Array.from({ length: 5 }, (_, i) => ({
                        x: r * Math.sin((2 * Math.PI * i) / 5),
                        y: -r * Math.cos((2 * Math.PI * i) / 5),
                    }));
                    const seg = Math.floor(t * 5);
                    const prog = (t * 5) % 1;
                    const from = vertices[seg];
                    const to = vertices[(seg + 1) % 5];
                    return { x: centerX + from.x + (to.x - from.x) * prog, y: centerY + from.y + (to.y - from.y) * prog };
                }
                default:
                    return { x: centerX, y: centerY };
            }
        }, [patternType]);

    const handleLayout = useCallback((e: LayoutChangeEvent) => {
        const { width, height } = e.nativeEvent.layout;
        arenaDimensions.current = { width, height };
        const centerX = width / 2;
        const centerY = height / 2;

        randomDirectionsRef.current = Array.from({ length: ballCount }, () => {
            const angle = Math.random() * Math.PI * 2;
            return { vx: Math.cos(angle) * randomSpeed, vy: Math.sin(angle) * randomSpeed };
        });

        if (patternBallsRef.current.length === 0) {
            const GAP = 120;
            const half = (ballCount - 1) / 2;
            setBalls(Array.from({ length: ballCount }, (_, i) => ({
                id: i, x: centerX + (i - half) * GAP, y: centerY, isPattern: false,
            })));
        }
    }, [randomSpeed, ballCount]);

    useEffect(() => {
        const { width, height } = arenaDimensions.current;
        if (width === 0 || height === 0) return;

        const centerX = width / 2;
        const centerY = height / 2;

        const times = CENTER_LINE_TIMES[patternType];
        const t_start = Math.random() < 0.5 ? times.right : times.left;
        timeRef.current = t_start;

        randomDirectionsRef.current = Array.from({ length: ballCount }, () => {
            const angle = Math.random() * Math.PI * 2;
            return { vx: Math.cos(angle) * randomSpeed, vy: Math.sin(angle) * randomSpeed };
        });

        const GAP = 120;
        const half = (ballCount - 1) / 2;
        const rowPositions = Array.from({ length: ballCount }, (_, i) => centerX + (i - half) * GAP);

        const patternSlot = Math.floor(Math.random() * ballCount);
        const desiredX = rowPositions[patternSlot];
        const distractorPositions = rowPositions.filter((_, i) => i !== patternSlot);

        const relOffset = getPatternPosition(t_start, 0, 0, 0);
        patternRef.current = patternBalls.map(() => ({ x: desiredX - relOffset.x, y: centerY }));

        setBalls((prev) => {
            let distractorIndex = 0;
            return prev.map((ball) => {
                if (patternBalls.includes(ball.id)) {
                    return { ...ball, isPattern: true, x: desiredX, y: centerY };
                }
                const x = distractorPositions[distractorIndex] ?? centerX;
                distractorIndex++;
                return { ...ball, isPattern: false, x, y: centerY };
            });
        });
    }, [patternBalls, patternType, getPatternPosition, randomSpeed, ballCount]);

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
        }, [randomSpeed]);

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
                        const center = patternRef.current[patternIndex] ?? {
                            x: arenaDimensions.current.width / 2,
                            y: arenaDimensions.current.height / 2,
                        };
                        const pos = getPatternPosition(timeRef.current, center.x, center.y, patternIndex);
                        patternIndex++;
                        return { ...ball, x: pos.x, y: pos.y };
                    }
                    return updateRandomBall(ball, index);
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

    return (
        <View style={styles.arena} onLayout={handleLayout}>
            <View style={styles.grid} pointerEvents="none" />
            {balls.map((ball) => (
                <Ball
                    key={ball.id}
                    id={ball.id}
                    x={ball.x}
                    y={ball.y}
                    size={BALL_SIZE}
                    isPattern={ball.isPattern}
                    isPlaying={isPlaying}
                />
            ))}
        </View>
    );
}
