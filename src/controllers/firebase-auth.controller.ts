import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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