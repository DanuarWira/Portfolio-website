import Image from "next/image";
import Button from "./button";

export default function ProjectListCard({ title, categories, description, imageUrl }) {
  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between p-10 border border-white/10 shadow-sm backdrop-blur-2xl w-full rounded-2xl">
        <Image src={imageUrl} alt={`Tampilan proyek ${title}`} width={300} height={225} className="w-auto h-auto max-w-xs md:max-w-md rounded-2xl" />
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3 mt-3">
            {categories.map((category, index) => (
              <span key={index} className="px-4 py-2 text-xs font-normal bg-white/5 border border-white/10 shadow-sm backdrop-blur-2xl rounded-full">
                {category}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-neutral-50 text-2xl md:text-3xl font-bold font-['Signika_Negative'] leading-tight">{title}</h4>
            <p className="w-full">{description}</p>
          </div>
          <Button text="See project details" />
        </div>
      </div>
    </>
  );
}
