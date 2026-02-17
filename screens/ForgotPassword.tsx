import {
    View, Text, KeyboardAvoidingView, Platform, ScrollView,
    Image, TextInput, TouchableOpacity
} from 'react-native';
import { stylesCredentials as styles } from '../styles/stylesCredentials';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,
    'ForgotPassword'>;

type Props = {
    navigation: ForgotPasswordScreenNavigationProp
}

export function ForgotPassword({ navigation }: Props) {
    return (
        <LinearGradient colors={['#B3E5FC', '#E1F5FE']}
            style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ?
                    'padding' : 'height'} style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <View style={styles.container}>
                            {/* Header */}
                            <View style={styles.header}>
                                <Image source={require('../assets/logo-negro.png')}
                                    style={styles.logo} />
                                <Text style={styles.title}> Recupere su Contraseña </Text>
                            </View>
                            {/* Form */}
                            <View style={styles.form}>
                                <View style={styles.inputContainer}>
                                    <TextInput placeholder="example@gmail.com" placeholderTextColor="#ccc"
                                        autoCapitalize="none" style={styles.input} keyboardType="email-address" />
                                    <Ionicons name="mail-outline" size={23} color={"#000"}/>
                                </View>
                                <TouchableOpacity style={styles.buttonForgotPassword}>
                                    <Text style={styles.textForgotPassword}> Enviar Correo </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.links}>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={styles.linksText}> Volver a inicio de sesión </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    )
}