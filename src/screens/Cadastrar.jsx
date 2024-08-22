import React, { useState, useContext } from "react";
import { Alert, SafeAreaView, TouchableOpacity, Text, TextInput, StyleSheet, View, StatusBar, Image } from "react-native";
import { AuthUserContext } from '../context/AuthContextCarrinho.js';
import logo from '../assets/logo.png';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Feather.js';
import { AuthUserContext as Login } from "../context/AuthContextLogin.js";
import { useNavigation } from '@react-navigation/native';

const Cadastrar = () => {
    const [isDisabled, setIsDisabled] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const {cadastrar} = useContext(Login);
    const navigation = useNavigation();

    function handleCadastro() {
        setIsDisabled(true);
        cadastrar(name, email, password)
            .finally(() => {
                setIsDisabled(false);
            });
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#A60303" barStyle="white"/>
            <Image source={logo} style={styles.logo} resizeMode="cover" />

           
                <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, styles.emailInput]} 
                    placeholder="Name"
                    keyboardType="name-phone-pad"
                    returnKeyType="next"
                    value={name}
                    onChangeText={setName}
                />
                </View>
                <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, styles.emailInput]} 
                    placeholder="Email"
                    keyboardType="email-address"
                    returnKeyType="next"
                    value={email}
                    onChangeText={setEmail}
                />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        keyboardType="default"
                        returnKeyType="go"
                        value={password}
                        secureTextEntry={!showPassword}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={toggleShowPassword} style={styles.icon}>
                        <Icon name={showPassword ? "eye-off" : "eye"} size={20} color="#D90416" />
                    </TouchableOpacity>
                </View>

            
            <TouchableOpacity style={styles.button} onPress={handleCadastro} disabled={isDisabled}>
                <Icon2 name="plus-circle" size={20} color="#fff" />
                <Text style={styles.buttonText}>CADASTRAR</Text>
            </TouchableOpacity>

            <View style={styles.cadastramento}>
                <Text onPress={() => navigation.navigate('SignIn')} style={styles.cadastramento}>
                    Já tem uma conta? Faça seu Login
                </Text>
            </View>
        
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: '#FEEBE9',
        height: '100%',
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20, 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    input: {
        width: '100%',
        height: 50,
        padding: 10,
    },
    button: {
        backgroundColor: "#D90416",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: 200,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    logo: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        marginBottom: 80
    },
    cadastramento: {
        flexDirection: 'row',
        gap: 40,
        marginTop: 28,
        fontSize: 16,
    },
    icon: {
        position: 'absolute',
        right: 15,
        top: 13
    },
});

export default Cadastrar;
