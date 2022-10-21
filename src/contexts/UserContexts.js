import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../../src/firebase/firebase.config';


export const AuthContext=createContext();
const auth=getAuth(app);
const UserContexts = ({children}) => {


    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    //create signup/register authentication
    const createSignupUser=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

    //create login/sign in authentication
    const createLoginUser=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }


    //create logOUt in authentication
    const logOut=()=>{
        return signOut(auth)
    }

    //start::state changed
    useEffect(()=>{
        const unscribe=onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            setLoading(true)
            // console.log('state changed',currentUser)
        })
        return ()=>{
            unscribe();
        }
    },[])
    //End::state changed


    const authInfo={user,createSignupUser,createLoginUser,logOut,loading};
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContexts;