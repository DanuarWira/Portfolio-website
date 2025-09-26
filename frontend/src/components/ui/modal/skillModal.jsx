import { X } from "lucide-react";
import { Button } from "@/components/shared/button";
import { useState, useEffect } from "react";
import { api } from "@/app/api/api";

export default function SkillModal({ isOpen, onClose, skillToEdit, onSuccess }) {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEditMode = Boolean(skillToEdit);

  useEffect(() => {
    if (isEditMode && isOpen) {
      setName(skillToEdit.name);
    } else {
      setName("");
    }
    setError(null);
  }, [skillToEdit, isOpen, isEditMode]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new URLSearchParams();
      formData.append("name", name);

      if (isEditMode) {
        if (name === skillToEdit.name) {
          onClose();
          return;
        }
        await api.put(`/skills/${skillToEdit.id}`, formData);
      } else {
        await api.post("/skills", formData);
      }
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Tampilan error bisa disesuaikan, ini hanya untuk menampilkan pesan jika ada.
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <>
      <div className="fixed inset-0 bg-gray-900/50 flex justify-center items-center z-50" onClick={onClose}>
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">{isEditMode ? "Edit Skill" : "Tambah Skill"}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Skill
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Contoh: Web Development"
                />
              </div>
              <div className="flex justify-end gap-3 mt-2">
                <Button disabled={isLoading} type="button" variant="plain" onClick={onClose}>
                  Batal
                </Button>
                <Button type="submit" disabled={isLoading} variant="primary">
                  {isLoading ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
