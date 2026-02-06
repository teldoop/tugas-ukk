"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function HomePage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);

  async function fetchNotes() {
    const res = await fetch("/api/notes");
    if (res.status === 401) {
      router.push("/login");
      return;
    }
    setNotes(await res.json());
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container py-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Catatan Pribadi</h1>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-secondary"
            onClick={() =>
              import("next-auth/react").then(({ signOut }) => signOut())
            }
          >
            Logout
          </button>

          <button
            className="btn btn-outline-danger"
            onClick={async () => {
              if (!confirm("Hapus akun DAN semua catatan?")) return;
              await fetch("/api/user", { method: "DELETE" });
              location.href = "/login";
            }}
          >
            Hapus Akun
          </button>
        </div>
      </div>

      {/* NEW NOTE */}
      <button
        className="btn btn-success mb-3"
        onClick={() => router.push("/notes/new")}
      >
        + Catatan Baru
      </button>

      {/* LIST */}
      {notes.length === 0 ? (
        <p className="text-muted">Belum ada catatan</p>
      ) : (
        <div className="list-group">
          {notes.map((note) => (
            <div key={note._id} className="list-group-item">
              <h5>{note.title}</h5>
              <p>{note.content}</p>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => router.push(`/notes/${note._id}`)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={async () => {
                    if (!confirm("Hapus catatan ini?")) return;
                    await fetch(`/api/notes/${note._id}`, { method: "DELETE" });
                    fetchNotes();
                  }}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
