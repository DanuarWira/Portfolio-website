export default function ExperienceCard() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10 p-4 md:p-6 border border-neutral-200 rounded-2xl">
        <div className="flex flex-col gap-5 md:w-1/3">
          <div className="flex flex-col gap-3">
            <h5 className="text-neutral-700 text-sm font-medium font-['Signika_Negative'] leading-tight">Company Name</h5>
            <h4 className="text-neutral-900 text-2xl md:text-3xl font-bold font-['Signika_Negative'] leading-tight">Position/Role</h4>
          </div>
          <h6 className="text-neutral-500 text-sm font-light font-['Signika_Negative'] leading-tight">Period</h6>
        </div>

        <div className="flex flex-col gap-4 md:w-2/3">
          <p className="self-stretch text-justify text-neutral-600 text-sm font-light font-['Signika_Negative'] leading-tight">
            Lorem ipsum dolor sit amet consectetur. Magna eu aliquet ornare adipiscing amet accumsan fringilla bibendum morbi. Suspendisse senectus nec nibh ornare dignissim ut aliquam fermentum viverra. Sed tempus metus sed scelerisque
            facilisis maecenas. Cursus mi aliquam arcu mollis posuere non risus ultrices. Sollicitudin adipiscing etiam fringilla risus nibh enim habitant sed imperdiet. Semper massa aliquet sit nec.
          </p>
          <p className="self-stretch text-justify text-neutral-600 text-sm font-light font-['Signika_Negative'] leading-tight">
            Lorem ipsum dolor sit amet consectetur. Magna eu aliquet ornare adipiscing amet accumsan fringilla bibendum morbi. Suspendisse senectus nec nibh ornare dignissim ut aliquam fermentum viverra. Sed
          </p>
        </div>
      </div>
    </>
  );
}
