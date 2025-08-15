import Image from "next/image";
import Skills from "../ui/skills";

const skills = [
  {
    skill: "Figma",
  },
  {
    skill: "UX Design",
  },
  {
    skill: "UI Design",
  },
  {
    skill: "UX Research",
  },
  {
    skill: "Prototyping",
  },
  {
    skill: "Design System",
  },

  {
    skill: "Interaction Design",
  },
  {
    skill: "Usability Testing",
  },
  {
    skill: "React.js",
  },
  {
    skill: "Laravel",
  },
];

export default function AboutMeSection() {
  return (
    <>
      <section className="flex flex-col lg:flex-row justify-between items-center px-6 sm:px-12 lg:px-28 py-16 lg:py-28 w-full gap-12 lg:gap-28">
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image src="/aboutMe.svg" alt="Image" width={500} height={500} className="w-auto h-auto max-w-xs md:max-w-md" />
        </div>
        <div className="gap-8 flex flex-col">
          <h2 className="self-stretch justify-start text-neutral-50 text-4xl font-bold font-['Signika_Negative'] leading-[48px]">About Me</h2>
          <div className="flex flex-col gap-3">
            <p className="self-stretch text-justify justify-start text-neutral-300 text-sm font-light font-['Signika_Negative'] leading-tight">
              Lorem ipsum dolor sit amet consectetur. Magna eu aliquet ornare adipiscing amet accumsan fringilla bibendum morbi. Suspendisse senectus nec nibh ornare dignissim ut aliquam fermentum viverra. Sed tempus metus sed scelerisque
              facilisis maecenas. Cursus mi aliquam arcu mollis posuere non risus ultrices. Sollicitudin adipiscing etiam fringilla risus nibh enim habitant sed imperdiet. Semper massa aliquet sit nec.
            </p>
            <p className="self-stretch text-justify justify-start text-neutral-300 text-sm font-light font-['Signika_Negative'] leading-tight">
              Lorem ipsum dolor sit amet consectetur. Magna eu aliquet ornare adipiscing amet accumsan fringilla bibendum morbi. Suspendisse senectus nec nibh ornare dignissim ut aliquam fermentum viverra. Sed tempus metus sed scelerisque
              facilisis maecenas. Cursus mi aliquam arcu mollis posuere non risus ultrices. Sollicitudin adipiscing etiam fringilla risus nibh enim habitant sed imperdiet. Semper massa aliquet sit nec.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="self-stretch justify-start text-3xl font-bold font-['Signika_Negative'] bg-gradient-to-r from-[#AF85F0] to-[#F085C8] bg-clip-text text-transparent">Skills & Tech Stack</h3>
            <div className="self-stretch inline-flex justify-start items-start gap-4 flex-wrap content-start">
              {skills.map((item, index) => (
                <Skills key={index} text={item.skill} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
