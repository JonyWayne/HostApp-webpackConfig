import { createContext, Dispatch, SetStateAction } from "react";

export interface ContextProps {
  name: string | null;
  theme: string | null;
  setName: Dispatch<SetStateAction<string>>;
  setTheme: Dispatch<SetStateAction<string>>;
}

export const GlobalContext = createContext<ContextProps | null>(null);
