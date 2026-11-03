import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import type { RootStackParamList } from './types'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tervetuloa from './Tervetuloa';
import Tallennus from './Tallennus';
import Lista from './Lista';
import Kartta from './Kartta';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tervetuloa" component={Tervetuloa} />
        <Stack.Screen name="Tallennus" component={Tallennus} />
        <Stack.Screen name="Lista" component={Lista} />
        <Stack.Screen name="Kartta" component={Kartta} />
      </Stack.Navigator>
    </NavigationContainer>
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
