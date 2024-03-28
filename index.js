import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./db.js";
import { todoRouter } from "./router/todo.js";

// config dotenv
dotenv.config();

// middlewares
let app = express();
app.use(express.json());
app.use(cors());

// databse connection
dbConnection();

app.get("/", (req, res) => {
  res.send({
    message: "Api is working successfully!",
  });
});

app.use("/api/todo", todoRouter);

// initializing port
let PORT = process.env.PORT;

// server connection
app.listen(PORT, () => console.log(`Server listing ar ${PORT}`));
