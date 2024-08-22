import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'; // Importe os componentes necessários

const Produto = ({ nome, descricao, imagem, onPress, onPressImg, valor }) => {
    return (
        <View style={styles.touch11}>
            <View style={styles.viewStyle}>
                <View>
                    <Text style={styles.h1}>{nome}</Text>
                    <Text style={styles.h2}>{descricao}</Text>
                </View>
                    
                <TouchableOpacity onPress={onPressImg}>
                    <Image source={imagem} style={styles.img}/>
                </TouchableOpacity>
            </View>

            <TouchableOpacity 
                style={styles.touch2}
                onPress={onPress}
            >
                <Text style={styles.textBtn}>{valor.toFixed(2)}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    touch11: {
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        flexDirection: 'column',
        width: '90%',
        height: 200,
        gap: 15,
        borderRadius: 8,
        // Adicionando sombra para Android
        elevation: 3,

        // Adicionando sombra para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: '#F5EEED'
    },
    viewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
        width: "90%",
    },
    h1: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        width: 170,
    },
    h2: {
        width: 170,
        textAlign: 'justify',
        marginTop: 5, 
        fontSize: 14,
    },
    img: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 4,
        marginTop: 25,
    },
    touch2: {
        width: '60%',
        height: 40,
        backgroundColor: '#D90416',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 50
    },
    textBtn: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Produto;
