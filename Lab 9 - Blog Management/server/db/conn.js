// MongoDB Atlas connection (official MongoDB Node.js driver).
import "../loadEnvironment.js";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI;

// Stop early with a clear message if the connection string was not filled in.
if (!uri || /<[^>]+>/.test(uri)) {
  console.error(
    "\n[db] ATLAS_URI is missing or still contains placeholders like <db_password>.\n" +
      "     Open server/.env and paste your MongoDB Atlas connection string.\n"
  );
  process.exit(1);
}

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  // Fail fast (10 s) instead of hanging for 30 s when Atlas can't be reached.
  serverSelectionTimeoutMS: 10000,
});

try {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log("[db] Connected to MongoDB Atlas");
} catch (err) {
  console.error("\n[db] Could not connect to MongoDB Atlas:", err.message);

  const msg = String(err.message).toLowerCase();
  if (msg.includes("bad auth") || msg.includes("authentication failed")) {
    console.error("     -> Wrong username/password in ATLAS_URI (or the password needs URL-encoding).");
  } else if (msg.includes("enotfound") || msg.includes("querysrv") || msg.includes("invalid scheme")) {
    console.error("     -> The cluster address in ATLAS_URI looks wrong. Re-copy it from Atlas.");
  } else if (msg.includes("server selection") || msg.includes("timed out") || msg.includes("ssl")) {
    console.error("     -> Atlas is blocking this computer. Add your IP in Atlas -> Network Access");
    console.error("        (use 'Add Current IP Address', or 0.0.0.0/0 for a lab/testing setup).");
  } else {
    console.error("     -> Check ATLAS_URI in server/.env and make sure you are connected to the internet.");
  }
  console.error("");
  process.exit(1);
}

const db = client.db(process.env.DB_NAME || "blog");

export default db;
