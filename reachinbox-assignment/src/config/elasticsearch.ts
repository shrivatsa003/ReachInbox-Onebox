import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";
dotenv.config();

export const elasticClient = new Client({
  node: process.env.ELASTIC_URL || "http://localhost:9200",
  auth: {
    username: process.env.ELASTIC_USERNAME || "elastic",
    password: process.env.ELASTIC_PASSWORD || "changeme",
  },
});

elasticClient
  .ping()
  .then(() => console.log("✅ Connected to Elasticsearch"))
  .catch((err) => console.error("❌ Elasticsearch connection failed:", err));