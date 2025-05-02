import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import PersonagemCard from '../components/PersonagemCard';
=======
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
>>>>>>> bb5e5464ad308ec1ac6d127659d7244cf71f78dd

export default function Personagens({ navigation }) {
  const [personagens, setPersonagens] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [carregando, setCarregando] = useState(false);
  const [temMais, setTemMais] = useState(true);

  const carregarPersonagens = async () => {
    if (carregando || !temMais) return;
<<<<<<< HEAD
    setCarregando(true);
    try {
      const res = await axios.get(`https://swapi.dev/api/people/?page=${pagina}`);
      setPersonagens(prev => [...prev, ...res.data.results]);
      setPagina(prev => prev + 1);
      if (!res.data.next) setTemMais(false);
=======

    setCarregando(true);
    try {
      const resposta = await axios.get(`https://swapi.dev/api/people/?page=${pagina}`);
      setPersonagens(prev => [...prev, ...resposta.data.results]);
      setPagina(prev => prev + 1);
      if (!resposta.data.next) setTemMais(false);
>>>>>>> bb5e5464ad308ec1ac6d127659d7244cf71f78dd
    } catch (erro) {
      console.error('Erro ao carregar personagens:', erro);
    }
    setCarregando(false);
  };

  useEffect(() => {
    carregarPersonagens();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={personagens}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
<<<<<<< HEAD
          <PersonagemCard
            personagem={item}
            onPress={() => navigation.navigate('Detalhes', { personagem: item })}
          />
        )}
        onEndReached={carregarPersonagens}
        onEndReachedThreshold={0.5}
        ListFooterComponent={carregando ? <ActivityIndicator color="#FFD700" /> : null}
=======
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Detalhes', { personagemUrl: item.url })}
          >
            <Text style={styles.nome}>{item.name}</Text>
          </TouchableOpacity>
        )}
        onEndReached={carregarPersonagens}
        onEndReachedThreshold={0.5}
        ListFooterComponent={carregando ? <ActivityIndicator size="large" color="#FFD700" /> : null}
>>>>>>> bb5e5464ad308ec1ac6d127659d7244cf71f78dd
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
<<<<<<< HEAD
=======
  card: {
    backgroundColor: '#1c1c1c',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  nome: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
>>>>>>> bb5e5464ad308ec1ac6d127659d7244cf71f78dd
});
