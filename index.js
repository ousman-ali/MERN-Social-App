const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const userRoute = require("./routes/users.route.js");
const authRoute = require("./routes/auth.route.js");
const postRoute = require("./routes/post.route.js");

dotenv.config();

//middleware
app.use(express.json()); // body parser
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
 
mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("dB connected successfully");
}).catch((error)=>{
    console.log(error)
})
app.listen(8800, ()=>{
    console.log("the backend is running on port 8800");
})

