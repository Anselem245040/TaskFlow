"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface User {
    id: string;
    email: string;
    name?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<string | number | undefined>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {

    }, []);

    const login = async (email: string, password: string) => {

    };

    const signup = async (name: string, email: string, password: string) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        if (users.find((u: any) => u.email === email)) {
            return (
                toast.error('Email exists')
            )
        }

        const newUser = { name, email, password }
        users.push(newUser)
        localStorage.setItem('user', JSON.stringify(users))
        localStorage.setItem('currentUser', email)
        setUser(user)
        toast.success('Registered Successfully!')
        router.push('/')

        console.log(users)
    };

    const logout = () => {
        setUser(null)
        router.push("/auth/login");

    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
