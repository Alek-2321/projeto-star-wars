import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

export default function Personagens({ navigation }) {
  const [personagens, setPersonagens] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [carregando, setCarregando] = useState(false);
  const [temMais, setTemMais] = useState(true);

  const carregarPersonagens = async () => {
    if (carregando || !temMais) return;

    setCarregando(true);
    try {
      const resposta = await axios.get(`https://swapi.dev/api/people/?page=${pagina}`);
      setPersonagens(prev => [...prev, ...resposta.data.results]);
      setPagina(prev => prev + 1);
      if (!resposta.data.next) setTemMais(false);
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
});
