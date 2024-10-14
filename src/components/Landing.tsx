import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Trailer from "@/components/landing/Trailer";
import Features from "@/components/landing/Features";
import Troops from "@/components/landing/Troops";
import Weather from "@/components/landing/Weather";
import Waitlist from "@/components/landing/Waitlist";
import Footer from "@/components/landing/Footer";
import Top from "@/components/landing/Top";

export function Landing() {
  return (
    <div className="bg-gray-900 text-white font-sans flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <Trailer />
        <Features />
        <Troops />
        <Weather />
        <Waitlist />
      </main>
      <Footer />
      <Top />
    </div>
  );
}
