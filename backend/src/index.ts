import express from "express";
import cors from "cors";
import userRouter from "./routes/user";
import employeRouter from "./routes/employe";
import connectToDatabase from "./config/DBconfig";
import path from "path";

const app=express()

const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/user",userRouter)
app.use("/employe",employeRouter)

app.use(
  "/employee",
  express.static(path.join(__dirname, "./public/employe"))
);

app.listen(PORT, async () => {
    try {
      await connectToDatabase();
      console.log(`listening on http://localhost:${PORT}/`);
    } catch (error) {
      console.log("app.listen  error:", error);
      console.log(`error while listening on ${PORT}`);
    }
  });