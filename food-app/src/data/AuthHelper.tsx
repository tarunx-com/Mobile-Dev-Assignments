import { StyleSheet, Text, View } from 'react-native'
import React , {createContext, useContext, useState} from 'react'


export type UserData = {
    name: string;
    Email: string;
};

type AuthContextType={
    isLoggedIn : boolean;
    user: UserData | null;
    login: (data: UserData) => void
    logout: () => void;
}

const AuthContext= createContext <AuthContextType | null >(null);

const AuthHelper = ({ children }: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserData | null>(null);

    const login = (data: UserData) => {
        setUser(data);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthHelper;

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthHelper");
    }

    return context;
};