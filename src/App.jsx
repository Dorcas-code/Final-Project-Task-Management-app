import './App.css';
import React, { useEffect, useState } from "react";
import {DragDropProvider} from '@dnd-kit/react';
import {move} from '@dnd-kit/helpers';
import {Column} from './components/Column/Column';
import {Task} from './components/Tasks/Task';
import AddHabit from './components/AddHabit/AddHabit';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import InputGroup from 'react-bootstrap/InputGroup';

import ViewWeekly from './components/ViewWeekly/ViewWeekly';

function App() {
  const [tasks, setTasks] = useState([]);
  const [name,setName] = useState("");
  const [date, setDate] = useState("");
  const [column, setColumn] = useState({
    "Not started": [],
    "In progress":[],
    "Done":[],
  })
   const [show, setShow] = useState(true);
    // With this:
//  const codespaceName = "/Final-Project-Task-Management-app/";
//   const port = 3000; // Your actual port
//   const domain = "app.github.dev";
   const url = `https://final-project-task-management-app.onrender.com/tasks`;
  //  const url = `/tasks`;




useEffect(() => {
    let ignore = false;
  const handleTasks = () => {
  // The Condition
  const todoTasks = tasks.filter(task => task.status === "Not started");
  const inProgressTasks = tasks.filter(task => task.status === "In progress");
  const doneTasks = tasks.filter(task => task.status === "Done");
  // tasks.map((task) => {
  //   const filtered = tasks.filter(task => task.completed === false)})
  setColumn({
              // Copy all existing properties (name, age, etc.)
    "Not started": [...todoTasks ],    
    "In progress": [...inProgressTasks ],
    "Done":[...doneTasks]
        // Overwrite only the target array property
  });
}
  handleTasks ();
    return () => {
    ignore = true; // Cancels the previous effect if dependencyState changes
  };
}, [tasks]); 
// console.log(column);



 const fetchTasks = async() => {

  // With this:
// const codespaceName = "zany-trout-5rv5j95wrr737pr5";

// const port = 3000; // Your actual port
// const domain = "app.github.dev";
 const url = `https://final-project-task-management-app.onrender.com/tasks`;

    const res= await fetch(url);
        if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

     const data = await res.json();

const results = data.map(item => {
  const start = new Date(item.start_date);
  const end = new Date(item.due_date);
  
  // Calculate difference in milliseconds
const diffTime = Math.abs(end - start);

// Convert milliseconds to days (1000ms * 60s * 60m * 24h)
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 


// Method 1: Using Array.from
const falseArray1 = Array.from({ length: diffDays }, () => false);

// Method 2: Using Array().fill
const falseArray2 = Array(diffDays).fill(false);

// console.log(falseArray2 ); // Output: [false, false, false]
  return {
    ...item,
    days_between:falseArray2
  };
});

// console.log("results:", results);
  const updatedatas = data.map(dateObj => ({
    ...dateObj,
    isCompleted: false // Set your default boolean here
  }));
 

    setTasks(updatedatas);
        setTasks(results);
    console.log(tasks);
  }

    useEffect(() => {

     fetchTasks();
 
  }, []);

  
// console.log('tasks added boolean:', tasks);
 const handleSubmit = async(e) => {
    e.preventDefault();
   
   if (name === '' || date === '') {
     console.log("error!!!!");
       setShow(true);
         return (
       
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Input cannot be empty</Alert.Heading>
      
      </Alert>
    );
   
    }
    const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0
const dd = String(today.getDate()).padStart(2, '0');     // Days start at 1
const formattedDate = `${yyyy}-${mm}-${dd}`;

  const payload = {
     key:"value",
     name: name,
     start_date: formattedDate,
     due_date: date,
     status: "Not started",
  };
  
    const res = await fetch( url, {
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

   
  }

 const handleDragStart = ({operation}) => {
// console.log("Item's drag id: "+ operation.source.id);
//  e.dataTransfer.setData("text/plain", String(operation.source.id))
  //
 }

  const handleDrop = async({operation}) => {

  // const { active, over } = event;
  // console.log(operation.target.group);

    const id = operation.target.id;
  const status= operation.target.group;
  //  const id = operation.dataTransfer.getData("text/plain");
   //get data in format of plain text
  //  console.log(id, status);
     await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id:id, status:status}) // Stringify the payload
  });

  }

  return (
    <div className="bg" style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
  
    }}>
      {/* form to submit tasks */}
      <h1>Progress Tracker</h1>
      <form style={{
        display: "flex",
        gap: "10px",marginBottom:"10px"}} onSubmit={handleSubmit}>
       <InputGroup style={{lineHeight:"32px"}} className="mb-3" hasValidation>
        <InputGroup.Text id="inputGroup-sizing-sm" style={{lineHeight:"42px"}}>
          What task?
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-sm" required
          type="text"  placeholder="Task name" onChange={(e) => setName(e.target.value)}  value={name}
        />
               <Form.Control.Feedback type="invalid">
              Please input a task!
            </Form.Control.Feedback>
      </InputGroup>
      
        <input type="date"  style={{ height: "30px" ,fontSize:"16px",borderRadius:"5px",minWidth:"120px",minHeight:"52px",padding:"10px"} } onChange={(e) => setDate(e.target.value)} value={date}></input>
        <button className="button-74" >Add Task</button>
      </form>
      {/* Drag and drop start */}
 
      <div style={{ display: "flex", justifyContent:"center",gap:"30px", width:"100%", marginBottom:"32px"}}>
      
      <DragDropProvider
        onDragStart={(e)=> handleDragStart(e)}
        onDragOver={(event) => {
        setColumn((column) => move(column, event));
        }}
        
       onDragEnd={(e)=> handleDrop(e)}
      >
{Object.entries(column).map(([col, items]) => (
       <Column id={col} key={col} name={col}>
      
        { 
        items.map((index, arrayIndex) => {

            //  if(task.status === "Not started"){
            //   return(
     return    <Task  id={index.id} key={index.id} index={arrayIndex} column={col} name={index.name} dueDate={index.due_date} status={index.status} />
        //  )
        //      }
})}
      </Column>
         ))}
    </DragDropProvider> 
 
   </div>
  
    <ViewWeekly tasks={column["In progress"]} setTasks={setTasks} />
    {/* <AddHabit/> */}
   
   {/* <div style={{ display: "flex", justifyContent:"center",gap:"30px", width:"100%"}}></div>
       <div onDragOver={(e)=>e.preventDefault()} 
             onDrop={(e)=> handleDrop(e, "Not started")}
              style={{backgroundColor: "White",  borderRadius: "15px", minHeight:"300px",width:"300px",marginTop:"10px",padding:"15px"}}>
          <h2 style={{textAlign: "center"}}>Not Started</h2>
          {tasks.map((task) => {
            if(task.status === "Not started"){
              return (
                <div draggable onDragStart={(e)=> handleDragStart(e,task.id)} key={task.id} style={{backgroundColor: "#fef2f2", borderRadius: "5px", padding: "10px", marginBottom: "10px", cursor: "pointer"}}>
              <strong>{task.name} </strong>
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
  */}
    </div>
  
  );
}

export default App;
