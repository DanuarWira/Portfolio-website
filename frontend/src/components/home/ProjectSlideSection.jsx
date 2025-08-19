"use client";
import ProjectCard from "../ui/projectCard";

const projects = [
  {
    title: "Explorin App",
    categories: ["Mobile App", "UI/UX Design"],
    imageUrl: "/Dribbble shot HD - 1.png",
  },
  {
    title: "E-Commerce Fashion",
    categories: ["Web Design", "Branding"],
    imageUrl: "/Dribbble shot HD - 1.png",
  },
  {
    title: "Dashboard Analitik",
    categories: ["Data Viz", "Web App"],
    imageUrl: "/Dribbble shot HD - 1.png",
  },
  {
    title: "Crypto Wallet",
    categories: ["Fintech", "Security"],
    imageUrl: "/Dribbble shot HD - 1.png",
  },
  {
    title: "Travel Booking",
    categories: ["Web Platform"],
    imageUrl: "/Dribbble shot HD - 1.png",
  },
  {
    title: "Music Player",
    categories: ["Mobile App"],
    imageUrl: "/Dribbble shot HD - 1.png",
  },
  {
    title: "Smart Home UI",
    categories: ["IoT", "Dashboard"],
    imageUrl: "/Dribbble shot HD - 1.png",
  },
];

export default function ProjectSlideSection() {
  const duplicatedProjects = [...projects, ...projects];
  const cardWidthWithMargin = 432;
  const trackWidth = cardWidthWithMargin * duplicatedProjects.length;
  return (
    <>
      <section className="w-full max-w-8xl mx-auto relative overflow-hidden group py-4" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
        <div className="flex animate-scroll group-hover:[animation-play-state:paused]" style={{ width: `${trackWidth}px` }}>
          {duplicatedProjects.map((project, index) => (
            <ProjectCard key={index} title={project.title} categories={project.categories} imageUrl={project.imageUrl} />
          ))}
        </div>
      </section>
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
