import { Pencil, Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import StatusBadge from "@/components/shared/badge/statusBadge";
import ThumbnailBadge from "@/components/shared/badge/thumbnailBadge";
import { Button } from "@/components/shared/button";

const articleData = [
  {
    id: "01",
    judul: "Title Example",
    thumbnail: "thumbnail.webp",
    deskripsi: "Deskripsi portofolio",
    kategori: ["Kategori 1", "Kategori 2"],
    status: "Aktif",
  },
  {
    id: "02",
    judul: "Title Example",
    thumbnail: "thumbnail.webp",
    deskripsi: "Deskripsi portofolio",
    kategori: ["Kategori 1", "Kategori 2"],
    status: "Inaktif",
  },
];

export default function ArticlePage() {
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Manajemen Artikel</h1>
          <Button variant="primary" icon={Plus} iconPosition="left">
            Tambah artikel
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
                    Thumbnail
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Deskripsi
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Kategori
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {articleData.map((item) => (
                  <tr key={item.id} className="bg-white hover:bg-gray-50 align-middle">
                    <td className="px-6 py-4 font-medium text-gray-900">{item.id}</td>
                    <td className="px-6 py-4">{item.judul}</td>
                    <td className="px-6 py-4">
                      <ThumbnailBadge fileName={item.thumbnail} />
                    </td>
                    <td className="px-6 py-4">{item.deskripsi}</td>
                    <td className="px-6 py-4">{item.kategori.join(", ")}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={item.status} />
                    </td>
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
    </>
  );
}
