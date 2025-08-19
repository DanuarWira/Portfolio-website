import Image from "next/image";

export default function ArticleCard({ title, categories, description, imageUrl }) {
  return (
    <>
      <div className="flex flex-col justify-between gap-6 p-6 border border-white/10 shadow-sm backdrop-blur-2xl w-full rounded-2xl h-full">
        <div className="flex flex-col gap-6">
          <Image src={imageUrl} alt={`Tampilan proyek ${title}`} width={400} height={300} className="w-full h-auto aspect-[4/3] object-cover rounded-xl" />

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category, index) => (
                <span key={index} className="px-3 py-1 text-xs font-normal bg-white/5 border border-white/10 shadow-sm backdrop-blur-2xl rounded-full">
                  {category}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-neutral-50 text-xl md:text-2xl font-bold font-['Signika_Negative'] leading-tight">{title}</h4>
              <p className="text-neutral-300 text-justify text-sm leading-relaxed overflow-hidden line-clamp-4">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
