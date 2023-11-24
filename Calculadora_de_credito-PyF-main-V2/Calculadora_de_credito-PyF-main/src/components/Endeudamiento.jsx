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
  const [ingresos, setIngresos] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [nivelEndeudamiento, setNivelEndeudamiento] = useState(0);
  const [mostrarNivelEndeudamiento, setMostrarNivelEndeudamiento] =
    useState(false);

  const agregarIngresos = () => {
    setIngresos([...ingresos, ""]);
  };

  const agregarGastos = () => {
    setGastos([...gastos, ""]);
  };

  const handleChangeIngresos = (text, index) => {
    const updatedIngresos = [...ingresos];
    updatedIngresos[index] = text;
    setIngresos(updatedIngresos);
  };

  const handleChangeGastos = (text, index) => {
    const updatedGastos = [...gastos];
    updatedGastos[index] = text;
    setGastos(updatedGastos);
  };

  const clearIngresos = () => {
    setIngresos([]);
  };
  
  const clearGastos = () => {
    setGastos([]);
  };

  const deleteIngreso = (index) => {
    const updatedIngresos = ingresos.filter((_, i) => i !== index);
    setIngresos(updatedIngresos);
  };

  const deleteGasto = (index) => {
    const updatedGastos = gastos.filter((_, i) => i !== index);
    setGastos(updatedGastos);
  };

  const calcularNivelEndeudamiento = () => {
    const totalIngresosUsuario = ingresos.reduce(
      (total, ingreso) =>
        total + (parseFloat(ingreso.replace(/\./g, "").replace(",", ".")) || 0),
      0
    );
    const totalGastosUsuario = gastos.reduce(
      (total, gasto) =>
        total + (parseFloat(gasto.replace(/\./g, "").replace(",", ".")) || 0),
      0
    );

    setNivelEndeudamiento(
      ((totalGastosUsuario / totalIngresosUsuario) * 100).toFixed(2)
    );
    setMostrarNivelEndeudamiento(true);
  };

  const clearAll = () => {
    setIngresos([]);
    setGastos([]);
    setNivelEndeudamiento(0);
    setMostrarNivelEndeudamiento(false);
  };

  const formatInputValue = (text, stateSetter) => {

      let processedText = text;
    
      
        processedText = processedText.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      
      stateSetter(processedText);
    }

      
  

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.viewContainer}
      >
        <Text style={styles.title}>Nivel de Endeudamiento</Text>

        <Text style={styles.subHeader}>Ingresos:</Text>
        {ingresos.map((ingreso, index) => (
          <View key={`ingreso-${index}`}>
            <TextInput
              style={styles.input}
              placeholder="Ingrese sus ingresos"
              onChangeText={(text) => formatInputValue(text, (formattedText) => handleChangeIngresos(formattedText, index))}
              value={ingreso}
              keyboardType="numeric"
              maxLength={21}
            />
            <TouchableOpacity style={styles.button} onPress={() => deleteIngreso(index)}>
              <Text style={styles.buttonText} >Delete</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.viewButtons}>
        <TouchableOpacity style={styles.button} onPress={agregarIngresos}>
          <Text style={styles.buttonText}>Agregar Ingreso</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={clearIngresos}>
          <Text style={styles.buttonText}>Limpiar Ingresos</Text>
        </TouchableOpacity>
        </View>
        <Text style={styles.subHeader}>Gastos Financieros:</Text>
        {gastos.map((gasto, index) => (
          <View key={`gasto-${index}`}>
            <TextInput
              style={styles.input}
              placeholder="Ingrese sus gastos"
              onChangeText={(text) => formatInputValue(text, (formattedText) => handleChangeGastos(formattedText, index))}
              value={gasto}
              keyboardType="numeric"
              maxLength={21}
            />
            <TouchableOpacity style={styles.button} onPress={() => deleteGasto(index)}>
              <Text style={styles.buttonText} >Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.viewButtons}>
        <TouchableOpacity style={styles.button} onPress={agregarGastos}>
          <Text style={styles.buttonText}>Agregar Gasto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={clearGastos}>
          <Text style={styles.buttonText}>Limpiar Gastos</Text>
        </TouchableOpacity>
      </View>
      
        <TouchableOpacity
          style={[styles.button]}
          onPress={calcularNivelEndeudamiento}
        >
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>

        {mostrarNivelEndeudamiento && (
          <View>
            <Text style={styles.textoResults} className={"CuotaMensual"}>
              Nivel de endeudamiento:{" "}
              <Text style={styles.results}>{nivelEndeudamiento}%</Text>
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={clearAll}>
          <Text style={styles.buttonText}>Borrar</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </View>
  );
}