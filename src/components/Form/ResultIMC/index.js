import React from "react";
import { View, Text, Share, TouchableOpacity } from "react-native";
import styles from "./style.js";

export default function ResultIMC(props) {
  const onShare = async () => {
    const result = await Share.share({
      message: "Meu imc hoje é: " + props.resultIMC,
    });
  };

  return (
    <View style={styles.ResultIMC}>
      <View style={styles.boxShareButton}>
      <Text style={styles.information}>{props.msgResult}</Text>
      <Text style={styles.numberIMC}>{props.resultIMC}</Text>
        <TouchableOpacity style={styles.shared} onPress={onShare}>
          <Text style={styles.sharedText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
