import React, { useState, useContext } from "react";
import { Alert, SafeAreaView, TouchableOpacity, Text, TextInput, StyleSheet, View, StatusBar, Image } from "react-native";
import logo from '../assets/logo.png';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
import { AuthUserContext } from '../context/AuthContextLogin';
import googleImg from '../assets/google.png';

const SignIn = ({ navigation }) => {
    const { signIn, signInWithGoogle } = useContext(AuthUserContext);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const fixedEmail = "dreckmannmoises@gmail.com"; // E-mail fixo

    const handleSignIn = () => {
        setIsDisabled(true);
        signIn(fixedEmail, password)
            .finally(() => {
                setIsDisabled(false);
            });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleGoogleSignIn = () => {
        setIsDisabled(true);
        signInWithGoogle()
            .finally(() => {
                setIsDisabled(false);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#A60303" barStyle="light-content" />
            <Image source={logo} style={styles.logo} resizeMode="cover" />

            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, styles.emailInput]}
                    placeholder="Email"
                    keyboardType="email-address"
                    returnKeyType="next"
                    value={fixedEmail}
                    editable={false}  // Campo não editável
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

            <TouchableOpacity style={styles.button} onPress={handleSignIn} disabled={isDisabled}>
                <Icon2 name="login" size={20} color="#fff" />
                <Text style={styles.buttonText}>ENTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonGoogle} onPress={handleGoogleSignIn} disabled={isDisabled}>
                <Image source={googleImg} style={{ width: 24, height: 24, borderRadius: 15 }} />
                <Text style={styles.buttonTextGoogle}>GOOGLE</Text>
            </TouchableOpacity>

            <View style={styles.cadastramento}>
                <Text
                    onPress={() => navigation.navigate('EsqueceuSenha')}
                    style={styles.cadastramento}
                >
                    Esqueceu sua senha?
                </Text>
            </View>
        </SafeAreaView>
    );
};

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
    buttonGoogle: {
        backgroundColor: "#FAA916",
        borderRadius: 5,
        height: 40,
        paddingHorizontal: 20,
        width: 200,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    buttonTextGoogle: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    logo: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        marginBottom: 80,
    },
    cadastramento: {
        flexDirection: 'row',
        gap: 40,
        marginTop: 34,
        fontSize: 16,
    },
    icon: {
        position: 'absolute',
        right: 15,
        top: 13,
    }
});

export default SignIn;
