import {
    View, Text, Platform, Image, ScrollView, TextInput,
    TouchableOpacity,
    Alert, ActivityIndicator
} from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { stylesCredentials as styles } from '../styles/CredentialsStyles'
import { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { loginWithEmail, loginWithApple, logout } from '../services/authService';
import * as AppleAuthentication from 'expo-apple-authentication'
import * as Crypto from 'expo-crypto'

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
    navigation: LoginScreenNavigationProp;
};



export function Login({ navigation }: Props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setIsVisible(!isVisible);
    }

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor ingrese su correo y contraseña');
            return;
        }

        setLoading(true);
        try {
            const user= await loginWithEmail(email, password);
            if(!user.emailVerified){
            await logout();     
                Alert.alert('Usuario no verificado', 'Por favor verifica tu correo antes de iniciar sesión.');  
                return; 
            }
            navigation.navigate('Home');
        } catch (e: any) {
            Alert.alert('Error', e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAppleLogin = async () => {
        setLoading(true);

        try {
            const nonce = Math.random().toString(36).substring(2, 10);
            const hashedNonce = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256, nonce
            );
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                ],
                nonce: hashedNonce,
            }); 
            await loginWithApple(credential.identityToken!, nonce); 
            navigation.navigate('Home'); 
        } catch (e: any) {
            if (e.code !== 'ERR_REQUEST_CANCELED') {
                Alert.alert('Error', e.message);
            }
        } finally {
            setLoading(false);
        }
    }

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
                                <Text style={styles.title}> Bienvenido </Text>
                                <Text style={styles.subtitle}> Inicia sesión en tu cuenta </Text>
                            </View>

                            { /* Form */}
                            <View style={styles.form}>
                                { /* Input Email */}
                                <View style={styles.inputContainer}>
                                    <TextInput placeholder="example@gmail.com" placeholderTextColor="#888"
                                        style={styles.input} keyboardType="email-address" autoCapitalize="none" 
                                        value={email} onChangeText={setEmail}/>
                                    <Ionicons name="mail-outline"
                                        size={23} color={"#000"} />
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput placeholder="Contraseña" placeholderTextColor="#888"
                                        style={styles.input} autoCapitalize="none" secureTextEntry={!isVisible} 
                                        value={password} onChangeText={setPassword}/>
                                    <TouchableOpacity onPress={togglePasswordVisibility}>
                                        {isVisible ? (<Ionicons name="eye-outline"
                                            size={23} color={"#000"} />)
                                            : (
                                                <Ionicons name="eye-off-outline"
                                                    size={23} color={"#000"} />
                                            )}
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin} disabled={loading}>
                                    {loading ? <ActivityIndicator color="#fff"/> : <Text style={styles.textLogin}> Iniciar Sesión </Text>}
                                </TouchableOpacity>

                                <View style={styles.divider}>
                                    <Text style={styles.subtitle}> O continúa con </Text>
                                </View>

                                <View style={styles.socialButtons}>
                                    <TouchableOpacity style={styles.socialButtonGmail} onPress={() => Alert.alert('Próximamente', 'El inicio de sesión con Google estará disponible próximamente.')} 
                                     disabled={loading}>
                                        <Image source={require('../assets/gmail.png')} style={styles.socialIcon} />
                                        <Text style={styles.socialTextGmail}> Gmail </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.socialButtonApple} onPress={handleAppleLogin} disabled={loading}>
                                        <Image source={require('../assets/apple-logo.png')} style={styles.socialIcon} />
                                        <Text style={styles.socialTextApple}> Apple </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.links}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                        <Text style={styles.linksText}> Registrarse </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                                        <Text style={styles.linksText}> ¿Ha olvidado su contraseña? </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                        <Text style={styles.linksText}> Home </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>

        </LinearGradient>
    )
}