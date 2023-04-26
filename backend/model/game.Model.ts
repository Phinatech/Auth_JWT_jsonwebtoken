import mongoose from "mongoose";

interface Igame {
  name: string;
  details: string;
}

interface gameModel extends Igame, mongoose.Document {}

const gameSchema = new mongoose.Schema(
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
