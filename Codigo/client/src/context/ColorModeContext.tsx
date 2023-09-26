import { ThemeProvider, createTheme } from "@mui/material";
import { createContext, useContext, useMemo, useState } from "react";


interface IColorModeContext {
    toggleColorMode: () => void;
    mode: "dark" | "light";
}

export const ColorModeContext = createContext<IColorModeContext>({
    toggleColorMode: () => {},
    mode: "light"
});

export function ColorModeContextProvider({children} : any){
    
    let lcTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if(!lcTheme){
        localStorage.setItem("theme", "light");
        lcTheme = "light";
    }

    const [mode, setMode] = useState<"light" | "dark">(lcTheme!);
    const colorMode = useMemo(() => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
                localStorage.setItem("theme", mode === "light" ? "dark" : "light");
            },
            mode,
        }),
        [mode]
    );

    const theme = useMemo(() => {
        if(mode === "light"){
            return createTheme({
                palette: {
                    mode: 'light',
                    primary: {
                        main: '#a60910',
                    },
                    secondary: {
                        main: '#ff4148',
                    },
                },
            })
        }
        else{
            return createTheme({
                palette: {
                    mode: 'dark',
                    primary: {
                        main: '#a60910',
                    },
                    secondary: {
                        main: '#ff4148',
                    },
                },
            })
        }
    },  
    [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    )

}

export function useColorMode(){
    useContext(ColorModeContext);
}