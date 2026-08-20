"use client";
import React, { createContext, useContext, useState } from "react";

type DownloadAppContextType = {
  state: {
    show: boolean;
    type: "user" | "rider";
  };
  setState: React.Dispatch<React.SetStateAction<{show: boolean; type: "user" | "rider"}>>;
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
  const [state, setState] = useState<{show: boolean; type: "user" | "rider"}>({ show: false, type: "user"});

  return (
    <DownloadAppContext.Provider value={{ state, setState }}>
      {children}
    </DownloadAppContext.Provider>
  );
}


