"use client";
import Image from "next/image";
import Navbar from "@/components/shared/navbar";
import HeroSection from "@/components/home/HeroSection";
import ProjectSlideSection from "@/components/home/ProjectSlideSection";
import AboutMeSection from "@/components/home/AboutMeSection";
import WorkingExperiencesSection from "@/components/home/WorkingExperiencesSection";
import ProjectShowcaseSection from "@/components/home/ProjectShowcaseSection";
import ArticleSection from "@/components/home/ArticleSection";
import Footer from "@/components/shared/footer";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-x-hidden">
        <div className="blob-1 w-[1312px] h-[1312px] absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_#742AE4_0%,_rgba(71,_19,_150,_0.50)_50%,_rgba(10,_10,_10,_0)_100%)] rounded-full -z-10 blur-3xl" />
        <div className="w-[1312px] h-[1312px] absolute top-[40%] right-0 translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_#742AE4_0%,_rgba(71,_19,_150,_0.50)_50%,_rgba(10,_10,_10,_0)_100%)] rounded-full -z-10 blur-3xl" />
        <div className="w-[1312px] h-[1312px] absolute top-[85%] left-0 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_#742AE4_0%,_rgba(71,_19,_150,_0.50)_50%,_rgba(10,_10,_10,_0)_100%)] rounded-full -z-10 blur-3xl" />
        <div className="pt-12">
          <HeroSection />
        </div>
        <ProjectSlideSection />
        <AboutMeSection />
        <WorkingExperiencesSection />
        <ProjectShowcaseSection />
        <ArticleSection />
        <ContactSection />
      </main>
      <Footer />
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1) rotate(0deg);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1) rotate(15deg);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9) rotate(-10deg);
          }
          100% {
            transform: translate(0px, 0px) scale(1) rotate(0deg);
          }
        }

        .blob-1 {
          animation: fadeIn 2s ease-out forwards 0.2s, blob 10s infinite ease-in-out;
        }
      `}</style>
    </>
  );
}
