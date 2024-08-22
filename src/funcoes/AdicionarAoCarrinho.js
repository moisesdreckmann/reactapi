import React, { useState } from "react";

export const useCarrinho = () => {
    const [carrinho, setCarrinho] = useState([]);
    return [carrinho, setCarrinho];
};

const adicionarAoCarrinho = (item, carrinho, setCarrinho, navigation) => {
    setCarrinho(prevCarrinho => [...prevCarrinho, item]);
    navigation.navigate('Carrinho', { items: [...carrinho, item] });
};

export default adicionarAoCarrinho;
