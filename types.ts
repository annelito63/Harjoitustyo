import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Tervetuloa: undefined;
    Tallennus: undefined;
    Lista: undefined;
    Kartta: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;