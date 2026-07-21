import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import {Client} from "@notionhq/client";

dotenv.config();
const app = express();

app.use(bodyParser.json());

app.use(cors( {
  origin: '*',// Replace with your exact frontend URL
    credentials: true
}));


const dataSourceId =   process.env.VITE_NOTION_DATA_SOURCE;

const notion = new Client({ auth: process.env.VITE_NOTION_API_KEY ,   notionVersion: "2025-09-03"});

app.get("/tasks", (req, res) => {
  (  async () => {
 
const response = await notion.dataSources.query({
    data_source_id:  dataSourceId,
});

// res.json(response);
  let final_response = [];
  response.results.map((item) => {
    let obj ={
      id:item.id,
      name: item.properties.Name.title[0].text.content,
      status: item.properties.Status.status.name,
      start_date: item.properties["Due Date"].date.start,
      due_date: item.properties["Due Date"].date.end,
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
  let start_date = req.body.start_date;

console.log("name: "+name+" status: "+status+" due_date: "+due_date+" start_date: "+start_date);
  const response = await notion.pages.create({
    parent: {  data_source_id: process.env.VITE_NOTION_DATA_SOURCE },
    properties: {
     "Name": { "title": [{ "text": { "content": name } }] },
    "Status": { "status": { "name": status } },
   
    "Due Date": due_date ? { date: {start:start_date, end: due_date } } :undefined,
}})

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
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () =>{
  console.log("server is live")
})

