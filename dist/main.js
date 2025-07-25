import { jsx as _jsx } from "react/jsx-runtime";
// @ts-nocheck
import React from 'https://esm.sh/react@18';
import { createRoot } from 'https://esm.sh/react-dom@18/client';
import App from './App';
// Create a React root and render the App component
const container = document.getElementById('root');
if (!container) {
    throw new Error('Root element #root not found');
}
const root = createRoot(container);
root.render(_jsx(App, {}));
