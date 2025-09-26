"use client";
import { useState } from "react";
import { api } from "@/app/api/api";
import { Button } from "@/components/shared/button";

export default function LoginPage({ onSuccess = () => {} }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post("/login", { username, password });
      if (response && response.token) {
        localStorage.setItem("authToken", response.token);
        window.location.href = "/admin/dashboard";
        onSuccess();
      } else {
        throw new Error("Error");
      }
    } catch (err) {
      setError(err.message || "Username atau password salah");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Login Akun Anda</h2>
          <p className="mt-2 text-sm text-gray-600">Silakan masukkan kredensial Anda.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="johndoe"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">{error}</div>}

          <div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Memproses..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
