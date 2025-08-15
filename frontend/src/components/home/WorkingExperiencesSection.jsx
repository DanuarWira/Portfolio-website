import ExperienceCard from "../ui/experienceCard";

export default function WorkingExperiencesSection() {
  return (
    <>
      <section className="flex flex-col justify-between items-center px-6 py-16 sm:px-12 lg:px-28 bg-neutral-50 rounded-4xl gap-8 lg:py-28 w-full">
        <h2 className="self-stretch justify-start text-neutral-900 text-4xl font-bold font-['Signika_Negative'] leading-[48px]">Working Experiences</h2>
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
      </section>
    </>
  );
}
