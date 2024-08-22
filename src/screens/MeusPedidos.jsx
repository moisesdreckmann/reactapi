import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const MeusPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPedido, setSelectedPedido] = useState(null);

    const today = new Date();
    const todayDate = today.toLocaleDateString('pt-BR');

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Compras')
            .onSnapshot(
                (snapshot) => {
                    const pedidosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    pedidosData.sort((a, b) => new Date(b.data) - new Date(a.data));
                    setPedidos(pedidosData);
                    setLoading(false);
                },
                (error) => {
                    console.error('Erro ao buscar pedidos:', error);
                    setError('Erro ao buscar pedidos.');
                    setLoading(false);
                }
            );

        return () => unsubscribe();
    }, []);

    const handleOrderClick = (pedido) => {
        setSelectedPedido(pedido);
        setModalVisible(true);
    };

    const handleConfirm = async () => {
        if (selectedPedido) {
            try {
                await firestore().collection('Compras').doc(selectedPedido.id).update({
                    confirmed: true
                });
                setPedidos(prevPedidos =>
                    prevPedidos.map(pedido =>
                        pedido.id === selectedPedido.id ? { ...pedido, confirmed: true } : pedido
                    )
                );
            } catch (error) {
                console.error('Erro ao confirmar pedido:', error);
                setError('Erro ao confirmar pedido.');
            }
        }
        setModalVisible(false);
        setSelectedPedido(null);
    };

    const handleCancel = () => {
        setModalVisible(false);
        setSelectedPedido(null);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return !isNaN(date) ? date.toLocaleDateString('pt-BR') : 'Data inválida';
    };

    const isToday = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR') === todayDate;
    };

    if (loading) {
        return <View style={styles.container}><Text>Carregando...</Text></View>;
    }

    if (error) {
        return <View style={styles.container}><Text>Erro: {error}</Text></View>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pedidos</Text>
            <FlatList
                data={pedidos.filter(pedido => isToday(pedido.data))}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.itemContainer, item.confirmed && styles.confirmed]}>
                        <Text style={styles.dateText}>Data do Pedido: {formatDate(item.data)}</Text>
                        <Text style={styles.emailText}>Email: {item.email}</Text>
                        {item.itens && item.itens.length > 0 ? (
                            item.itens.map((produto, index) => (
                                <View key={index} style={styles.productContainer}>
                                    <Text style={styles.productText}>Nome do Item: {produto.nome || 'Nome não disponível'}</Text>
                                    <Text style={styles.productText}>Preço: {produto.preco ? produto.preco.toFixed(2) : 'Preço não disponível'}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.productText}>Itens não disponíveis</Text>
                        )}
                        <Text style={styles.totalText}>Total: {item.total || 'Total não disponível'}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleOrderClick(item)}
                        >
                            <Text style={styles.buttonText}>Verificar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            {selectedPedido && (
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={handleCancel}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Button title="Sim" onPress={handleConfirm} />
                            <Button title="Não" onPress={handleCancel} />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FEEBE9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    itemContainer: {
        backgroundColor: '#FFF176', // Amarelo
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    confirmed: {
        backgroundColor: '#A5D6A7', // Verde
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    emailText: {
        fontSize: 16,
        marginBottom: 8,
    },
    productContainer: {
        backgroundColor: '#F5EEED',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    productText: {
        fontSize: 14,
        marginBottom: 4,
    },
    totalText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    button: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#D32F2F',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 40,
    },
});

export default MeusPedidos;
