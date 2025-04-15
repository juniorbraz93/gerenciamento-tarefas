import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';
import loginImg from '../assets/images/login-fb.jpg';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
        navigate('/tasks');
    } else {
        setError('Credenciais inválidas');
    }
  };

  return (
    <div className="container">
      {/* Imagem acima do título */}
      <img
        src={loginImg}
        alt="Logo do sistema"
        className="login-logo"
      />
      
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
        <button type="submit">Entrar</button>
        <p>
        Não tem uma conta? <Link to="/register">Registre-se</Link>
        </p>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Login;
