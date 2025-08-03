
'use client';
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

const themes = [
    { name: 'light', icon: Sun },
    { name: 'dark', icon: Moon },
    { name: 'pro', icon: Monitor },
];

export function ThemeSwitcher() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const { state } = useSidebar();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleThemeChange = () => {
        const currentAppliedTheme = theme === 'system' ? resolvedTheme : theme;
        const currentIndex = themes.findIndex(t => t.name === currentAppliedTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex].name);
    };

    if (!mounted) {
        // Return a placeholder button to prevent layout shift while mounting
        return <Button variant="ghost" size="icon" className="flex-1 justify-center"></Button>;
    }
    
    // The theme to display in the UI (e.g., 'auto' if system is selected)
    const displayThemeName = theme === 'system' ? 'auto' : theme;
    
    // The icon should reflect the *actually resolved* theme
    const CurrentIcon = themes.find(t => t.name === resolvedTheme)?.icon || Monitor;

    return (
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleThemeChange} 
            className="flex-1 justify-center"
            aria-label={`Switch to next theme. Current theme: ${displayThemeName}`}
        >
            <CurrentIcon className="h-5 w-5" />
            <span 
                className="ml-2 capitalize"
                style={{
                    opacity: state === 'collapsed' ? 0 : 1,
                    width: state === 'collapsed' ? 0 : 'auto',
                    transition: 'opacity 0.2s ease-in-out, width 0.2s ease-in-out'
                }}
            >
                {displayThemeName}
            </span>
        </Button>
    );
}
