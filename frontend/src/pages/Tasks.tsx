import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axiosInstance from '../services/axios';
import { useAuth } from '../context/AuthContext';
import '../styles.css';
import CadImg from '../assets/images/cadastrotask-fb.jpg';


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
    return response.data;
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
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Filtros
    const [filterPriority, setFilterPriority] = useState('');
    const [filterTitle, setFilterTitle] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // Paginação
    const tasksPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const filteredTasks = data
        ?.filter((task) =>
            task.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
            (filterPriority === '' || task.priority === filterPriority)
        )
        .sort((a, b) => {
            const dateA = new Date(a.deadline).getTime();
            const dateB = new Date(b.deadline).getTime();
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        }) || [];

    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
    const paginatedTasks = filteredTasks.slice(
        (currentPage - 1) * tasksPerPage,
        currentPage * tasksPerPage
    );

    const resetFilters = () => {
        setFilterTitle('');
        setFilterPriority('');
        setSortOrder('asc');
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

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
            refetch();
        } catch (err) {
            console.error('Erro ao adicionar tarefa:', err);
        }
    };

    const handleDeleteTask = async (taskId: number) => {
        const confirmDelete = window.confirm('Tem certeza que deseja excluir esta tarefa?');
        if (!confirmDelete) return;

        try {
            await axiosInstance.delete(`/tasks/${taskId}`);
            await refetch();
        } catch (err) {
            console.error('Erro ao deletar tarefa:', err);
        }
    };

    const openModal = (task: Task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    const openEditModal = (task: Task) => {
        setTitle(task.title);
        setDescription(task.description);
        setDeadline(task.deadline);
        setPriority(task.priority);
        setTags(task.tags);
        setSelectedTask(task);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedTask(null);
    };

    const handleEditTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            await axiosInstance.put(`/tasks/${selectedTask?.id}`, {
                title,
                description,
                deadline: deadline ? new Date(deadline).toISOString() : undefined,
                priority,
                tags,
            });
            setTitle('');
            setDescription('');
            setDeadline('');
            setPriority('média');
            setTags('');
            setIsEditModalOpen(false);
            refetch();
        } catch (err) {
            console.error('Erro ao editar tarefa:', err);
        }
    };

    if (isLoading) return <div>Carregando tarefas...</div>;
    if (error instanceof Error) return <div>Erro: {error.message}</div>;

    return (
        <div className="container">
            <h2>Gerenciador de Tarefas</h2>
            <p>Bem-vindo, {user?.email}</p>
            <button onClick={logout}>Sair</button>

            {/* Filtros */}
            <div className="filtros" style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
                <input
                    type="text"
                    placeholder="Filtrar por título"
                    value={filterTitle}
                    onChange={(e) => setFilterTitle(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
                >
                    <option value="">Todas as prioridades</option>
                    <option value="baixa">Baixa</option>
                    <option value="média">Média</option>
                    <option value="alta">Alta</option>
                </select>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
                >
                    <option value="asc">Mais próximas primeiro</option>
                    <option value="desc">Mais distantes primeiro</option>
                </select>
                <button onClick={resetFilters} style={{ padding: '0.5rem 1rem' }}>
                    Limpar Filtros
                </button>
            </div>

            <button
                onClick={() => setIsModalOpen(true)}
                style={{ padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '6px' }}
            >
                Cadastrar Tarefa
            </button>

            {/* Formulário de criação */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={CadImg} alt="Cadastro de Tarefa" className="login-logo" />
                        <h2>Cadastrar Tasks</h2>
                        <form className="form-task" onSubmit={handleAddTask}>
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
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button type="submit">Adicionar</button>
                                <button type="button" onClick={closeModal}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Lista de tarefas */}
            <ul>
                {paginatedTasks.map((task) => (
                    <li key={task.id} onClick={() => openModal(task)}>
                        {task.title}
                        <div className="btn-group">
                            <button onClick={(e) => { e.stopPropagation(); openEditModal(task); }}>Editar</button>
                            <button className="btn-deletar" onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }}>Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Paginação */}
            {totalPages > 1 && (
                <div className="pagination" style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Anterior
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            style={{ fontWeight: currentPage === i + 1 ? 'bold' : 'normal' }}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Próxima
                    </button>
                </div>
            )}

            {/* Modal de visualização */}
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

            {/* Modal de edição */}
            {isEditModalOpen && selectedTask && (
                <div className="modal-overlay" onClick={closeEditModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Editar Tarefa</h3>
                        <form className='form-task' onSubmit={handleEditTask}>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" required />
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição" />
                            <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option value="baixa">Baixa</option>
                                <option value="média">Média</option>
                                <option value="alta">Alta</option>
                            </select>
                            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags" />
                            <button type="submit">Salvar</button>
                            <button type="button" onClick={closeEditModal}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tasks;
