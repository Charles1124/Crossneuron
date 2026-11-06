import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { Palette, ChevronRight } from 'lucide-react-native';
import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LucideIcon } from 'lucide-react-native';
import { GamesMenu as styles } from '../styles/GamesMenuStyles';

type TrainingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
    navigation: TrainingScreenNavigationProp;
};

type TrainingRoute = keyof RootStackParamList;

interface TrainingItem {
    icon: LucideIcon;
    title: string;
    description: string;
    gradient: [string, string];
    route: TrainingRoute;
}

const TRAINING: TrainingItem[] = [
    {
        icon: Palette,
        title: 'Colores',
        description: 'Ejercita tu memoria y atención con patrones de colores.',
        gradient: ['hsl(16,85%,60%)', 'hsl(35,90%,55%)'],
        route: 'ColorsGame',
    },
];

export function TrainingScreen({ navigation }: Props) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f6fa' }}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.gamesHeader}>
                    <Text style={styles.titleHeader}>Training</Text>
                    <Text style={styles.textHeader}>Entrena tu atención y memoria</Text>
                </View>

                <View style={styles.gamesGrid}>
                    {TRAINING.map((item) => (
                        <TouchableOpacity
                            key={item.route}
                            style={styles.gameCard}
                            activeOpacity={0.85}
                            onPress={() => navigation.navigate(item.route as any)}
                        >
                            <LinearGradient colors={item.gradient} style={styles.gameCardBanner}>
                                <item.icon size={38} color="#fff" />
                                <Text style={styles.gameCardBannerTitle}>{item.title}</Text>
                            </LinearGradient>
                            <View style={styles.gameCardBody}>
                                <Text style={styles.gameCardDesc}>{item.description}</Text>
                                <View style={styles.gameCardFooter}>
                                    <Text style={styles.gameCardAction}>Jugar</Text>
                                    <ChevronRight size={18} color="#6b7280" />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

