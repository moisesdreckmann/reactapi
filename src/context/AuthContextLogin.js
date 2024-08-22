import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from "@react-native-firebase/auth";
import { useNavigation } from '@react-navigation/native';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({ children }) => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signIn(email, password) {
    if (email && password) {
      try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        const { uid, emailVerified } = userCredential.user;

        if (emailVerified) {
          await AsyncStorage.setItem('userEmail', email);
          await AsyncStorage.setItem('userPassword', password);
          await AsyncStorage.setItem('userId', uid);
          setUserId(uid);
          navigation.navigate('AuthenticatedScreens');
        } else {
          Alert.alert("Email não verificado. Por favor, verifique seu email.");
        }
      } catch (error) {
        Alert.alert("Usuário não encontrado. Email ou senha inválidos.");
        console.error("SignIn Error: ", error);
      }
    } else {
      Alert.alert("Por favor, preencha todos os dados.");
    }
  }

  const signOut = async () => {
    try {
        await auth().signOut();
        await AsyncStorage.clear();  // Limpa todos os dados do AsyncStorage
        navigation.navigate('SignIn');
    } catch (error) {
        console.error("SignOut Error: ", error);
    } finally {
        setLoading(false); 
    }
};

  const cadastrar = async (name, email, password) => {
    if (name && email && password) {
      try {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        await userCredential.user.sendEmailVerification();
        Alert.alert(`Tudo certo! Um Email foi enviado para ${email}`);
        navigation.navigate('SignIn');
      } catch (error) {
        Alert.alert("O email já está em uso.");
        console.error("Cadastro Error: ", error);
      }
    } else {
      Alert.alert("Por favor, preencha todos os dados.");
    }
  }

  const esqueceuSenhaLogin = async (email) => {
    try {
      if (email) {
        await auth().sendPasswordResetEmail(email);
        Alert.alert(`Um Email foi enviado para ${email}`);
        navigation.navigate('SignIn');
      } else {
        Alert.alert("Por favor, preencha o seu Email.");
      }
    } catch (error) {
      Alert.alert("Por favor, preencha o seu Email corretamente.");
      console.error("Reset Password Error: ", error);
    }
  }

  useEffect(() => {
    const initialize = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const storedUserId = await AsyncStorage.getItem('userId');
          if (storedUserId) {
            setUserId(storedUserId);
          }
        } else {
          setUserId(null);
        }
      } catch (error) {
        console.error("Initialization Error: ", error);
      } finally {
        setLoading(false); 
      }
    };

    initialize();
  }, []);

  return (
    <AuthUserContext.Provider value={{ signIn, signOut, cadastrar, esqueceuSenhaLogin, userId, loading }}>
      {children}
    </AuthUserContext.Provider>
  );
};
