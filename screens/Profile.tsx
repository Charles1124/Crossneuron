import { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, User, Camera, LogOut, CheckCircle, AlertCircle } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, updateUserProfile } from '../services/firestoreServices';
import { logout } from '../services/authService';
import { RootStackParamList } from '../App';
import { ProfileStyles as styles } from '../styles/ProfileStyles';
import { LocationPicker } from '../components/Profile/LocationPicker';

const PHOTO_KEY = 'profile_photo_uri';

type Toast = { type: 'success' | 'error'; message: string } | null;

export function ProfileScreen() {
    const { user } = useAuth();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<Toast>(null);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        async function loadProfile() {
            if (!user) return;
            try {
                const [profile, savedPhoto] = await Promise.all([
                    getUserProfile(user.uid),
                    AsyncStorage.getItem(PHOTO_KEY),
                ]);
                if (profile) {
                    setName(profile.name ?? '');
                    setLastName(profile.lastName ?? '');
                    setCountry(profile.country ?? '');
                    setCity(profile.city ?? '');
                }
                if (savedPhoto) setPhotoUri(savedPhoto);
            } finally {
                setLoading(false);
            }
        }
        loadProfile();
    }, [user]);

    function showToast(type: 'success' | 'error', message: string) {
        if (toastTimeout.current) clearTimeout(toastTimeout.current);
        setToast({ type, message });
        toastTimeout.current = setTimeout(() => setToast(null), 3000);
    }

    async function pickPhoto() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            showToast('error', 'Se necesita permiso para acceder a la galería.');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });
        if (!result.canceled && result.assets[0]) {
            const uri = result.assets[0].uri;
            setPhotoUri(uri);
            await AsyncStorage.setItem(PHOTO_KEY, uri);
        }
    }

    async function handleSave() {
        if (!user) return;
        setSaving(true);
        try {
            await updateUserProfile(user.uid, { name, lastName, country, city });
            showToast('success', 'Perfil actualizado correctamente.');
        } catch {
            showToast('error', 'Error al guardar. Intenta de nuevo.');
        } finally {
            setSaving(false);
        }
    }

    async function handleLogout() {
        try {
            await logout();  
            navigation.navigate('Login');
        } catch {
            showToast('error', 'Error al cerrar sesión.');
        }
    }

    if (loading) {
        return (
            <SafeAreaView style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color="hsl(221, 83%, 53%)" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Mi Perfil</Text>
                    <Text style={styles.headerSubtitle}>Administra tu información personal</Text>
                </View>

                {/* Avatar */}
                <View style={styles.avatarSection}>
                    <TouchableOpacity style={styles.avatarWrapper} onPress={pickPhoto} activeOpacity={0.85}>
                        {photoUri ? (
                            <Image source={{ uri: photoUri }} style={styles.avatarImage} />
                        ) : (
                            <View style={styles.avatarPlaceholder}>
                                <User size={48} color="hsl(221, 83%, 53%)" />
                            </View>
                        )}
                        <View style={styles.avatarEditBadge}>
                            <Camera size={16} color="#fff" />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Email card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Cuenta</Text>
                    <View style={styles.emailRow}>
                        <View style={styles.emailIconWrapper}>
                            <Mail size={18} color="hsl(221, 83%, 53%)" />
                        </View>
                        <Text style={styles.emailText} numberOfLines={1}>{user?.email}</Text>
                    </View>
                </View>

                {/* Personal info card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Información personal</Text>

                    <View style={styles.fieldRow}>
                        <View style={styles.fieldIconWrapper}>
                            <User size={18} color="#22c55e" />
                        </View>
                        <TextInput
                            style={[styles.fieldInput, focusedField === 'name' && styles.fieldInputFocused]}
                            placeholder="Nombre"
                            placeholderTextColor="#9ca3af"
                            value={name}
                            onChangeText={setName}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            returnKeyType="next"
                        />
                    </View>

                    <View style={[styles.fieldRow, styles.lastFieldRow]}>
                        <View style={styles.fieldIconWrapper}>
                            <User size={18} color="#22c55e" />
                        </View>
                        <TextInput
                            style={[styles.fieldInput, focusedField === 'lastName' && styles.fieldInputFocused]}
                            placeholder="Apellidos"
                            placeholderTextColor="#9ca3af"
                            value={lastName}
                            onChangeText={setLastName}
                            onFocus={() => setFocusedField('lastName')}
                            onBlur={() => setFocusedField(null)}
                            returnKeyType="done"
                        />
                    </View>
                </View>

                {/* Location card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Ubicación</Text>
                    <LocationPicker
                        country={country}
                        city={city}
                        onSelect={(selectedCountry, selectedCity) => {
                            setCountry(selectedCountry);
                            setCity(selectedCity);
                        }}
                    />
                </View>

                {/* Toast */}
                {toast && (
                    <View style={toast.type === 'success' ? styles.toastSuccess : styles.toastError}>
                        {toast.type === 'success'
                            ? <CheckCircle size={18} color="#166534" />
                            : <AlertCircle size={18} color="#991b1b" />}
                        <Text style={[styles.toastText, toast.type === 'success' ? styles.toastTextSuccess : styles.toastTextError]}>
                            {toast.message}
                        </Text>
                    </View>
                )}

                {/* Save button */}
                <TouchableOpacity
                    style={[styles.saveButton, saving && styles.saveButtonDisabled]}
                    onPress={handleSave}
                    activeOpacity={0.85}
                    disabled={saving}
                >
                    {saving
                        ? <ActivityIndicator color="#fff" />
                        : <Text style={styles.saveButtonText}>Guardar cambios</Text>}
                </TouchableOpacity>

                {/* Logout button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.85}>
                    <LogOut size={18} color="#ef4444" />
                    <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
