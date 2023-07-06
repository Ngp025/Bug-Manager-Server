import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    id: Number,
    name: String,
    surname: String,
});

const Users = mongoose.model("Users", userSchema);

export default Users;
