const express = require("express");
const app = express();
const initRoutes = require("./routes/web");
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
initRoutes(app);
app.use(cors());

let port = 3000;
app.listen(port, () => {
    console.log(`Running at localhost:${port}`);
});

