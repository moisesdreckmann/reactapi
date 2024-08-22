import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon3 from 'react-native-vector-icons/AntDesign.js';

function Carrinho({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.carrinho}
            onPress={onPress}
        >
            <Icon3 name="shoppingcart" size={30} color="white" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    carrinho: {
        width: 50,
        height: 50,
        position: 'absolute',
        zIndex: 1,
        bottom: 20,
        right: 20,
        backgroundColor: '#FAA916',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Carrinho;
