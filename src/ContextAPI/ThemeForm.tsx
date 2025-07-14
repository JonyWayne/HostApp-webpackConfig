import { useContext } from "react";
import { ContextProps, GlobalContext } from "./ContextInstance";

export const ThemeForm = () => {
  const { setTheme } = useContext(GlobalContext) as ContextProps;

  return (
    <button onClick={() => setTheme("dark")}>Changed Theme with Context</button>
  );
};
