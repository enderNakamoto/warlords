"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export default function Top() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      {showBackToTop && (
        <Button
          className="fixed bottom-12 right-4 p-2 bg-gray-600 text-white rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition-opacity"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </>
  );
}
