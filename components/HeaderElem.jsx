import React from "react";

export default function HeaderElem({ children }) {
  return (
    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 p-6 md:p-20 gap-14">
      {children}
    </div>
  );
}
