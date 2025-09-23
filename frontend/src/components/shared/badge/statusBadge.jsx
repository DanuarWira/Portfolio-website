import { Check, X } from "lucide-react";

export default function StatusBadge({ status }) {
  if (status === "Aktif") {
    return (
      <span className="inline-flex items-center gap-1 py-1.5 px-3 rounded-full text-xs bg-teal-100 text-teal-600">
        <Check size={20} />
        {status}
      </span>
    );
  } else {
    return (
      <span className="inline-flex items-center gap-1 py-1.5 px-3 rounded-full text-xs bg-rose-100 text-rose-600">
        <X size={20} />
        {status}
      </span>
    );
  }
  return null;
}
