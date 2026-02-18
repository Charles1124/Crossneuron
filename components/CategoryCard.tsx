import { LucideIcon } from "lucide-react-native"
import { homeComponents as styles, categoryGradients } from "../styles/HomeComponents" 
import { View, Text, TouchableOpacity } from "react-native";
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
        <TouchableOpacity onPress={onPress} style={styles.categoryCard}>
            <LinearGradient colors={categoryGradients[color] as any}  style={styles.categoryIconWrapper}>
                <Icon style={styles.categoryIcon} size={20}/>
                </LinearGradient>
            <Text style={styles.textTitle}>{title}</Text>
            <Text style={styles.textDescription}>{description}</Text>
        </TouchableOpacity>
    )

}