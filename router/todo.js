import express from "express";
import { TODO } from "../Model/todo.js";

let router = express.Router();

//Get Current Date
function getCurrentDate() {
  // Get current date
  let currentDate = new Date();
  // Get day, month, and year from the current date
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1; // Note: January is 0!
  let year = currentDate.getFullYear();
  // Pad day and month with leading zeros if needed
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;
  // Format the date as dd/mm/yyyy
  let date = day + "/" + month + "/" + year;
  return date;
}

// add new todo to DB
router.post("/add", async (req, res) => {
  try {
    let task = req.body.task;
    let date = getCurrentDate();

    let addtodo = await new TODO({
      task,
      date,
    }).save();
    res.status(200).json({ message: "TODO Added successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// edit todo list
router.put("/edit", async (req, res) => {
  try {
    let task = req.body.task;
    let id = req.body._id;

    let todoedit = await TODO.findOneAndUpdate({ _id: id }, { $set: { task } });
    res.status(200).json({ message: "TODO list Edited Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

//update task status

router.put("/status", async (req, res) => {
  try {
    let status = req.body.status;
    let id = req.body._id;

    let todoupdate = await TODO.findOneAndUpdate(
      { _id: id },
      { $set: { completed: status } }
    );
    res.status(200).json({ message: "TODO Status Updated Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// delete todo list
router.delete("/delete", async (req, res) => {
  try {
    let id = req.body._id;

    let tododelete = await TODO.findByIdAndDelete({ _id: id });

    res.status(200).json({ message: "TODO list Deleted Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// get all todo list

router.get("/get", async (req, res) => {
  try {
    let task = req.body.task;
    let date = getCurrentDate();

    let getalltodo = await TODO.find();
    res
      .status(200)
      .json({ message: "Fetched TODO list Successfully!", getalltodo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

export let todoRouter = router;
