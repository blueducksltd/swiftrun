"use client";
import React, { createContext, useContext, useState } from "react";

type DownloadAppContextType = {
  state: {
    show: boolean;
    type: "customer" | "rider";
  };
  setState: React.Dispatch<React.SetStateAction<{show: boolean; type: "customer" | "rider"}>>;
};

const DownloadAppContext = createContext<DownloadAppContextType | undefined>(undefined);

export function useDownloadApp() {
  const context = useContext(DownloadAppContext);

  if (!context) {
    throw new Error("useDownloadApp must be used within a DownloadAppProvider");
  }

  return context;
}

export default function DownloadAppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{show: boolean; type: "customer" | "rider"}>({ show: false, type: "customer"});

  return (
    <DownloadAppContext.Provider value={{ state, setState }}>
      {children}
    </DownloadAppContext.Provider>
  );
}


