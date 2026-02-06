import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json([], { status: 401 });

  await connectDB();
  const notes = await Note.find({ userId: session.user.id }).sort({
    createdAt: -1,
  });

  return NextResponse.json(notes);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { title, content } = await req.json();
  if (!title || !content)
    return NextResponse.json({ message: "Invalid" }, { status: 400 });

  await connectDB();

  const note = await Note.create({
    userId: session.user.id,
    title,
    content,
  });

  return NextResponse.json(note, { status: 201 });
}
