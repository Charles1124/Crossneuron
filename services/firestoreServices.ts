import { db } from './firebase'; 
import {doc, setDoc, getDoc, updateDoc} from 'firebase/firestore'; 

//Crear perfil de usuario al registrarse. 
export const createUserProfile= async (uid: string, email: string) => {
    try{
        await setDoc(doc(db, 'users', uid), {
            email, 
            createAt: new Date(), 
            shapesGame: {
                score: 0, 
            }
        });
    } catch (e: any){
        throw new Error(e.message); 
    }
}; 

//Obtener perfil del usuario. 
export const getUserProfile= async (uid: string)=> {
    try{
        const snap= await getDoc(doc(db, 'users', uid)); 
        if(snap.exists()) return snap.data(); 
        return null; 
    } catch (e: any){
        throw new Error(e.message); 
    }
}; 

//Guardar puntuación del juego de figuras.
export const saveShapeScore= async (uid: string, score: number) => {
    try{
        await updateDoc(doc(db, 'users', uid), {
            'shapesGame.score': score,
        });
    } catch (e: any){
        throw new Error(e.message);
    }
}

//Actualizar campos opcionales del perfil del usuario.
export const updateUserProfile = async (uid: string, data: { name?: string; lastName?: string; country?: string; city?: string }) => {
    try {
        await updateDoc(doc(db, 'users', uid), data);
    } catch (e: any) {
        throw new Error(e.message);
    }
};