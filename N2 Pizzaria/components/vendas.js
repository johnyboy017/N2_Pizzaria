import { Text, View } from 'react-native';
import styles from '../content/style';
import orderStyles from '../content/novopedido';
import { useEffect, useState } from 'react';

export default function sale({ order }) {

    const [total, setTotal] = useState();

    useEffect(() => {

        let totalValue = 0;

        for (i in order.productList) {
            totalValue = totalValue + (order.productList[i].productQty * order.productList[i].productUnitValue);
        }
        setTotal(totalValue.toFixed(2).toString());
    }, []);

    return (
        <View style={orderStyles.listItem}>

            <Text style={orderStyles.listItemText}>Cliente: {order.customer}</Text>
            <Text style={orderStyles.listItemText}>Id: {order.id}</Text>
            <Text style={orderStyles.listItemText}>Data: {order.date}</Text>

            {
                order.productList.map((item, index) => (
                    <View style={styles.addMarginBottom} key={index.toString()}>
                        <Text style={[orderStyles.listItemText, styles.addMarginTop]}>Produto: {item.product}</Text>
                        <View style={styles.row}>
                            <Text style={orderStyles.listItemText}>Quantidade: {item.productQty}</Text>
                            <Text style={orderStyles.listItemText}>Valor do Produto: R${(item.productQty * item.productUnitValue).toFixed(2).toString()}</Text>
                        </View>
                    </View>
                ))
            }
            <Text style={orderStyles.listItemText}>Total: R${total}</Text>
        </View>
    );
};