"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface Settings {
  phone: string;
  email: string;
  address: string;
  registrationDate: string;
  whatsapp: string;
  galleryImages: string[];
}

interface SettingsContextValue {
  settings: Settings | null;
  refresh: () => void;
  updateSettings: (data: Partial<Settings>) => Promise<Settings | null>;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(
  undefined,
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings | null>(null);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      } else {
        console.error("Failed to load settings");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const refresh = () => {
    fetchSettings();
  };

  const updateSettings = async (data: Partial<Settings>) => {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const updated = await res.json();
        setSettings(updated);
        return updated;
      }
      console.error("Failed to update settings");
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, refresh, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return ctx;
}
