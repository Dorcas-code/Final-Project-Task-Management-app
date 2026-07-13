import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import {Client } from "@notionhq/client";

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/tasks", (req, res) => {
  (  async () => {
const dataSourceId =   process.env.NOTION_DB;
const response = await notion.databases.retrieve({
  database_id:  dataSourceId});
  console.log(response);
 res.json(response);
    })();
 
});
app.listen(3000, ()=>{
  console.log("server is live")
})

