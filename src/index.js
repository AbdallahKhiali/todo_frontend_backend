import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import "./index.scss";

import { GeneralContextProvider } from "./contexts/general";
import { TodoContextProvider } from './contexts/todo';
import { AuthContextProvider } from './contexts/Auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GeneralContextProvider>
        <TodoContextProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </TodoContextProvider>
      </GeneralContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
