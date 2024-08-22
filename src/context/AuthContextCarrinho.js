import React, { createContext, useState } from 'react';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (item) => {
    setCarrinho(prevCarrinho => [...prevCarrinho, item]);
  };

  const removerDoCarrinho = (index) => {
    setCarrinho(prevCarrinho => {
      if (index === undefined) {
        // Se index não for fornecido, limpa todos os itens do carrinho
        return [];
      }

      // Remove o item específico
      const novoCarrinho = [...prevCarrinho];
      novoCarrinho.splice(index, 1);
      return novoCarrinho;
    });
  };

  return (
    <AuthUserContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho }}>
      {children}
    </AuthUserContext.Provider>
  );
};

