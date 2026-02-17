import { LucideIcon } from "lucide-react-native"
import { homeComponents as styles, categoryGradients } from "../styles/homeComponents" 
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface CategoryProps{
    icon: LucideIcon,
    title: string, 
    description: string,
    color: "primary" | "accent" | "calm",
    onPress?: () => void,
}

export function CategoryCard({ icon: Icon, title, description, color, onPress}: CategoryProps){
    return(
        <View style={styles.categoryCard}>
            <LinearGradient colors={categoryGradients[color] as any}  style={styles.categoryIconWrapper}>
                <Icon style={styles.categoryIcon} size={20}/>
                </LinearGradient>
            <Text style={styles.textTitle}>{title}</Text>
            <Text style={styles.textDescription}>{description}</Text>
        </View>
    )

}