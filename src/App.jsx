import './App.css';

import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [name,setName] = useState("");
  const [date, setDate] = useState("");
 
    // With this:
  const codespaceName = "zany-trout-5rv5j95wrr737pr5";
  const port = 3000; // Your actual port
  const domain = "app.github.dev";
   const url = `https://${codespaceName}-${port}.${domain}/tasks`;
 console.log(url);  
 const fetchTasks = async() => {

  // With this:
const codespaceName = "zany-trout-5rv5j95wrr737pr5";

const port = 3000; // Your actual port
const domain = "app.github.dev";
 const url = `https://${codespaceName}-${port}.${domain}/tasks`;

    const res= await fetch(url);
        if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

     const data = await res.json();

    setTasks(data);
  }

    useEffect(() => {
    fetchTasks();
  }, []);

  

 const handleSubmit = async(e) => {
    e.preventDefault();
  
  const payload = {
     key:"value",
     name: name,
     due_date: date,
     status: "Not started"
  };
    const res =await fetch( url, {
      method: 'POST', // Define the HTTP method
      headers: {
        'Content-Type': 'application/json' // Tell the server you are sending JSON
      },
      body: JSON.stringify(payload) // Convert data to a string string
    });
     
    // 2. Check if the HTTP status code is OK (200-299)
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    setName("");
    setDate("");
    fetchTasks();

    // console.log("Task Name:", name);
    // console.log("Task Date:", date);
  }

 const handleDragStart = (e,id) => {
  e.dataTransfer.setData("text/plain", String(id))
  //
 }

  const handleDrop = async(e, status) => {
   e.preventDefault();
   const id = e.dataTransfer.getData("text/plain");
   //get data in format of plain text
   console.log(id, status);
     await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id:id, status:status}) // Stringify the payload
  });
    fetchTasks();
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#effcff",
    }}>
      {/* form to submit tasks */}
      <h1>Progress Tracker</h1>
      <form style={{
        display: "flex",
        gap: "10px",}} onSubmit={handleSubmit}>
        <input type="text" style={{ height: "30px" ,fontSize:"16px",borderRadius:"5px" }} placeholder="Task name" onChange={(e) => setName(e.target.value)}  value={name}></input>
        <input type="date"  style={{ height: "30px" ,fontSize:"16px",borderRadius:"5px"} } onChange={(e) => setDate(e.target.value)} value={date}></input>
        <button  style={{ height: "30px " ,fontSize:"16px",borderRadius:"5px" }} >Add Task</button>
      </form>
      <div style={{ display: "flex", justifyContent:"center",gap:"30px", width:"100%"}}>
        <div onDragOver={(e)=>e.preventDefault()} 
             onDrop={(e)=> handleDrop(e, "Not started")}
              style={{backgroundColor: "White",  borderRadius: "15px", minHeight:"300px",width:"300px",marginTop:"10px",padding:"15px"}}>
          <h2 style={{textAlign: "center"}}>Not Started</h2>
          {tasks.map((task) => {
            if(task.status === "Not started"){
              return (
                <div draggable onDragStart={(e)=> handleDragStart(e,task.id)} key={task.id} style={{backgroundColor: "#fef2f2", borderRadius: "5px", padding: "10px", marginBottom: "10px", cursor: "pointer"}}>
                  {console.log(task.id)}<strong>{task.name} </strong> {console.log(task.name)}
         <span>Due Date: {task.due_date}</span>

                </div>
              )
            }})}
        </div>
        
         <div onDragOver={(e)=>e.preventDefault()} 
             onDrop={(e)=> handleDrop(e, "In progress")}
             style={{backgroundColor: "White",  borderRadius: "15px", minHeight:"300px",width:"300px",marginTop:"10px",padding:"15px"}}>
          <h2 style={{textAlign: "center"}}>In Progress</h2>
          {tasks.map((task) => {
            if(task.status === "In progress"){
              return (
                <div draggable onDragStart={(e)=> handleDragStart(e,task.id)}  style={{backgroundColor: "#fef2f2", borderRadius: "5px", padding: "10px", marginBottom: "10px", cursor: "pointer"}}>
                  <strong>{task.name} </strong>
                  <span>Due Date: {task.due_date}</span>
                </div>
              )
            }})}
        </div>
        <div onDragOver={(e)=>e.preventDefault()} 
             onDrop={(e)=> handleDrop(e, "Done")}
             style={{backgroundColor: "White",  borderRadius: "15px", minHeight:"300px",width:"300px",marginTop:"10px",padding:"15px"}}>
          <h2 style={{textAlign: "center"}}>Completed</h2>
          {tasks.map((task) => {
            if(task.status === "Done"){
              return (
                <div draggable onDragStart={(e)=> handleDragStart(e,task.id)}  style={{backgroundColor: "#fef2f2", borderRadius: "5px", padding: "10px", marginBottom: "10px", cursor: "pointer"}}>
                  <strong>{task.name} </strong>
                  <span>Due Date: {task.due_date}</span>
                </div>
              )
            }})}
        </div>
      </div>
    </div>
  );
}

export default App;
