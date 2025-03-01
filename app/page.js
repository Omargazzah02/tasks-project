"use client"
import { useState, useEffect } from 'react';

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ name: '', description: '' });

    // Charger les tâches depuis l'API
    useEffect(() => {
        fetch('/api/tasks')
            .then((res) => res.json())
            .then((data) => setTasks(data));
    }, []);

    // Ajouter une nouvelle tâche
    const handleAddTask = async () => {
        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask),
        });
        
        if (res.ok) {
            const addedTask = await res.json();
            setTasks([...tasks, addedTask]);
            setNewTask({ name: '', description: '' });
        }
    };

    // Supprimer une tâche
    const handleDeleteTask = async (id) => {
        const res = await fetch('/api/tasks', {
          
          
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify({id})

        });
        
        if (res.ok) {
            setTasks(tasks.filter((task) => task.id !== id));
        }
    };

    return (
       

 <div className="container">
 <h1>Liste des tâches</h1>
 <ul>
     {tasks.map((task) => ( 
         <li key={task.id}>
             <h3>{task.name}</h3>
             <p>{task.description}</p>
             <button className='button-delete' onClick={() => handleDeleteTask(task.id)}>Supprimer</button>
         </li>
     ))}
 </ul>
 <h2>Ajouter une nouvelle tâche!</h2>
 <input
     type="text"
     name ="name"
     placeholder="Nom de la tâche"
     value={newTask.name}
     onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
 />
 <input
     type="text"
     placeholder="Description"
     name  ="description"
     value={newTask.description}
     onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
 />
 <button onClick={handleAddTask} className='button-normal' type='submit'>Ajouter</button>
</div>
    );
}