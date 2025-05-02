// screens/Personagens.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import PersonagemCard from '../components/PersonagemCard';

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
          <PersonagemCard
            personagem={item}
            onPress={() => navigation.navigate('Detalhes', { personagemUrl: item.url })}
          />
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
});
