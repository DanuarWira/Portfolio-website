import { X } from "lucide-react";
import { Button } from "@/components/shared/button";

export default function SkillModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-gray-900/50 flex justify-center items-center z-50" onClick={onClose}>
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Tambah Skill</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
              <X size={24} />
            </button>
          </div>
          <form action="">
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Skill
                </label>
                <input type="text" id="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Contoh: Web Development" />
              </div>
              <div className="flex justify-end gap-3 mt-2">
                <Button type="button" variant="plain" onClick={onClose}>
                  Batal
                </Button>
                <Button type="submit" variant="primary">
                  Simpan
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
