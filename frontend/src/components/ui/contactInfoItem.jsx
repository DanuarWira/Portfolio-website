import Image from "next/image";
export default function ContactInfoItem({ icon, label, value, href }) {
  return (
    <>
      <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors flex items-center justify-center">
          <Image src={icon} alt={`Kontak`} width={24} height={24} />
        </div>
        <div>
          <p className="text-sm text-neutral-400">{label}</p>
          <p className="text-base text-neutral-50 font-medium">{value}</p>
        </div>
      </a>
    </>
  );
}
