import { FC, ReactNode, useState } from "react";
import { GlobalContext } from "./ContextInstance";

const { Provider } = GlobalContext;

export const GlobalContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [name, setName] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  if (!Provider) return null;
  return (
    <Provider value={{ name, setName, theme, setTheme }}>{children}</Provider>
  );
};
