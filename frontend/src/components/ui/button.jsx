export default function Button({ text }) {
  return (
    <button
      className="bg-white/5 border border-white/10 shadow-sm backdrop-blur-2xl rounded-full flex items-center justify-center gap-2 px-6 py-3 text-center text-neutral-50 text-sm font-normal font-['Signika_Negative'] leading-tight w-fit hover:border-[#5C19C3] hover:shadow-[0px_0px_20px_#5C19C3]
          transition-colors
          duration-300"
    >
      <span>{text}</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </button>
  );
}
