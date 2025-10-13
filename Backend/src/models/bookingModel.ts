import mongoose from "mongoose";
import { Schema, Document } from "mongoose";


export interface IBooking extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    price: number;
    date: string;
    time: String;
    status: string;
}


const bookingSchema = new Schema<IBooking>({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    title: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, default: "active" },
    }, 
    {timestamps: true,}
);

export default mongoose.model<IBooking>("Booking", bookingSchema);
