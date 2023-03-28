import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-navigation';
import styles from '../content/style';
import OrderProduct from '../components/novoproduto';
import { useState, useEffect } from 'react';
import { getAllProducts, getFilteredProducts, getAllCategoryForDropDown } from '../services/dbService';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

export default function product({ navigation }) {

    let props = navigation.state.params;

    const [productList, setProducts] = useState([]);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [productsOnCart, setProductsOnCart] = useState([]);

    // Fields to Drop Down
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [category, setCategory] = useState();
    const [categoryList, setCategoryList] = useState([]);

    useEffect(
        () => {
            processUseEffect();

            if (props) {

                for (i in props) {
                    let product = {
                        id: props[i].id,
                        code: props[i].code,
                        description: props[i].description,
                        unitValue: props[i].unitValue,
                        category: props[i].category,
                        categoryId: props[i].categoryId,
                    };

                    setProductsOnCart(oldList => [...oldList, product]);
                }
            }
        }, []
    );

    useEffect(
        () => {
            setCartQuantity(productsOnCart.length);
        }, [productsOnCart]
    );

    async function processUseEffect() {
        await loadProducts(null);
        await loadCategories();
    };

    async function loadProducts(choosedFilter) {
        try {
            if (choosedFilter) {
                let list = await getFilteredProducts(choosedFilter);
                setProducts(list);
            } else {
                let list = await getAllProducts();
                setProducts(list);
            }
        } catch (e) {
            Alert.alert(e.toString());
        }
    };

    async function loadCategories() {
        try {
            let list = await getAllCategoryForDropDown();
            setCategoryList(list);

            let defaultValueDdp = {
                label: 'TODAS',
                value: 'TODAS'
            };

            setCategoryList(oldList => [...oldList, defaultValueDdp]);
        } catch (e) {
            Alert.alert('Erro', 'Categorias não foram carregadas!! Erro: ' + e.toString());
        }
    }

    function addItemToCart(item) {
        setProductsOnCart(oldList => [...oldList, item]);
    };

    function removeItemFromCart(item) {

        let index = productsOnCart.map(function (x) {
            return x.id;
        }).indexOf(item.id);

        if (index > -1) {
            setProductsOnCart([...productsOnCart.slice(0, index), ...productsOnCart.slice(index + 1)]);
        }
    }

    function filterProducts(choosedFilter) {
        choosedFilter = choosedFilter == 'TODAS' ? null : choosedFilter;
        loadProducts(choosedFilter);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titulo}>
                <Text style={styles.titulo}>NOVO PEDIDO</Text>
            </View>
            <View style={{ zIndex: 99 }}>
                <Text style={[styles.labelInput, styles.addMarginTop]}>Categorias</Text>
                <DropDownPicker
                    style={[styles.dropDownRow, styles.botaoMenu]}
                    open={categoryOpen}
                    value={category}
                    items={categoryList}
                    setOpen={setCategoryOpen}
                    setItems={setCategoryList}
                    setValue={setCategory}
                    onChangeValue={item => filterProducts(item)}
                    zIndex={10}
                    textStyle={[{ fontSize: 20, textAlign: 'center', color: '#fff' }]}
                    dropDownContainerStyle={{ backgroundColor: '#002a5c', width: '55%' }}
                    placeholder='TODAS'
                />
            </View>

            <ScrollView style={styles.containerSV}>
                {
                    productList.map((prod, index) => (
                        <OrderProduct product={prod} key={index.toString()}
                            addToCart={addItemToCart} removeFromCart={removeItemFromCart} />
                    ))
                }
            </ScrollView>

            <TouchableOpacity onPress={() => navigation.navigate('home')} style={styles.bottomButtonLeft} >
                <Ionicons name="arrow-back-circle-outline" size={70} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoMenu} onPress={() => navigation.navigate('cart', productsOnCart)}>
                <Text style={styles.textoBotaoMenu}>CARRINHO ({cartQuantity ? cartQuantity : 0})</Text>
            </TouchableOpacity>

        </View>
    );
}