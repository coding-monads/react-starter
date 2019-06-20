import config from "config";
import mongoose from "mongoose";

async function connectDB(): Promise<typeof mongoose | null> {
  const { host, resource, query, name } = config.get("mongo.uri");
  const dbCredentials = config.get("mongo.credentials");

  const settings: any = {
    ...dbCredentials,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  };
  const dbURI = `${name}://${host}/${resource}${query}`;
  console.log("Trying to connect to mongodb [URI] ", dbURI);

  try {
    const connection = await mongoose.connect(dbURI, settings);
    console.log("MoongoDB Connected");
    return connection;
  } catch (err) {
    console.log("MoongoDB not connected", err);
  }
  return null;
}

export { connectDB };
