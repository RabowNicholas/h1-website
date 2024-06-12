"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageGallery({ images }: { images: string[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-64 mb-4">
      <div className="relative h-64">
        <Image
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="absolute top-0 left-0 flex justify-between w-full">
        <button
          className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-l"
          onClick={prevImage}
        >
          Prev
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-r"
          onClick={nextImage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
