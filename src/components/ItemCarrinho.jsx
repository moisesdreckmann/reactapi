import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const ItemCarrinho = ({ item, index, removerItem }) => {
    return (
        <View key={index} style={styles.content}>
            <View style={styles.itemContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.itemText}>{item.nome}</Text>
                    <Text style={styles.itemText}>R$ {item.preco.toFixed(2)}</Text>
                </View>
                <Image source={item.imagem} style={styles.img} />
                <TouchableOpacity style={styles.xContainer} onPress={() => removerItem(index)}>
                    <Icon name='close' style={styles.x} size={20}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: "90%",
        height: 115,
        justifyContent: 'center', 
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row', 
        // Adicionando sombra para Android
        elevation: 2,

        // Adicionando sombra para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        overflow: 'visible'
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,  
    
    },
    textContainer: {
        marginRight: 5,
        width: 100,
    },
    img: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 4,
    },
    x: {
        color: 'white',
    },
    xContainer: {
        backgroundColor: '#D90416',
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginLeft: 5,
    },
    itemText: {
        fontSize: 18,
        color: 'black',
        textAlign: 'left',
    },
});

export default ItemCarrinho;
