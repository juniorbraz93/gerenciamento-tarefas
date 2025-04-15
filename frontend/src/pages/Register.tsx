// src/pages/Register.tsx
import React, { useState } from 'react';
import axiosInstance from '../services/axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';
import RegImg from '../assets/images/reguser-fb.jpg';


const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        await axiosInstance.post('/register', formData);
        navigate('/login');
    } catch (error: any) {
        if (error.response) {
        console.error('Erro ao registrar DETALHADOS:', error.response.data);
        // Exiba mensagens de erro específicas para o usuário, se necessário
        } else {
        console.error('Erro ao registrar:', error);
        }
    }
  };

  return (
    <div className="container">
        <form onSubmit={handleSubmit}>
          {/* Imagem acima do título */}
      <img
        src={RegImg}
        alt="Logo do sistema"
        className="login-logo"
      />
      <h2>Registrar</h2>
      <input
        type="text"
        name="name"
        placeholder="Usuário"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Cadastrar</button>
      <p>
        Não tem uma conta? <Link to="/login">Faça login</Link>
      </p>
    </form>
    </div>
  );
};

export default Register;
