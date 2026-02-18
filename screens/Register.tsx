import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    View, Text, Platform, ScrollView, TextInput,
    TouchableOpacity, Image
} from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAvoidingView } from "react-native";
import { RootStackParamList } from "../App";
import { stylesCredentials as styles } from "../styles/CredentialsStyles";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
 

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

type Props = {
    navigation: RegisterScreenNavigationProp;
}; 

const passwordRequirements = [
    "Mínimo 6 caracteres", 
    "Al menos una mayúscula", 
    "Al menos un número", 
    "Al menos un carácter especial."
];

export function Register({ navigation }: Props) {

    const [isVisible, setIsVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsVisible(!isVisible)
    }

    return (
        <LinearGradient colors={['#B3E5FC', '#E1F5FE']}
            style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }} >
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ?
                    'padding' : 'height'} style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <View style={styles.container}>
                            {/* Header */}
                            <View style={styles.header}>
                                <Image source={require('../assets/logo-negro.png')}
                                    style={styles.logo}  />
                                <Text style={styles.title}> Cree una cuenta. </Text>
                                <Text style={styles.subtitle}> Únete al equipo!</Text>
                            </View>

                            {/* Form */}
                            <View style={styles.form}>
                                <View style={styles.inputContainer}>
                                    <TextInput placeholder="example@gmail.com" placeholderTextColor="#ccc"
                                        autoCapitalize="none" style={styles.input} keyboardType="email-address" />
                                    <Ionicons name="mail-outline" size={23} color={"#000"} />
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput placeholder="Contraseña" placeholderTextColor="#ccc"
                                        autoCapitalize="none" style={styles.input} secureTextEntry={!isVisible} />
                                    <TouchableOpacity onPress={togglePasswordVisibility} >
                                        {isVisible ? (<Ionicons name="eye-outline" size={23}
                                            color={"#000"} />)
                                            : (<Ionicons name="eye-off-outline" size={23} color={"#000"}/>)}
                                    </TouchableOpacity> 
                                </View> 
                                <View style={styles.inputContainer}>
                                    <TextInput  placeholder="Confirmar contraseña" placeholderTextColor="#ccc"
                                    autoCapitalize="none" style={styles.input} secureTextEntry/>
                                </View> 
                                <View style={styles.listContainer}>
                                    <Text style={styles.listText}> Requisitos para Contraseña: </Text> 
                                    {passwordRequirements.map((requirements, index) => (
                                        <View key={index} style={styles.requiredPassword}>
                                            <Text>•</Text> 
                                            <Text style={{ color: "#000", fontSize: 13, fontWeight: '400'}}>{requirements}</Text>
                                        </View>
                                    ))}
                                </View>
                                <TouchableOpacity style={styles.buttonRegister}>
                                    <Text style={styles.textRegister}> Crear Cuenta </Text>
                                </TouchableOpacity> 
                            </View> 

                            <View style={styles.links}> 
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={styles.linksText}> ¿Ya tienes una cuenta? </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
}