"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewNotePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/"); // balik ke homepage
    } else {
      alert("Gagal menyimpan catatan");
    }
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">📝 Catatan Baru</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control"
            placeholder="Judul catatan"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Isi catatan..."
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => router.back()}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
