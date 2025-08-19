"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navPillBaseClasses = "shadow-sm backdrop-blur-2xl rounded-full transition-colors duration-300";
  const navPillScrolledClasses = "bg-neutral-900/50 border-neutral-700";
  const navPillTopClasses = "bg-white/5 border-white/10";
  const navPillDropdownClasses = "shadow-sm backdrop-blur-2xl rounded-2xl transition-colors duration-300";

  return (
    <nav className="flex justify-between items-center px-6 md:px-12 lg:px-28 py-4 w-full fixed top-0 left-0 z-50">
      <div className={`px-6 py-3 flex justify-center items-center gap-2.5 ${navPillBaseClasses} ${isScrolled ? navPillScrolledClasses : navPillTopClasses}`}>
        <div className="text-center justify-start text-neutral-50 text-sm font-normal font-['Signika_Negative'] leading-tight">Danuar Wiranata</div>
      </div>

      <div className={`hidden md:flex px-10 py-3 justify-center items-center gap-12 ${navPillBaseClasses} ${isScrolled ? navPillScrolledClasses : navPillTopClasses}`}>
        <a href="/" className="text-center justify-start text-neutral-50 text-sm font-normal font-['Signika_Negative'] leading-tight hover:text-gray-300 transition-colors">
          Home
        </a>
        <a href="/" className="text-center justify-start text-neutral-50 text-sm font-normal font-['Signika_Negative'] leading-tight hover:text-gray-300 transition-colors">
          About me
        </a>
        <a href="/" className="text-center justify-start text-neutral-50 text-sm font-normal font-['Signika_Negative'] leading-tight hover:text-gray-300 transition-colors">
          Experiences
        </a>
        <a href="/" className="text-center justify-start text-neutral-50 text-sm font-normal font-['Signika_Negative'] leading-tight hover:text-gray-300 transition-colors">
          Projects
        </a>
        <a href="/" className="text-center justify-start text-neutral-50 text-sm font-normal font-['Signika_Negative'] leading-tight hover:text-gray-300 transition-colors">
          Articles
        </a>
      </div>

      <div className={`hidden lg:flex px-6 py-3 justify-center items-center gap-2.5 ${navPillBaseClasses} ${isScrolled ? navPillScrolledClasses : navPillTopClasses}`}>
        <button className="text-center justify-start text-neutral-50 text-sm font-normal font-['Signika_Negative'] leading-tight">Get in Touch</button>
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 rounded-full ${navPillBaseClasses} ${isScrolled ? navPillScrolledClasses : navPillTopClasses}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className={`absolute top-20 right-6 md:hidden w-48 rounded-2xl p-4 flex flex-col gap-4 ${navPillDropdownClasses} ${isScrolled ? navPillScrolledClasses : navPillTopClasses}`}>
          <a href="/" className="text-neutral-50 text-sm">
            Home
          </a>
          <a href="/" className="text-neutral-50 text-sm">
            About me
          </a>
          <a href="/" className="text-neutral-50 text-sm">
            Experiences
          </a>
          <a href="/" className="text-neutral-50 text-sm">
            Projects
          </a>
          <a href="/" className="text-neutral-50 text-sm">
            Articles
          </a>
          <a href="/" className="text-neutral-50 text-sm pt-2 border-t border-white/10">
            Get in Touch
          </a>
        </div>
      )}
    </nav>
  );
}
