import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    roll_number: {
        type: String, 
        required: true,
        unique: true
    },
    branch: {
        type: String, 
        required: true
    },
    semester: {
        type: Number, 
        required: true,
        default: 0
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, 
{timestamps: true})

export const Student = mongoose.model("Student", studentSchema);