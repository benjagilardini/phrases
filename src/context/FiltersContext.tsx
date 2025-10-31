import React, { createContext, useContext, useState, PropsWithChildren } from "react";

type FiltersContextType = { search: string; setSearch: (q: string) => void };
const Ctx = createContext<FiltersContextType | null>(null);

export const FiltersProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [search, setSearch] = useState("");
  return <Ctx.Provider value={{ search, setSearch }}>{children}</Ctx.Provider>;
};

export const useFilters = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useFilters must be used inside <FiltersProvider>");
  return v;
};
