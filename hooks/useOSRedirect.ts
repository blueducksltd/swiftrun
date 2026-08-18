"use client";
import { useEffect } from "react";

interface RedirectionLinks {
  ios: string;
  android: string;
}


export const useOSRedirect = (links: RedirectionLinks) => {
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

    // iOS detection
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      window.location.href = links.ios;
      return;
    }

    // Android detection
    if (/android/i.test(userAgent)) {
      window.location.href = links.android;
      return;
    }
  }, [links]);
};
