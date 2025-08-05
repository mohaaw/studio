
'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Save } from 'lucide-react';

const defaultCustomColors = {
  background: '204 10% 4%',
  foreground: '210 40% 98%',
  card: '222 47% 11% / 0.5',
  primary: '180 100% 50%',
  accent: '174 78% 52%',
};

type ColorName = keyof typeof defaultCustomColors;

// Helper to convert HSL string to hex
function hslToHex(hslStr: string) {
    const parts = hslStr.split(' ');
    const h = parseFloat(parts[0]);
    const s = parseFloat(parts[1].replace('%', ''));
    const l = parseFloat(parts[2].replace('%', ''));
    
    const s_norm = s / 100;
    const l_norm = l / 100;
    let c = (1 - Math.abs(2 * l_norm - 1)) * s_norm;
    let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    let m = l_norm - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Helper to convert hex to HSL string
function hexToHsl(hex: string) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    r /= 255; g /= 255; b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `${h} ${s}% ${l}%`;
}

interface ThemeCustomizerDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function ThemeCustomizerDialog({ isOpen, onOpenChange }: ThemeCustomizerDialogProps) {
  const { theme, setTheme } = useTheme();
  const [customColors, setCustomColors] = useState(defaultCustomColors);

  useEffect(() => {
    const savedColors = localStorage.getItem('custom-theme-colors');
    if (savedColors) {
      setCustomColors(JSON.parse(savedColors));
    }
  }, []);

  useEffect(() => {
    if (theme === 'custom') {
      const root = document.documentElement;
      Object.entries(customColors).forEach(([key, value]) => {
          if (key === 'card') {
             const [h, s, l, a] = value.replace(/%/g, '').split(' ').map(parseFloat);
             root.style.setProperty(`--${key}`, `${h} ${s}% ${l}%`);
             if (a) {
                root.style.setProperty(`--${key}`, `${h} ${s}% ${l}% / ${a}`);
             }
             root.style.setProperty('--card-foreground', customColors.foreground);
          } else {
            root.style.setProperty(`--${key}`, value);
            root.style.setProperty(`--${key}-foreground`, customColors.foreground);
          }
      });
      // Set other vars based on the main ones
      root.style.setProperty('--popover', `hsl(${customColors.background})`);
      root.style.setProperty('--popover-foreground', `hsl(${customColors.foreground})`);
      root.style.setProperty('--muted', `hsl(${customColors.accent})`);
      root.style.setProperty('--muted-foreground', `hsl(${customColors.foreground})`);
      root.style.setProperty('--border', `hsl(${customColors.primary} / 0.2)`);
      root.style.setProperty('--input', `hsl(${customColors.accent})`);
      root.style.setProperty('--ring', `hsl(${customColors.primary})`);
    } else {
        // Reset styles when switching away from custom
         const root = document.documentElement;
         Object.keys(defaultCustomColors).forEach(key => {
             root.style.removeProperty(`--${key}`);
             root.style.removeProperty(`--${key}-foreground`);
         });
         root.style.removeProperty('--popover');
         root.style.removeProperty('--popover-foreground');
         root.style.removeProperty('--muted');
         root.style.removeProperty('--muted-foreground');
         root.style.removeProperty('--border');
         root.style.removeProperty('--input');
         root.style.removeProperty('--ring');
    }
  }, [theme, customColors]);

  const handleColorChange = (name: ColorName, value: string) => {
      const hslValue = hexToHsl(value);
      setCustomColors(prev => ({...prev, [name]: hslValue}));
  }

  const saveCustomTheme = () => {
      localStorage.setItem('custom-theme-colors', JSON.stringify(customColors));
      setTheme('custom');
      onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Customize Theme</DialogTitle>
                <DialogDescription>
                    Pick your own colors to create a personalized theme.
                </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
                {(Object.keys(customColors) as ColorName[]).map(name => (
                    <div key={name} className="space-y-2">
                         <Label htmlFor={name} className="capitalize">{name}</Label>
                         <Input
                            id={name}
                            type="color"
                            value={hslToHex(customColors[name].split(' / ')[0])}
                            className="h-10 p-1"
                            onChange={(e) => handleColorChange(name, e.target.value)}
                         />
                    </div>
                ))}
            </div>
            <DialogFooter>
                 <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={saveCustomTheme}>
                    <Save className="mr-2 h-4 w-4" />
                    Save and Apply
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
