"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Proxy = {
  url: string;
  count: number;
  isCircular: boolean;
};

type ProxiesContextType = {
  count: number;
  proxies: Proxy[];
  setCount: (count: number) => void;
  setProxies: (proxies: Proxy[]) => void;
  handleInputChange: (index: number, value: string) => void;
  handleSelectChange: (index: number, value: number) => void;
  handleCircularChange: (index: number) => void;
  handleAddClick: () => void;
  handleRemoveClick: () => void;
};

const ProxiesContext = createContext<ProxiesContextType | undefined>(undefined);

export const ProxiesProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(10);
  const [proxies, setProxies] = useState(
    Array(count).fill({ url: "", count: 0, isCircular: false })
  );

  const handleInputChange = (index: number, value: string) => {
    const newProxies = [...proxies];
    newProxies[index] = { url: value, count: 1, isCircular: false };
    setProxies(newProxies);
  };

  const handleSelectChange = (index: number, value: number) => {
    const newProxies = [...proxies];
    newProxies[index] = { ...newProxies[index], count: value };
    setProxies(newProxies);
  };

  const handleCircularChange = (index: number) => {
    const newProxies = [...proxies];
    const proxy = newProxies[index];
    if (!proxy.url) {
      return;
    }
    newProxies[index] = {
      ...newProxies[index],
      isCircular: !newProxies[index].isCircular,
    };
    setProxies(newProxies);
  };

  const handleAddClick = () => {
    setCount(count + 10);
    setProxies([...proxies, ...Array(10).fill({ url: "", count: 0 })]);
  };

  const handleRemoveClick = () => {
    setCount(count - 10);
    setProxies(proxies.slice(0, proxies.length - 10));
  };

  return (
    <ProxiesContext.Provider
      value={{
        count,
        proxies,
        setCount,
        setProxies,
        handleInputChange,
        handleSelectChange,
        handleCircularChange,
        handleAddClick,
        handleRemoveClick,
      }}
    >
      {children}
    </ProxiesContext.Provider>
  );
};

export const useProxiesContext = () => {
  const context = useContext(ProxiesContext);
  if (!context) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
};
