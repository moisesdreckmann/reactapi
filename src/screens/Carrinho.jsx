import React, { useContext, useState } from 'react';
import { ScrollView, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AuthUserContext } from '../context/AuthContextCarrinho.js';
import logo from '../assets/logo.png';
import ItemCarrinho from '../components/ItemCarrinho';
import Icon from 'react-native-vector-icons/MaterialIcons.js';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';

function Carrinho() {
  const { carrinho, removerDoCarrinho } = useContext(AuthUserContext);
  const [mensagem, setMensagem] = useState('');
  let total = 0;

  const handleRemoverItem = (index) => {
    removerDoCarrinho(index);
  };

  const handleComprar = async () => {
    const userId = firebase.auth().currentUser.uid;

    const compras = carrinho.map(item => ({
      nome: item.nome,
      preco: item.preco,
      imagem: item.imagem,
      quantidade: item.quantidade || 1
    }));

    try {
      await firestore().collection('Compras').add({
        userId: userId,
        itens: compras,
        total: total.toFixed(2),
        data: new Date().toISOString()
      });

      // Limpe o carrinho
      removerDoCarrinho(); // Chame sem parâmetros para limpar todos os itens
      
      setMensagem('Oba! Seu pedido está sendo preparado e você pode retirar em 40 minutos');
      setTimeout(() => {
        setMensagem('');
      }, 10000);
    } catch (error) {
      console.error('Erro ao registrar compra:', error);
    }
  };

  return (
    <>
      <Image source={logo} style={styles.logo} resizeMode="cover" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {carrinho.length === 0 && mensagem === '' ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Não há itens no carrinho</Text>
            </View>
          ) : (
            <>
              {carrinho.map((item, index) => {
                total += item.preco;
                return (
                  <ItemCarrinho
                    key={index}
                    item={item}
                    index={index}
                    removerItem={handleRemoverItem}
                  />
                );
              })}
            </>
          )}
          {mensagem !== '' && (
            <View style={styles.mensagemContainer}>
              <Text style={styles.mensagemText}>{mensagem}</Text>
            </View>
          )}
        </ScrollView>
        {carrinho.length > 0 && mensagem === '' && (
          <>
            <Text style={styles.total}>Total: {total.toFixed(2)}</Text>
            <TouchableOpacity style={styles.touch2} onPress={handleComprar}>
              <Icon name="shopping-bag" size={20} color="#fff" />
              <Text style={styles.textBtn}>COMPRAR</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEEBE9',
    justifyContent: 'center',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 30,
  },
  logo: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  touch2: {
    width: '80%',
    height: 40,
    backgroundColor: '#D90416',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    gap: 10,
  },
  textBtn: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 18,
  },
  emptyContainer: {
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mensagemContainer: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 180,
  },
  mensagemText: {
    color: 'white',
    textAlign: 'center',
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: 'green',
    height: 40,
    textAlignVertical: 'center',
    marginHorizontal: 35,
    borderRadius: 4,

  }
});

export default Carrinho;
