import Image from "next/image";
import Button from "./button";

export default function ProjectListCard({ title, categories, description, imageUrl }) {
  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between p-10 border border-white/10 shadow-sm backdrop-blur-2xl w-full rounded-2xl animate-[wiggle_1s_ease-in-out_infinite]">
        <Image src={imageUrl} alt={`Tampilan proyek ${title}`} width={400} height={300} className="w-full h-auto aspect-[4/3] object-cover rounded-xl" />
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3 mt-3">
            {categories.map((category, index) => (
              <span key={index} className="px-4 py-2 text-xs font-normal bg-white/5 border border-white/10 shadow-sm backdrop-blur-2xl rounded-full">
                {category}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-neutral-50 text-2xl md:text-3xl font-bold leading-tight">{title}</h4>
            <p className="w-full text-justify text-sm text-neutral-300 font-light line-clamp-4">{description}</p>
          </div>
          <Button text="See project details" />
        </div>
      </div>
    </>
  );
}
