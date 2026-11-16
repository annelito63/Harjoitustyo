import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect, } from 'react';
import * as Location from 'expo-location';
import { RootStackScreenProps } from './types';

export default function Kartta({ navigation }: RootStackScreenProps<'Kartta'>) {


    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    const spot = (async () => {
        await Location.getCurrentPositionAsync({});
        setLocation(location)
    });

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('No permission to get location')
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
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
                setRegion({
                    latitude: Number(data[0].lat),
                    longitude: Number(data[0].lon),
                    latitudeDelta: 0.0322,
                    longitudeDelta: 0.0221,
                });

            })
            .catch(err => console.error(err));

    };

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
                        />
                    )}
                </MapView>
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
