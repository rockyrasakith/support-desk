const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 8000;
const colors = require("colors");
const connectDB = require("./config/db");
const path = require("path")

// Connect to the database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route for user controls
app.use("/api/users", require("./routes/userRoutes"));

//Route for question controls
app.use("/api/questions", require("./routes/questionRoutes"))

// Serve frontend
if(process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")))

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
  })
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Code Support API" });
  });
}


app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
