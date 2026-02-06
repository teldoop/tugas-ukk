import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import Note from "@/models/Note";

function invalidId() {
    return NextResponse.json(
        { message: "Invalid note id" },
        { status: 400 }
    );
}

type Params = {
    params: Promise<{ id: string }>;
};

// GET note by id
export async function GET(req: Request, { params }: Params) {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return invalidId();
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.id)
        return NextResponse.json({}, { status: 401 });

    await connectDB();

    const note = await Note.findOne({
        _id: id,
        userId: session.user.id,
    });

    if (!note) return NextResponse.json({}, { status: 404 });
    return NextResponse.json(note);
}

// UPDATE
export async function PUT(req: Request, { params }: Params) {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return invalidId();
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.id)
        return NextResponse.json({}, { status: 401 });

    const { title, content } = await req.json();

    await connectDB();

    const note = await Note.findOneAndUpdate(
        { _id: id, userId: session.user.id },
        { title, content },
        { new: true }
    );

    if (!note) return NextResponse.json({}, { status: 404 });
    return NextResponse.json(note);
}


// DELETE
export async function DELETE(req: Request, { params }: Params) {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return invalidId();
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.id)
        return NextResponse.json({}, { status: 401 });

    await connectDB();

    await Note.findOneAndDelete({
        _id: id,
        userId: session.user.id,
    });

    return NextResponse.json({ success: true });
}