import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { StateProvider } from './Component/StateContext.jsx';

if (typeof global === 'undefined') {
    window.global = window;
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateProvider>  {/* Wrap your App with StateProvider */}
      <App />
    </StateProvider>
  </React.StrictMode>,
);
