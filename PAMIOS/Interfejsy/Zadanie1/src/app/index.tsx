import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet, SafeAreaView } from 'react-native';

const INITIAL_EVENTS = [
  { id: '1', title: 'Festiwal Nauki i Techniki', date: '15.11.2026', category: 'Nauka', location: 'Warszawa', favorite: false, isNew: true },
  { id: '2', title: 'Maraton Jesienny', date: '20.11.2026', category: 'Sport', location: 'Kraków', favorite: false, isNew: false },
  { id: '3', title: 'Koncert Muzyki Filmowej', date: '01.12.2026', category: 'Muzyka', location: 'Wrocław', favorite: true, isNew: true },
  { id: '4', title: 'Przegląd Kina Niezależnego', date: '05.12.2026', category: 'Film', location: 'Gdańsk', favorite: false, isNew: false },
  { id: '5', title: 'Wykład: Astrofizyka', date: '10.12.2026', category: 'Nauka', location: 'Poznań', favorite: false, isNew: false },
];

const CATEGORIES = ['Wszystkie', 'Nauka', 'Sport', 'Muzyka', 'Film'];

const EventCard = ({ title, date, category, location, favorite, isNew, onToggleFavorite }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{title}</Text>
      {isNew && <View style={styles.badge}><Text style={styles.badgeText}>Nowe!</Text></View>}
    </View>
    <Text style={styles.cardDetails}>📅 {date} | 📍 {location}</Text>
    <Text style={styles.cardCategory}>Kategoria: {category}</Text>

    <Pressable
      style={[styles.favButton, favorite ? styles.favButtonActive : null]}
      onPress={onToggleFavorite}
    >
      <Text style={[styles.favButtonText, favorite ? styles.favButtonTextActive : null]}>
        {favorite ? '★ W ulubionych' : '☆ Zapisz do ulubionych'}
      </Text>
    </Pressable>
  </View>
);

export default function App() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Wszystkie');
  const [showOnlyFavs, setShowOnlyFavs] = useState(false); // Rozszerzenie własne

  const toggleFavorite = (id) => {
    setEvents(prev => prev.map(event =>
      event.id === id ? { ...event, favorite: !event.favorite } : event
    ));
  };

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Wszystkie' || event.category === selectedCategory;
      const matchesFavs = showOnlyFavs ? event.favorite : true;
      return matchesSearch && matchesCategory && matchesFavs;
    });
  }, [events, searchQuery, selectedCategory, showOnlyFavs]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Katalog Wydarzeń</Text>
        <Text style={styles.headerSubtitle}>Znajdź coś ciekawego dla siebie</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Wyszukaj wydarzenie..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.filterChip, selectedCategory === item && styles.filterChipActive]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text style={[styles.filterText, selectedCategory === item && styles.filterTextActive]}>
                {item}
              </Text>
            </Pressable>
          )}
        />
      </View>

      <View style={styles.statsRow}>
        <Text style={styles.resultsCount}>Znaleziono wyników: {filteredEvents.length}</Text>
        <Pressable onPress={() => setShowOnlyFavs(!showOnlyFavs)}>
          <Text style={styles.toggleFavsText}>
            {showOnlyFavs ? 'Pokaż wszystkie' : 'Tylko ulubione'}
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <EventCard
            title={item.title}
            date={item.date}
            category={item.category}
            location={item.location}
            favorite={item.favorite}
            isNew={item.isNew}
            onToggleFavorite={() => toggleFavorite(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { padding: 20, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderColor: '#E9ECEF' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#212529' },
  headerSubtitle: { fontSize: 14, color: '#6C757D', marginTop: 4 },
  searchInput: { margin: 15, padding: 12, backgroundColor: '#FFFFFF', borderRadius: 8, borderWidth: 1, borderColor: '#DEE2E6', fontSize: 16 },
  filterContainer: { paddingHorizontal: 15, marginBottom: 10 },
  filterChip: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#E9ECEF', borderRadius: 20, marginRight: 10 },
  filterChipActive: { backgroundColor: '#007BFF' },
  filterText: { color: '#495057', fontWeight: '500' },
  filterTextActive: { color: '#FFFFFF' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, marginBottom: 10 },
  resultsCount: { fontSize: 14, color: '#6C757D', fontWeight: '600' },
  toggleFavsText: { fontSize: 14, color: '#007BFF', fontWeight: '600' },
  listContainer: { padding: 15, paddingBottom: 30 },
  card: { backgroundColor: '#FFFFFF', padding: 15, borderRadius: 12, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#212529', flex: 1 },
  badge: { backgroundColor: '#DC3545', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginLeft: 10 },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  cardDetails: { fontSize: 14, color: '#495057', marginBottom: 4 },
  cardCategory: { fontSize: 12, color: '#6C757D', fontStyle: 'italic', marginBottom: 12 },
  favButton: { padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#007BFF', alignItems: 'center' },
  favButtonActive: { backgroundColor: '#007BFF' },
  favButtonText: { color: '#007BFF', fontWeight: '600' },
  favButtonTextActive: { color: '#FFFFFF' }
});