import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({}, { status: 401 });

  await connectDB();
  await Note.deleteMany({ userId: session.user.id });
  await User.findByIdAndDelete(session.user.id);

  return NextResponse.json({ success: true });
}
