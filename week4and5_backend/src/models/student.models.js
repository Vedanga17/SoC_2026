import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    },
    refreshToken: {
        type: String,
    },
    password: {
        type: String,
        required: true
    }
}, 
{timestamps: true})

studentSchema.pre("save", async function () {
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
    return;
})

studentSchema.methods.checkPasswordValidity = async function (password) {
    return await bcrypt.compare(password, this.password);
}

studentSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
        _id: this._id,
        email: this.email,
        name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

studentSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
        _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

export const Student = mongoose.model("Student", studentSchema);