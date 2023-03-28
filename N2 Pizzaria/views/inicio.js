import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../content/style';
import logo from '../img/pizzaria.png';

export default function home({ navigation }) {
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} ></Image>

            <TouchableOpacity style={styles.botaoMenu} onPress={() => navigation.navigate('order')}>
                <Text style={styles.textoBotaoMenu}>NOVO PEDIDO</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoMenu} onPress={() => navigation.navigate('category')}>
                <Text style={styles.textoBotaoMenu}>CATEGORIAS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoMenu} onPress={() => navigation.navigate('product')}>
                <Text style={styles.textoBotaoMenu}>PRODUTOS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoMenu} onPress={() => navigation.navigate('sale')}>
                <Text style={styles.textoBotaoMenu}>VENDAS</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('about')} style={styles.bottomButtonRight} >
                <Ionicons name="help-circle" size={70} color="#002a5c" />
            </TouchableOpacity>
        </View>
    );
}