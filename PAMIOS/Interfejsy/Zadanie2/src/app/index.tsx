import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet, SafeAreaView } from 'react-native';

const SettingsRow = ({ title, value, onPress, isDark }) => (
  <Pressable style={[styles.settingsRow, isDark && styles.settingsRowDark]} onPress={onPress}>
    <Text style={[styles.settingsTitle, isDark && styles.textDark]}>{title}</Text>
    <Text style={styles.settingsValue}>{value}</Text>
  </Pressable>
);

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Rozszerzenie

  const [form, setForm] = useState({
    name: 'Jan Kowalski',
    email: 'jan@example.com',
    city: 'Warszawa',
    bio: 'Programista React Native, miłośnik kawy.',
    password: 'mojetajnehaslo' // Rozszerzenie
  });

  const [message, setMessage] = useState(null);
  const BIO_LIMIT = 100;

  const handleSave = () => {
    setMessage(null);

    // Walidacja
    if (form.name.trim() === '') {
      setMessage({ type: 'error', text: 'Błąd: Imię nie może być puste.' });
      return;
    }
    if (!form.email.includes('@')) {
      setMessage({ type: 'error', text: 'Błąd: Podaj poprawny adres e-mail (brak @).' });
      return;
    }
    if (form.bio.length > BIO_LIMIT) {
      setMessage({ type: 'error', text: `Błąd: Bio przekracza limit ${BIO_LIMIT} znaków.` });
      return;
    }

    setMessage({ type: 'success', text: 'Sukces: Dane zostały zapisane!' });
  };

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const themeContainer = isDarkMode ? styles.containerDark : styles.containerLight;
  const themeText = isDarkMode ? styles.textDark : styles.textLight;
  const themeInput = isDarkMode ? styles.inputDark : styles.inputLight;

  return (
    <SafeAreaView style={[styles.container, themeContainer]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* SEKCJA PROFILU */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{form.name.charAt(0)}</Text></View>
          <Text style={[styles.profileName, themeText]}>{form.name}</Text>
          <Text style={styles.profileCity}>📍 {form.city}</Text>
          <Text style={[styles.profileBio, themeText]}>{form.bio}</Text>
        </View>

        {/* KOMUNIKATY */}
        {message && (
          <View style={[styles.messageBox, message.type === 'error' ? styles.messageError : styles.messageSuccess]}>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        )}

        {/* FORMULARZ EDYCJI */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, themeText]}>Edycja danych</Text>

          <Text style={[styles.label, themeText]}>Imię i nazwisko</Text>
          <TextInput style={[styles.input, themeInput]} value={form.name} onChangeText={(t) => updateField('name', t)} />

          <Text style={[styles.label, themeText]}>Adres e-mail</Text>
          <TextInput style={[styles.input, themeInput]} value={form.email} onChangeText={(t) => updateField('email', t)} keyboardType="email-address" autoCapitalize="none" />

          <Text style={[styles.label, themeText]}>Miasto</Text>
          <TextInput style={[styles.input, themeInput]} value={form.city} onChangeText={(t) => updateField('city', t)} />

          {/* Rozszerzenie: Ukrywanie/pokazywanie hasła */}
          <View style={styles.passwordHeader}>
            <Text style={[styles.label, themeText]}>Hasło</Text>
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.togglePassword}>{showPassword ? 'Ukryj' : 'Pokaż'}</Text>
            </Pressable>
          </View>
          <TextInput style={[styles.input, themeInput]} value={form.password} onChangeText={(t) => updateField('password', t)} secureTextEntry={!showPassword} />

          {/* Rozszerzenie: Licznik znaków w bio */}
          <View style={styles.bioHeader}>
            <Text style={[styles.label, themeText]}>Krótkie Bio</Text>
            <Text style={[styles.charCount, form.bio.length > BIO_LIMIT ? styles.charCountError : null]}>
              {form.bio.length}/{BIO_LIMIT}
            </Text>
          </View>
          <TextInput style={[styles.input, styles.textArea, themeInput]} value={form.bio} onChangeText={(t) => updateField('bio', t)} multiline numberOfLines={3} />

          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Zapisz zmiany</Text>
          </Pressable>
        </View>

        {/* SEKCJA USTAWIEŃ */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, themeText]}>Ustawienia</Text>
          <SettingsRow title="Powiadomienia Push" value="Włączone 🟢" isDark={isDarkMode} onPress={() => {}} />
          <SettingsRow title="Prywatność konta" value="Tylko znajomi 🔒" isDark={isDarkMode} onPress={() => {}} />
          <SettingsRow title="Ciemny motyw" value={isDarkMode ? "Włączony 🌙" : "Wyłączony ☀️"} isDark={isDarkMode} onPress={() => setIsDarkMode(!isDarkMode)} />
          <SettingsRow title="O aplikacji" value="Wersja 1.0.0 ℹ️" isDark={isDarkMode} onPress={() => {}} />
        </View>

        {/* Rozszerzenie: Wyloguj */}
        <Pressable style={styles.logoutButton} onPress={() => alert('Wylogowano pomyślnie!')}>
          <Text style={styles.logoutText}>Wyloguj się</Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerLight: { backgroundColor: '#F5F7FA' },
  containerDark: { backgroundColor: '#121212' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  textLight: { color: '#333' },
  textDark: { color: '#E0E0E0' },

  profileSection: { alignItems: 'center', marginBottom: 30, marginTop: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#007BFF', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  avatarText: { color: '#FFF', fontSize: 32, fontWeight: 'bold' },
  profileName: { fontSize: 24, fontWeight: 'bold' },
  profileCity: { fontSize: 14, color: '#888', marginTop: 4 },
  profileBio: { fontSize: 14, marginTop: 10, textAlign: 'center', paddingHorizontal: 20 },

  messageBox: { padding: 15, borderRadius: 8, marginBottom: 20 },
  messageError: { backgroundColor: '#FDECEA', borderWidth: 1, borderColor: '#F5C6CB' },
  messageSuccess: { backgroundColor: '#E8F5E9', borderWidth: 1, borderColor: '#C3E6CB' },
  messageText: { textAlign: 'center', fontWeight: 'bold', color: '#333' },

  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 5, marginTop: 10 },

  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16 },
  inputLight: { backgroundColor: '#FFF', borderColor: '#DDD', color: '#000' },
  inputDark: { backgroundColor: '#1E1E1E', borderColor: '#333', color: '#FFF' },
  textArea: { minHeight: 80, textAlignVertical: 'top' },

  bioHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  charCount: { fontSize: 12, color: '#888', marginBottom: 5 },
  charCountError: { color: '#DC3545', fontWeight: 'bold' },

  passwordHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  togglePassword: { color: '#007BFF', fontSize: 12, fontWeight: 'bold', marginBottom: 5 },

  saveButton: { backgroundColor: '#28A745', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  saveButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },

  settingsRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderColor: '#EEE' },
  settingsRowDark: { borderColor: '#333' },
  settingsTitle: { fontSize: 16 },
  settingsValue: { fontSize: 14, color: '#888' },

  logoutButton: { padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#DC3545', alignItems: 'center', marginTop: 10 },
  logoutText: { color: '#DC3545', fontSize: 16, fontWeight: 'bold' }
});