import React from 'react';
import './App.css';
import { AppProvider } from "../Components/AppContext";
import { AppUI } from "./AppUI.js";

function App() {
  return [
    <AppProvider>
        <AppUI />
    </AppProvider>
  ];
}

export default App;
