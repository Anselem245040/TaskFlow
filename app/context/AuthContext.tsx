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
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check for existing session/token here
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // Mock login logic
            console.log("Logging in with:", email);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const mockUser = { id: "1", email, name: "Test User" };
            setUser(mockUser);
            localStorage.setItem("user", JSON.stringify(mockUser));

            toast.success("Successfully logged in!");
            router.push("/dashboard");
        } catch (error) {
            toast.error("Failed to login");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (name: string, email: string, password: string) => {
        setIsLoading(true);
        try {
            // Mock signup logic
            console.log("Signing up with:", name, email);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const mockUser = { id: "1", email, name };
            setUser(mockUser);
            localStorage.setItem("user", JSON.stringify(mockUser));

            toast.success("Account created successfully!");
            router.push("/dashboard");
        } catch (error) {
            toast.error("Failed to create account");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        toast.info("Logged out");
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
