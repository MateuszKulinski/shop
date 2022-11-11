const express = require("express");
const userRoutes = require("./routes/UserRoutes");
const addressRoutes = require("./routes/AddressRoutes");
const employeeRoutes = require("./routes/EmployeeRouters");
const productRoutes = require("./routes/ProductRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const contactRoutes = require("./routes/ContactRoutes");
const cors = require("cors");
const Passport = require("./config/passport");

const { PORT } = require("./config/config");

const app = express();
const API_NAME = "/api";

app.use(cors());

Passport.passport();

app.use(express.json());
app.use(API_NAME, userRoutes);
app.use(API_NAME, addressRoutes);
app.use(API_NAME, employeeRoutes);
app.use(API_NAME, productRoutes);
app.use(API_NAME, categoryRoutes);
app.use(API_NAME, contactRoutes);

app.get("/", (req, res) => {
    res.send("Server working");
});

app.listen(PORT, () =>
    console.log(`Server listing on http://localhost:${PORT}`)
);
