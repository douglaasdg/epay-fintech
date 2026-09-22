import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [conta, setConta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('@epay:token');
    const storedUser = localStorage.getItem('@epay:user');
    const storedConta = localStorage.getItem('@epay:conta');

    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
      if (storedConta) {
        setConta(JSON.parse(storedConta));
      }
      // Atualiza os dados mais recentes da conta no backend
      atualizarDadosConta();
    }
    setLoading(false);
  }, []);

  const atualizarDadosConta = async () => {
    try {
      const response = await api.get('/contas/saldo');
      setConta(response.data);
      localStorage.setItem('@epay:conta', JSON.stringify(response.data));
    } catch (error) {
      console.error('Erro ao atualizar saldo da conta:', error);
    }
  };

  const login = async (email, senha) => {
    const response = await api.post('/auth/login', { email, senha });
    const { token, usuario, conta } = response.data;

    localStorage.setItem('@epay:token', token);
    localStorage.setItem('@epay:user', JSON.stringify(usuario));
    localStorage.setItem('@epay:conta', JSON.stringify(conta));

    setUser(usuario);
    setConta(conta);
    return response.data;
  };

  const cadastrar = async (dados) => {
    const response = await api.post('/auth/register', dados);
    const { token, usuario, conta } = response.data;

    localStorage.setItem('@epay:token', token);
    localStorage.setItem('@epay:user', JSON.stringify(usuario));
    localStorage.setItem('@epay:conta', JSON.stringify(conta));

    setUser(usuario);
    setConta(conta);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('@epay:token');
    localStorage.removeItem('@epay:user');
    localStorage.removeItem('@epay:conta');
    setUser(null);
    setConta(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        conta,
        loading,
        login,
        cadastrar,
        logout,
        atualizarDadosConta,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
};
