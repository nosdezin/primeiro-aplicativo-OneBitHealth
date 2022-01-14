import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Vibration,
  Keyboard,
  Pressable,
  FlatList,
} from "react-native";
import ResultIMC from "./ResultIMC";
import styles from "./style.js";

export default function Form() {
  const [height, setHeight] = useState(null);
  const [Weight, setWeight] = useState(null);
  const [messageIMC, setMessageIMC] = useState("Preencha o peso e altura");
  const [imc, setIMC] = useState(null);
  const [textButton, setTextButton] = useState("Calcular IMC");
  const [errorMessage, seterrorMessage] = useState(null);
  const [imcList, setImcList] = useState([]);

  function imcCalculator() {
    let heightFormat = height.replace(",", ".");
    let totalIMC = (Weight / (heightFormat * heightFormat)).toFixed(2);
    setImcList((arr) => [...arr, { id: new Date().getTime(), imc: totalIMC }]);
    setIMC(totalIMC);
  }

  function verificationIMC() {
    if (imc == null) {
      Vibration.vibrate();
      seterrorMessage("campo obrigatorio*");
    }
  }

  function validation() {
    if (Weight != null && height != null) {
      imcCalculator();
      setHeight(null);
      setWeight(null);
      setMessageIMC("Seu imc é igual:");
      setTextButton("Calcular Novamente");
      seterrorMessage(null);
    } else {
      verificationIMC();
      setIMC(null);
      setTextButton("Calcular");
      setMessageIMC("preencha o peso e altura");
    }
  }

  return (
    <View style={styles.formContext}>
      {imc == null ? (
        <Pressable onPress={Keyboard.dismiss} style={styles.form}>
          <Text style={styles.FormLabel}>Altura</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setHeight}
            value={height}
            placeholder="Ex: 1.75"
            keyboardType="numeric"
          />
          <Text style={styles.FormLabel}>Peso</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setWeight}
            value={Weight}
            placeholder="Ex: 86.300"
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.buttonCalculator}
            onPress={() => {
              validation();
            }}
          >
            <Text style={styles.TextButtonCalculator}>{textButton}</Text>
          </TouchableOpacity>
        </Pressable>
      ) : (
        <View style={styles.exbihitionResultIMC}>
          <ResultIMC msgResult={messageIMC} resultIMC={imc} />
          <TouchableOpacity
            style={styles.buttonCalculator}
            onPress={() => {
              validation();
            }}
          >
            <Text style={styles.TextButtonCalculator}>{textButton}</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        style={styles.listsIMC}
        data={imcList.reverse()}
        renderItem={({ item }) => {
          return (
            <Text style={styles.resultIMCItem}>
              <Text style={styles.textResultItemList}>Resultado IMC = </Text>
              {item.imc}
            </Text>
          );
        }}
        keyExtractor={(item) => {
          item.id;
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
