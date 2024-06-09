import mongoose from "mongoose";

export interface eventInterface {
  title: string;
  description: string;
  location: string;
  start_time: Date;
  end_time: Date;
  user: any;
  attendees?: mongoose.Types.ObjectId[];
}
