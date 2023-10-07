import React from 'react';
import Main from "./src/components/Main.jsx";
import { View } from "react-native";
import  styles  from "./src/components/Styles.jsx";

export default function App() {
  return (
    <View style={styles.container}>
      <Main/>
    </View>
  )
  
}

