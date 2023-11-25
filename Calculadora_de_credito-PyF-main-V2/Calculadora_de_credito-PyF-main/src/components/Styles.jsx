import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1c1c1c",
        flexGrow: 1,
        minHeight: "100%"
    },
    viewContainer: {
        minHeight: "100%",
        flex: 1,
    },
    title: {
        color: "#4C97C7",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 30,
        marginTop: Constants.statusBarHeight,
    },
    subHeader: {
        color: "white",
        fontSize: 20,
        marginLeft: 5,
        marginTop: 20,
    },
    input: {
        height: 40,
        margin: 5,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 10,
    },
    inputTime: {
        height: 40,
        width: 60,
        margin: 5,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 10,
    },
    rowContainer: {
        flexDirection: 'row'
    },
    picker: {
        backgroundColor: "white",
        height: 40,
        width: 140,
        margin: 5,
        borderRadius: 10,
        overflow: "hidden",
    },
    viewButtons: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    button: {
        backgroundColor: "#4C97C7",
        borderRadius: 5,
        alignItems: "center",
        width: 90,
        height: 50,
        marginTop: 30,
        minWidth: "45%"
    },
    buttonLimpiar: {
        backgroundColor: "#BD75C2",
        minWidth: "45%"
    },
    buttonText: {
        textAlign: "center",
        lineHeight: 50,
        fontSize: 18,
        color: "white",
        fontWeight: "900"
    },
    results: {
        color: "#BD75C2",
        fontSize: 20,
        marginLeft: 5,
        marginTop: 25,
    },
    textoResults: {
        color: "white",
        fontSize: 20,
        marginLeft: 5,
        marginTop: 12,
        alignSelf: "flex-start",
    },

    menuTitleText: {
        fontSize: 34,
        width: "78%",
        fontWeight: "800",
        color: "white",
    },

    menuContainer: {
        backgroundColor: "#BD75C2",
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start", 
        paddingTop: 100, 
    },

    buttonMenu: {
        borderRadius: 40,
        overflow: "hidden",
        marginBottom: -50, 
        marginTop: 90, 
    },
    buttonMenuView: {
        backgroundColor: "#040404",
        width: "78%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 25,

    },
    buttonMenuText: {
        color: "white",
        fontSize: 25,
        flex: 1,
        fontWeight: "bold",
        textAlign: "center",
    },
    imgButtonMenu: {
        height: 54,
        width: 54,
    },

    textTable: {
        color: "black",
        fontSize:16,
    },

    /* Referentes a la pantalla de carga */
    logo: {
        margin: "auto",
        maxHeight: "50vh",
        maxWidth: "50vw",
    },
    containerLogo: {
        backgroundColor: "#BD75C2",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    /* Tabla amortización */
    tablaContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 2, // Para sombra en Android
        shadowColor: '#000', // Para sombra en iOS
        shadowOffset: { width: 0, height: 2 }, // Para sombra en iOS
        shadowOpacity: 0.3, // Para sombra en iOS
    },

    tablaHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },

    headerText: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    filaTabla: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },

    closeButton: {
        backgroundColor: "#aa5050",
        borderRadius: 5,
        alignContent: "center",
        alignItems: "center",
        width: "45%",
        height: 50,
        marginVertical: 20,
        marginHorizontal: "auto",
    },

    closeButtonText: {
        textAlign: "center",
        lineHeight: 50,
        fontSize: 18,
        color: "white",
        fontWeight: "900"
    },

    closeContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },

    downloadButton: {
        backgroundColor: "darkgreen",
        borderRadius: 5,
        alignContent: "center",
        alignItems: "center",
        width: "45%",
        height: 50,
        marginVertical: 20,
        marginHorizontal: "auto",
    },

    downloadButtonText: {
        textAlign: "center",
        lineHeight: 50,
        fontSize: 18,
        color: "white",
        fontWeight: "900",
        
    },
});

export default styles;


