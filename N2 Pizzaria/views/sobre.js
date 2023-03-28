import { Alert, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../content/style';
import aboutStyles from '../content/sobre';
import { deleteTableProduct } from '../services/dbService';

export default function about({ navigation }) {

    function deleteTable() {
        Alert.alert('Atenção', 'Tem certeza que deseja recomeçar?',
            [
                {
                    text: 'Sim',
                    onPress: () => deleteTableProduct(),
                },
                {
                    text: 'Não',
                    style: 'cancel',
                }
            ]);
    };

    return (
        <View style={styles.container}>

            <View style={styles.titulo}>
                <Text style={styles.titulo}>SOBRE</Text>
            </View>

            <Text style={styles.titulo}>Aplicativo desenvolvido para a máteria de Mobile no EC10! Integrantes: Diogo Araújo, Humberto Gonzaga e João Vitor Rocha</Text>
            <Text style={styles.titulo}></Text>

            <TouchableOpacity onPress={() => navigation.navigate('home')} style={styles.bottomButtonLeft} >
                <Ionicons name="arrow-back-circle-outline" size={70} color="white" />
            </TouchableOpacity>
        </View>
    );
}
