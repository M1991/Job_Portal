import mongoose from "mongoose";
import { minLength } from "zod/v4-mini";

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, ' Company name is required'],
    },
    position: {
        type: String,
        required: [true, ' Job Position is required'],
        maxLength:100
    },
    status: {
        type: String,
        minLength: 4,
        maxLength: 100,
        enum : ["pending", "reject", "interview"],
        default : "pending"
    },
    workType: {
        type: String,
        enum : ["full-time","part-time", "internship", "contract"],
        default : "full-time"
    },
    workLocation: {
        type: String,
        default: "Mumbai",
        required: [true, ' Work Location is required'],
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
   },
   { timestamps:true}
);

export default mongoose.model("Job", jobSchema)