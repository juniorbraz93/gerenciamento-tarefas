import api from './axios';
import { User } from '../types/User';

interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData): Promise<User> => {
  const response = await api.post<User>('/login', data);
  return response.data;
};
