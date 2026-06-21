import { Text, View, Button, StyleSheet, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import { useState } from 'react';

export default function Index() {
    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
    const [errMessage, setErrorMessage] = useState('');
    const [weather, setWeather] = useState<{temperature: number; windspeed: number} | null>(null);

    const [loading, setLoading] = useState(false);

    const getLocation = async () => {
        setLoading(true);
        setErrorMessage('');

        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMessage('Brak zgody na dostęp do lokalizacji');
                setLoading(false);
                return;
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest,
            });

            setCoords({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            await fetchWeather(
                location.coords.latitude,
                location.coords.longitude
            );

        } catch (error) {
            setErrorMessage('Błąd pobierania lokalizacji');
            console.error(error);
            setLoading(false);
        }
    };

    const fetchWeather = async (lat: number, lon: number) => {
        try {
            const url = `https://api.open-meteo.com/v1/forecast` +
                        `?latitude=${lat}&longitude=${lon}&current_weather=true`;
            const response = await fetch(url);
            const data = await response.json();
            setWeather(data.current_weather);
        } catch (error) {
            console.error('Błąd pobierania pogody:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Pobierz lokalizację" onPress={getLocation} />

            {coords && (
                <Text>{coords.latitude}, {coords.longitude}</Text>
            )}

            {errMessage !== '' && <Text>{errMessage}</Text>}

            {loading && <ActivityIndicator size="large" color="#6C63FF" />}

            {weather && !loading && (
                <View>
                    <Text style={styles.temp}>{weather.temperature}°C</Text>
                    <Text>Wiatr: {weather.windspeed} km/h</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    temp: {
        fontSize: 48,
        fontWeight: "bold",
    },
});