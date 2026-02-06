"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message || "Registrasi gagal");
      return;
    }

    router.push("/login");
  }

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="mb-4 text-center">Register</h4>

            {error && (
              <div className="alert alert-danger py-2">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Mendaftarkan..." : "Register"}
              </button>
            </form>

            <div className="text-center mt-3">
              <small>
                Sudah punya akun? <a href="/login">Login</a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
