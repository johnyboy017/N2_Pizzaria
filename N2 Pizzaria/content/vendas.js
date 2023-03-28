import { StyleSheet } from "react-native";

const saleStyles = StyleSheet.create({
    listItem: {
        backgroundColor: '#002a5c',
        height: 'auto',
        alignItems: 'flex-start',
        margin: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    listItemText: {
        fontSize: 18,
        color: 'white'
    },
    listItemRow: {
        alignContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    },
    listItemIcon: {
        width: '40%',
        alignContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    }
});

export default saleStyles;