"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ENDPOINTS } from "@/config/api";

export type UserRole = "SUPER_ADMIN" | "CMS_MANAGER" | "TEACHER" | "STUDENT";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    isActive: boolean;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<{ success: boolean; message: string; user?: User }>;
    register: (name: string, email: string, password: string, role: string) => Promise<{ success: boolean; message: string }>;
    logout: () => void;
    isLoading: boolean;
    token: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

const SESSION_KEY = "itroots_session";
const TOKEN_KEY = "itroots_token";

export function LMSAuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem(SESSION_KEY);
        const savedToken = localStorage.getItem(TOKEN_KEY);
        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
        }
        setIsLoading(false);
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        try {
            const res = await fetch(ENDPOINTS.AUTH.LOGIN, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                const { user, token } = data;
                setUser(user);
                setToken(token);
                localStorage.setItem(SESSION_KEY, JSON.stringify(user));
                localStorage.setItem(TOKEN_KEY, token);
                return { success: true, message: "Login successful", user };
            }

            return { success: false, message: data.message || "Login failed" };
        } catch (error) {
            return { success: false, message: "Connection error to server" };
        }
    }, []);

    const register = useCallback(async (name: string, email: string, password: string, role: string) => {
        try {
            const res = await fetch(ENDPOINTS.AUTH.REGISTER, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role }),
            });
            const data = await res.json();
            if (res.ok) return { success: true, message: "Registration successful. Pending admin approval." };
            return { success: false, message: data.message || "Registration failed" };
        } catch (error) {
            return { success: false, message: "Connection error to server" };
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(TOKEN_KEY);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isLoading, token }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useLMSAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useLMSAuth must be used inside LMSAuthProvider");
    return ctx;
}
