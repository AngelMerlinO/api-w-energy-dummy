import express from "express";
import { Signale } from "signale";
const cors = require("cors");

import { usersRouter } from "./users/infrastructure/UsersRouter";
import { deviceRouter } from "./device/infrastucture/DevicesRouter";
import { registerRouter } from "./register/infrastructure/RegisterRouter";

const app = express();
const signale = new Signale();

app.use(express.json());
app.use(cors()); // Use cors middleware to enable CORS
app.use("/users", usersRouter);
app.use("/device", deviceRouter);
app.use("/register", registerRouter);


app.listen(3000, () => {
  signale.success("Server online in port 3000");
});
