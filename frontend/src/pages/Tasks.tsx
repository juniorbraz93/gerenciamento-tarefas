import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axiosInstance from '../services/axios';
import { useAuth } from '../context/AuthContext';
import '../styles.css';

interface Task {
    id: number;
    title: string;
    description: string;
    deadline: string;
    priority: string;
    tags: string;
  }

  const fetchTasks = async (): Promise<Task[]> => {
    const response = await axiosInstance.get('/tasks');
    return response.data; // Aqui, `response.data` precisa ser um array de tarefas
  };

const Tasks: React.FC = () => {
    const { data, error, isLoading, refetch } = useQuery<Task[]>('tasks', fetchTasks);
  const { user, logout } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('média');
  const [tags, setTags] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
  
    try {
      await axiosInstance.post('/tasks', {
        title,
        description: description || undefined,
        deadline: deadline ? new Date(deadline).toISOString() : undefined,
        priority,
        tags: tags || undefined,
      });
      setTitle('');
      setDescription('');
      setDeadline('');
      setPriority('média');
      setTags('');
      refetch(); // Atualiza a lista de tarefas após adicionar uma nova
    } catch (err) {
      console.error('Erro ao adicionar tarefa:', err);
    }
  };

  const openModal = (task: Task) => { // Aqui você especifica que 'task' é do tipo 'Task'
    setSelectedTask(task);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };
  

  if (isLoading) return <div>Carregando tarefas...</div>;
  if (error instanceof Error) return <div>Erro: {error.message}</div>;

  return (
    <div className="container">
      <h2>Tarefas</h2>
      <p>Bem-vindo, {user?.email}</p>
      <button onClick={logout}>Sair</button>
  
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="baixa">Baixa</option>
          <option value="média">Média</option>
          <option value="alta">Alta</option>
        </select>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags"
        />
        <button type="submit">Adicionar Tarefa</button>
      </form>
  
      <ul>
        {data?.map((task) => (
            <li key={task.id} onClick={() => openModal(task)}>
            {task.title}
            </li>
        ))}
      </ul>
  
      {/* Modal */}
      {isModalOpen && selectedTask && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedTask.title}</h3>
            <p><strong>Descrição:</strong> {selectedTask.description}</p>
            <p><strong>Data de Vencimento:</strong> {new Date(selectedTask.deadline).toLocaleString()}</p>
            <p><strong>Prioridade:</strong> {selectedTask.priority}</p>
            <p><strong>Tags:</strong> {selectedTask.tags}</p>
            <button onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default Tasks;
