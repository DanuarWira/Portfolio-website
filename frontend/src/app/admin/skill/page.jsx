"use client";
import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/shared/button";
import { api } from "@/app/api/api";
import SkillModal from "@/components/ui/modal/skillModal";
import DeleteModal from "@/components/ui/modal/deleteModal";

export default function SkillPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skillToEdit, setSkillToEdit] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);

  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSkills = async () => {
    try {
      setIsLoading(true);
      const data = await api.get("/skills");
      setSkills(data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddClick = () => {
    setSkillToEdit(null); // Pastikan state untuk edit kosong
    setIsModalOpen(true);
  };

  // 2. Fungsi untuk membuka modal dalam mode "Edit"
  const handleEditClick = (skill) => {
    setSkillToEdit(skill); // Simpan data skill yang akan diedit ke state
    setIsModalOpen(true);
  };

  // 3. Fungsi untuk menutup modal dan membersihkan state
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSkillToEdit(null); // PENTING: Selalu reset state setelah modal ditutup
  };

  // 4. Fungsi yang dipanggil setelah sukses (menambah/mengedit)
  const handleSuccess = () => {
    fetchSkills(); // Ambil data terbaru
    handleCloseModal(); // Tutup modal
  };

  const handleDeleteClick = (skill) => {
    setSkillToDelete(skill);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!skillToDelete) return;
    try {
      await api.del(`/skills/${skillToDelete.id}`);
      setShowDeleteConfirm(false);
      setSkillToDelete(null);
      fetchSkills();
    } catch (err) {
      console.error("Gagal menghapus skill:", err);
      setShowDeleteConfirm(false);
    }
  };

  if (isLoading) return <div className="p-6">Memuat data...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Manajemen Skill</h1>
          <Button variant="primary" icon={Plus} iconPosition="left" onClick={handleAddClick}>
            Tambah skill
          </Button>
        </div>
        <div className="relative overflow-x-auto sm:rounded-lg bg-white flex flex-col p-6 gap-6">
          <div>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Judul
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {skills.length > 0 ? (
                  skills.map((item, index) => (
                    <tr key={item.id} className="bg-white hover:bg-gray-50 align-middle">
                      <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <button onClick={() => handleEditClick(item)} className="text-gray-500 hover:text-blue-600">
                            <Pencil size={20} />
                          </button>
                          <button onClick={() => handleDeleteClick(item)} className="text-gray-500 hover:text-red-600">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                      Belum ada skill yang ditambahkan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center">
            <div></div>
            <div className="flex items-center gap-4">
              <Button variant="plain" icon={ChevronLeft} iconPosition="left">
                Sebelumnya
              </Button>
              <Button variant="secondary" icon={ChevronRight} iconPosition="right">
                Selanjutnya
              </Button>
            </div>
          </div>
        </div>
      </div>

      <SkillModal isOpen={isModalOpen} onClose={handleCloseModal} skillToEdit={skillToEdit} onSuccess={handleSuccess} />
      <DeleteModal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} onConfirm={confirmDelete} title="Hapus Skill" description="Apakah Anda yakin ingin menghapus skill" objectName={skillToDelete?.name} />
    </>
  );
}
