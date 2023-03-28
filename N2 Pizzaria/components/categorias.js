import { Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from '../content/style';
import productStyles from '../content/produto';

export default function category({ category, exclude, edit }) {
    return (
        <View style={productStyles.listItem} >

            <Text style={productStyles.listItemText}>
                <Text style={{ fontWeight: "bold" }}>Descrição: </Text>
                {category.description}
            </Text>

            <View style={[styles.row, { alignSelf: 'flex-end' }]}>
                <TouchableOpacity onPress={() => edit(category)} style={productStyles.botaoCategoria}>
                    <Text style={styles.labelPlusminus}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => exclude(category.id)} style={productStyles.botaoCategoria}>
                    <Text style={styles.labelPlusminus}>Apagar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};