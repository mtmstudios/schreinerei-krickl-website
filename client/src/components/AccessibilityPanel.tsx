import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User, RotateCcw } from "lucide-react";

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  reduceMotion: boolean;
  focusHighlight: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  highContrast: false,
  reduceMotion: false,
  focusHighlight: false,
};

export default function AccessibilityPanel() {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("accessibility-settings");
      return saved ? JSON.parse(saved) : defaultSettings;
    }
    return defaultSettings;
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("accessibility-settings", JSON.stringify(settings));
    applySettings(settings);
  }, [settings]);

  useEffect(() => {
    applySettings(settings);
  }, []);

  const applySettings = (s: AccessibilitySettings) => {
    const root = document.documentElement;
    
    root.style.fontSize = `${s.fontSize}%`;
    
    if (s.highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }
    
    if (s.reduceMotion) {
      root.classList.add("reduce-motion");
    } else {
      root.classList.remove("reduce-motion");
    }
    
    if (s.focusHighlight) {
      root.classList.add("focus-highlight");
    } else {
      root.classList.remove("focus-highlight");
    }
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 left-4 z-50 rounded-full shadow-lg"
          aria-label="Barrierefreiheit-Einstellungen öffnen"
          data-testid="button-accessibility-open"
        >
          <User className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[320px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Barrierefreiheit</SheetTitle>
          <SheetDescription>
            Passen Sie die Darstellung nach Ihren Bedürfnissen an.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="font-size">Schriftgröße: {settings.fontSize}%</Label>
            </div>
            <Slider
              id="font-size"
              min={80}
              max={150}
              step={10}
              value={[settings.fontSize]}
              onValueChange={(value) => updateSetting("fontSize", value[0])}
              aria-label="Schriftgröße anpassen"
              data-testid="slider-font-size"
            />
            <p className="text-xs text-muted-foreground">
              Vergrößert oder verkleinert den Text auf der gesamten Website.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <Label htmlFor="high-contrast">Hoher Kontrast</Label>
              <p className="text-xs text-muted-foreground">
                Erhöht den Farbkontrast für bessere Lesbarkeit.
              </p>
            </div>
            <Switch
              id="high-contrast"
              checked={settings.highContrast}
              onCheckedChange={(checked) => updateSetting("highContrast", checked)}
              aria-label="Hohen Kontrast aktivieren"
              data-testid="switch-high-contrast"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <Label htmlFor="reduce-motion">Animationen reduzieren</Label>
              <p className="text-xs text-muted-foreground">
                Deaktiviert Bewegungseffekte und Animationen.
              </p>
            </div>
            <Switch
              id="reduce-motion"
              checked={settings.reduceMotion}
              onCheckedChange={(checked) => updateSetting("reduceMotion", checked)}
              aria-label="Animationen reduzieren"
              data-testid="switch-reduce-motion"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <Label htmlFor="focus-highlight">Fokus hervorheben</Label>
              <p className="text-xs text-muted-foreground">
                Zeigt einen deutlichen Rahmen um das fokussierte Element.
              </p>
            </div>
            <Switch
              id="focus-highlight"
              checked={settings.focusHighlight}
              onCheckedChange={(checked) => updateSetting("focusHighlight", checked)}
              aria-label="Fokus hervorheben"
              data-testid="switch-focus-highlight"
            />
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={resetSettings}
            data-testid="button-reset-accessibility"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Zurücksetzen
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
