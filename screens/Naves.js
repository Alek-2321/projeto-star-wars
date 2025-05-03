import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

export default function Naves({ route, navigation }) {
  const { navesUrl, characterName } = route.params;
  const [naves, setNaves] = useState(null);

  useEffect(() => {
    const fetchNaves = async () => {
      try {
        const respostas = await Promise.all(navesUrl.map(url => axios.get(url)));
        setNaves(respostas.map(resposta => resposta.data));
        // Atualizando o título do cabeçalho para "Naves - nome do personagem"
        navigation.setOptions({
          title: `Naves - ${characterName}`,
        });
      } catch (erro) {
        console.error('Erro ao carregar naves:', erro);
      }
    };

    fetchNaves();
  }, [navesUrl, characterName, navigation]);

  if (!naves) {
    return <ActivityIndicator size="large" color="#FFD700" />;
  }

  return (
    <ScrollView style={styles.container}>
      {naves.map(nave => (
        <View key={nave.url} style={styles.cardContainer}>
          <Text style={styles.tituloNave}>{nave.name}</Text>
          <Text style={styles.info}>Modelo: {nave.model}</Text>
          <Text style={styles.info}>Fabricante: {nave.manufacturer}</Text>
          <Text style={styles.info}>Custo: {nave.cost_in_credits} créditos</Text>
          <Text style={styles.info}>Capacidade de tripulação: {nave.crew}</Text>
          <Text style={styles.info}>Capacidade de passageiros: {nave.passengers}</Text>
          <Text style={styles.info}>Classe: {nave.starship_class}</Text>
          <Text style={styles.info}>Comprimento: {nave.length} metros</Text>
          <Text style={styles.info}>Velocidade: {nave.max_atmosphering_speed} km/h</Text>
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
  tituloNave: {
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
