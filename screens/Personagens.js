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
  const [imagens, setImagens] = useState([]);

  const carregarPersonagens = async () => {
    if (carregando || !temMais) return;
    setCarregando(true);
    try {
      const resposta = await axios.get(`https://swapi.py4e.com/api/people/?page=${pagina}`);
      setPersonagens(prev => [...prev, ...resposta.data.results]);
      setPagina(prev => prev + 1);
      if (!resposta.data.next) setTemMais(false);
    } catch (erro) {
      console.error('Erro ao carregar personagens:', erro);
    }
    setCarregando(false);
  };

  const carregarImagens = async () => {
    try {
      const resposta = await axios.get('https://akabab.github.io/starwars-api/api/all.json');
      setImagens(resposta.data);
    } catch (erro) {
      console.error('Erro ao carregar imagens:', erro);
    }
  };

  useEffect(() => {
    carregarPersonagens();
    carregarImagens();
  }, []);

  const obterImagem = (nome) => {
    const personagem = imagens.find(p => p.name.toLowerCase() === nome.toLowerCase());
    return personagem?.image || null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={personagens}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <PersonagemCard
            personagem={item}
            imagem={obterImagem(item.name)}
            onPress={() => navigation.navigate('Detalhes', { personagemUrl: item.url })}
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
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
    padding: 8,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});
