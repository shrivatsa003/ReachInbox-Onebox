// src/testElastic.ts
import { elasticClient } from "./config/elasticsearch";

async function testElasticConnection() {
  try {
    console.log("Testing Elasticsearch connection...");

    const response = await elasticClient.info();
    console.log("✅ Connected to Elasticsearch!");
    console.log(response);
  } catch (error) {
    console.error("❌ Elasticsearch connection failed:", error);
  }
}

testElasticConnection();
