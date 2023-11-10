import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { Picker } from '@react-native-picker/picker';
import styles from "./Styles";
import { Button } from "react-native-web";

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
  

  const formatInputValue = (text, stateSetter) => {
    if (typeof text !== "undefined") {
      // Eliminar caracteres no numéricos, excepto comas y puntos
      const cleanedText = text.replace(/[^\d.,]/g, '');

      // Reemplazar comas múltiples por una sola coma
      const formattedText = cleanedText.replace(/,+/g, ',');

      // Reemplazar puntos por espacios en blanco y eliminar espacios en blanco
      const normalizedText = formattedText.replace(/\./g, '').replace(/\s/g, '');

      // Dividir el número en parte entera y parte decimal
      const [integerPart, decimalPart] = normalizedText.split(',');

      // Formatear la parte entera con puntos para los miles
      const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

      // Reunir la parte entera y la parte decimal en el resultado final
      const result = decimalPart ? formattedIntegerPart + ',' + decimalPart : formattedIntegerPart;

      stateSetter(text);
    }
  };

  const formatPlazoValue = (text, stateSetter) => {
    if (typeof text !== "undefined") {
      // Eliminar caracteres no numéricos
      const cleanedText = text.replace(/[^0-9]/g, '');
      stateSetter(cleanedText);
    }
  };

  const Calculo = () => {
    let plazoMeses;

    if (unidad === 'Años') {
      plazoMeses = plazo * 12;
    } else {
      plazoMeses = plazo;
    }
    let montoUsuario = parseFloat(monto.replace(/\./g, '').replace(',', '.'))
    const intrestest = parseFloat(interes) / 12;
    const interesMensual = intrestest / 100;
    const calcmontointres = montoUsuario * interesMensual;
    const calcintersplazo = (1 - Math.pow(1 + interesMensual, -plazoMeses));
    const calculoCuotaMensual = parseFloat(calcmontointres) / parseFloat(calcintersplazo);
    const calculoTotalPago = calculoCuotaMensual * parseFloat(plazoMeses);
    const calculoTotalInteres = calculoTotalPago - montoUsuario;
    let temp1 = parseFloat(abono.replace(/\./g, ''));
    let temp2 = parseFloat(calculoCuotaMensual);
    const nuevoCoutaMensual = temp1 + temp2;

    const top = (Math.log(nuevoCoutaMensual) - Math.log(nuevoCoutaMensual - calcmontointres));

    const bottom = (Math.log(1 + interesMensual));
    const nuevoPagos = top / bottom;

    let nuevoTotalPagos;

    nuevoTotalPagos = nuevoPagos * nuevoCoutaMensual;

    const nuevoTotalInteres = nuevoTotalPagos - montoUsuario;
    const interesSalvado = calculoTotalInteres - nuevoTotalInteres;

    const plazoSinAbono = montoUsuario / parseInt(calculoCuotaMensual);
    const plazoConAbono = montoUsuario / parseInt(nuevoCoutaMensual);

    const mesesSalvado = plazoSinAbono - plazoConAbono;

    if (parseFloat(abono) > 0 && parseFloat(monto) > 0) {
      setCuotaMensual(nuevoCoutaMensual.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
      setTotalPago(nuevoTotalPagos.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
      setTotalInteres(nuevoTotalInteres.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
      setInteresSalvado(interesSalvado.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
      setTiempoSalvado(mesesSalvado.toFixed(0));
      setMostrarResultados(true);
      setMostrarAbono(true);
    } else {
      setCuotaMensual(calculoCuotaMensual.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
      setTotalPago(calculoTotalPago.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
      setTotalInteres(calculoTotalInteres.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
      setMostrarResultados(true);
      setMostrarAbono(false);
    }
    if (parseFloat(monto) > 0 && parseFloat(interes) > 0 && parseFloat(plazo) > 0) {
      setMostrarResultados(true);
    } else {
      setMostrarResultados(false)
    }
  }

  //Lógica de la tabla de amortizaciones

  const[tiempoPago, setTiempoPago] = useState([]);

  const calcularTiempoPago = () => {
      const tablaPagos = [];
      const tablaMontoTotal = montoUsuario;
      const tablaInteres = interes;
      const tablaTiempo = unidad;
      const tablaAbonoExtra =  abono;

      let pagoRestante = tablaMontoTotal;
      for (let i=1; i <= tablaTiempo; i++){
        const pagoIntereses = pagoRestante * (tablaInteres/100);
        const pagoTotal = (tablaMontoTotal / tablaTiempo) + pagoIntereses + tablaAbonoExtra;
        const pagoPrincipal = pagoTotal - pagoIntereses;

        pagoRestante -= pagoPrincipal;

        const pago = {
          mes: i,
          principal: pagoPrincipal,
          interes: pagoIntereses,
          total: pagoTotal,
          saldo: pagoRestante 
        };

        pagos.push(pago);
      }

      setTiempoPago(pagos);
  };

  <FlatList
    data = {tiempoPago}
    keyExtractor={(item) => item.mes.toString()}
    renderItem={({item}) => (
      <View>
        <Text>Mes: {item.mes} </Text>
        <Text>Principal: {item.principal} </Text>
        <Text>Interes: {item.interes} </Text>
        <Text>Pago Total: {item.total} </Text>
        <Text>Saldo: {item.saldo} </Text>
      </View>

    )}
  />

      const [showPopup, setShowPopup] = useState(false);
      const handleClick = () => {
        setShowPopup(true);
      }

      <Button onPress={handleClick} title="Tabla de Pagos"/>

      return(
        <View>
          {showPopup && (
            <View style={styles.popup}>
              <Text style={styles.popupText}>Orden de Pagos: </Text>
              {tiempoPago.map((pago) => (
                <View key={pago.mes}>
                  <Text>Mes: {pago.mes} </Text>
                  <Text>Principal: {pago.principal} </Text>
                  <Text>Interes: {pago.interes} </Text>
                  <Text>Pago Total:{pago.total} </Text>
                  <Text>Saldo: {pago.saldo}</Text> 
                </View>

              ))}

              <TouchableOpacity onPress={() => setShowPopup(false)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
        )}

        </View>
      );

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
    setMostrarAbono(false)
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
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
        <Text style={styles.subHeader}>Interés anual (%):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el Interés Anual"
          onChangeText={(text) => formatInputValue(text, setInteres)}
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
          <View
            style={styles.picker}>
            <Picker
              selectedValue={unidad}
              onValueChange={(val) => setUnidad(val)}>
              <Picker.Item label='Meses' value='Meses' style={styles.pickerText} />
              <Picker.Item label='Años' value='Años' style={styles.pickerText} />
            </Picker>
          </View>
        </View>

        <Text style={styles.subHeader}>Abono a |apital mensual (opcional):</Text>
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
          <TouchableOpacity
            style={[styles.button]}
            onPress={Calculo}>
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>
        </View>

        {
          mostrarResultados && (
            <View >
              <Text style={styles.textoResults} className={'CuotaMensual'}>
                Cuota mensual: <Text style={styles.results}>{'$' + cuotaMensual}</Text>
              </Text>

              <Text style={styles.textoResults}>
                Total del crédito: <Text style={styles.results}>{'$' + totalPago}</Text>
              </Text>

              <Text style={styles.textoResults}>
                Total del interés pagado: <Text style={styles.results}>{'$' + totalInteres}</Text>
              </Text>
            </View>
          )
        }
        {
          mostrarAbono && (
            <View>
              <Text style={styles.subHeader}>Con abono Capital:</Text>
              <Text style={styles.textoResults}>
                Te ahorras en interés: <Text style={styles.results}>{'$' + interesSalvado}</Text>
              </Text>
              <Text style={styles.textoResults}>
                Te ahorra en tiempo: <Text style={styles.results}>{tiempoSalvado}</Text>
              </Text>
            </View>
          )
        }
      </View>
    </ScrollView>
  )
}

export default Calculadora;