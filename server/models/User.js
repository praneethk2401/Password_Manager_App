import mongoose from "mongoose"
// Schema for the user who logs into the system and stores all of his passwords for the different accounts.
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 50,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 24,
    },
}, 
{timestamps: true}
);

const User = mongoose.model("User", userSchema);
export default User;