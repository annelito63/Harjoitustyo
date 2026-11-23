import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import type { RootStackScreenProps } from './types'
import { Button, PaperProvider, TextInput } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getDatabase, ref, push } from "firebase/database";
import { app } from './firebaseConfig';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useState } from 'react';



export default function Tervetuloa({ navigation }: RootStackScreenProps<'Tervetuloa'>) {

    const auth = getAuth(app);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');

    const loginEmailPassword = async () => {
        const loginEmail = email;
        const loginPassword = password;
    }

    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        signOut(auth);
    }

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
