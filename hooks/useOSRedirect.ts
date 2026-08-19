"use client";
import { STORE_LINKS } from "@/app/util/data";
import { useDownloadApp } from "@/stores/DownloadAppProvider";
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

function getOS(): "android" | "ios" | "mac" | "windows" | "linux" | "" {
  const ua = navigator.userAgent;
  const isIpad = /Mac OS X/.test(ua) && navigator.maxTouchPoints > 1;
  if (/iPhone|iPad|iPod/.test(ua) || isIpad) return 'ios';
  if (/Android/.test(ua)) return 'android';
  if (/Mac OS X/.test(ua)) return 'mac';
  if (/Windows/.test(ua)) return 'windows';
  if (/Linux/.test(ua)) return 'linux';
  return '';
}

export const redirectDownloadTheAppHooks = () => {
  const { setState } = useDownloadApp();

  const redirectUser = (type: "user" | "driver") => {
    if (getOS() === "android") {
      window.location.href = STORE_LINKS[type].android
      // router.push("/download-the-app/user")
    } else if (getOS() === "ios") {
      window.location.href = STORE_LINKS[type].ios
    } else {
      setState(prev => ({ ...prev, show: true }))

    }
  }

  return redirectUser;

}