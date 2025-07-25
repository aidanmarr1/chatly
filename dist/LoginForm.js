import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// @ts-nocheck
import React, { useState } from 'react';
import { supbase } from './supabaseClient';
/**
 * LoginForm component handles user authentication. It allows users to sign in
 * with their email and password or create a new account. When authentication
 * succeeds, the parent component can check the auth state via supabase.auth.
 */
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [variant, setVariant] = useState('login');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            if (variant === 'login') {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (signInError)
                    throw signInError;
            }
            else {
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (signUpError)
                    throw signUpError;
            }
        }
        catch (err) {
            setError(err.message || 'An unexpected error occurred');
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsx("div", { className: "container", children: _jsxs("div", { className: "card", children: [_jsx("h2", { children: variant === 'login' ? 'Sign In' : 'Create Account' }), error && (_jsx("p", { style: { color: 'red', marginBottom: '1rem' }, children: error })), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("label", { htmlFor: "email", children: "Email" }), _jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true }), _jsx("label", { htmlFor: "password", children: "Password" }), _jsx("input", { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true }), _jsx("button", { type: "submit", disabled: loading, children: loading ? 'Loading…' : variant === 'login' ? 'Sign In' : 'Sign Up' })] }), _jsx("p", { style: { marginTop: '1rem' }, children: variant === 'login' ? (_jsxs(_Fragment, { children: ["Don't have an account?", ' ', _jsx("a", { href: "#", onClick: (e) => {
                                    e.preventDefault();
                                    setVariant('signup');
                                    setError(null);
                                }, children: "Sign up" })] })) : (_jsxs(_Fragment, { children: ["Already have an account?", ' ', _jsx("a", { href: "#", onClick: (e) => {
                                    e.preventDefault();
                                    setVariant('login');
                                    setError(null);
                                }, children: "Sign in" })] })) })] }) }));
};
export default LoginForm;
