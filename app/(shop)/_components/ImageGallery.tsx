"use client";
import { useState } from "react";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
    <div className="relative w-full h-96 mb-4 overflow-hidden rounded-lg shadow-lg">
      <div className="relative h-full">
        <Image
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 transform hover:scale-105"
        />
      </div>
      <div className="absolute top-0 left-0 flex justify-between w-full h-full">
        <button
          className="bg-warm-white bg-opacity-75 hover:bg-opacity-100 text-slate-gray px-3 py-1 rounded-l hover:text-warm-white transition-colors duration-300"
          onClick={prevImage}
        >
          <IoIosArrowBack size={24} />
        </button>
        <button
          className="bg-warm-white bg-opacity-75 hover:bg-opacity-100 text-slate-gray px-3 py-1 rounded-r hover:text-warm-white transition-colors duration-300"
          onClick={nextImage}
        >
          <IoIosArrowForward size={24} />
        </button>
      </div>
    </div>
  );
}
