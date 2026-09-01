"use client";

import { useState } from "react";

type CodeBoxProps = {
  code: string;
};

export default function CodeBox({ code }: CodeBoxProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access is denied in some in-app browsers, which is where a
      // lot of these links get opened from. The code is displayed in full
      // above regardless, so it can still be typed or read aloud.
    }
  }

  return (
    <div className="mt-8 w-full max-w-sm rounded-xl border border-[#066AC0]/30 bg-[#066AC0]/5 px-6 py-5">
      <p className="text-sm font-medium text-black/60">Your invite code</p>

      <p className="mt-2 font-mono text-3xl font-bold tracking-[0.2em] text-[#066AC0]">
        {code}
      </p>

      <button
        type="button"
        onClick={copy}
        className="mt-4 w-full rounded-lg bg-[#066AC0] px-6 py-3 font-semibold text-white"
      >
        {copied ? "Copied" : "Copy code"}
      </button>
    </div>
  );
}
