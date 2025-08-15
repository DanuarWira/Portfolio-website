import Button from "../ui/button";

export default function HeroSection() {
  return (
    <>
      <section className="flex flex-col gap-6 py-12 px-28 items-center w-full">
        <div className="flex flex-col gap-4 items-center w-full">
          <h4 className="self-stretch text-center justify-center text-neutral-50 text-base font-normal font-['Signika_Negative'] leading-normal">Welcome to my portfolio website</h4>
          <h1 className="self-stretch text-center justify-center text-neutral-50 text-6xl font-bold font-['Signika_Negative'] leading-normal">
            Danuar Wiranata, <span className="bg-gradient-to-r from-[#AF85F0] to-[#F085C8] bg-clip-text text-transparent">Product Designer</span>
          </h1>
          <h5 className="self-stretch text-center justify-center text-neutral-50 font-extralight font-['Signika_Negative'] leading-normal">
            Lorem ipsum dolor sit amet consectetur. Blandit justo donec elementum sed nisl id quis erat. Id ornare massa scelerisque nulla integer.
          </h5>
        </div>
        <Button text="All project list" />
      </section>
    </>
  );
}
