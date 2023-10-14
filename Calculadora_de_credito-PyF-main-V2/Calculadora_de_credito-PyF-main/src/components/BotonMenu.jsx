import React from "react";
import { TouchableOpacity, Text, Image, View } from "react-native";
import styles from "./Styles";

const BotonMenu = (props) => {
  const { text, onPress, imagen } = props;

  return (
    <TouchableOpacity style={styles.buttonMenu} onPress={onPress}>
      <View style={styles.buttonMenuView}>
        <View>
          <Image source={imagen} style={styles.imgButtonMenu} />
        </View>

        <Text style={styles.buttonMenuText}> {text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BotonMenu;
