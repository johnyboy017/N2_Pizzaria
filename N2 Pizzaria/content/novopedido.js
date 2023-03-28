import { StyleSheet } from "react-native";

const orderStyles = StyleSheet.create({
    listItem: {
        backgroundColor: '#002a5c',
        height: 'auto',
        alignItems: 'flex-start',
        margin: 10,
        padding: 5,
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
    roundButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "white",
        alignItems: 'center'
    },
    listIcon: {
        alignContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    },
    listItemRow: {
        alignContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    },
});

export default orderStyles;