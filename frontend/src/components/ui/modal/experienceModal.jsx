"use client";
import { X } from "lucide-react";
import { Button } from "@/components/shared/button";
import { useState, useEffect } from "react";
import { api } from "@/app/api/api";

export default function ExperienceModal({ isOpen, onClose, experienceToEdit, onSuccess }) {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEditMode = Boolean(experienceToEdit);

  useEffect(() => {
    if (isEditMode && isOpen) {
      setJobTitle(experienceToEdit.job_title);
      setCompanyName(experienceToEdit.company_name);
      setDescription(experienceToEdit.description);
      setStartDate(experienceToEdit.start_date);
      const isStillWorking = experienceToEdit.end_date === "Present" || !experienceToEdit.end_date;
      setIsCurrent(isStillWorking);
      setEndDate(isStillWorking ? "" : experienceToEdit.end_date || "");
    } else {
      setJobTitle("");
      setCompanyName("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setIsCurrent(false);
    }
    setError(null);
  }, [experienceToEdit, isOpen, isEditMode]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    console.log("Memulai handleSubmit. Nilai experienceToEdit:", experienceToEdit);
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new URLSearchParams();
      formData.append("job_title", jobTitle);
      formData.append("company_name", companyName);
      formData.append("description", description);
      formData.append("start_date", startDate);
      formData.append("end_date", endDate);

      if (isEditMode) {
        await api.put(`/experiences/${experienceToEdit.id}`, formData);
      } else {
        await api.post("/experiences", formData);
      }
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <>
      <div className="fixed inset-0 bg-gray-900/50 flex justify-center items-center z-50" onClick={onClose}>
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">{isEditMode ? "Edit Pengalaman" : "Tambah Pengalaman"}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary-600"
                />
              </div>
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary-600"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary-600"
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    placeholder="Contoh: 10-2025"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary-600"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="text"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    disabled={isCurrent}
                    placeholder="Contoh: 12-2025 atau Present"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="isCurrent" checked={isCurrent} onChange={(e) => setIsCurrent(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <label htmlFor="isCurrent" className="text-sm text-gray-700">
                  Saya masih bekerja di sini
                </label>
              </div>

              {error && <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">{error}</div>}

              <div className="flex justify-end gap-3 mt-2">
                <Button type="button" variant="plain" onClick={onClose}>
                  Batal
                </Button>
                <Button type="submit" variant="primary" disabled={isLoading}>
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
