import React from 'react';
import { KeyboardAvoidingView, Text, Platform, StyleSheet } from 'react-native';
import BottomTabBar from "./bottom-tab-bar";

export default function MyComponent() {
  const data = { name: "Jakub Kuc", album_number: "60704" };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.text}>
        Imię i nazwisko: {data.name}{'\n'}
        Numer Albumu: {data.album_number}
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
    fontSize: 18,
  }
});