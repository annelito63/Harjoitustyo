import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import type { RootStackScreenProps } from './types'
import { Button, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function Tervetuloa({ navigation }: RootStackScreenProps<'Tervetuloa'>) {
    return (
        <PaperProvider>
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <Text>Tervetuloa tallentamaan havaintosi!</Text>
                    <View style={styles.buttons}>
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
});
