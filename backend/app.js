const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")

const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes")
const matchaRoutes = require("./routes/matchaRoutes")

const app = express()

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"))

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected"))
.catch(err => console.log(err))

app.use("/api/auth", authRoutes)
app.use("/api/matcha", matchaRoutes)

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});