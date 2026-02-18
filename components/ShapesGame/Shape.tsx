import { ViewStyle, StyleProp, View } from "react-native";
import Svg, { Circle, Rect, Path } from "react-native-svg";

export type ShapeType = "circle" | "square" | "triangle" | "star" | "hexagon";

interface ShapeProps {
    type: ShapeType;
    style?: StyleProp<ViewStyle>;
    color?: string;
    size?: number,
    onPress?: () => void;
}

export const Shape = ({ type, style, color = "#000", size = 100, onPress }: ShapeProps) => {
    const getShape = () => {
        switch (type) {
            case "circle":
                return <Circle cx="50" cy="50" r="40" fill={color} />;

            case "square":
                return <Rect x="10" y="10" width="80" height="80" rx="8" fill={color} />

            case "triangle":
                return <Path d="M 50 10 L 90 90 L 10 90 Z" fill={color} />;

            case "star":
                return <Path d="M 50 10 L 61 38 L 90 38 L 67 56 L 78 85 L 50 67 L 22 85 L 33 56 L 10 38 L 39 38 Z" fill={color} />;

            case "hexagon":
                return <Path d="M 50 10 L 85 30 L 85 70 L 50 90 L 15 70 L 15 30 Z" fill={color} />;

            default: return null;
        }

    };

    return (
        <View style={style}>
            <Svg viewBox="0 0 100 100" width={size} height={size}>
                {getShape()}
            </Svg>
        </View>
    )
}