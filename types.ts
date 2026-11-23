import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Kirjautuminen: undefined;
    Tervetuloa: undefined;
    Tallennus: undefined;
    Lista: undefined;
    Kartta: undefined;
    SingInPage: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;