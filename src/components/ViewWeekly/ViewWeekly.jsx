// ViewWeekly.js
import './ViewWeekly.css';
import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

const ViewWeekly = ({tasks, setTasks}) => {
// const [tasks, settasks] = useState(() => {
// 	const storedtasks = localStorage.getItem('tasks');
// 	return storedtasks ? JSON.parse(storedtasks) : [];
// });



function getWeekdays(startStr, endStr) {
    let currentDate = new Date(startStr);
    const endDate = new Date(endStr);
    const weekdaysArray = [];

    // Loop through each day from start date to end date
    while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

        // Check if the day is NOT Sunday (0) and NOT Saturday (6)
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            // Push a copy of the valid date formatted into the array
            weekdaysArray.push(currentDate.toISOString().split('T')[0]);
        }

        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return weekdaysArray;
}


	
const toggleStatus = (taskId, index) => {
	  setTasks((prevItems) =>
      prevItems.map((item) =>
        item.id === taskId 
          ? { ...item, status: "In progress", days_between: item.days_between.map((val, i) => i === index ? !val : val) } // Copy object and flip value
          : item // Keep unchanged objects as they are
      )
    );
	// const task = tasks.find((t) => t.id === taskId);
	// if (task) {
	// 	task.isCompleted = !task.isCompleted;
	// 	setTasks([...tasks]); // Trigger re-render by updating state
	// }
};
return (
	<div>
     
	{tasks.map((task) => {
		const taskWeekDays = getWeekdays(task.start_date, task.due_date);
		const taskStatus = taskWeekDays.map(() => {
			// return task.status[date] || false; // Assuming status is stored in task.status object
			return false; // Placeholder for demonstration
		});
	
		// console.log(' taskStatus:', taskStatus);
		return (
	<Table striped bordered hover className="table table-bordered mt-2 mb-5" key={task.id}>
		<thead>
		<tr>
			<th className="bg-primary text-white"> Task </th>
			{ taskWeekDays.map((date) => {
            //  task.map( date => {
          
               return (<th className="text-dark" key={date}>
                {date}
			</th>)
			// })
			})}
		</tr>
		</thead>
		<tbody>
	
			<tr>
               
			<td>
				<h4>{task.name}</h4>
				{/* <small>{task.description}</small> */}
			</td>
			{  taskWeekDays.map((date,index) => (
				
				<td key={date} className="text-center" style={{ cursor: 'pointer' }} onClick={() => toggleStatus(task.id, index)}>
			
			{	console.log("tasks days betwenn index" , task.days_between[index])}

				{
					
				task.days_between[index] ? (
					<FaCheck className="text-success" title="Mark undone" size={40} />
				) : (
					<FaTimes className="text-danger" title="Mark Done" size={40} />
				)}
				</td>
			))}
			</tr>
		
		</tbody>
			</Table>
		);
	})}
	</div>
);
};

export default ViewWeekly;