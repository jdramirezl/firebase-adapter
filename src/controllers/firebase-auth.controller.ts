import { Request, Response } from 'express';

import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    deleteUser,
} from '../config/firebase';

const auth = getAuth();

export const createUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        res.status(201).json(userCredential.user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const user = auth.currentUser;
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const updateUserProfile = async (req: Request, res: Response) => {
    const { displayName, photoURL } = req.body;
    try {
        await updateProfile(auth.currentUser, { displayName, photoURL }); // AQUI PONEMOS LA INFO DEL USUSARIO
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteUserProfile = async (req: Request, res: Response) => {
    try {
        await deleteUser(auth.currentUser);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


