import { Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import styles from '../content/style';
import Cart from '../components/carrinho';
import { createTableOrder, createTableProductOrder, newOrder, newProductOrder } from '../services/dbService';
import { Alert } from 'react-native';

export default function cart({ navigation }) {

    let props = navigation.state.params;

    const [customer, setCustomer] = useState();
    const [productList, setProductList] = useState([]);
    const [total, setTotal] = useState();

    useEffect(() => {
        calculeTotalValue();

        if (props) {

            for (i in props) {
                let product = {
                    id: props[i].id,
                    code: props[i].code,
                    description: props[i].description,
                    unitValue: props[i].unitValue,
                    category: props[i].category,
                    categoryId: props[i].categoryId
                };

                setProductList(oldList => [...oldList, product]);
            }
        }

    }, []);

    function calculeTotalValue() {
        let totalInCart = 0;

        for (i in props) {
            totalInCart = totalInCart + parseFloat(props[i].unitValue);
        }

        setTotal(totalInCart.toFixed(2).toString());
    };

    async function finalizeOrder() {
        createTableOrder();
        createTableProductOrder();

        if (productList.length > 0) {

            if (customer) {
                let order = {
                    id: null,
                    user: customer,
                    itemList: null
                }

                let result = await newOrder(order);

                if (result > 0) {
                    order.itemList = setItemList(result);

                    for (i in order.itemList) {
                        result = await newProductOrder(order.itemList[i]);
                    }

                    if (result) {
                        navigation.navigate('home');
                        Alert.alert('Obrigado', 'Pedido realizado!!');
                    }
                } else {
                    Alert.alert('Erro', 'Pedido não foi concluído!!');
                }
            } else {
                Alert.alert('Coloque o nome do cliente!!');
            }

        } else {
            Alert.alert('Carrinho vazio!!');
        }
    };

    function setItemList(orderId) {
        let list = [];

        for (i in productList) {

            let index = list.findIndex(e => e.productId == productList[i].id);

            if (index > -1) {
                list[index].productQty++;
            } else {
                let item = {
                    id: null,
                    orderId: orderId,
                    productId: productList[i].id,
                    productQty: 1
                };

                list.push(item);
            }
        }

        return list;
    };

    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>CARRINHO</Text>

            <View style={styles.containerSV}>
                <Text style={styles.labelInput}>Nome do cliente</Text>
                <TextInput onChangeText={(text) => setCustomer(text)} value={customer} style={styles.inputText2}></TextInput>
            </View>

            <ScrollView style={styles.containerSV}>
                {
                    productList.map((prod, index) => (
                        <Cart product={prod} key={index.toString()} />
                    ))
                }
            </ScrollView>

            <Text style={styles.labelInput}>Total: R$ {total}</Text>

            <TouchableOpacity style={styles.botaoMenu}>
                <Text style={styles.labelBotao} onPress={() => finalizeOrder()}>Finalizar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('order', productList)} style={styles.bottomButtonLeft} >
                <Ionicons name="arrow-back-circle-outline" size={70} color="#002a5c" />
            </TouchableOpacity>
        </View>
    );
}