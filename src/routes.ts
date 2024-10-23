import {Router} from "express";
import {createUser, getUserProfile, updateUserProfile, deleteUserProfile} from "./controllers/firebase-auth.controller";
import verifyToken from "./middleware";

export const routes = (router: Router) => {
    router.post('/signup', createUser);
    router.get('/profile/:uid', verifyToken, getUserProfile);
    router.put('/profile', verifyToken, updateUserProfile);
    router.delete('/profile/:uid', verifyToken, deleteUserProfile);
}

