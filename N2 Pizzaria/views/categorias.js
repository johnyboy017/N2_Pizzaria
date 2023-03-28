import { Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../content/style';
import Category from '../components/categorias';
import { Ionicons } from '@expo/vector-icons';
import { createTableCategory, deleteCategory, getAllCategory } from '../services/dbService';

export default function category({ navigation }) {

    const [categoryList, setCategory] = useState([]);
    let isTableCreated = false;

    useEffect(
        () => {
            processUseEffect();
        }, []
    );

    async function processUseEffect() {
        if (!isTableCreated) {
            isTableCreated = true;
            await createTableCategory();
        }

        await loadCategory();
    }

    async function loadCategory() {
        try {
            let list = await getAllCategory()
            setCategory(list);
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    function edit(category) {
        navigation.navigate('categoryEdit', category);
    };

    function exclude(id) {
        Alert.alert('Atenção', 'Tem certeza que deseja excluir essa categoria? Os produtos vinculados a essa categoria serão excluídos juntos!!',
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
            await deleteCategory(id);

            Alert.alert('Categoria apagada!!');

            await loadCategory();

        } catch (e) {
            Alert.alert(e);
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.titulo}>
                <Text style={styles.titulo}>CATEGORIAS</Text>
            </View>

            <ScrollView style={styles.containerSV}>
                {
                    categoryList.map((prod, index) => (
                        <Category category={prod} key={index.toString()}
                            exclude={exclude} edit={edit} />
                    ))
                }
            </ScrollView>

            <TouchableOpacity onPress={() => navigation.navigate('home')} style={styles.bottomButtonLeft} >
                <Ionicons name="arrow-back-circle-outline" size={70} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoMenu} onPress={() => navigation.navigate('categoryEdit')}>
                <Text style={styles.textoBotaoMenu}>Adicionar categoria</Text>
            </TouchableOpacity>

        </View>
    );
}