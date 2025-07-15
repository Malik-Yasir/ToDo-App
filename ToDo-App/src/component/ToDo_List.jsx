import React, { useState } from "react";
import './ToDo_List.css'

const ToDo_List = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  // If User Pass Blank value and Clicked the Add button  
  const addTask = () => {
    if (newTask.trim() === "") {
      alert("Please Add a Task ");
      return;
    }

    if (isEditing) {
      // update existing task
      const updatedTasks = [...tasks];
      updatedTasks[currentIndex] = newTask;
      setTasks(updatedTasks);
      setIsEditing(false);
      setCurrentIndex(null);
    } else {
      // add new task
      setTasks([...tasks, newTask]);
    }

    setNewTask("");
  };

  const editTask = (index) => {
    setNewTask(tasks[index]);
    setIsEditing(true);
    setCurrentIndex(index);
  };

  const deleteTask = (index) => {
    const updatedTask = tasks.filter((_, i) => i !== index);
    setTasks(updatedTask);

    // Reset edit mode if the item being edited is deleted
    if (isEditing && index === currentIndex) {
      setIsEditing(false);
      setNewTask("");
    }
  };

  return (
    <div className="app" >
      <h1>To-Do List</h1>
      <div className="input-wrapper">
        <input className="input-box"
          type="text"
          onChange={handleInputChange}
          placeholder="Enter a Task..."
          value={newTask}
        />
        <button onClick={addTask}>{isEditing ? "Update" : "Add"}</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <div className="manage-btns">
              <button onClick={() => editTask(index)}>Edit</button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo_List;
