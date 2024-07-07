"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import animationData from "@/public/animations/coming_soon.json";

// Dynamically import the Lottie component with SSR disabled
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function WhereToBuyComingSoon() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-dark-black min-h-[94vh] text-cool-white">
      <div className="container mx-auto p-6 text-center flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">Where to Buy</h1>
        <p className="text-lg text-warm-white mb-8">
          We&apos;re expanding! In the future, this page will show you where to
          find our products in stores near you.
        </p>
        {isClient && (
          <Lottie animationData={animationData} style={{ height: 600 }} />
        )}
        <Link href="/">
          <div className="primary-button">Back to Home</div>
        </Link>
      </div>
    </div>
  );
}
