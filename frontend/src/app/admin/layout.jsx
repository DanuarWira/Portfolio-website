import Sidebar from "@/components/shared/sidebar";
import Topbar from "@/components/shared/topbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 border-r bg-white">
        <Sidebar />
      </div>

      <main className="flex-grow">
        <Topbar />
        <div className="p-6 bg-gray-50">{children}</div>
      </main>
    </div>
  );
}
