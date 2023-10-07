import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import styles from "./Styles";

const Calculadora = () => {
  const [monto, setMonto] = useState("");
  const [interes, setInteres] = useState("");
  const [plazo, setPlazo] = useState("");
  const [unidad, setUnidad] = useState("");
  const [seguro, setSeguro] = useState("");
  const [abono, setAbono] = useState("");
  const [cuotaMensual, setCuotaMensual] = useState("");
  const [totalPago, setTotalPago] = useState("");
  const [totalInteres, setTotalInteres] = useState("");
  const [interesSalvado, setInteresSalvado] = useState("");
  const [tiempoSalvado, setTiempoSalvado] = useState("");
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const formatInputValue = (text, stateSetter) => {
    
    if (typeof text !== "undefined") {
        
        const cleanedText = text.replace(/[^0-9]/g, '');
      
        const formattedText = cleanedText.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        stateSetter(formattedText);
    }
};

  const Calculo = () => {
    let plazoMeses;

    if (unidad === 'Años') {
      plazoMeses = plazo * 12;
    } else {
      plazoMeses = plazo;
    }

    const intrestest = interes / 12;
    const interesMensual = intrestest / 100;
    const calcmontointres = monto.replace(/./g, '') * interesMensual;  
    const calcintersplazo = (1 - Math.pow(1 + interesMensual, -plazoMeses));
    const calculoCuotaMensual = calcmontointres / calcintersplazo;
    const calculoTotalPago = calculoCuotaMensual * plazoMeses;
    const calculoTotalInteres = calculoTotalPago - monto.replace(/./g, ''); 

    ////calcular nuevo total con aponio

    let temp1 = parseInt(abono.replace(/./g, '')); 
    let temp2 = parseInt(calculoCuotaMensual);
    const nuevoCoutaMensual = temp1 + temp2;

    const test6 = monto.replace(/./g, '') * interesMensual;
    const top = (Math.log(nuevoCoutaMensual) - Math.log(nuevoCoutaMensual - (test6)));
    const bottom = (Math.log(1 + interesMensual));
    const nuevoPagos = top / bottom;

    let nuevoTotalPagos;
    if (unidad === 'Años') {
      const temp = plazo * seguro;
      nuevoTotalPagos = nuevoPagos * nuevoCoutaMensual + temp;
    } else {
      nuevoTotalPagos = nuevoPagos * nuevoCoutaMensual;
    }

    const nuevoTotalInteres = nuevoTotalPagos - monto.replace(/./g, ''); 
    const interesSalvado = calculoTotalInteres - nuevoTotalInteres;

    //// calcular meses salvados

    const montdiv = monto.replace(/./g, '')/nuevoCoutaMensual;
    const mesesSalvado = montdiv -plazoMeses;

    if (seguro === '' && abono === '') {
      setCuotaMensual(nuevoCoutaMensual.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
      setTotalPago(nuevoTotalPagos.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
      setTotalInteres(nuevoTotalInteres.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
      setInteresSalvado(interesSalvado.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
      setTiempoSalvado(mesesSalvado.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
      setMostrarResultados(true);
    }

    if (seguro !== '' || abono !== '') {
      setCuotaMensual(nuevoCoutaMensual.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
      setTotalPago(nuevoTotalPagos.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
      setTotalInteres(nuevoTotalInteres.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
      setInteresSalvado(interesSalvado.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
      setTiempoSalvado(mesesSalvado.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
      setMostrarResultados(true);
    } else {1
      setCuotaMensual(calculoCuotaMensual.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
      setTotalPago(calculoTotalPago.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
      setTotalInteres(calculoTotalInteres.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
      setMostrarResultados(true);
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
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
          keyboardType="numeric"
          maxLength={5}
        />

        <Text style={styles.subHeader}>Plazo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el plazo"
          onChangeText={(text) => formatInputValue(text, setPlazo)}
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

        <Text style={styles.subHeader}>Seguros (opcional):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese Seguro "
          onChangeText={(text) => formatInputValue(text, setSeguro)}
          keyboardType="numeric"
        />

        <Text style={styles.subHeader}>Abono a capital mensual(opcional):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese pago extra "
          onChangeText={(text) => formatInputValue(text, setAbono)}
          keyboardType="numeric"
          maxLength={21}
        />


        <TouchableOpacity
          style={[styles.button]}
          onPress={Calculo}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>

        {
          mostrarResultados && (
            <View>
              <Text style={styles.textoResults} className={'CuotaMensual'}>
                Cuota mensual: <Text style={styles.results}>{'$' + cuotaMensual}</Text>
              </Text>

              <Text style={styles.textoResults}>
                Total del crédito: <Text style={styles.results}>{'$' + totalPago}</Text>
              </Text>

              <Text style={styles.textoResults}>
                Total del interés pagado: <Text style={styles.results}>{'$' + totalInteres}</Text>
              </Text>

              <Text style={styles.subHeader}>Con abono Capital:</Text>
              <Text style={styles.textoResults}>
                Te Ahoras en Interes: <Text style={styles.results}>{'$' + interesSalvado}</Text>
              </Text>
              <Text style={styles.textoResults}>
                Te ahora en tiempo: <Text style={styles.results}>{tiempoSalvado}</Text>
              </Text>
            </View>
          )
        }
      </View>
    </ScrollView>
  )
}

export default Calculadora;