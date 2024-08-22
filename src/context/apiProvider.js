import React, { createContext, useEffect, useState } from 'react';
import { create } from 'apisauce';
import auth from '@react-native-firebase/auth';

export const ApiContext = createContext({});

export const ApiProvider = ({ children }) => {
  const [api, setApi] = useState(null);

  const getApi = async () => {
    if (auth().currentUser) {
      try {
        console.log('Obtendo token de ID...');
        const idToken = await auth().currentUser.getIdToken(true);
        if (idToken) {
          const apiLocal = create({
            baseURL: 'https://firestore.googleapis.com/v1/projects/ipizza-aec6e/databases/(default)/documents/',
            headers: { Authorization: 'Bearer ' + idToken },
          });

          apiLocal.addResponseTransform(response => {
            if (!response.ok) {
              throw response;
            }
          });

          setApi(apiLocal);
          console.log('Instância da API configurada:', apiLocal);
        } else {
          console.error('Token de ID não encontrado.');
        }
      } catch (e) {
        console.error('Erro ao obter o token de ID ou configurar a API:', e);
      }
    } else {
      console.error('Nenhum usuário autenticado encontrado.');
    }
  };

  useEffect(() => {
    const unsubscriber = auth().onAuthStateChanged(authUser => {
      if (authUser) {
        getApi();
      } else {
        console.error('Usuário não autenticado.');
        setApi(null);
      }
    });

    return () => {
      unsubscriber(); // Desinscrever o listener ao desmontar
    };
  }, []);

  return (
    <ApiContext.Provider value={{ api }}>
      {children}
    </ApiContext.Provider>
  );
};
