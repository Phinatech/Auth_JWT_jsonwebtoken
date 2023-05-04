import mongoose, { Schema, Document } from "mongoose";

interface Igame {
  name: string;
  details: string;
}

interface gameModel extends Igame, Document {}

const gameSchema = new Schema(
  {
    name: {
      type: String,
    },
    details: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<gameModel>("game", gameSchema);
