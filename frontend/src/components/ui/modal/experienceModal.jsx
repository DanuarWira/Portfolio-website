"use client";
import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { Button } from "@/components/shared/button";

export default function ExperienceModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    job_title: "",
    company_name: "",
    description: "",
    start_date: "",
    end_date: "",
    is_current: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      is_current: isChecked,
      end_date: isChecked ? "" : prev.end_date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        end_date: formData.is_current ? null : formData.end_date,
      };
      await onSubmit(payload);
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-900/50 flex justify-center items-center z-50" onClick={onClose}>
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Tambah Pengalaman</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="job_title" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input type="text" id="job_title" value={formData.job_title} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary-600" />
              </div>
              <div>
                <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary-600"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary-600"
                />
              </div>
              <div>
                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  id="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary-600"
                />
              </div>
              <div>
                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  id="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  disabled={formData.is_current}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="is_current" checked={formData.is_current} onChange={handleCheckboxChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <label htmlFor="is_current" className="text-sm text-gray-700">
                  Saya masih bekerja di sini
                </label>
              </div>
              {error && <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">{error}</div>}
              <div className="flex justify-end gap-3 mt-2">
                <Button type="button" variant="plain" onClick={onClose}>
                  Batal
                </Button>
                <Button type="submit" variant="primary" disabled={isLoading}>
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
