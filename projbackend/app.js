require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express"); //express
const app = express();
const BodyParser = require("body-parser");
const CookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


//...my routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRouts = require("./routes/category");
const productRouts = require("./routes/product");
const orderRoutes = require("./routes/order")

// ...DB Connection
mongoose.connect(process.env.Database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

}).then(() => {
    console.log("DB CONNECTED");
});

// mongoose.connect("mongodb://localhost:27017/tshirt", { 
//     useNewUrlParser : true,
//     useUnifiedTopology : true,
//     useCreateIndex : true

// }).then(() => {
//     console.log("DB CONNECTED");
// });

//...Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//...My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRouts);
app.use("/api", productRouts);
app.use("/api", orderRoutes);

//...Port
const port = 8000;


//...Starting a server
app.listen(port, () => {
    console.log(`App is running at port ${port}`);
});