import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { ColorModeContextProvider } from './context/ColorModeContext';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import store from './reduxReducers/store';


function App() {


    return (
        <div className="App">
            <Provider store={store}>
                <ColorModeContextProvider>
                    <Outlet />
                    <SnackbarProvider 
                        autoHideDuration={3000}
                    />
                </ColorModeContextProvider>
            </Provider>
      </div>
    );
}

export default App;
