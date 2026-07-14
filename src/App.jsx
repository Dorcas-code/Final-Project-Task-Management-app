import './App.css';

import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [name,setName] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Task Name:", name);
    // console.log("Task Date:", date);
  }

  const fetchTasks = async() => {
    // With this:
const codespaceName = "ubiquitous-tribble-q4v6jx6wjqw247gg";

const port = 3000; // Your actual port
const domain = "app.github.dev";
const url = `https://${codespaceName}-${port}.${domain}/tasks`;

    const res= await fetch(url);
        if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

     const data = await res.json();
    console.log(data);
    setTasks(data);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  console.log("Tasks:", tasks);

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
        <div style={{backgroundColor: "White",  borderRadius: "15px", minHeight:"300px",width:"300px",marginTop:"10px",padding:"15px"}}>
          <h2 style={{textAlign: "center"}}>Not Started</h2>
          {tasks.map((task) => {
            if(task.status === "Not started"){
              return (
                <div style={{backgroundColor: "#fef2f2", borderRadius: "5px", padding: "10px", marginBottom: "10px", cursor: "pointer"}}>
                  <strong>{task.name} </strong>
                  <span>Due Date: {task.due_date}</span>
                </div>
              )
            }})}
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default App;
