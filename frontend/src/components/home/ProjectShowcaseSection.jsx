import ProjectListCard from "../ui/ProjectListCard";
import ScrollFadeIn from "@/styles/animation";

const projects = [
  {
    title: "Explorin App",
    categories: ["Mobile App", "UI/UX Design"],
    imageUrl: "/Dribbble shot HD - 1.png",
    description:
      "Lorem ipsum dolor sit amet consectetur. Magna eu aliquet ornare adipiscing amet accumsan fringilla bibendum morbi. Suspendisse senectus nec nibh ornare dignissim ut aliquam fermentum viverra. Sed tempus metus sed scelerisque facilisis maecenas. Cursus mi aliquam arcu mollis posuere non risus ultrices. Sollicitudin adipiscing etiam fringilla risus nibh enim habitant sed imperdiet. Semper massa aliquet sit nec.",
  },
  {
    title: "E-Commerce Fashion",
    categories: ["Web Design", "Branding"],
    imageUrl: "/Dribbble shot HD - 1.png",
    description:
      "Lorem ipsum dolor sit amet consectetur. Magna eu aliquet ornare adipiscing amet accumsan fringilla bibendum morbi. Suspendisse senectus nec nibh ornare dignissim ut aliquam fermentum viverra. Sed tempus metus sed scelerisque facilisis maecenas. Cursus mi aliquam arcu mollis posuere non risus ultrices. Sollicitudin adipiscing etiam fringilla risus nibh enim habitant sed imperdiet. Semper massa aliquet sit nec.",
  },
  {
    title: "Dashboard Analitik",
    categories: ["Data Viz", "Web App"],
    imageUrl: "/Dribbble shot HD - 1.png",
    description:
      "Lorem ipsum dolor sit amet consectetur. Magna eu aliquet ornare adipiscing amet accumsan fringilla bibendum morbi. Suspendisse senectus nec nibh ornare dignissim ut aliquam fermentum viverra. Sed tempus metus sed scelerisque facilisis maecenas. Cursus mi aliquam arcu mollis posuere non risus ultrices. Sollicitudin adipiscing etiam fringilla risus nibh enim habitant sed imperdiet. Semper massa aliquet sit nec.",
  },
];
export default function ProjectShowcaseSection() {
  return (
    <>
      <section className="relative flex flex-col justify-between items-center px-6 py-8 sm:px-10 lg:px-28 rounded-4xl gap-8 lg:py-20 w-full overflow-hidden">
        <div className="relative z-10 flex flex-col items-center w-full gap-8">
          <h2 className="self-stretch items-center text-center justify-center text-neutral-50 text-3xl sm:text-4xl font-bold font-['Signika_Negative'] leading-tight sm:leading-[48px]">Projects</h2>
          <div className="grid w-full grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
            {projects.map((project, index) => (
              <ScrollFadeIn key={index} delay={index * 150}>
                <ProjectListCard title={project.title} imageUrl={project.imageUrl} description={project.description} categories={project.categories} />
              </ScrollFadeIn>
            ))}
          </div>
        </div>
        <div
          className="relative z-10 px-6 py-3 bg-white/5 border border-white/10 shadow-sm backdrop-blur-2xl rounded-full flex justify-center items-center gap-2.5 hover:border-[#5C19C3] hover:shadow-[0px_0px_20px_#5C19C3]
          transition-colors
          duration-300"
        >
          <button className="text-center justify-start text-neutral-50 text-sm font-normal font-['Signika_Negative'] leading-tight">Get in Touch</button>
        </div>
      </section>
    </>
  );
}
