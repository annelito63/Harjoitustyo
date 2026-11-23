import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import type { RootStackScreenProps } from './types'
import { Button, PaperProvider, TextInput } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';




export default function Tervetuloa({ navigation }: RootStackScreenProps<'Tervetuloa'>) {

    return (
        <PaperProvider>
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                   
                    <Text style={styles.text}>Tervetuloa tallentamaan havaintosi!</Text>
                    <View style={styles.buttons}>
                        <Button
                            mode='contained'
                            icon="content-save"
                            onPress={() => navigation.navigate('Tallennus')}
                            style={styles.button}
                        >
                            Tallennus
                        </Button>
                        <Button
                            mode='contained'
                            icon="format-list-bulleted"
                            onPress={() => navigation.navigate('Lista')}
                            style={styles.button}
                        >
                            Havaintosi
                        </Button>
                        <Button
                            mode='contained'
                            icon="map-marker"
                            onPress={() => navigation.navigate('Kartta')}
                            style={styles.button}
                        >
                            Kartta
                        </Button>
                    </View>
                    <StatusBar style="auto" />
                </SafeAreaView>
            </SafeAreaProvider>
        </PaperProvider>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        paddingTop: 20
    },
    button: {
        marginTop: 20
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
