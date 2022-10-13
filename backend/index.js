const express = require("express");
const userRoutes = require("./routes/userRoutes");
const addressRoutes = require("./routes/addressRoutes");
const { PORT } = require("./config");

const router = express.Router();
const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(addressRoutes);

router.get("/", (req, res) => {
    res.send("Server working");
});

app.listen(PORT, () =>
    console.log(`Server listing on http://localhost:${PORT}`)
);
