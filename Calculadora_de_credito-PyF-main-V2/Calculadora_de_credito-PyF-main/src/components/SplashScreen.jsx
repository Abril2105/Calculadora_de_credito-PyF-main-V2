import React, { useEffect } from "react";
import { View, Image } from "react-native";
import styles from "./Styles";

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace("Menu"); //Cambia la pantalla al Menu
        }, 4000); // 4000 ms (4 segundos) de visualización de la pantalla de carga
    }, []);

    return (
        <View style={styles.containerLogo}>
            <Image
                source={require("..\\images\\logoInicio.png")}
                style={styles.logo}
            />
        </View>
    );
};

export default SplashScreen;
