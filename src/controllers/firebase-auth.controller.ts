import { createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, doc, setDoc } from "firebase/firestore"; 


export const createUser = async (email, password, displayName, isAmbassador) => {
    if (!email || !password) {
        console.log({ error: 'Email and password are required' });
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await updateProfile(user, { displayName: displayName });

        const userDocRef = doc(db, "users", user.uid);
        setDoc(userDocRef, {
            is_ambassador: isAmbassador
        })    
        console.log("Usuario creado exitosamente:", user);
    } catch (error) {
        console.error("Error al crear el usuario:", error.message);
    }
};

export const updatePassword = async (email, password) => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log("Email de restablecimiento de contraseña enviado");
    } catch (error) {
        console.error("Error al enviar el email de restablecimiento de contraseña:", error.message);
    }
}

export const updateInfo = async (email, password, body) => {
    if (!email || !password) {
        console.log({ error: 'Email and password are required' });
    }
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userDocRef = doc(db, "users", user.uid);
        setDoc(userDocRef, body) 
        console.log("Usuario actualizado exitosamente:", user);
        
    } catch (error) {
        console.error("Error actualizando la info del usuario:", error.message);
    }
}