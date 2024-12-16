"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type StateContextType = {
  count: number;
  proxies: { url: string; count: number }[];
  setCount: (count: number) => void;
  setProxies: (proxies: { url: string; count: number }[]) => void;
};

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(10);
  const [proxies, setProxies] = useState(Array(count).fill({ url: "", count: 0 }));

  return (
    <StateContext.Provider value={{ count, proxies, setCount, setProxies }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
};
