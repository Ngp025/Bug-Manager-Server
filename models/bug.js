import mongoose from "mongoose";

const bugSchema = mongoose.Schema({
  projectid: { type: Number, require: true },
  userid: { type: Number, require: true },
  description: { type: String, require: true, maxLength: 100 },
  creationDate: { type: Date, default: new Date() },
});

const Bugs = mongoose.model("Bugs", bugSchema);

export default Bugs;
