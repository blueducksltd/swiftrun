"use client";

type OpenInAppButtonProps = {
  appUrl: string;
};

export default function OpenInAppButton({ appUrl }: OpenInAppButtonProps) {
  function openApp() {
    const startedAt = Date.now();

    window.location.href = appUrl;

    window.setTimeout(() => {
      const timePassed = Date.now() - startedAt;

      if (timePassed < 2200 && document.visibilityState === "visible") {
        window.location.href = "/download-the-app/user";
      }
    }, 1500);
  }

  return (
    <button
      type="button"
      onClick={openApp}
      className="rounded-lg bg-[#066AC0] px-6 py-3 font-semibold text-white"
    >
      Open in SwiftRun
    </button>
  );
}
