import mongoose from "mongoose"

const accountSchema = new mongoose.Schema({
    userId: String,
    accountName: String,
    username: String,
    encryptedPassword: String
});

const Account = mongoose.model("Account", accountSchema);
export default Account;