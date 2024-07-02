"use client";
import Link from "next/link";
import Lottie from "lottie-react";
import animationData from "@/public/animations/coming_soon.json";

export default function WhereToBuyComingSoon() {
  return (
    <div className="bg-dark-black text-cool-white max-h-[85%]  flex flex-col justify-center items-center">
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Where to Buy</h1>
        <p className="text-lg text-warm-white mb-8">
          We're expanding! In the future, this page will show you where to find
          our products in stores near you.
        </p>
        <Lottie animationData={animationData} />
        <Link href="/">
          <div className="bg-bright-yellow hover:bg-yellow-600 text-dark-black font-bold py-3 px-6 rounded-lg mt-8 inline-block">
            Back to Home
          </div>
        </Link>
      </div>
    </div>
  );
}
