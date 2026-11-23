import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, View, } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Text, TextInput, List, PaperProvider, } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, query, orderByChild, equalTo, } from 'firebase/database';
import { app } from './firebaseConfig';
import { RootStackScreenProps } from './types';
import { getAuth } from 'firebase/auth';


const database = getDatabase(app);

type Havainto = {
    id: number;
    laji: string;
    paikka: string;
    pvm: string;
    kuvaus: string;
    uid?: string;
}

export default function Lista({ route }: RootStackScreenProps<'Lista'>) {


    const [havainnot, setHavainnot] = useState<Havainto[]>([]);
    const [pvm, setPvm] = useState("");
    const [suodatetut, setSuodatetut] = useState<Havainto[]>([]);
    const [lajit, setLajit] = useState<string[]>([]);


    useEffect(() => {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) return;

        const q = query(
            ref(database, 'items'),
            orderByChild('uid'),
            equalTo(currentUser.uid)
        );

        return onValue(q, (snapshot) => {
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
                    <View style={styles.buttons} >
                        <Button mode="contained" icon="calendar-blank" onPress={haePvmlla}  >
                            Etsi päivämäärällä
                        </Button>
                        <Button mode="contained" icon="bird" onPress={haeLajit}  >
                            Etsi lajit
                        </Button>
                    </View>
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
