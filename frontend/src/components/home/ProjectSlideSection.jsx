"use client";
import ProjectCard from "../ui/projectCard";

const projects = [
  {
    title: "Explorin App",
    categories: ["Mobile App", "UI/UX Design"],
    imageUrl: "https://placehold.co/400x300/1a1a1a/ffffff?text=Proyek+1",
  },
  {
    title: "E-Commerce Fashion",
    categories: ["Web Design", "Branding"],
    imageUrl: "https://placehold.co/400x300/4a1a3a/ffffff?text=Proyek+2",
  },
  {
    title: "Dashboard Analitik",
    categories: ["Data Viz", "Web App"],
    imageUrl: "https://placehold.co/400x300/1a4a2a/ffffff?text=Proyek+3",
  },
  {
    title: "Crypto Wallet",
    categories: ["Fintech", "Security"],
    imageUrl: "https://placehold.co/400x300/4a4a1a/ffffff?text=Proyek+4",
  },
  {
    title: "Travel Booking",
    categories: ["Web Platform"],
    imageUrl: "https://placehold.co/400x300/1a3a4a/ffffff?text=Proyek+5",
  },
  {
    title: "Music Player",
    categories: ["Mobile App"],
    imageUrl: "https://placehold.co/400x300/4a1a1a/ffffff?text=Proyek+6",
  },
  {
    title: "Smart Home UI",
    categories: ["IoT", "Dashboard"],
    imageUrl: "https://placehold.co/400x300/3a3a3a/ffffff?text=Proyek+7",
  },
];

export default function ProjectSlideSection() {
  const duplicatedProjects = [...projects, ...projects];
  const cardWidthWithMargin = 432;
  const trackWidth = cardWidthWithMargin * duplicatedProjects.length;
  return (
    <>
      <div className="w-full max-w-8xl mx-auto relative overflow-hidden group py-4" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
        <div className="flex animate-scroll group-hover:[animation-play-state:paused]" style={{ width: `${trackWidth}px` }}>
          {duplicatedProjects.map((project, index) => (
            <ProjectCard key={index} title={project.title} categories={project.categories} imageUrl={project.imageUrl} />
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </>
  );
}
