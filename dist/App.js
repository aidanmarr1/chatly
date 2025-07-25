import { jsx as _jsx } from "react/jsx-runtime";
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import LoginForm from './LoginForm';
import ChatPage from './ChatPage';
/**
 * Root component that decides whether to show the login form or chat page
 * based on the authentication state. It listens for auth state changes using
 * Supabase's onAuthStateChange helper.
 */
const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [initialised, setInitialised] = useState(false);
    useEffect(() => {
        // Check initial session
        async function getInitialSession() {
            const { data: { session }, } = await supabase.auth.getSession();
            setAuthenticated(!!session);
            setInitialised(true);
        }
        getInitialSession();
        // Listen to auth state changes
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            setAuthenticated(!!session);
        });
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);
    if (!initialised)
        return null;
    return authenticated ? _jsx(ChatPage, {}) : _jsx(LoginForm, {});
};
export default App;
