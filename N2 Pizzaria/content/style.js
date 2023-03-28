import { StyleSheet } from "react-native";

// Default style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3BB146',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerWithButton: {
        flex: 0.8,
        backgroundColor: '#3BB146',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    containerSV: {
        color: '#002a5c',
        width: '63%'
    },
    titulo: {
        position: "relative",
        top: 0,
        fontSize: 40,
        marginTop: 40,
        marginBottom: 15,
        color: "#002a5c",
        fontWeight: "900"
    },
    botaoTela1: {
        width: '50%',
        height: 50,
        bordercolor: '#fff',
        backgroundColor: '#002a5c',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelBotao: {
        fontSize: 30,
        backgroundColor: '#002a5c',
        color: "#fff"
    },
    labelPlusminus: {
        fontSize: 20,
        color: "#fff",
        margin: 5
    },
    botaoMenu: {
        width: '50%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#002a5c',
        alignItems: 'center',
        borderColor: "#fff",
        borderWidth: 2,
        margin: 10,
    },
    botaoMenuEsquerda: {
        width: '50%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#002a5c',
        alignItems: 'center',
        borderColor: "#fff",
        borderWidth: 2,
        margin: 10,
        flexDirection: "row"
    },
    botaoMenuDireita: {
        width: '50%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#002a5c',
        alignItems: 'center',
        borderColor: "#fff",
        borderWidth: 2,
        margin: 10,
        flexDirection: "row"
    },
    textoBotaoMenu: {
        fontSize: 20,
        color: "#fff"
    },
    logo: {
        margin: 10,
        resizeMode: 'contain'
    },
    inputText: {
        borderColor: "#000",
        backgroundColor: "#fff",
        borderWidth: 2,
        height: 50,
        width: '70%',
        paddingHorizontal: 10,
        borderRadius: 10,
        marginBottom: 20,
        fontSize: 20,
        textAlign: 'center'
    },
    inputText2: {
        borderColor: "#000",
        backgroundColor: "#fff",
        borderWidth: 2,
        height: 50,
        width: '100%',
        paddingHorizontal: 10,
        borderRadius: 10,
        marginBottom: 20,
        fontSize: 20,
        textAlign: 'center'
    },
    labelInput: {
        fontSize: 30,
        textAlign: 'center'
    },
    row: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    componentRow: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottomButtonLeft: {
        alignSelf: 'flex-start',
        position: 'absolute',
        top: 30,
        marginLeft: 10
    },
    bottomButtonRight: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 5,
        marginRight: 10
    },
    twoButtonRow: {
        width: '40%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#002a5c',
        alignItems: 'center',
        borderColor: "#000000",
        borderWidth: 2,
        margin: 10
    },
    rowButtonBottom: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#002a5c',
        width: '100%'
    },
    dropDown: {
        width: '100%',
        height: 50,
        fontSize: 30,
        textAlign: 'center',
        borderWidth: 2,
    },
    dropDownRow: {
        width: '60%',
        height: 50,
        fontSize: 30,
        textAlign: 'center',
        borderWidth: 2,
    },
    addMarginTop: {
        marginTop: 20
    },
    addMarginBottom: {
        marginBottom: 10
    }
});

export default styles;