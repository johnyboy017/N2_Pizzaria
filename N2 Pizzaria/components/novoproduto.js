import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../content/style';
import orderStyles from '../content/novopedido';
import { Feather } from '@expo/vector-icons';

export default function orderProduct({ product, addToCart, removeFromCart }) {
    return (
        <View style={orderStyles.listItem}>

            <Text style={orderStyles.listItemText}>{product.description}</Text>
            <Text style={orderStyles.listItemText}>R$ {product.unitValue}</Text>


            <View style={[styles.componentRow, , { alignSelf: 'flex-end' }]}>
                <TouchableOpacity onPress={() => removeFromCart(product)} style={orderStyles.botaoCategoria} >
                    <Text style={styles.labelPlusminus}>Retirar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => addToCart(product)} >
                    <Text style={styles.labelPlusminus}>Adicionar</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};