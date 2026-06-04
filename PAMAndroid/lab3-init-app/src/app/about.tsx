import { Stack } from "expo-router";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import AboutPage from "../components/about-page";
import AsyncStorage from '@react-native-async-storage/async-storage';

const showStorage = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        if (keys.length === 0) {
        console.log('AsyncStorage jest pusty');
        return;
        }
        const pairs = await AsyncStorage.multiGet(keys);
        pairs.forEach(([key, value]) => {
        console.log(`${key}:`, value);
        });
        } catch (error) {
        console.error('Błąd odczytu AsyncStorage:', error);
        }
        };

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "O aplikacji" }} />
           <TouchableOpacity onPress={showStorage}>
           <Text>Pokaż AsyncStorage</Text>
           </TouchableOpacity>
    <AboutPage />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0EFFF",
  },
});