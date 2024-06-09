import mongoose, { Schema } from "mongoose";
import { eventInterface } from "./event.interface";
const eventSchema = new Schema<eventInterface>(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
    },
    end_time: {
      type: Date,
      required: true,
    },
    start_time: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    attendees: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const eventModal = mongoose.model<eventInterface>("Events", eventSchema);

export default eventModal;
