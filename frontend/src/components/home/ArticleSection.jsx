import ArticleCard from "../ui/articleCard";
import ScrollFadeIn from "@/styles/animation";

const articles = [
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

export default function ArticleSection() {
  return (
    <>
      <section className="relative flex flex-col justify-center items-center px-6 py-10 sm:px-12 lg:px-28 rounded-4xl gap-12 lg:py-20 w-full overflow-hidden">
        <div className="relative z-10 flex flex-col items-center w-full gap-12">
          <h2 className="self-stretch items-center text-center justify-center text-neutral-50 text-3xl sm:text-4xl font-bold font-['Signika_Negative'] leading-tight sm:leading-[48px]">Articles</h2>
          <ScrollFadeIn delay={150}>
            <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <ArticleCard key={index} title={article.title} imageUrl={article.imageUrl} description={article.description} categories={article.categories} />
              ))}
            </div>
          </ScrollFadeIn>
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
