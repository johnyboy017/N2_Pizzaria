import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import styles from '../content/style';
import { useState, useEffect } from 'react';
import { editCategory, newCategory } from '../services/dbService';
import { Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function product({ navigation }) {

    let props = navigation.state.params;

    const [id, setId] = useState();
    const [description, setDescription] = useState();

    useEffect(
        () => {
            loadCategory();
        }, []
    );

    async function loadCategory() {
        if (props) {
            setId(props.id);
            setDescription(props.description);
        }
    };

    function save() {

        if (!description) {
            Alert.alert('Coloque uma descrição para o produto!!');
        } else {
            let category = {
                id: id,
                description: description

            };

            let result = false;

            if (category.id) {
                result = editCategory(category);
                Alert.alert('Categoria editada com sucesso!!');
            } else {
                result = newCategory(category);
                Alert.alert('Categoria criada com sucesso!!');
            }

            if (result) {
                navigation.navigate('category');
            } else {
                Alert.alert('Erro', 'Categoria não foi salva!!');
            }
        }
    };

    return (
        <View style={styles.container}>

            <View style={[styles.containerSV, styles.addMarginTop, styles.addMarginBottom]}>

                <Text style={styles.labelInput}>Descrição</Text>
                <TextInput onChangeText={(text) => setDescription(text)} value={description} style={styles.inputText2}></TextInput>

            </View>

            <TouchableOpacity onPress={() => save()} style={styles.botaoMenu} >
                <Text style={styles.labelBotao}>Criar/Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('category')} style={styles.bottomButtonLeft} >
                <Ionicons name="arrow-back-circle-outline" size={70} color="white" />
            </TouchableOpacity>

        </View>
    );
}