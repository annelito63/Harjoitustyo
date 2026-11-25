import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import type { RootStackScreenProps } from './types'
import { Button, PaperProvider, TextInput } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { app } from './firebaseConfig';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useState } from 'react';



export default function Kirjautuminen({ navigation }: RootStackScreenProps<'Kirjautuminen'>) {

    const auth = getAuth(app);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<string | null>(null);


    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setUser(userCredential.user.email);
            })
            .then(() => navigation.navigate('Tervetuloa'))
            .catch(error => {
                console.error('Virhe sisäänkirjautumisessa', error)
            })
    }

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setUser(userCredential.user.email);
            })
            .then(() => navigation.navigate('Tervetuloa'))
            .catch(error => {
                console.error('Virhe sisäänkirjautumisessa', error)
            })
    }

    const logOut = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
            })
            .catch(error => {
                console.error('Virhe uloskirjautumisessa', error)
            })
        setEmail('');
        setPassword('');
    }

    return (
        <PaperProvider>
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    {
                        user && (
                            <Text style={styles.text}>Olet kirjautunut sisään!</Text>
                        )
                    }
                    {
                        !user && (
                            <View style={styles.input}>

                                <TextInput
                                    style={{ width: '90%', marginBottom: 10 }}
                                    placeholder="Sähköposti"
                                    label="Sähköposti"
                                    value={email}
                                    onChangeText={text => setEmail(text)}
                                />
                                <TextInput
                                    style={{ width: '90%', marginBottom: 10 }}
                                    placeholder="Salasana"
                                    label="Salasana"
                                    value={password}
                                    onChangeText={text => setPassword(text)}
                                />
                                <Button
                                    mode='contained'
                                    icon="login"
                                    onPress={() => signIn()}
                                    style={styles.button}
                                >
                                    Kirjaudu sisään</Button>
                                <Button
                                    mode='contained'
                                    icon="login"
                                    onPress={() => signUp()}
                                    style={styles.button}
                                >
                                    Rekisteröidy</Button>
                            </View>
                        )}
                    {
                        user && (
                            <Button
                                mode='contained'
                                icon="logout"
                                onPress={() => logOut()}
                                style={styles.button}
                            >
                                Kirjaudu ulos</Button>
                        )
                    }
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
    input: {
        flex: 1,
        width: 300,
        marginTop: 20
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
