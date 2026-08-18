import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";
type FontSize = "small" | "medium" | "large";

type ThemeContextValue = {
    theme: Theme;
    fontSize: FontSize;
    setTheme: (theme: Theme) => void;
    setFontSize: (fontSize: FontSize) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: {children: React.ReactNode}) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem("theme") as Theme) || "light"
    );

    const [fontSize, setFontSize] = useState<FontSize>(
        () => (localStorage.getItem("fontSize") as FontSize) || "medium"
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
 }, [theme]); 

    useEffect(() => {
        document.documentElement.setAttribute("data-font", fontSize);
        localStorage.setItem("fontSize", fontSize);
    }, [fontSize]);

    const value = useMemo(
        () => ({ theme, fontSize, setTheme, setFontSize }),
        [theme, fontSize]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

    export function useTheme() {
        const themeContext = useContext(ThemeContext);
        if (!themeContext) throw new Error("useTheme must be used inside ThemeProvider");
        return themeContext;
    }