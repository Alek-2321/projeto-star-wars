// screens/Detalhes.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function Detalhes({ route, navigation }) {
  const { personagemUrl } = route.params;
  const [personagem, setPersonagem] = useState(null);

  useEffect(() => {
    const fetchPersonagem = async () => {
      try {
        const resposta = await axios.get(personagemUrl);
        setPersonagem(resposta.data);
      } catch (erro) {
        console.error('Erro ao carregar personagem:', erro);
      }
    };
    fetchPersonagem();
  }, [personagemUrl]);

  if (!personagem) {
    return <ActivityIndicator size="large" color="#FFD700" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.nome}>{personagem.name}</Text>
      <Text style={styles.info}>Altura: {personagem.height} cm</Text>
      <Text style={styles.info}>Peso: {personagem.mass} kg</Text>
      <Text style={styles.info}>Olhos: {personagem.eye_color}</Text>
      <Text style={styles.info}>Nascimento: {personagem.birth_year}</Text>
      <Text style={styles.info}>Gênero: {personagem.gender}</Text>

      <View style={styles.botoes}>
        <Button title="Ver Filmes" onPress={() => navigation.navigate('Filmes', { filmesUrl: personagem.films })} />
        <Button title="Ver Naves" onPress={() => navigation.navigate('Naves', { navesUrl: personagem.starships })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  nome: { color: '#FFD700', fontSize: 22, fontWeight: 'bold' },
  info: { color: '#fff', fontSize: 16, marginTop: 5 },
  botoes: { marginTop: 20, gap: 10 },
});
