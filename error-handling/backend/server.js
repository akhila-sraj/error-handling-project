const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// TEST ROUTE (WILL FAIL)
app.post("/api/test", (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    const err = new Error("Name is required");
    err.statusCode = 400;
    return next(err);
  }

  res.json({ success: true, message: "Success" });
});

// ERROR MIDDLEWARE
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
//added centralized error handling middleware