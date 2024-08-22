import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import logo from '../assets/logo.png';
import { AuthUserContext } from '../context/AuthContextLogin.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Conta() {
    const { signOut } = useContext(AuthUserContext);
    const [emailSalvo, setEmailSalvo] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        const getEmailFromAsyncStorage = async () => {
            let email = await AsyncStorage.getItem('userEmail');
            if (!email) {
                email = await AsyncStorage.getItem('userEmailGoogle');
            }
            setEmailSalvo(email || '');
        };
        getEmailFromAsyncStorage();
    }, []);

    const handleSignOut = () => {
        setIsDisabled(true);
        signOut()
            .finally(() => {
                setIsDisabled(false);
            });
    };

    return (
        <ScrollView>
            <StatusBar backgroundColor="#A60303" barStyle="light-content" />
            <View style={styles.header}>
                <Image source={logo} style={styles.logo}/>
            </View>

            <ScrollView style={styles.container}>

                <View style={styles.contato}>
                    <View style={styles.contato1}>
                        <Text style={styles.contatoLabel}>Conta Usuário: </Text>
                        <Text style={styles.contatoInfo}>{emailSalvo}</Text>
                    </View>
                    <View style={styles.contato1}>
                        <Text style={styles.contatoLabel}>Endereço Usuário: </Text>
                        <Text style={styles.contatoInfo}></Text>
                    </View>
                </View>
                <View style={styles.contato}>
                    <View style={styles.contato1}>
                        <Text style={styles.contatoLabel}>Endereço Retirada: </Text>
                        <Text style={styles.contatoInfo}>xxxx xxxx xxxx </Text>
                    </View>   
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSignOut} disabled={isDisabled}>
                    <Icon name="log-out" size={20} color="#fff" />
                    <Text style={styles.buttonText}>SAIR</Text>
                </TouchableOpacity>
            </ScrollView>
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEEBE9',
        paddingTop: 30,
        paddingBottom: 30,
    },
    logo: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
    },
    header: {
        width: '100%',
        alignItems: 'center',  
    },
    button: {
        backgroundColor: "#D90416",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: 200,
        alignSelf: 'center',
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 5,
    },
    contato: {
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 4,
        padding: 10,
        height: 120,
        // Adicionando sombra para Android
        elevation: 3,

        // Adicionando sombra para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: '#F5EEED'
    },
    contato1: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    contatoLabel: {
        fontSize: 14,
        color: '#333',
        width: 130,
        marginRight: 10,
    },
    contatoInfo: {
        fontSize: 14,
        color: '#333',
    },
});

export default Conta;
