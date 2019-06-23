import { config as dotenvConfig } from "dotenv";
dotenvConfig();

import { app } from "./app";
import config from "config";
import { connectDB } from "./config/db";
import { Server } from "http";
import { isString, isObject } from "./utils";

connectDB();

const server: Server = app.listen(config.get("server.port"), () => {
  const address = server.address();
  if (isString(address)) {
    console.log("Server address " + address);
  } else if (isObject(address)) {
    const { port } = address;
    console.log(`Server running on port ${port}`);
  }
});
