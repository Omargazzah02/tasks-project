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
       <div>changes</div>
    );
}