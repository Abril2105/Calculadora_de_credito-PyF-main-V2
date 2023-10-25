import React from "react";
import { View, Text } from "react-native";
import BotonMenu from "./BotonMenu";
import styles from "./Styles";

const Menu = ({ navigation }) => {
  return (
    <View style={styles.menuContainer}>
      <Text style={styles.menuTitleText}>
        Dos herramientas para tomar las mejores decisiones financieras
      </Text>
      <BotonMenu
        imagen={require("..\\images\\calculadora.png")}
        text="Calculadora para tus créditos"
        onPress={() => {
          navigation.navigate("Calculadora");
        }}
      />
      <BotonMenu
        imagen={require("..\\images\\endeudamiento.png")}
        text="Calcula tu nivel de endeudamiento"
        onPress={() => {
          navigation.navigate("Menu");
        }}
      />
    </View>
  );
};

export default Menu;
