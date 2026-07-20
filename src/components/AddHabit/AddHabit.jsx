// AddHabit.js

import React, { useState, useEffect } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddHabit = () => {
// Load initial habits from localStorage or use an empty array if none exist
const initialHabits = JSON.parse(localStorage.getItem('habits')) || [];

const [habits, setHabits] = useState(initialHabits);
const [habit, setHabit] = useState('');
const [description, setDescription] = useState('');
const [editIndex, setEditIndex] = useState(null);

useEffect(() => {
	// Save habits to localStorage whenever they change
	localStorage.setItem('habits', JSON.stringify(habits));
}, [habits]);

const handleSubmit = (e) => {
	e.preventDefault();
	if (!habit.trim()) {
	alert('Habit name cannot be empty');
	return;
	}
	if (editIndex !== null) {
	const updatedHabits = [...habits];
	updatedHabits[editIndex].name = habit;
	updatedHabits[editIndex].description = description;
	setHabits(updatedHabits);
	setEditIndex(null);
	} else {
	setHabits([...habits, { name: habit, description, status: { Monday: false, Tuesday: false, Wednesday: false, Thursday: false, Friday: false, Saturday: false, Sunday: false } }]);
	}
	setHabit('');
	setDescription('');
};

const removeHabit = (index) => {
	const updatedHabits = habits.filter((_, i) => i !== index);
	setHabits(updatedHabits);
};

const editHabit = (index) => {
	setHabit(habits[index].name);
	setDescription(habits[index].description || ''); // Handle case where description may be undefined
	setEditIndex(index);
};

return (
	<div>
	<h3 className='text-success'>GeekForGeeks Habit Tracker</h3>
	<h4>Add New Habit</h4>
	<form onSubmit={handleSubmit}>
		<div className="mb-3">
		<input
			type="text"
			className="form-control"
			placeholder="Enter habit name"
			value={habit}
			onChange={(e) => setHabit(e.target.value)}
		/>
		</div>
		<div className="mb-3">
		<input
			type="textarea"
			className="form-control"
			placeholder="Enter habit description"
			value={description}
			onChange={(e) => setDescription(e.target.value)}
		/>
		</div>
		<button type="submit" className="btn btn-primary">
		{editIndex !== null ? 'Save' : 'Add'}
		</button>
	</form>
	<table className="table">
		<thead>
		<tr>
			<th>Index</th>
			<th>Habit</th>
			<th>Description</th>
			<th>Actions</th>
		</tr>
		</thead>
		<tbody>
		{habits.map((habit, index) => (
			<tr key={index}>
			<td>{index + 1}</td>
			<td>{habit.name}</td>
			<td>{habit.description}</td>
			<td>
				<button className="btn btn-primary me-2" onClick={() => editHabit(index)}>
				<AiOutlineEdit />
				</button>
				<button className="btn btn-danger" onClick={() => removeHabit(index)}>
				<AiOutlineDelete />
				</button>
			</td>
			</tr>
		))}
		</tbody>
	</table>
	</div>
);
};

export default AddHabit;