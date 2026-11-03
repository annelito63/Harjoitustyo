import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Text, TextInput, } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { getDatabase, push, ref, onValue } from 'firebase/database';
import { app } from './firebaseConfig';

    const database = getDatabase(app);

    type Havainto = {
        id: number;
        laji: string;
        paikka: string;
        pvm: string;
        kuvaus: string;
    }

export default function Lista() {


    const [havainnot, setHavainnot] = useState<Havainto[]>([]);
    const [pvm, setPvm] = useState("");

    useEffect(() => {
        return onValue(ref(database, 'items/'), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setHavainnot(Object.values(data) as Havainto[]);
            } else {
                setHavainnot([]);
            }
        });
    }, []);


    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Text>
                    Havaintosi
                </Text>
                <TextInput
                    style={{ width: '90%', marginBottom: 10 }}
                    placeholder="Päivämäärä"
                    label="Päivämäärä"
                    value={pvm}
                    onChangeText={text => setPvm(text)}
                /> 
                <Button mode="contained" >
                    Etsi päivämäärällä
                </Button>
                <FlatList
                    style={{ marginTop: 10, width: '90%' }}
                    data={havainnot}
                    renderItem={({ item }) =>
                        <Card style={{ marginBottom: 10 }}>
                            <Card.Title title={item.laji} />
                            <Card.Content>
                                <Text variant="bodyMedium">{item.paikka}</Text>
                                <Text variant="bodyMedium">{item.pvm}</Text>
                                <Text variant="bodyMedium">{item.kuvaus}</Text>
                            </Card.Content>
                        </Card>
                    }
                />
                <StatusBar style="auto" />
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
