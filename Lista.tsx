import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text, } from 'react-native-paper';
import type { RootStackParamList, RootStackScreenProps } from './types'

export default function Lista() {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Text>
                    Havaintosi
                </Text>
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
