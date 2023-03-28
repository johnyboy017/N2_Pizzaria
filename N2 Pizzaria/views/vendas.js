import { Alert, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../content/style';
import saleStyles from '../content/vendas';
import { Ionicons } from '@expo/vector-icons';
import { getAllOrders } from '../services/dbService';
import { useEffect, useState } from 'react';
import Sale from '../components/vendas';

export default function sale({ navigation }) {

    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        processUseEffect();
    }, []);

    async function processUseEffect() {
        let list = await getAllOrders();

        let orders = groupItensByOrder(list);

        setOrderList(orders);
    };

    function groupItensByOrder(list) {
        let orders = [];

        for (i in list) {

            let index = orders.findIndex(e => e.id == list[i].id);

            let productItem = {
                product: list[i].product,
                productQty: list[i].productQty,
                productUnitValue: list[i].productUnitValue
            };

            if (index > -1) {
                orders[index].productList.push(productItem);
            } else {
                let order = {
                    id: list[i].id,
                    date: list[i].date,
                    customer: list[i].user,
                    productList: [productItem]
                };

                orders.push(order);
            }
        }

        return orders;
    }

    return (
        <View style={styles.container}>

            <View style={styles.titulo}>
                <Text style={styles.titulo}>VENDAS</Text>
            </View>

            <ScrollView style={styles.containerSV}>
                {
                    orderList.map((order, index) => (
                        <Sale order={order} key={index.toString()} />
                    ))
                }
            </ScrollView>

            <TouchableOpacity onPress={() => navigation.navigate('home')} style={styles.bottomButtonLeft} >
                <Ionicons name="arrow-back-circle-outline" size={70} color="white" />
            </TouchableOpacity>

        </View>
    );
}