import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { supabase } from './supabaseClient';
/**
 * ChatPage component displays a list of messages and allows the authenticated user
 * to send new messages. It subscribes to real‑time changes from Supabase so
 * messages appear instantly when another user sends one.
 */
const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [userId, setUserId] = useState(null);
    const bottomRef = useRef(null);
    // Fetch current session to identify the user
    useEffect(() => {
        async function getSession() {
            const { data: { session }, error, } = await supabase.auth.getSession();
            if (error) {
                console.error('Session error', error);
            }
            if (session)
                setUserId(session.user?.id ?? null);
        }
        getSession();
    }, []);
    // Load initial messages and set up real‑time subscription
    useEffect(() => {
        let channel;
        async function loadMessages() {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .order('created_at', { ascending: true });
            if (error) {
                console.error('Error loading messages', error);
            }
            else {
                setMessages(data || []);
            }
            // Subscribe to new messages
            channel = supabase
                .channel('public:messages')
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
                setMessages((prev) => [...prev, payload.new]);
            })
                .subscribe();
        }
        loadMessages();
        return () => {
            if (channel)
                supabase.removeChannel(channel);
        };
    }, []);
    // Scroll to bottom when messages update
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    async function handleSend(e) {
        e.preventDefault();
        const content = newMessage.trim();
        if (!content)
            return;
        // Insert new message
        const { error } = await supabase
            .from('messages')
            .insert({ content });
        if (error) {
            console.error('Error sending message', error);
        }
        else {
            setNewMessage('');
        }
    }
    async function handleSignOut() {
        const { error } = await supabase.auth.signOut();
        if (error)
            console.error('Error signing out', error);
    }
    return (_jsxs("div", { className: "chat-container", children: [_jsxs("div", { className: "chat-header", children: [_jsx("span", { children: "Chatly" }), _jsx("button", { onClick: handleSignOut, children: "Sign out" })] }), _jsxs("div", { className: "message-list", children: [messages.map((msg) => (_jsx("div", { className: `message ${msg.user_id === userId ? 'me' : ''}`, children: msg.content }, msg.id))), _jsx("div", { ref: bottomRef })] }), _jsxs("form", { className: "chat-input", onSubmit: handleSend, children: [_jsx("input", { type: "text", value: newMessage, onChange: (e) => setNewMessage(e.target.value), placeholder: "Type a message…" }), _jsx("button", { type: "submit", children: "Send" })] })] }));
};
export default ChatPage;
