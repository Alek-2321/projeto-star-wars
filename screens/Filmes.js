import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

export default function Filmes({ route }) {
  const { urls } = route.params;
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    Promise.all(urls.map(url => axios.get(url)))
      .then(results => setFilmes(results.map(r => r.data)))
      .catch(console.error);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {filmes.map((f, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.titulo}>{f.title}</Text>
          <Text style={styles.info}>Diretor: {f.director}</Text>
          <Text style={styles.info}>Produtor: {f.producer}</Text>
          <Text style={styles.info}>Data de lançamento: {f.release_date}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  card: { backgroundColor: '#1c1c1c', padding: 16, borderRadius: 10, marginBottom: 10 },
  titulo: { color: '#FFD700', fontSize: 18, fontWeight: 'bold' },
  info: { color: '#fff', marginTop: 5 },
});
