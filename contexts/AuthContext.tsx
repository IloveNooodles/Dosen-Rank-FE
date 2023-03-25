import { Account } from "@/interfaces";
import jwtDecode from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextData {
    getUser: () => Account;
    setUser: React.Dispatch<React.SetStateAction<Account>>;
    getToken: () => string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    isAuthenticated: () => boolean;
    signIn: (token: string) => void;
    signOut: () => void;
}

interface ContextProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC<ContextProps> = ({children}) => {
    const [user, setUser] = useState({} as Account);
    const [token, setToken] = useState('');

    useEffect(() => {
        initUser();
    }, [])

    // sync jwt token changes to local storage
    useEffect(() => {
        if (token) localStorage.setItem('token', token);
    }, [token])

    const initUser = async () => {
        let userToken;
        userToken = localStorage.getItem('token');
        if (userToken) {
            setToken(userToken);
            setUser(getDecodedUser(userToken))
        }
    }

    const signOut = () => {
        setUser({} as Account);
        setToken('')
        localStorage.removeItem('token')
    }

    const getDecodedUser = (token: string) => {
        const {id, name, email, isAdmin, univId, ...rest}: Account = jwtDecode(token)
        return {id, name, email, isAdmin, univId}
    }

    const signIn = async (token: string) => {
        setToken(token)
        localStorage.setItem('token', token)
        setUser(getDecodedUser(token))
    }

    return (
        <AuthContext.Provider value={{
            getUser: () => user,
            setUser,
            getToken: () => token,
            setToken,
            isAuthenticated: () => token !== '',
            signIn,
            signOut,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('Fail to load context from provider')
    }

    return context
}



export {AuthProvider, useAuth}