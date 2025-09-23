export default function Topbar({ username }) {
  return (
    <>
      <nav className="bg-white py-3 px-6 flex items-center justify-end gap-4">
        <p className="text-sm text-gray-900">Welcome back! {username}</p>
        <div className="w-8 h-8 rounded-full bg-gray-700"></div>
      </nav>
    </>
  );
}
