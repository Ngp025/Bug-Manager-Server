import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  id: Number,
  description: String,
  name: String,
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
