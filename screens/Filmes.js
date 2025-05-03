import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

export default function Filmes({ route, navigation }) {
  const { filmesUrl, characterName } = route.params;
  const [filmes, setFilmes] = useState(null);

  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const respostas = await Promise.all(filmesUrl.map(url => axios.get(url)));
        setFilmes(respostas.map(resposta => resposta.data));
        navigation.setOptions({
          title: `Filmes - ${characterName}`,
        });
      } catch (erro) {
        console.error('Erro ao carregar filmes:', erro);
      }
    };

    fetchFilmes();
  }, [filmesUrl, characterName, navigation]);

  if (!filmes) {
    return <ActivityIndicator size="large" color="#FFD700" />;
  }

  return (
    <ScrollView style={styles.container}>
      {filmes.map(filme => (
        <View key={filme.url} style={styles.cardContainer}>
          <Text style={styles.tituloFilme}>{filme.title}</Text>
          <Text style={styles.info}>Episódio: {filme.episode_id}</Text>
          <Text style={styles.info}>Ano de Lançamento: {filme.release_date}</Text>
          <Text style={styles.info}>Diretor: {filme.director}</Text>
          <Text style={styles.info}>Produtores: {filme.producer}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  cardContainer: {
    backgroundColor: '#222',
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  tituloFilme: {
    color: '#FFD700',
    fontSize: 22,
    fontWeight: 'bold',
  },
  info: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
});
