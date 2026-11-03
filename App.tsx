import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import type { RootStackParamList } from './types'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tervetuloa from './Tervetuloa';
import Tallennus from './Tallennus';
import Lista from './Lista';
import Kartta from './Kartta';

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
