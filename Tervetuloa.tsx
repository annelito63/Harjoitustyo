import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import type { RootStackScreenProps } from './types'
import { Button } from 'react-native-paper';


export default function Tervetuloa({ navigation }: RootStackScreenProps<'Tervetuloa'>) {
    return (
        <View style={styles.container}>
            <Text>Tervetuloa tallentamaan havaintosi!</Text>
            <Button
                mode='contained'
                onPress={() => navigation.navigate('Tallennus')}
            >
                Tallennus
            </Button>
            <Button
                mode='contained'
                onPress={() => navigation.navigate('Lista')}
            >
                Havaintosi
            </Button>
                        <Button
                mode='contained'
                onPress={() => navigation.navigate('Kartta')}
            >
                Kartta
            </Button>
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
