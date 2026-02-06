import mongoose, { Schema, models } from "mongoose";

const NoteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: String,
    content: String,
  },
  { timestamps: true }
);

export default models.Note || mongoose.model("Note", NoteSchema);
