import mongoose from "mongoose";

let todoSchema = new mongoose.Schema({
  task: {
    type: "string",
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: "string",
    required: true,
  },
});

let TODO = mongoose.model("TODO", todoSchema);
export { TODO };
