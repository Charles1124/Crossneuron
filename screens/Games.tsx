import { View, Text, ScrollView } from 'react-native';
import { CategoryCard } from '../components/ui/CategoryCard';
import { Shapes, Palette, Workflow } from 'lucide-react-native';
import { GamesMenu as styles } from '../styles/GamesMenuStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type GamesScreenNavigationProp= NativeStackNavigationProp<RootStackParamList>;

type Props={
    navigation: GamesScreenNavigationProp
}

export function GamesScreen({ navigation }: Props) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.gamesPage}>
                    <View style={styles.gamesHeader}>
                        <Text style={styles.titleHeader}>Mini Juegos</Text>
                        <Text style={styles.textHeader}>Entrene y agilice su mente !</Text>
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.textGames}>Juegos Disponibles</Text>
                        <View style={styles.gamesGrid}>
                            <CategoryCard
                                icon={Shapes}
                                title='Figuras Geométricas'
                                description="Elija la figura correcta del patrón."
                                color="primary"
                                onPress={() => navigation.navigate('ShapesGame')}
                            />
                            <CategoryCard
                                icon={Palette}
                                title='Colores'
                                description="Ejercicio con colores."
                                color="accent" 
                                onPress={() => navigation.navigate('ColorsGame')}
                            />
                            <CategoryCard
                                icon={Workflow}
                                title='Patrón'
                                description="Siga la pelota correcta y elija el patrón."
                                color="calm" 
                                onPress={() => navigation.navigate('BallPatternGame')}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}