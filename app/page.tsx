import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Catatan Pribadi</h1>

      <p className="text-muted">
        Selamat datang, {session.user?.email}
      </p>

      {/* di sini nanti list & editor catatan */}
    </div>
  );
}
