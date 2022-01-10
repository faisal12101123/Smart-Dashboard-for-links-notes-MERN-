const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//import routes
const postRoutes = require("./Routes/Post");
const postAddressRoutes = require("./Routes/AddressPost");
const userFileRoutes = require("./Routes/UserFile");
const authRoutes = require("./Routes/Auth");


//app
const app = express();

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log("DB CONNECTED."))
.catch(err => console.log(err));

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

//route middleware
app.use("/api", postRoutes);
app.use("/api", postAddressRoutes);
app.use("/api", userFileRoutes);
app.use("/api", authRoutes);

//port
const port = process.env.PORT || 4000;
app.listen(port, () =>{
    console.log(`Server is running successfully on ${port}.`)
});