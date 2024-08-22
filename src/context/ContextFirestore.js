import React, { createContext, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

export const FoodContext = createContext({});

export const FoodProvider = ({ children }) => {
  const [food, setFood] = useState([]);

  useEffect(() => {
    const listener = firestore()
      .collection('Comidas')
      .orderBy('nome')
      .onSnapshot(snapShot => {
        if (snapShot) {
          let data = [];
          snapShot.forEach(doc => {
            data.push({
              uid: doc.id,
              nome: doc.data().nome,
              descricao: doc.data().descricao,
              valor: doc.data().valor,
            });
          });
          console.log('Comidas obtidas:', data); // Log para verificar os dados obtidos
          setFood(data);
        } else {
          console.log('Nenhuma comida encontrada');
        }
      });
  
    return () => {
      listener();
    };
  }, []);
  

  const saveFood = async (comida) => {
    try {
      await firestore().collection('Comidas').doc(comida.uid).set(
        {
          nome: comida.nome,
          descricao: comida.descricao,  // Salvando descrição
          valor: comida.valor,  // Salvando valor
        },
        { merge: true },
      );
      return true;
    } catch (e) {
      console.error('FoodProvider, save: ' + e);
      return false;
    }
  };

  const deleteFood = async (uid) => {
    try {
      await firestore().collection('Comidas').doc(uid).delete();
      return true;
    } catch (e) {
      console.error('FoodProvider, del: ', e);
      return false;
    }
  };

  return (
    <FoodContext.Provider value={{ food, saveFood, deleteFood }}>
      {children}
    </FoodContext.Provider>
  );
};
