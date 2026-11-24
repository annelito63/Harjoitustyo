import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, View, } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Button, PaperProvider, TextInput } from 'react-native-paper';
import { app } from './firebaseConfig';
import { getDatabase, ref, push } from "firebase/database";
import { RootStackScreenProps } from './types';
import { getAuth, } from 'firebase/auth';


const database = getDatabase(app);



type Havainto = {
    laji: string;
    paikka: string;
    pvm: string;
    kuvaus: string;
    uid?: string;
}

export default function Tallennus({ navigation }: RootStackScreenProps<'Tallennus'>) {
    const auth = getAuth();
    const user = auth.currentUser;

    const [havainto, setHavainto] = useState<Havainto>({
        laji: '',
        paikka: '',
        pvm: '',
        kuvaus: ''
    });


    const handleSave = () => {
        if (havainto.laji && havainto.paikka && havainto.pvm) {
            push(ref(database, 'items/'), {
                ...havainto,
                uid: user?.uid
            });
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
                    <View style={styles.container}>
                        <TextInput 
                        style={styles.input}
                            placeholder="Laji"
                            label="Laji"
                            value={havainto.laji}
                            onChangeText={text => setHavainto({ ...havainto, laji: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Paikka"
                            label="Paikka"
                            value={havainto.paikka}
                            onChangeText={text => setHavainto({ ...havainto, paikka: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Päivämäärä"
                            label="Päivämäärä"
                            value={havainto.pvm}
                            onChangeText={text => setHavainto({ ...havainto, pvm: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Kuvaus"
                            label="Kuvaus"
                            value={havainto.kuvaus}
                            onChangeText={text => setHavainto({ ...havainto, kuvaus: text })}
                        />
                    </View>
                    <View style={styles.buttons}>
                        <Button
                            mode="contained"
                            icon="content-save"
                            onPress={handleSave}
                            style={styles.button}
                        >

                            Tallenna
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
                        <StatusBar style="auto" />
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        paddingTop: 20
    },
    button: {
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20
    },
    input: {
        height: 40,
        width: 300,
        margin: 8,
        borderWidth: 1,
        padding: 10,
    },
});