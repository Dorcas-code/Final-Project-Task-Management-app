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
const response = await notion.dataSources.query({
  data_source_id:  dataSourceId,
});
  console.log(response);
  let final_response = [];
  response.results.map((item) => {
    let obj ={
      id:item.id,
      name: item.properties.Name.title[0].text.content,
      status: item.properties.Status.status.name,
      due_date: item.properties["Due Date"].date.start,
    }
    //extract only name, state and due date from the 
    final_response.push(obj);
  })
 res.json(final_response);
    })();
 
});

app.post("/tasks",async (req, res)=> {
  let name = req.body.name;
  let status = req.body.status;
  let due_date = req.body.due_date;
  const response = await notion.pages.create({
    parent: {  data_source_id: process.env.NOTION_DB },
    properties: {
       "Name": { "title": [{ "text": { "content": name } }] },
      "Status": { "status": { "name": status } },
      "Due Date" : due_date ? { "date": { "start": due_date } }: undefined,
    },
  })

  res.json(response);
})

app.patch("/tasks", async (req, res) => {
  let id = req.body.id;
  let status = req.body.status;
 
 const response = await notion.pages.update({
    page_id: id,
    properties: {
    
      "Status": { "status": { "name": status } },
     
    },
  })


  res.json(response);
})

app.listen(3000, ()=>{
  console.log("server is live")
})

