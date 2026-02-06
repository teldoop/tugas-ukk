"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditNotePage() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/api/notes/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (!d._id) router.push("/");
        setTitle(d.title);
        setContent(d.content);
      });
  }, [id]);

  async function save(e: any) {
    e.preventDefault();
    await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    router.push("/");
  }

  return (
    <div className="container py-4">
      <h3>Edit Catatan</h3>

      <form onSubmit={save}>
        <input
          className="form-control mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="btn btn-primary">Simpan</button>
      </form>
    </div>
  );
}
