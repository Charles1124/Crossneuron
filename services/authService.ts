import { auth } from './firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInWithCredential,
    OAuthProvider,
    sendPasswordResetEmail,
    sendEmailVerification,
    GoogleAuthProvider,
} from 'firebase/auth';
import { useEffect } from 'react';


//Registrarse con email y contraseña. 
export const registerWithEmail = async (email: string, password: string) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        return result.user;
    } catch (e: any) {
        throw new Error(e.message);
    }
};

//Envíar mail de verificación.
export const sendVerificationEmail = async () => {
    try {
        const user = auth.currentUser;
        if (user) await sendEmailVerification(user);
    } catch (e: any) {
        throw new Error(e.message);
    }
}

//Iniciar sesión con email y contraseña.
export const loginWithEmail = async (email: string, password: string) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user;
    } catch (e: any) {
        switch (e.code) {
            case 'auth/invalid-credential':
            case 'auth/wrong-password':
            case 'auth/user-not-found':
                throw new Error('Correo o contraseña incorrectos.');
            case 'auth/invalid-email':
                throw new Error('Correo electrónico no válido.');
            default:
                throw new Error('Ocurrió un error intente de nuevo.');
        };
    }
};

//Autenticación con Apple. 
export const loginWithApple = async (idToken: string, nonce: string) => {
    try {
        const provider = new OAuthProvider('apple.com');
        const credential = provider.credential({ idToken, rawNonce: nonce });
        const result = await signInWithCredential(auth, credential);
        return result.user;
    } catch (e: any) {
        throw new Error(e.message);
    }
};

//Cerrar sesión. 
export const logout = async () => {
    try {
        await signOut(auth);
    } catch (e: any) {
        throw new Error(e.message);
    }
};

//Forgot Password. 
export const forgotPassword = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (e: any) {
        switch (e.code) {
            case 'auth/invalid-credential':
            case 'auth/user-not-found':
                throw new Error('Correo o contraseña incorrectos.');
            case 'auth/invalid-email':
                throw new Error('Correo electrónico no válido.');
            default:
                throw new Error('Ocurrió un error intente de nuevo.');
        }
    }
};

