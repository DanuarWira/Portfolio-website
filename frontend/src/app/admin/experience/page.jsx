"use client";
import { useState } from "react";
import { Pencil, Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/shared/button";
import ExperienceModal from "@/components/ui/modal/experienceModal";

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
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Manajemen Pengalaman Kerja</h1>
          <Button variant="primary" icon={Plus} iconPosition="left" onClick={handleOpenModal}>
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
                {experienceData.map((item) => (
                  <tr key={item.id} className="bg-white hover:bg-gray-50 align-middle">
                    <td className="px-6 py-4 font-medium text-gray-900">{item.id}</td>
                    <td className="px-6 py-4">{item.jobTitle}</td>
                    <td className="px-6 py-4">{item.company}</td>
                    <td className="px-6 py-4">{item.startDate}</td>
                    <td className="px-6 py-4">{item.endDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <button className="text-gray-500 hover:text-blue-600">
                          <Pencil size={20} />
                        </button>
                        <button className="text-gray-500 hover:text-red-600">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
      <ExperienceModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
