import { create } from "zustand";

interface AppState {
  theme: "light" | "dark" | "system";
  selectedTool: string | null;
  setTheme: (theme: "light" | "dark" | "system") => void;
  setSelectedTool: (tool: string) => void;
}

const useAppStore = create<AppState>((set) => ({
  theme:
    (typeof window !== "undefined"
      ? (localStorage.getItem("dev-toys-theme") as "light" | "dark" | "system")
      : null) || "system",
  selectedTool: null,
  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dev-toys-theme", theme);
    }
    set({ theme });
  },
  setSelectedTool: (tool) => set({ selectedTool: tool }),
}));

export default useAppStore;
