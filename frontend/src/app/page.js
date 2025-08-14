import Image from "next/image";
import Navbar from "@/components/shared/navbar";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <div className="w-[1312px] h-[1312px] absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_#742AE4_0%,_rgba(71,_19,_150,_0.50)_50%,_rgba(10,_10,_10,_0)_100%)] rounded-full -z-10 blur-3xl" />
        <HeroSection />
      </main>
    </div>
  );
}
