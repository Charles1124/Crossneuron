import { View, Text, TouchableOpacity } from 'react-native';
import { Shapes, Workflow, ChevronRight } from 'lucide-react-native';
import { GamesMenu as styles } from '../styles/GamesMenuStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LucideIcon } from 'lucide-react-native';
import { ScrollView } from 'react-native';

type GamesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
    navigation: GamesScreenNavigationProp;
}

type GameRoute = keyof RootStackParamList;

interface GameItem {
    icon: LucideIcon;
    title: string;
    description: string;
    gradient: [string, string];
    route: GameRoute;
}

const GAMES: GameItem[] = [
    {
        icon: Shapes,
        title: 'Figuras Geométricas',
        description: 'Identifica y elige la figura correcta antes de que se acabe el tiempo.',
        gradient: ['hsl(221,83%,53%)', 'hsl(245,75%,60%)'],
        route: 'ShapesGame',
    },
    {
        icon: Workflow,
        title: 'Patrón de Pelotas',
        description: 'Sigue la pelota correcta e identifica el patrón de movimiento.',
        gradient: ['hsl(187,70%,45%)', 'hsl(221,83%,53%)'],
        route: 'BallPatternGame',
    },
];

export function GamesScreen({ navigation }: Props) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f6fa' }}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.gamesHeader}>
                    <Text style={styles.titleHeader}>Mini Juegos</Text>
                    <Text style={styles.textHeader}>Entrena y agiliza tu mente</Text>
                </View>

                <View style={styles.gamesGrid}>
                    {GAMES.map((game) => (
                        <TouchableOpacity
                            key={game.route}
                            style={styles.gameCard}
                            activeOpacity={0.85}
                            onPress={() => navigation.navigate(game.route as any)}
                        >
                            <LinearGradient colors={game.gradient} style={styles.gameCardBanner}>
                                <game.icon size={38} color="#fff" />
                                <Text style={styles.gameCardBannerTitle}>{game.title}</Text>
                            </LinearGradient>
                            <View style={styles.gameCardBody}>
                                <Text style={styles.gameCardDesc}>{game.description}</Text>
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
