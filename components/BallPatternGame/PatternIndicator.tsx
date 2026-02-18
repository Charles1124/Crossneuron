import { Circle, Triangle, Square} from "lucide-react-native";
import { View, Text } from "react-native"; 
import { BallPatternComponents as styles } from "../../styles/BallPatternComponents";


interface PatternIndicatorProps {
    patternType: "circle" | "triangle" | "square"; 
    show: boolean; 
}

export function PatternIndicator ({ patternType, show}: PatternIndicatorProps){
    if(!show)return null; 

    const icons= {
        circle: Circle, 
        triangle: Triangle, 
        square: Square, 
    }; 

    const labels= {
        circle: "Círculo", 
        triangle: "Triángulo", 
        square: "Cuadrado",
    }; 

    const Icon= icons[patternType]; 

    return(
        <View style={styles.patternIndicator}>
            <Icon color= "hsl(221, 83%, 53%)" size={20}/>
            <Text style={styles.textIndicator}> Patrón: {labels[patternType]}</Text>
        </View>
    )
}