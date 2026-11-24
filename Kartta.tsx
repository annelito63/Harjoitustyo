import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Modal, View, Text, TextInput, Button, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect, } from 'react';
import * as Location from 'expo-location';
import { RootStackScreenProps } from './types';
import { equalTo, getDatabase, onValue, orderByChild, push, query, ref } from "firebase/database";
import { app } from './firebaseConfig';
import { getAuth } from 'firebase/auth';

type Paikka = {
    nimi: string;
    latitude: number;
    longitude: number;
    uid: string;
}

export default function Kartta({ navigation }: RootStackScreenProps<'Kartta'>) {
    const database = getDatabase(app);
    const [modalVisible, setModalVisible] = useState(false);

    const [nimi, setNimi] = useState('');

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [havaintoPaikka, setHavaintoPaikka] = useState<{
        nimi: string;
        latitude: number;
        longitude: number;
        uid?: string;
    } | null>(null);


    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('No permission to get location')
                return;
            }
            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            setRegion({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.0322,
                longitudeDelta: 0.0221,
            });
        })();
    }, []);



    const [lat, setLat] = useState(60.200692);
    const [lon, setLon] = useState(24.934302);
    const [latD, setLatD] = useState(0.0322);
    const [lonD, setLonD] = useState(0.0221);
    const [region, setRegion] = useState({
        latitude: lat,
        longitude: lon,
        latitudeDelta: latD,
        longitudeDelta: lonD,
    })
    const [place, setPlace] = useState("");

    const [paikat, setPaikat] = useState<
        {
            id: string;
            nimi: string;
            latitude: number;
            longitude: number;
            uid: string;
        }[]
    >([]);

    const findPlace = () => {
        fetch(`https://geocode.maps.co/search?q=${place}&api_key=6ab28ca9135d7862906985pbce48604`)
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in fetch:" + response.statusText);

                return response.json()
            })
            .then(data => {
                setLat(Number(data[0].lat));
                setLon(Number(data[0].lon));
                setRegion(

                    {
                        latitude: Number(data[0].lat),
                        longitude: Number(data[0].lon),
                        latitudeDelta: 0.0322,
                        longitudeDelta: 0.0221,
                    });

            })
            .catch(err => console.error(err));

    };

    const tallennaSijainti = () => {
        if (location) {
            const auth = getAuth();
            const currentUser = auth.currentUser;

            if (!currentUser) {
                Alert.alert("Et ole kirjautunut sisään.");
                return;
            }
            const paikka = {
                nimi: nimi,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                uid: currentUser.uid,
            };

            setHavaintoPaikka({
                nimi: nimi,
                latitude: paikka.latitude,
                longitude: paikka.longitude,
                uid: currentUser.uid,
            });


            push(ref(database, "sijainnit/"), paikka);

            setModalVisible(false);
        }
    };

    const modalVis = () => {
        setModalVisible(true);
    }

    useEffect(() => {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) return;

        const q = query(
            ref(database, "sijainnit"),
            orderByChild("uid"),
            equalTo(currentUser.uid)
        );

        return onValue(q, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                const paikatLista = Object.entries(data).map(([id, value]) => ({
                    id,
                    ...(value as {
                        nimi: string;
                        latitude: number;
                        longitude: number;
                        uid: string;
                    }),
                }));
                setPaikat(paikatLista);
            } else {
                setPaikat([]);
                return;
            }

        });
    }, []);


    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <MapView
                    style={{ width: '100%', height: '100%' }}
                    region={region}

                >
                    {location && (
                        <Marker
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude
                            }}
                            title='Olet tässä'
                            onPress={modalVis}
                            pinColor="blue"
                        />
                    )}
                    {paikat.map((paikka) => (
                        <Marker
                            key={paikka.id}
                            coordinate={{
                                latitude: paikka.latitude,
                                longitude: paikka.longitude,
                            }}
                            title={paikka.nimi}
                            pinColor="red"
                        />
                    ))}

                </MapView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Paikan nimi"
                            value={nimi}
                            onChangeText={text => setNimi(text)}
                        />
                        <Pressable onPress={tallennaSijainti} style={styles.button}>
                            <Text>Tallenna</Text>
                        </Pressable>
                    </View>
                </Modal>
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
    input: {
        borderWidth: 1,
        marginTop: 220,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'white',
        height: 30
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        alignItems: 'center',
        backgroundColor: 'white',
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20
    },
});
