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
                    mode: "light",
                    primary: {
                        main: "#27ae60",
                        contrastText: "#fff"
                    },
                    secondary: {
                        main: "#3d8e63",
                    },
                    background: {
                        default: "#eeeeee",
                        paper: "#fff"
                    },
                    success: {
                        main: "#27ae60",
                        contrastText: "#fff"
                    },
                    getContrastText: () => {return "#000"}
                    
                },
            })
        }
        else{
            return createTheme({
                palette: {
                    mode: "dark",
                    primary: {
                        main: "#27ae60",
                        contrastText: "#fff"
                    },
                    secondary: {
                        main: "#3d8e63",
                    },
                    background: {
                        paper: "#424242",
                        default: "#303030"
                    },
                    success: {
                        main: "#27ae60",
                        contrastText: "#fff"
                    },
                    getContrastText: () => {return "#fff"}
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