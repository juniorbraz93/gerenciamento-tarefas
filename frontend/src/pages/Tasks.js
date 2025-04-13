import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from '../axios';

const fetchTasks = async () => {
  const response = await axios.get('/tasks');
  return response.data;
};

const Tasks = () => {
  const { data: tasks, error, isLoading } = useQuery('tasks', fetchTasks);

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar tarefas</div>;

  return (
    <div>
      <h2>Minhas Tarefas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Prazo: {new Date(task.deadline).toLocaleString()}</p>
            <p>Prioridade: {task.priority}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
