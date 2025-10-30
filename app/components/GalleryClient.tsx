"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function GalleryClient({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  return (
    <div className="w-full max-w-[1300px] flex flex-col md:flex-row items-center md:items-center gap-8">
      <div className="md:w-1/2 flex flex-col items-center">
        <div className="w-full max-w-[700px]">
          <Image
            src={images[index]}
            alt={`image-${index}`}
            width={700}
            height={700}
            className="rounded-xl max-w-full h-auto"
          />
        </div>
        <div className="mt-4 flex gap-3">
          {images.map((src, i) => (
            <button
              type="button"
              key={src + i}
              onClick={() => setIndex(i)}
              className={`w-20 h-20 rounded-md overflow-hidden border ${
                i === index ? "border-white" : "border-transparent"
              }`}
            >
              <Image
                src={src}
                alt={`thumb-${i}`}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left px-4">
        {/* Title/description/price are rendered by the parent page */}
      </div>
    </div>
  );
}
