// screens/Filmes.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function Filmes({ route }) {
  const { filmesUrl } = route.params;
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const responses = await Promise.all(filmesUrl.map(url => axios.get(url)));
        setFilmes(responses.map(r => r.data));
      } catch (erro) {
        console.error('Erro ao carregar filmes:', erro);
      }
    };
    fetchFilmes();
  }, []);

  if (!filmes.length) {
    return <ActivityIndicator size="large" color="#FFD700" />;
  }

  return (
    <ScrollView style={styles.container}>
      {filmes.map((f, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.titulo}>{f.title}</Text>
          <Text style={styles.info}>Diretor: {f.director}</Text>
          <Text style={styles.info}>Produtor: {f.producer}</Text>
          <Text style={styles.info}>Lançamento: {f.release_date}</Text>
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
