import BugModel from "../models/bug.js";
import UsersModel from "../models/users.js";
import ProjectModel from "../models/project.js";

export const assignBug = async (req, res) => {
  const { userId, projectId, description } = req.body.formData;
  try {
    const filter = {
      userid: userId,
      projectid: projectId,
      description: description,
    };
    const existingBug = await BugModel.findOne(filter);
    if (!existingBug) {
      const result = await BugModel.create({
        userid: userId,
        projectid: projectId,
        description: description,
      });
      res.status(200).json({ result });
    } else {
      res.status(400).json({ message: "Duplicate Bug" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getBugs = async (req, res) => {
  try {
    const result = await BugModel.find();
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const filterBugs = async (req, res) => {
  const { formData } = req.params;
  const parseFormData = formData.split("&").map((item) => {
    return item.split(":");
  });
  const userId = { ["userid"]: parseFormData[0][1] };
  const projectid = { ["projectid"]: parseFormData[1][1] };
  const startDate =
    parseFormData[2][1] !== "" ? new Date(parseFormData[2][1]) : "";
  const endDate =
    parseFormData[3][1] !== "" ? new Date(parseFormData[3][1]) : "";
  try {
    if (startDate && endDate) {
      const tempResult = await BugModel.find({
        $or: [
          userId,
          projectid,
          {
            $and: [
              { creationDate: { $gte: startDate } },
              { creationDate: { $lte: endDate } },
            ],
          },
        ],
      });
      if (tempResult.length === 0) {
        res.status(404).json({ message: "ERROR 404: Bug not found" });
      } else {
        const projectnames = await ProjectModel.find(
          {},
          { name: 1, id: 1, _id: 0 }
        );
        const usernames = await UsersModel.find({}, { name: 1, id: 1, _id: 0 });
        const result = [];
        tempResult.map((bug, index) => {
          let parseResult = {
            id: "",
            description: "",
            username: "",
            projectname: "",
          };
          projectnames.map((pdata) => {
            if (bug.projectid === pdata.id) {
              parseResult.id = bug._id;
              parseResult.description = bug.description;
              parseResult.projectname = pdata.name;
            }
          });
          usernames.map((udata) => {
            if (bug.userid === udata.id) {
              parseResult.username = udata.name;
            }
          });
          result.push(parseResult);
        });
        res.status(200).json({ result });
      }
    } else {
      const tempResult = await BugModel.find({
        $or: [
          userId,
          projectid,
          { creationDate: { $gte: startDate } },
          { creationDate: { $lte: endDate } },
        ],
      });
      if (tempResult.length === 0) {
        res.status(404).json({ message: "ERROR 404: Bug not found" });
      } else {
        const projectnames = await ProjectModel.find(
          {},
          { name: 1, id: 1, _id: 0 }
        );
        const usernames = await UsersModel.find({}, { name: 1, id: 1, _id: 0 });
        const result = [];
        tempResult.map((bug, index) => {
          let parseResult = {
            id: "",
            description: "",
            username: "",
            projectname: "",
          };
          projectnames.map((pdata) => {
            if (bug.projectid === pdata.id) {
              parseResult.id = bug._id;
              parseResult.description = bug.description;
              parseResult.projectname = pdata.name;
            }
          });
          usernames.map((udata) => {
            if (bug.userid === udata.id) {
              parseResult.username = udata.name;
            }
          });
          result.push(parseResult);
        });
        res.status(200).json({ result });
      }
    }
  } catch (error) {
    res.status(405).json({ message: "Something went wrong" });
  }
};

export const deleteBug = async (req, res) => {
  const { id } = req.params;
  try {
    await BugModel.findByIdAndDelete({ _id: id });
    const result = await BugModel.find();
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateBug = async (req, res) => {
  const { id } = req.params;
  const { userId, projectId, description } = req.body.formData;
  const update = {
    userid: userId,
    projectid: projectId,
    description: description,
  };
  try {
    await BugModel.findByIdAndUpdate({ _id: id }, update);
    const result = await BugModel.find();
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
