"use client";
import Head from "next/head";
import VideoGrid from "./_components/HeroVideos";
import Product from "./_components/Product";

const videos = [
  "/videos/running.mp4",
  "/videos/biking.mp4",
  "/videos/lifting.mp4",
  "/videos/basketball.mp4",
];

export default function Page() {
  const smoothScrollToSection = (id: any) => {
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <Head>
        <title>{"Hydrogen infused sports drink"}</title>
        <meta name="description" content="Check out our featured product." />
      </Head>

      <header
        id="hero-section"
        className="hero-section bg-dark-black text-warm-white relative overflow-hidden"
        style={{ minHeight: "94vh" }}
      >
        <VideoGrid videos={videos} />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-50">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Live in Abundance
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Discover the power of hydrogen-infused sports drinks.
          </p>
          <button
            onClick={() => smoothScrollToSection("#product-section")}
            className="primary-button"
          >
            Shop Now
          </button>
        </div>
      </header>

      <section id="product-section" className="bg-warm-white py-16">
        <div className="container mx-auto">
          <Product />
        </div>
      </section>
    </>
  );
}
