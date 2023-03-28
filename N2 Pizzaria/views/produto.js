import { Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../content/style';
import Product from '../components/produto';
import { Ionicons } from '@expo/vector-icons';
import { createTableProduct, deleteProduct, getAllProducts } from '../services/dbService';

export default function product({ navigation }) {

    const [productList, setProducts] = useState([]);
    let isTableCreated = false;

    useEffect(
        () => {
            processUseEffect();
        }, []
    );

    async function processUseEffect() {
        if (!isTableCreated) {
            isTableCreated = true;
            await createTableProduct();
        }

        await loadProducts();
    }

    async function loadProducts() {
        try {
            let list = await getAllProducts()
            setProducts(list);
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    function edit(product) {
        navigation.navigate('productEdit', product);
    };

    function exclude(id) {
        Alert.alert('Atenção', 'Tem certeza que deseja excluir esse produto?',
            [
                {
                    text: 'Sim',
                    onPress: () => confirmDelete(id),
                },
                {
                    text: 'Não',
                    style: 'cancel',
                }
            ]);
    };

    async function confirmDelete(id) {
        try {
            await deleteProduct(id);

            Alert.alert('Produto apagado!!');

            await loadProducts();

        } catch (e) {
            Alert.alert(e);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titulo}>
                <Text style={styles.titulo}>PRODUTOS</Text>
            </View>
            <ScrollView style={styles.containerSV}>
                {
                    productList.map((prod, index) => (
                        <Product product={prod} key={index.toString()}
                            exclude={exclude} edit={edit} />
                    ))
                }
            </ScrollView>

            <TouchableOpacity onPress={() => navigation.navigate('home')} style={styles.bottomButtonLeft} >
                <Ionicons name="arrow-back-circle-outline" size={70} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoMenu} onPress={() => navigation.navigate('productEdit')}>
                <Text style={styles.textoBotaoMenu}>Adicionar produto</Text>
            </TouchableOpacity>

        </View>
    );
}