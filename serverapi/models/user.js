import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({

    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        min: 5,
        max: 50,
    },
    picture: {
        type: String,
        default: "/avatar-no-photo.png",
    },
    role: {
        type: [String],
        default: ["Subscriber"],
        enum: ["Subscriber", "instructor", "Admin"]
    },
    stripe_account_id: "",
    stipe_seller: {},
    stipeSession: {},
    passwordResetCode: {
        data: String,
        default: "",
    },
 }, 
 {timestamps: true }
);

export default mongoose.model('User', userSchema);
