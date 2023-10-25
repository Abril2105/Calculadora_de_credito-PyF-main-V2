import React from 'react';
import  styles  from "./src/components/Styles.jsx";
import { SafeAreaView } from 'react-native-safe-area-context';
import MainStack from './src/navigation/MainStack.jsx';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <MainStack/>
    </SafeAreaView>
  )
}
