import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function Detalhes({ route, navigation }) {
  const { personagem } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.nome}>{personagem.name}</Text>
      <Text style={styles.info}>Altura: {personagem.height} cm</Text>
      <Text style={styles.info}>Peso: {personagem.mass} kg</Text>
      <Text style={styles.info}>Olhos: {personagem.eye_color}</Text>
      <Text style={styles.info}>Nascimento: {personagem.birth_year}</Text>
      <Text style={styles.info}>Gênero: {personagem.gender}</Text>

      <View style={styles.botoes}>
        <Button title="Ver Filmes" onPress={() => navigation.navigate('Filmes', { urls: personagem.films })} />
        <Button title="Ver Naves" onPress={() => navigation.navigate('Naves', { urls: personagem.starships })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  nome: { color: '#FFD700', fontSize: 24, fontWeight: 'bold' },
  info: { color: '#fff', fontSize: 16, marginTop: 8 },
  botoes: { marginTop: 30, gap: 10 },
});
