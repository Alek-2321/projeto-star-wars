<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

export default function Naves({ route }) {
  const { urls } = route.params;
  const [naves, setNaves] = useState([]);

  useEffect(() => {
    Promise.all(urls.map(url => axios.get(url)))
      .then(results => setNaves(results.map(r => r.data)))
      .catch(console.error);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {naves.map((n, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.titulo}>{n.name}</Text>
          <Text style={styles.info}>Modelo: {n.model}</Text>
          <Text style={styles.info}>Fabricante: {n.manufacturer}</Text>
          <Text style={styles.info}>Classe: {n.starship_class}</Text>
        </View>
      ))}
    </ScrollView>
=======
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Naves() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aqui estarão as naves!</Text>
    </View>
>>>>>>> bb5e5464ad308ec1ac6d127659d7244cf71f78dd
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  card: { backgroundColor: '#1c1c1c', padding: 16, borderRadius: 10, marginBottom: 10 },
  titulo: { color: '#FFD700', fontSize: 18, fontWeight: 'bold' },
  info: { color: '#fff', marginTop: 5 },
=======
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#FFD700',
    fontSize: 18,
  },
>>>>>>> bb5e5464ad308ec1ac6d127659d7244cf71f78dd
});
