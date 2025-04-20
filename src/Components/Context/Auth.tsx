import { onAuthStateChanged,User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase";

const AuthContext = createContext<User|null>(null)
export const userAuth = ()=>useContext(AuthContext)

interface AuthProviderProps {
    children:ReactNode
}
const AuthProvider = ({children}:AuthProviderProps)=>{
    const[user,setUser] = useState<User|null>(null)
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentChildren)=>{
            setUser(currentChildren)
        })
        return unsubscribe
    },[])
    return(
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider