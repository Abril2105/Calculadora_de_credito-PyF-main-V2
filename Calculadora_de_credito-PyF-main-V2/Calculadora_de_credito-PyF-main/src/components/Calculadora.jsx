import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as FileSystem from 'expo-file-system';
import styles from "./Styles";

const Calculadora = () => {
  const [monto, setMonto] = useState("");
  const [interes, setInteres] = useState("");
  const [plazo, setPlazo] = useState("");
  const [unidad, setUnidad] = useState("");
  const [abono, setAbono] = useState("");
  const [cuotaMensual, setCuotaMensual] = useState("");
  const [totalPago, setTotalPago] = useState("");
  const [totalInteres, setTotalInteres] = useState("");
  const [interesSalvado, setInteresSalvado] = useState("");
  const [tiempoSalvado, setTiempoSalvado] = useState("");
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [mostrarAbono, setMostrarAbono] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

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

  const formatInteresValue = (inputValue) => {
    // Eliminar caracteres no numéricos y comas duplicadas
    let formattedText = inputValue.replace(/[^0-9,]/g, '').replace(/,+/g, ',');

    const comaCount = formattedText.split(',').length - 1;
    if (comaCount > 1) {
      formattedText = formattedText.substring(0, formattedText.lastIndexOf(','));
    }
    // Actualizar el estado con el nuevo valor formateado
    setInteres(formattedText);
  };

  const formatPlazoValue = (text, stateSetter) => {
    if (typeof text !== "undefined") {
      // Eliminar caracteres no numéricos
      const cleanedText = text.replace(/[^0-9]/g, "");
      stateSetter(cleanedText);
    }
  };

  const Calculo = async () => {
    let plazoMeses;

    setShowPopup(true);

    if (unidad === "Años") {
      plazoMeses = plazo * 12;
    } else {
      plazoMeses = plazo;
    }
    let montoUsuario = parseFloat(monto.replace(/\./g, "").replace(",", "."));
    const intrestest = parseFloat(interes.replace(/\./g, '').replace(',', '.')) / 12;
    const interesMensual = intrestest / 100;
    const calcmontointres = montoUsuario * interesMensual;
    const calcintersplazo = (1 - Math.pow(1 + interesMensual, -plazoMeses));
    const calculoCuotaMensual =
      parseFloat(calcmontointres) / parseFloat(calcintersplazo);
    const calculoTotalPago = calculoCuotaMensual * parseFloat(plazoMeses);
    const calculoTotalInteres = calculoTotalPago - montoUsuario;
    let temp1 = parseFloat(abono.replace(/\./g, ""));
    let temp2 = parseFloat(calculoCuotaMensual);
    const nuevoCoutaMensual = temp1 + temp2;

    const top =
      Math.log(nuevoCoutaMensual) -
      Math.log(nuevoCoutaMensual - calcmontointres);

    const bottom = Math.log(1 + interesMensual);
    const nuevoPagos = top / bottom;

    let nuevoTotalPagos;

    nuevoTotalPagos = nuevoPagos * nuevoCoutaMensual;

    const nuevoTotalInteres = nuevoTotalPagos - montoUsuario;
    const interesSalvado = calculoTotalInteres - nuevoTotalInteres;

    // calcular tiempo salvado

    const P0 = parseFloat(monto.replace(/\./g, '').replace(',', '.'));
    const r = parseFloat(interes) / 12 / 100;
    const n = parseFloat(plazo) * (unidad === 'Años' ? 12 : 1);
    const extra = parseFloat(abono.replace(/\./g, '').replace(',', '.'));

    const P = (P0 * r) / (1 - Math.pow(1 + r, -n));


    let remainingBalance = P0;
    let months = 0;

    while (remainingBalance > 0) {
      remainingBalance -= P;
      remainingBalance *= 1 + r;
      remainingBalance -= extra;
      months += 1;
    }

    const mesesSalvado = n - months;

    if (parseFloat(abono) > 0 && parseFloat(monto) > 0) {
      setCuotaMensual(
        nuevoCoutaMensual.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      );
      setTotalPago(
        nuevoTotalPagos.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      );
      setTotalInteres(
        nuevoTotalInteres.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      );
      setInteresSalvado(
        interesSalvado.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      );
      setTiempoSalvado(mesesSalvado.toFixed(0));
      setMostrarResultados(true);
      setMostrarAbono(true);
    } else {
      setCuotaMensual(
        calculoCuotaMensual.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      );
      setTotalPago(
        calculoTotalPago.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      );
      setTotalInteres(
        calculoTotalInteres.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      );
      setMostrarResultados(true);
      setMostrarAbono(false);
    }
    if (
      parseFloat(monto) > 0 &&
      parseFloat(interes) > 0 &&
      parseFloat(plazo) > 0
    ) {
      setMostrarResultados(true);
    } else {
      setMostrarResultados(false);
    }

    await calcularTiempoPago(); // Espera a que calcularTiempoPago termine

    setShowPopup(true); // Ahora muestra el popup después de calcularTiempoPago
  };

  //Lógica de la tabla de amortizaciones

  const [tiempoPago, setTiempoPago] = useState([]);

  const calcularTiempoPago = () => {
    const tablaPagos = [];
    const tablaMontoTotal = parseFloat(
      monto.replace(/\./g, "").replace(",", ".")
    );
    const tablaInteres = parseFloat(interes.replace(/\./g, "").replace(",", "."));
    const tablaTiempo = unidad === "Años" ? ((plazo * 12) - tiempoSalvado) : (plazo - tiempoSalvado);

    let tablaAbonoExtra = 0;

    if (abono !== "") {
      tablaAbonoExtra = parseFloat(abono.replace(/\./g, "").replace(",", "."));
    } else {
      tablaAbonoExtra = 0;
    }

    let pagoRestante = tablaMontoTotal;

    for (let i = 1; i <= tablaTiempo; i++) {
      const pagoIntereses = pagoRestante * ((tablaInteres/12) / 100);
      let pagoTotal;
      let pagoPrincipal;

      if (i !== tablaTiempo) {
        pagoTotal = parseFloat(cuotaMensual.replace(/\./g, "").replace(",", "."))/100;
        
        pagoPrincipal =  pagoTotal-pagoIntereses;

        pagoRestante -= pagoPrincipal;
      } else {
        pagoPrincipal =  pagoRestante;

        pagoTotal = pagoPrincipal+pagoIntereses;
        pagoRestante = 0;
      }
      

      const pago = {
        mes: i,
        principal: pagoPrincipal
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, "."),
        interes: pagoIntereses.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, "."),
        total: pagoTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, "."),
        saldo: pagoRestante.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, "."),
      };
      
      

      tablaPagos.push(pago);
      
      
    }

    setTiempoPago(tablaPagos);
  };

  <FlatList
    data={tiempoPago}
    keyExtractor={(item) => item.mes.toString()}
    renderItem={({ item }) => (
      <View>
        <Text>Mes: {item.mes} </Text>
        <Text>Principal: {item.principal} </Text>
        <Text>Interes: {item.interes} </Text>
        <Text>Pago Total: {item.total} </Text>
        <Text>Saldo: {item.saldo} </Text>
      </View>
    )}
  />;
  const handleClick = () => {
    setShowPopup(true);
  };

  <Button onPress={handleClick} title="Tabla de Pagos" />;


  // Función para descargar la tabla en formato CSV
  const descargarCSV = async () => {
    const path = `${FileSystem.documentDirectory}tabla_amortizacion.csv`;
    let csvData = 'Mes,Principal,Interes,Total,Saldo\n';

    tiempoPago.forEach((pago) => {
      csvData += `${pago.mes},${pago.principal.replace(',', '')},${pago.interes.replace(',', '')},${pago.total.replace(',', '')},${pago.saldo.replace(',', '')}\n`;
    });

    try {
      await FileSystem.writeAsStringAsync(path, csvData, { encoding: FileSystem.EncodingType.UTF8 });
      alert('Tabla de amortización descargada correctamente.');
    } catch (error) {
      console.error('Error al escribir el archivo:', error.message || error);
    }
  };

  //Fin de lógica de tabla de amortizaciones

  const borrar = () => {
    setMonto("");
    setInteres("");
    setPlazo("");
    setUnidad("");
    setAbono("");
    setCuotaMensual("");
    setTotalPago("");
    setTotalInteres("");
    setInteresSalvado("");
    setTiempoSalvado("");
    setMostrarResultados(false);
    setMostrarAbono(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.viewContainer}
      >
        <Text style={styles.title}>Calculadora de Crédito</Text>
        <Text style={styles.subHeader}>Monto:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el monto"
          onChangeText={(text) => formatInputValue(text, setMonto)}
          value={monto}
          keyboardType="numeric"
          maxLength={21}
        />
        <Text style={styles.subHeader}>Interés anual E.A. (%):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el Interés Anual"
          onChangeText={(text) => formatInteresValue(text, setInteres)}
          value={interes}
          keyboardType="numeric"
          maxLength={5}
        />
        <Text style={styles.subHeader}>Plazo:</Text>
        <View style={styles.rowContainer}>
          <TextInput
            style={styles.inputTime}
            placeholder=""
            onChangeText={(text) => formatPlazoValue(text, setPlazo)}
            value={plazo}
            keyboardType="numeric"
            maxLength={3}
          />
          <View style={styles.picker}>
            <Picker
              selectedValue={unidad}
              onValueChange={(val) => setUnidad(val)}
            >
              <Picker.Item
                label="Meses"
                value="Meses"
                style={styles.pickerText}
              />
              <Picker.Item
                label="Años"
                value="Años"
                style={styles.pickerText}
              />
            </Picker>
          </View>
        </View>

        <Text style={styles.subHeader}>
          Abono a capital mensual (opcional):
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese pago extra "
          onChangeText={(text) => formatInputValue(text, setAbono)}
          value={abono}
          keyboardType="numeric"
          maxLength={21}
        />

        <View style={styles.viewButtons}>
          <TouchableOpacity
            style={[styles.button, styles.buttonLimpiar]}
            onPress={borrar}
          >
            <Text style={styles.buttonText}>Borrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button]} onPress={Calculo}>
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>
        </View>

        {mostrarResultados && (
          <View>
            <Text style={styles.textoResults} className={"CuotaMensual"}>
              Cuota mensual:{" "}
              <Text style={styles.results}>{"$" + cuotaMensual}</Text>
            </Text>

            <Text style={styles.textoResults}>
              Total del crédito:{" "}
              <Text style={styles.results}>{"$" + totalPago}</Text>
            </Text>

            <Text style={styles.textoResults}>
              Total del interés pagado:{" "}
              <Text style={styles.results}>{"$" + totalInteres}</Text>
            </Text>
          </View>
        )}
        {mostrarAbono && (
          <View>
            <Text style={styles.subHeader}>Con abono Capital:</Text>
            <Text style={styles.textoResults}>
              Te ahorras en interés:{" "}
              <Text style={styles.results}>{"$" + interesSalvado}</Text>
            </Text>
            <Text style={styles.textoResults}>
              Te ahorra en tiempo:{" "}
              <Text style={styles.results}>{tiempoSalvado} meses</Text>
            </Text>
          </View>
        )}

        <View>
          {showPopup && (
            <View style={styles.popup}>
              <View style={styles.tablaContainer}>
                <View style={styles.tablaHeader}>
                  <Text style={styles.headerText}>Mes</Text>
                  <Text style={styles.headerText}>Principal</Text>
                  <Text style={styles.headerText}>Interes</Text>
                  <Text style={styles.headerText}>Total</Text>
                  <Text style={styles.headerText}>Saldo</Text>
                </View>
                {tiempoPago.map((pago) => (
                  <View key={pago.mes} style={styles.filaTabla}>
                    <Text>{pago.mes}</Text>
                    <Text>{pago.principal}</Text>
                    <Text>{pago.interes}</Text>
                    <Text>{pago.total}</Text>
                    <Text>{pago.saldo}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.closeContainer}> 
                <TouchableOpacity
                  onPress={() => setShowPopup(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Cerrar tabla</Text>
                </TouchableOpacity>

                {/* Botón para descargar la tabla en formato CSV */}
                <TouchableOpacity
                  onPress={descargarCSV}
                  style={styles.downloadButton}
                >
                  <Text style={styles.downloadButtonText}>Descargar tabla</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Calculadora;

