import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import {Client} from "@notionhq/client";

dotenv.config();
const app = express();

app.use(bodyParser.json());

app.use(cors( {
  origin: '*'// Replace with your exact frontend URL
  
}));


const dataSourceId =   process.env.NOTION_DATA_SOURCE;

const notion = new Client({ auth: process.env.NOTION_API_KEY ,   notionVersion: "2025-09-03"});

app.get("/tasks", (req, res) => {
  (  async () => {
 
const response = await notion.dataSources.query({
    data_source_id:  dataSourceId,
});


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
// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import { Client } from "@notionhq/client";

// dotenv.config();
// const app = express();

// app.use(bodyParser.json());
// app.use(cors({ origin: '*' }));

// const dataSourceId = "39c47b6e-a455-803f-ac64-000b1e08e917";

// // 保持使用你指定的最新 2025-09-03 資料源版本 API
// const notion = new Client({ 
//   auth: process.env.NOTION_API_KEY,  
//    notionVersion: "2022-06-28" 
// });

// 使用正確的 async/await 寫法，移除原本累贅的立即執行函式 (IIFE)
// app.get("/tasks", async (req, res) => {
//   try {
//     const response = await notion.dataSources.query({
//       data_source_id: dataSourceId,
//     });

//     // 使用安全鏈鎖 ?. 確保遇到空欄位時不會導致程式碼崩潰
//     const final_response = response.results.map((item) => {
//       return {
//         id: item.id,
//         // 如果名稱為空，安全回退到 "Untitled"
//         name: item.properties?.Name?.title?.[0]?.text?.content || "Untitled",
//         // 如果狀態未設定，安全回退到 "No Status"
//         status: item.properties?.Status?.status?.name || "No Status",
//         // 如果日期未填寫，安全回退到 null
//         due_date: item.properties?.["Due Date"]?.date?.start || null,
//       };
//     });

//     res.json(final_response);
//   } catch (error) {
//     console.error("Notion API 錯誤:", error);
//     res.status(500).json({ error: error.message });
//   }
// });
app.post("/tasks",async (req, res)=> {
  let name = req.body.name;
  let status = req.body.status;
  let due_date = req.body.due_date;
  const response = await notion.pages.create({
    parent: {  data_source_id: process.env.NOTION_DATA_SOURCE },
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () =>{
  console.log("server is live")
})

