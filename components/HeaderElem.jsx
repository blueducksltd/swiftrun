import React from "react";

export default function HeaderElem({ children }) {
  return (
    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 p-6 md:p-20 inset-0  bg-[linear-gradient(to_right,white_30%,transparent_100%)] gap-14">
      {children}
    </div>
  );
}
