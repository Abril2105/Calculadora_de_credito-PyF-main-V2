import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "./Styles";

export default function Endeudamiento() {
  const [ingresos, setIngresos] = useState();
  const [gastos, setGastos] = useState();
  const [nivelEndeudamiento, setNivelEndeudamiento] = useState();
  const [mostrarNivelEndeudamiento, setMostrarNivelEndeudamiento] =
    useState(false);

  const formatInputValue = (text, stateSetter) => {
    if (typeof text !== "undefined") {
      // Eliminar caracteres no numéricos, excepto comas y puntos
      const cleanedText = text.replace(/[^\d.,]/g, "");

      // Reemplazar comas múltiples por una sola coma
      const formattedText = cleanedText.replace(/,+/g, ",");

      // Reemplazar puntos por espacios en blanco y eliminar espacios en blanco
      const normalizedText = formattedText
        .replace(/\./g, "")
        .replace(/\s/g, "");

      // Dividir el número en parte entera y parte decimal
      const [integerPart, decimalPart] = normalizedText.split(",");

      // Formatear la parte entera con puntos para los miles
      const formattedIntegerPart = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        "."
      );

      // Reunir la parte entera y la parte decimal en el resultado final
      const result = decimalPart
        ? formattedIntegerPart + "," + decimalPart
        : formattedIntegerPart;

      stateSetter(result);
    }
  };

  function calcularNivelEndeudamiento() {
    let ingresosUsuario = parseFloat(
      ingresos.replace(/\./g, "").replace(",", ".")
    );
    let gastosUsuario = parseFloat(gastos.replace(/\./g, "").replace(",", "."));

      setNivelEndeudamiento(((gastosUsuario / ingresosUsuario)*100).toFixed(2) + "")

    setMostrarNivelEndeudamiento(true)
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.viewContainer}
      >
        <Text style={styles.title}>Nivel de Endeudamiento</Text>

        <Text style={styles.subHeader}>Ingresos:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese sus ingresos"
          onChangeText={(text) => formatInputValue(text, setIngresos)}
          value={ingresos}
          keyboardType="numeric"
          maxLength={21}
        />

        <Text style={styles.subHeader}>Gastos Financieros:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese sus gastos"
          onChangeText={(text) => formatInputValue(text, setGastos)}
          value={gastos}
          keyboardType="numeric"
          maxLength={21}
        />

        <View style={styles.viewButtons}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={calcularNivelEndeudamiento}
          >
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>
        </View>

        {mostrarNivelEndeudamiento ? (
          <View>
            <Text style={styles.textoResults} className={"CuotaMensual"}>
              Nivel de endeudamiento:{" "}
              <Text style={styles.results}>{nivelEndeudamiento + "%"}</Text>
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}
