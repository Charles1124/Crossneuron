import {
    View, Text, Platform,
    Image, ScrollView, TextInput,
    TouchableOpacity
} from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { loginStyles as styles } from './styles/stylesLogin'
import { useState } from 'react'


export function Login({ navigation }) {

    const [isVisible, setIsVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsVisible(!isVisible);
    }

    return (
        <LinearGradient colors={['#B3E5FC', '#E1F5FE']}
            style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" backgroundColor="#B3E5FC" />
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ?
                    'padding' : 'height'} style={{ flex: 1 }}>

                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <View style={styles.container}>
                            {/* Header */}
                            <View style={styles.header}>
                                <Image source={require('../assets/logo-negro.png')}
                                    style={styles.logo} />
                                <Text style={styles.title}> Bienvenido </Text>
                                <Text style={styles.subtitle}> Inicia sesión en tu cuenta </Text>
                            </View>

                            { /* Form */}
                            <View style={styles.form}>
                                { /* Input Email */}
                                <View style={styles.inputContainer}>
                                    <TextInput placeholder="example@gmail.com" placeholderTextColor="#888"
                                        style={styles.input} keyboardType="email-address" autoCapitalize="none" />
                                    <Ionicons name="mail-outline" style={styles.icon}
                                        size={20} color={"#000"} />
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput placeholder="Contraseña" placeholderTextColor="#888"
                                        style={styles.input} autoCapitalize="none" secureTextEntry={!isVisible} />
                                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
                                        {isVisible ? (<Ionicons name="eye-outline"
                                            size={20} color={"#000"} />)
                                            : (
                                                <Ionicons name="eye-off-outline"
                                                    size={20} color={"#000"} />
                                            )}
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={styles.buttonLogin}>
                                    <Text style={styles.textLogin}> Iniciar Sesión </Text>
                                </TouchableOpacity>

                                <View style={styles.divider}>
                                    <Text style={styles.subtitle}> O continúa con </Text>
                                </View>

                                <View style={styles.socialButtons}>
                                    <TouchableOpacity style={styles.socialButtonGmail}>
                                        <Image source={require('../assets/gmail.png')} style={styles.socialIcon} />
                                        <Text style={styles.socialTextGmail}> Gmail </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.socialButtonApple}>
                                        <Image source={require('../assets/apple-logo.png')} style={styles.socialIcon} />
                                        <Text style={styles.socialTextApple}> Apple </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.links}>
                                    <Text style={styles.subtitle}> Registrarse </Text>
                                    <Text style={styles.subtitle}> ¿Ha olvidado su contraseña? </Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>

        </LinearGradient>
    )
}