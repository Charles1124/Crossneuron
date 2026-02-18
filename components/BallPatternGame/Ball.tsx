import { View } from "react-native"; 
import { BallPatternComponents as styles } from "../../styles/BallPatternComponents";

interface Ballprops {
    id: number;
    x: number;
    y: number; 
    size?: number; 
    isPattern?: boolean; 
}

export function Ball ( {x, y, size= 60, isPattern= false}: Ballprops ) {
    return(
        <View
        style={[
            styles.ball,
            isPattern ? styles.ballPattern : styles.random,
            {
                width: size, 
                height: size, 
                borderRadius: size /2, 
                position: 'absolute', 
                left: x - size/2, 
                top: y - size/2,
            },
        ]}
        />
    );
}; 
