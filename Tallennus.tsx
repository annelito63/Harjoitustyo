import { StatusBar } from 'expo-status-bar';
import { StyleSheet, } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import type { RootStackParamList } from './types'
import { app } from './firebaseConfig';
import { getDatabase } from "firebase/database";

const database = getDatabase(app);



type Havainto = {
    id: number;
    laji: string;
    paikka: string;
    pvm: string;
    kuvaus: string;
}

export default function Tallennus() {

    const [havainnot, setHavainnot] = useState<Havainto[]>([]);

    /*  const [laji, setLaji] = useState('');
     const [paikka, setPaikka] = useState('');
     const [pvm, setPvm] = useState('');
     const [kuvaus, setKuvaus] = useState(''); */
    const [havainto, setHavainto] = useState<Havainto>({
        id: havainnot.length + 1,
        laji: '',
        paikka: '',
        pvm: '',
        kuvaus: ''
    });


    return (
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
                /> <TextInput
                    style={{ width: '90%', marginBottom: 10 }}
                    placeholder="Päivämäärä"
                    label="Päivämäärä"
                    value={havainto.pvm}
                    onChangeText={text => setHavainto({ ...havainto, pvm: text })}
                /> <TextInput
                    style={{ width: '90%', marginBottom: 10 }}
                    placeholder="Kuvaus"
                    label="Kuvaus"
                    value={havainto.kuvaus}
                    onChangeText={text => setHavainto({ ...havainto, kuvaus: text })}
                />
                <Button mode="contained" icon="content-save">
                    Tallenna
                </Button>
                <StatusBar style="auto" />
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
            </SafeAreaView>
        </SafeAreaProvider>
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