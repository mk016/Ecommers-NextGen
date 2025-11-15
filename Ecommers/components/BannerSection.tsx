"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import axios from "axios";

interface BannerType {
  _id: string;
  image: string;
  link?: string;
}

const BannerSection = () => {
  const [banners, setBanners] = useState<BannerType[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);

  // --- Data Fetching Logic (Unchanged) ---
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get("/api/admin/banner");
        setBanners(res.data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const goToNextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  }, [banners.length]);

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  //  Auto-Scroll Logic
  useEffect(() => {
    if (banners.length > 1) {
      const intervalId = setInterval(goToNextSlide, 5000);

      return () => clearInterval(intervalId);
    }
  }, [banners.length, goToNextSlide]); // Re-run when banners change

  if (loading) return <p className="p-4 text-center">Loading banners...</p>;
  if (banners.length === 0) return null; // Don't render if no banners

  const currentBanner = banners[currentIndex];

  return (
    <div className="w-full relative overflow-hidden p-4">
      {/* Slider Container */}
      <section className="relative h-96">
        {" "}
        <a
          key={currentBanner._id}
          href={currentBanner.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full"
        >
          <Image
            src={currentBanner.image}
            alt="Banner"
            // fill yha par pure area me fill karne me kaam aati h
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg shadow-xl"
          />
        </a>
        {banners.length > 1 && (
          <>
            <button
              onClick={goToPrevSlide}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 m-2 rounded-full z-10 hover:bg-opacity-75 transition-colors"
              aria-label="Previous slide"
            >
              &lt;
            </button>

            <button
              onClick={goToNextSlide}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 m-2 rounded-full z-10 hover:bg-opacity-75 transition-colors"
              aria-label="Next slide"
            >
              &gt;
            </button>
          </>
        )}
      </section>
    </div>
  );
};

export default BannerSection;
