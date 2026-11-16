import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, View, } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Button, PaperProvider, TextInput } from 'react-native-paper';
import { app } from './firebaseConfig';
import { getDatabase, ref, push } from "firebase/database";
import { RootStackScreenProps } from './types';


const database = getDatabase(app);



type Havainto = {
    laji: string;
    paikka: string;
    pvm: string;
    kuvaus: string;
}

export default function Tallennus({ navigation }: RootStackScreenProps<'Tallennus'>) {


    const [havainto, setHavainto] = useState<Havainto>({
        laji: '',
        paikka: '',
        pvm: '',
        kuvaus: ''
    });


    const handleSave = () => {
        if (havainto.laji && havainto.paikka && havainto.pvm) {
            push(ref(database, 'items/'), havainto);

            setHavainto({
                laji: '',
                paikka: '',
                pvm: '',
                kuvaus: ''
            });
        }
        else {
            Alert.alert('Error', 'Anna laji, paikka ja päivämäärä!');
        }

    }

    return (
        <PaperProvider>
            <SafeAreaProvider>
                <SafeAreaView>
                    <TextInput
                        style={{ width: '90%', marginBottom: 10 }}
                        placeholder="Laji"
                        label="Laji"
                        value={havainto.laji}
                        onChangeText={text => setHavainto({ ...havainto, laji: text })}
                    />
                    <TextInput
                        style={{ width: '90%', marginBottom: 10 }}
                        placeholder="Paikka"
                        label="Paikka"
                        value={havainto.paikka}
                        onChangeText={text => setHavainto({ ...havainto, paikka: text })}
                    />
                    <TextInput
                        style={{ width: '90%', marginBottom: 10 }}
                        placeholder="Päivämäärä"
                        label="Päivämäärä"
                        value={havainto.pvm}
                        onChangeText={text => setHavainto({ ...havainto, pvm: text })}
                    />
                    <TextInput
                        style={{ width: '90%', marginBottom: 10 }}
                        placeholder="Kuvaus"
                        label="Kuvaus"
                        value={havainto.kuvaus}
                        onChangeText={text => setHavainto({ ...havainto, kuvaus: text })}
                    />
                    <View style={styles.buttons}>
                        <Button mode="contained" icon="content-save" onPress={handleSave}>
                            Tallenna
                        </Button>
                        <StatusBar style="auto" />
                        <Button
                            mode='contained'
                            icon="format-list-bulleted"
                            onPress={() => navigation.navigate('Lista')}
                        >
                            Havaintosi
                        </Button>
                        <Button
                            mode='contained'
                            icon="map-marker"
                            onPress={() => navigation.navigate('Kartta')}
                        >
                            Kartta
                        </Button>
                    </View>
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