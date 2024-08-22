import React, { useEffect, useState, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthUserContext } from '../context/AuthContextLogin.js';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import logo from '../assets/logo.png'; 

function Preload({ navigation }) {
    const [loading, setLoading] = useState(true);
    const { signIn, signInWithGoogle } = useContext(AuthUserContext);

    const verificarDados = async () => {
        try {
            const userEmail = await AsyncStorage.getItem('userEmail');
            const userPass = await AsyncStorage.getItem('userPassword');
            const userEmailGoogle = await AsyncStorage.getItem('userEmailGoogle');

            if (userEmail && userPass) {
                await signIn(userEmail, userPass);
            } else if (userEmailGoogle) {
                await signInWithGoogle(userEmailGoogle);
            } else {
                navigation.navigate('SignIn');
            }
        } catch (error) {
            console.error('Erro ao verificar dados:', error);
        } finally {
            setLoading(false); 
        }
    }

    useEffect(() => {
        verificarDados();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <Image source={logo} style={styles.logo} />
            </View>
        );
    }

    return null; 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEEBE9', 
    },
    logo: {
        width: 380,
        height: 600,
        resizeMode: 'cover',
    },
});

export default Preload;
