import React, { useContext, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';
import { FoodContext } from '../context/ContextApiDados'; // Usando o contexto correto

const Pizzas = () => {
  const { food = [], createFood, updateFood, deleteFood } = useContext(FoodContext);
  const [newFood, setNewFood] = useState({ nome: '', descricao: '', valor: '' });
  const [editingFood, setEditingFood] = useState(null);

  const handleCreate = () => {
    if (newFood.nome && newFood.descricao && !isNaN(newFood.valor)) {
      createFood({ ...newFood, valor: parseFloat(newFood.valor) });
      setNewFood({ nome: '', descricao: '', valor: '' });
    } else {
      Alert.alert('Erro', 'Preencha todos os campos corretamente.');
    }
  };

  const handleUpdate = (uid) => {
    if (editingFood && editingFood.nome && editingFood.descricao && !isNaN(editingFood.valor)) {
      updateFood(uid, { ...editingFood, valor: parseFloat(editingFood.valor) });
      setEditingFood(null);
    } else {
      Alert.alert('Erro', 'Preencha todos os campos corretamente.');
    }
  };

  const handleDelete = (uid) => {
    Alert.alert(
      'Excluir item',
      'Tem certeza de que deseja excluir este item?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => deleteFood(uid),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {food.length > 0 ? (
          food.map((comida) => (
            <View key={comida.uid} style={styles.comidaContainer}>
              <Text style={styles.nome}>{comida.nome}</Text>
              <Text style={styles.descricao}>{comida.descricao}</Text>
              <Text style={styles.valor}>R$ {comida.valor.toFixed(2)}</Text>
              <Button title="Editar" onPress={() => setEditingFood(comida)} />
              <Button title="Excluir" onPress={() => handleDelete(comida.uid)} color="red" />
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>Nenhuma comida disponível.</Text>
        )}
      </ScrollView>

      {/* Formulário para criar ou atualizar comida */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={editingFood ? editingFood.nome : newFood.nome}
          onChangeText={(text) => editingFood ? setEditingFood({ ...editingFood, nome: text }) : setNewFood({ ...newFood, nome: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={editingFood ? editingFood.descricao : newFood.descricao}
          onChangeText={(text) => editingFood ? setEditingFood({ ...editingFood, descricao: text }) : setNewFood({ ...newFood, descricao: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Valor"
          keyboardType="numeric"
          value={editingFood ? editingFood.valor.toString() : newFood.valor}
          onChangeText={(text) => editingFood ? setEditingFood({ ...editingFood, valor: text }) : setNewFood({ ...newFood, valor: text })}
        />
        <Button
          title={editingFood ? "Atualizar" : "Criar"}
          onPress={() => editingFood ? handleUpdate(editingFood.uid) : handleCreate()}
        />
        {editingFood && (
          <Button title="Cancelar" onPress={() => setEditingFood(null)} color="gray" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEEBE9',
    padding: 16,
  },
  scrollView: {
    flexGrow: 1,
  },
  comidaContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descricao: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
  valor: {
    marginTop: 8,
    fontSize: 16,
    color: '#A60303',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  formContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default Pizzas;
