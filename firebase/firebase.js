//import app from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, updateProfile, 
    GoogleAuthProvider, signOut, signInWithEmailAndPassword, signInWithPopup } 
    from "firebase/auth";
import { getStorage } from "firebase/storage";
//import 'firebase/auth';
//import 'firebase/firestore';
//import 'firebase/storage';

import firebaseConfig from './config';

class Firebase {
    constructor() {
        const app = initializeApp(firebaseConfig);
        this.db = getFirestore(app);
        this.auth = getAuth();
        this.storage = getStorage(app);
    }

    // Registra un usuario
    async registrar(nombre, email, password) {
        const nuevoUsuario = await createUserWithEmailAndPassword(this.auth, email, password)
        return await updateProfile(this.auth.currentUser, {
            displayName : nombre
        })  
    }

    async loginGoogle() {
        const provider = new GoogleAuthProvider();
        return await signInWithPopup(this.auth, provider);
    }

    // Inicia sesión del usuario
    async loginWithEmail(email, password) {
        return await signInWithEmailAndPassword(this.auth, email, password);
    }

    // Cerrar sesión del usuario

    async cerrarSesion(){
        try {
            await signOut(this.auth);
        } catch (error) {
            return null;
        }
    }
}

const firebase = new Firebase();
export default firebase;