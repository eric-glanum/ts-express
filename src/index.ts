const express = require("express");
import { Response, Request } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "server started" });
});

app.listen(3000, () => {
  console.log("connected to server");
});
