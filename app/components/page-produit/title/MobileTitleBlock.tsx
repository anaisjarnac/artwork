"use client";

import { monoTrust } from "@/app/fonts";
import { useWindowSize } from "@/app/hooks/use-window-size";

export default function MobileTitleBlock({ title }: { title: string }) {
  const { isMobile } = useWindowSize();

  if (!isMobile) return null;
  return (
    <h1
      className={`${monoTrust.className} text-3xl text-white font-bold tracking-tight text-center md:text-left`}
    >
      {title}
    </h1>
  );
}
