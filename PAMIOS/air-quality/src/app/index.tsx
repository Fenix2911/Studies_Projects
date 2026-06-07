import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Alert
} from 'react-native';
import * as Location from 'expo-location';

export default function AirQualityScreen() {
  const [airData, setAirData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchAirQuality = async () => {
    try {
      setErrorMsg(null);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Odmówiono dostępu do lokalizacji. Nie można pobrać danych.');
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest
      });

      const latitude = location.coords.latitude.toFixed(4);
      const longitude = location.coords.longitude.toFixed(4);
                console.log(latitude, longitude)
      const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Błąd podczas pobierania danych z serwera API.');
      }

      const data = await response.json();
        console.log(data)
      if (!data || !data.current) {
        setErrorMsg('Brak danych o jakości powietrza dla Twojej lokalizacji.');
        setAirData(null);
      } else {
        setAirData(data.current);
      }

    } catch (error) {
      setErrorMsg('Wystąpił błąd połączenia: ' + error.message);
      setAirData(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAirQuality();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAirQuality();
  }, []);


  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Pobieranie lokalizacji i danych...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.header}>Jakość powietrza w Twojej okolicy</Text>

      {errorMsg && (
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>{errorMsg}</Text>
          <Text style={styles.hintText}>Przeciągnij w dół, aby spróbować ponownie.</Text>
        </View>
      )}

      {airData && !errorMsg && (
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>PM2.5</Text>
            <Text style={styles.cardValue}>{airData.pm2_5} <Text style={styles.unit}>µg/m³</Text></Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>PM10</Text>
            <Text style={styles.cardValue}>{airData.pm10} <Text style={styles.unit}>µg/m³</Text></Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Tlenek węgla (CO)</Text>
            <Text style={styles.cardValue}>{airData.carbon_monoxide} <Text style={styles.unit}>µg/m³</Text></Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Dwutlenek azotu (NO₂)</Text>
            <Text style={styles.cardValue}>{airData.nitrogen_dioxide} <Text style={styles.unit}>µg/m³</Text></Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Ozon (O₃)</Text>
            <Text style={styles.cardValue}>{airData.ozone} <Text style={styles.unit}>µg/m³</Text></Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
    paddingTop: 50,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2C3E50',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2980B9',
  },
  unit: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#95A5A6',
  },
  errorCard: {
    backgroundColor: '#FDEDEC',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F5B7B1',
    alignItems: 'center',
  },
  errorText: {
    color: '#C0392B',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hintText: {
    color: '#E74C3C',
    fontSize: 14,
    textAlign: 'center',
  }
});