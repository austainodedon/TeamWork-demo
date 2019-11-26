import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString:
    "postgres://ohznngby:5fg5COAC45jRjE_sFmtXnIA77wLlaGbA@salt.db.elephantsql.com:5432/ohznngby"
});

pool.on("connect", () => {
  console.log("connected to the db");
});
