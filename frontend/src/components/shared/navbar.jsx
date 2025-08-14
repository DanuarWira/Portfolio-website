export default function Navbar() {
  return (
    <nav className="inline-flex justify-between items-center px-28 py-4 w-full">
      <div className="px-6 py-3 bg-white/5 rounded-full flex justify-center items-center gap-2.5">
        <div className="text-center justify-start text-neutral-50 text-sm font-normal font-['Signika_Negative'] leading-tight">Danuar Wiranata</div>
      </div>
      <div className="px-10 py-3 bg-white/5 border border-white/10 shadow-sm backdrop-blur-2xl rounded-full flex justify-center items-center gap-12">
        <a href="/" className="text-center justify-start text-neutral-50 text-sm font-normal font-['Signika_Negative'] leading-tight">
          Home
        </a>
        <a href="/" className="text-center justify-start text-neutral-50 text-sm font-normal font-['Signika_Negative'] leading-tight">
          About me
        </a>
        <a href="/" className="text-center justify-start text-neutral-50 text-sm font-normal font-['Signika_Negative'] leading-tight">
          Experiences
        </a>
        <a href="/" className="text-center justify-start text-neutral-50 text-sm font-normal font-['Signika_Negative'] leading-tight">
          Projects
        </a>
        <a href="/" className="text-center justify-start text-neutral-50 text-sm font-normal font-['Signika_Negative'] leading-tight">
          Articles
        </a>
      </div>
      <div className="px-6 py-3 bg-white/5 rounded-full flex justify-center items-center gap-2.5">
        <button className="text-center justify-start text-neutral-50 text-sm font-normal font-['Signika_Negative'] leading-tight">Get in Touch</button>
      </div>
    </nav>
  );
}
