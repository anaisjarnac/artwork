"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LogoHover() {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMove}
    >
      <Link href="/" aria-label="Retour à l'accueil">
        <Image
          src="/images/anais5.png"
          alt="Anaïs"
          width={400}
          height={400}
          className="h-auto w-auto max-w-xs"
        />
      </Link>

      {visible && (
        <div
          style={{ left: pos.x + 20, top: pos.y - 20 }}
          className="fixed pointer-events-none transition-all duration-150"
        >
          <div className="relative rounded-full overflow-hidden shadow-lg w-40 h-40">
            <Image
              src="/images/moi.jpg"
              alt="preview"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
