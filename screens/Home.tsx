import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, ScrollView } from 'react-native';
import { RootStackParamList } from '../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { stylesHome as styles } from '../styles/HomeStyles';
import { HeroCarousel } from '../components/ui/HeroCarousel';
import { CategoryCard } from '../components/ui/CategoryCard';
import { LinearGradient } from 'expo-linear-gradient';
import { Brain, Target, Zap, Heart } from 'lucide-react-native';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
}

export function HomeScreen({ navigation }: Props) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContent} style={{ flex: 1 }}>
                <View style={styles.homePage}>
                    {/* Header */}
                    <View style={styles.homeHeader}>
                        <Text style={styles.textHeader}> Bienvenido ! </Text>
                        <Text style={styles.title}> Crossneuron </Text>
                    </View>
                    <View style={styles.container}>
                        <HeroCarousel />
                        <View style={styles.dailyGoal}>
                            <View style={styles.dailyGoalHeader}>
                                <Text style={styles.textGoal}> Meta del día </Text>
                                <Text style={styles.textProgression}> 2/3 completados </Text>
                            </View>
                            <View style={styles.dailyGoalBar}>
                                <LinearGradient colors={["hsl(16,85%,60%)", "hsl(35,90%,55%)"]}
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                                    style={[styles.dailyGoalFill, { width: '60%' }]} />
                            </View>
                            <Text style={styles.textP1}> ¡Solo te falta 1 ejercicio para hoy !</Text>
                        </View>

                        <View>
                            <View style={styles.section}>
                                <Text style={styles.categories}> Categorías </Text>
                                <Text style={styles.seeAll}> Ver todo </Text>
                            </View>
                            <View style={styles.categoriesGrid}>
                                <CategoryCard
                                    icon={Brain} title="Concentración" description="Mejora tu enfoque mental"
                                    color="primary" />
                                <CategoryCard
                                    icon={Target} title="Visualización" description="Técnicas visuales"
                                    color="accent" />
                                <CategoryCard
                                    icon={Heart} title="Control emocional" description="Mejora la presión"
                                    color="calm" />
                                <CategoryCard
                                    icon={Zap} title="Motivación" description="Impulsa tu rendimiento"
                                    color="primary" />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}