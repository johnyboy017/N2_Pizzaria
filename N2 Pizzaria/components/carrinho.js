import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../content/style';
import orderStyles from '../content/novopedido';

export default function cart({ product }) {
    return (
        <View style={orderStyles.listItem}>

            <Text style={orderStyles.listItemText}>{product.description}</Text>
            <Text style={orderStyles.listItemText}>R$ {product.unitValue}</Text>

        </View>
    );
};