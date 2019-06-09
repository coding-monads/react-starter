import config from "config";
import mongoose from "mongoose";
import { ConnectionOptions } from "tls";

const { host, resource, query, name } = config.get("mongo.uri");
const dbCredentials = config.get("mongo.credentials");

const settings: any = {
  ...dbCredentials,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};

const dbURI = `${name}://${host}/${resource}${query}`;

const connectDB = () =>
  console.log("Trying to connect to mongodb [URI] ", dbURI);

mongoose
  .connect(dbURI, settings)
  .then(() => console.log("MoongoDB Connected"))
  .catch((err: any) => console.log("MoongoDB not connected", err));

export { connectDB, settings, dbURI };
