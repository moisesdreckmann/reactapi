import React, { createContext, useState, useEffect, useContext } from 'react';
import { ApiContext } from '../context/apiProvider';

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [food, setFood] = useState([]);
  const { api } = useContext(ApiContext);

  useEffect(() => {
    if (api) {
      getFoods();
    } else {
      console.error('API instance is not available.');
    }
  }, [api]);

  const getFoods = async () => {
    try {
      const response = await api.get('/Comidas');
      if (response.ok && response.data && response.data.documents) {
        let data = response.data.documents.map(d => ({
          nome: d.fields.nome.stringValue,
          descricao: d.fields.descricao.stringValue,
          valor: d.fields.valor ? parseFloat(d.fields.valor.stringValue) : 0,
          uid: d.name.split('/').pop(),
        }));
        setFood(data);
      } else {
        console.error('Failed to fetch food data');
      }
    } catch (error) {
      console.error('Error fetching food:', error);
    }
  };

  const createFood = async (newFood) => {
    try {
      const response = await api.post('/Comidas', {
        fields: {
          nome: { stringValue: newFood.nome },
          descricao: { stringValue: newFood.descricao },
          valor: { stringValue: newFood.valor.toString() },
        }
      });

      if (response.ok) {
        getFoods(); // Refresh the list after creation
      } else {
        console.error('Failed to create food');
      }
    } catch (error) {
      console.error('Error creating food:', error);
    }
  };

  const updateFood = async (uid, updatedFood) => {
    try {
      const response = await api.patch(`/Comidas/${uid}`, {
        fields: {
          nome: { stringValue: updatedFood.nome },
          descricao: { stringValue: updatedFood.descricao },
          valor: { stringValue: updatedFood.valor.toString() },
        }
      });

      if (response.ok) {
        getFoods(); // Refresh the list after update
      } else {
        console.error('Failed to update food');
      }
    } catch (error) {
      console.error('Error updating food:', error);
    }
  };

  const deleteFood = async (uid) => {
    try {
      const response = await api.delete(`/Comidas/${uid}`);

      if (response.ok) {
        getFoods(); // Refresh the list after deletion
      } else {
        console.error('Failed to delete food');
      }
    } catch (error) {
      console.error('Error deleting food:', error);
    }
  };

  return (
    <FoodContext.Provider value={{ food, getFoods, createFood, updateFood, deleteFood }}>
      {children}
    </FoodContext.Provider>
  );
};
