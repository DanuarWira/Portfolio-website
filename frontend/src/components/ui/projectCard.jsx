export default function ProjectCard({ title, categories, imageUrl }) {
  return (
    <div className="flex-shrink-0 w-[400px] h-[300px] mx-3">
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
        <img src={imageUrl} alt={`Tampilan proyek ${title}`} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <h3 className="text-2xl font-bold">{title}</h3>
          <div className="flex items-center gap-3 mt-3">
            {categories.map((category, index) => (
              <span key={index} className="px-4 py-2 text-xs font-normal bg-white/5 border border-white/10 shadow-sm backdrop-blur-2xl rounded-full">
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
