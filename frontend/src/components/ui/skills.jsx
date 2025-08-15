export default function Skills({ text }) {
  return (
    <>
      <div
        className="px-6 py-3 bg-white/5 border border-white/10 shadow-sm backdrop-blur-2xl rounded-full flex justify-center items-center gap-2.5 hover:border-[#5C19C3] hover:shadow-[0px_0px_20px_#5C19C3]
          transition-colors
          duration-300 "
      >
        <button className="text-center justify-start text-neutral-50 text-sm font-normal font-['Signika_Negative'] leading-tight">{text}</button>
      </div>
    </>
  );
}
