"use client";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/shared/button";
import { api } from "@/app/api/api";
import ExperienceModal from "@/components/ui/modal/experienceModal";
import DeleteModal from "@/components/ui/modal/deleteModal";

const experienceData = [
  {
    id: "01",
    jobTitle: "UI/UX Designer",
    company: "Bibit",
    startDate: "December 2024",
    endDate: "Present",
  },
  {
    id: "02",
    jobTitle: "UI/UX Designer",
    company: "Bibit",
    startDate: "December 2024",
    endDate: "Present",
  },
];

export default function ExperiencePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [experienceToEdit, setExperienceToEdit] = useState(null);
  const [experienceToDelete, setExperienceToDelete] = useState(null);

  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExperiences = async () => {
    try {
      setIsLoading(true);
      const data = await api.get("/experiences");
      setExperiences(data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleAddClick = () => {
    setExperienceToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (experience) => {
    setExperienceToEdit(experience);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setExperienceToEdit(null);
  };

  const handleSuccess = () => {
    fetchExperiences();
    handleCloseModal();
  };

  const handleDeleteClick = (experience) => {
    setExperienceToDelete(experience);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!experienceToDelete) return;
    try {
      await api.del(`/experiences/${experienceToDelete.id}`);
      setShowDeleteConfirm(false);
      setExperienceToDelete(null);
      fetchExperiences();
    } catch (err) {
      console.error("Gagal menghapus pengalaman kerja:", err);
      setShowDeleteConfirm(false);
    }
  };

  if (isLoading) return <div className="p-6">Memuat data...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Manajemen Pengalaman Kerja</h1>
          <Button variant="primary" icon={Plus} iconPosition="left" onClick={handleAddClick}>
            Tambah pengalaman kerja
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
                    Job Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Start Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    End Date
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
                    Status
                  </th> */}
                  <th scope="col" className="px-6 py-3">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {experiences.length > 0 ? (
                  experiences.map((item, index) => (
                    <tr key={item.id} className="bg-white hover:bg-gray-50 align-middle">
                      <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4">{item.job_title}</td>
                      <td className="px-6 py-4">{item.company_name}</td>
                      <td className="px-6 py-4">{item.start_date}</td>
                      <td className="px-6 py-4">{item.end_date}</td>
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
                      Belum ada pengalaman kerja yang ditambahkan.
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
      <ExperienceModal isOpen={isModalOpen} onClose={handleCloseModal} experienceToEdit={experienceToEdit} onSuccess={handleSuccess} />
      <DeleteModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="Hapus Pengalaman Kerja"
        description="Apakah Anda yakin ingin menghapus pengalaman"
        objectName={experienceToDelete?.job_title}
      />
    </>
  );
}
