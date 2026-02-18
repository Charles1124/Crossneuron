
import { View, Text } from 'react-native'; 
import { ShapeGameComponents as styles } from '../../styles/ShapeGameComponents'; 
import { Trophy } from 'lucide-react-native';

interface ScoreProps {
    score: number;
}

export const Score= ({ score }: ScoreProps) => {
    return(
        <View style={styles.scoreContainer}>
            <View style={styles.scoreHeader}>
                <Trophy size={20} color="#F59E0B"/>
                <Text style={styles.scoreLabel}> Puntuación </Text>
            </View>
            <Text style={styles.score}>{score}</Text>
        </View>
    )
}