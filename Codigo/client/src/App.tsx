import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { ColorModeContextProvider } from './context/ColorModeContext';

function App() {
    return (
        <div className="App">
            <ColorModeContextProvider>
                <Outlet />
            </ColorModeContextProvider>
      </div>
    );
}

export default App;
