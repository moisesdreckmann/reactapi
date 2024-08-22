import React, { useState } from 'react';
import { ScrollView, Image, StyleSheet, TouchableOpacity, Text, View, StatusBar, TextInput, Button } from 'react-native';
import logo from '../assets/logo.png';
import bebidaImage from '../assets/bebidas/bebida1.png';
import Produto from '../components/Produto';
import Modal from '../funcoes/Modal';
import { useFirestore } from '../context/ContextFirestore';

function Bebidas() {
  const { items: bebidas, createItem: createBebida, updateItem: updateBebida, deleteItem: deleteBebida } = useFirestore();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newBebida, setNewBebida] = useState({ nome: '', descricao: '', valor: '' });
  const [selectedBebida, setSelectedBebida] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const openImage = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeImage = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };

  const handleCreateBebida = async () => {
    try {
      await createBebida({ ...newBebida, valor: parseFloat(newBebida.valor) });
      setNewBebida({ nome: '', descricao: '', valor: '' });
    } catch (error) {
      console.error('Erro ao criar bebida:', error);
    }
  };

  const handleUpdateBebida = async () => {
    if (selectedBebida) {
      try {
        await updateBebida(selectedBebida.id, { ...selectedBebida, valor: parseFloat(selectedBebida.valor) });
        setSelectedBebida(null);
        setIsEditing(false);
      } catch (error) {
        console.error('Erro ao atualizar bebida:', error);
      }
    }
  };

  const handleDeleteBebida = async (id) => {
    try {
      await deleteBebida(id);
    } catch (error) {
      console.error('Erro ao deletar bebida:', error);
    }
  };

  const startEditing = (bebida) => {
    setSelectedBebida(bebida);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setSelectedBebida(null);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#A60303" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} />
        </View>

        {bebidas.map(bebida => (
          <View key={bebida.id} style={styles.comidaContainer}>
            <Produto
              nome={bebida.nome}
              descricao={bebida.descricao}
              valor={Number(bebida.valor)}
              imagem={bebidaImage}
              onPressImg={() => openImage(bebidaImage)}
            />
            <TouchableOpacity style={styles.button} onPress={() => startEditing(bebida)}>
              <Text style={styles.buttonText}>Alterar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDeleteBebida(bebida.id)}>
              <Text style={styles.buttonText}>Deletar</Text>
            </TouchableOpacity>
          </View>
        ))}

        <Modal visible={modalVisible} image={selectedImage} onClose={closeImage} />
      </ScrollView>

      {!isEditing && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={newBebida.nome}
            onChangeText={(text) => setNewBebida({ ...newBebida, nome: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={newBebida.descricao}
            onChangeText={(text) => setNewBebida({ ...newBebida, descricao: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Valor"
            keyboardType="numeric"
            value={newBebida.valor}
            onChangeText={(text) => setNewBebida({ ...newBebida, valor: text })}
          />
          <Button title="Criar Bebida" onPress={handleCreateBebida} />
        </View>
      )}

      {selectedBebida && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={selectedBebida.nome}
            onChangeText={(text) => setSelectedBebida({ ...selectedBebida, nome: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={selectedBebida.descricao}
            onChangeText={(text) => setSelectedBebida({ ...selectedBebida, descricao: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Valor"
            keyboardType="numeric"
            value={selectedBebida.valor.toString()}
            onChangeText={(text) => setSelectedBebida({ ...selectedBebida, valor: text })}
          />
          <Button title="Salvar Alterações" onPress={handleUpdateBebida} />
          <Button title="Cancelar" onPress={cancelEditing} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEEBE9',
  },
  header: {
    width: '100%',
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 30,
    position: 'relative',
  },
  logo: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  formContainer: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#FF0000',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  comidaContainer: {
    marginBottom: 20,
  },
});

export default Bebidas;
