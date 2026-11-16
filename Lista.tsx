import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Text, TextInput, List, PaperProvider, } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { getDatabase, push, ref, onValue } from 'firebase/database';
import { app } from './firebaseConfig';
import { RootStackScreenProps } from './types';

const database = getDatabase(app);

type Havainto = {
    id: number;
    laji: string;
    paikka: string;
    pvm: string;
    kuvaus: string;
}

export default function Lista({ route }: RootStackScreenProps<'Lista'>) {


    const [havainnot, setHavainnot] = useState<Havainto[]>([]);
    const [pvm, setPvm] = useState("");
    const [suodatetut, setSuodatetut] = useState<Havainto[]>([]);
    const [lajit, setLajit] = useState<string[]>([]);

    useEffect(() => {
        return onValue(ref(database, 'items/'), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setHavainnot(Object.values(data) as Havainto[]);
            } else {
                setHavainnot([]);
                setSuodatetut([]);
            }
        });
    }, []);

    const haePvmlla = () => {
        const haetut = havainnot.filter(
            havainto => havainto.pvm === pvm
        );

        setSuodatetut(haetut);
        setLajit([]);
    };

    const haeLajit = () => {
        const lajit = [...new Set(havainnot.map(h => h.laji))];
        setLajit(lajit);
        setSuodatetut([]);
    }


    return (
        <PaperProvider>
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
                    <Button mode="contained" onPress={haePvmlla} style={styles.buttons} >
                        Etsi päivämäärällä
                    </Button>
                    <Button mode="contained" onPress={haeLajit} style={styles.buttons} >
                        Etsi lajit
                    </Button>
                    {suodatetut.length > 0 &&
                        <FlatList
                            style={{ marginTop: 10, width: '90%' }}
                            data={suodatetut}
                            renderItem={({ item }) =>
                                <Card style={{ marginBottom: 10 }}>
                                    <Card.Title title={item.laji} />
                                    <Card.Content>
                                        <Text variant="bodyMedium">{item.paikka}</Text>
                                        <Text variant="bodyMedium">{item.kuvaus}</Text>
                                    </Card.Content>
                                </Card>
                            }
                        />}
                    <FlatList
                        style={{ marginTop: 10, width: '90%' }}
                        data={lajit}
                        renderItem={({ item, index }) => (
                            <List.Item
                                title={item}
                                left={() => <Text>{index + 1}.</Text>}
                            />
                        )}
                    />
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
