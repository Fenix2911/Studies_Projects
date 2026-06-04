import { Stack } from "expo-router";
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdPost, setCreatedPost] = useState(null);
    const pageTitle = 'PAMIOS Jakub Kuc 60704'
  const API_URL = 'https://jsonplaceholder.typicode.com/posts';

  const fetchPosts = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setPosts(json);
      setIsLoading(false);
    } catch (error) {
      setError('Wystąpił błąd podczas pobierania danych.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    if (!title.trim() || !body.trim() || !userId.trim()) {
      Alert.alert('Błąd walidacji', 'Wszystkie pola muszą być wypełnione.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          body: body,
          userId: Number(userId),
        }),
      });

      if (!response.ok) {
        throw new Error(`Błąd HTTP: ${response.status}`);
      }

      const responseData = await response.json();
      setCreatedPost(responseData);

      setTitle('');
      setBody('');
      setUserId('');
    } catch (err) {
      Alert.alert('Błąd połączenia', 'Nie udało się wysłać danych.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.postCard}>
      <Text style={styles.postId}>ID: {item.id}</Text>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody}>{item.body}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
    <Stack.Screen options={{ title:pageTitle }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Dodaj nowy post</Text>
          <TextInput
            style={styles.input}
            placeholder="Tytuł posta"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Treść posta"
            value={body}
            onChangeText={setBody}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="ID Użytkownika (np. 1)"
            value={userId}
            onChangeText={setUserId}
            keyboardType="numeric"
          />
          <View style={styles.buttonContainer}>
            <Button
              title={isSubmitting ? "Wysyłanie..." : "Wyślij"}
              onPress={createPost}
              disabled={isSubmitting}
            />
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.listContainer}>
          {createdPost ? (
            <View style={styles.successContainer}>
              <Text style={styles.successHeader}>Sukces! Utworzono post:</Text>
              <View style={styles.postCard}>
                <Text style={styles.postId}>ID: {createdPost.id}</Text>
                <Text style={styles.postTitle}>{createdPost.title}</Text>
                <Text style={styles.postBody}>{createdPost.body}</Text>
              </View>
              <Button
                title="Wróć do listy postów"
                color="#28a745"
                onPress={() => setCreatedPost(null)}
              />
            </View>
          ) : (
            <>
              <Text style={styles.headerText}>Lista postów</Text>
              {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
              ) : error ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                  <Button title="Spróbuj ponownie" onPress={fetchPosts} />
                </View>
              ) : (
                <FlatList
                  data={posts}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderItem}
                  contentContainerStyle={styles.flatListContent}
                />
              )}
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  formContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 15,
  },
  buttonContainer: {
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 4,
  },
  loader: {
    marginTop: 40,
  },
  errorContainer: {
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: 12,
    textAlign: 'center',
    fontSize: 16,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  postCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  postId: {
    fontSize: 12,
    color: '#888',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  postBody: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  successContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c8e6c9',
  },
  successHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 16,
  }
});