import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import axios from 'axios';


//A api indicada não estava acessível nem na minha máquina, na da Atitus e nem na máquina do meu colega, impossibilitando-nos de fazer os testes devidos. 
//Portanto usamos está provisória para os testes e funcionou perfeitamente. 
//Temos vídeo do app funcionando se precisar.  Abraço!!


export default function Detalhes({ route, navigation }) {
  const { personagemUrl } = route.params;
  const [personagem, setPersonagem] = useState(null);
  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    const fetchPersonagem = async () => {
      try {
        const resposta = await axios.get(personagemUrl);
        const dados = resposta.data;
        setPersonagem(dados);

        navigation.setOptions({
          title: `Detalhes - ${dados.name}`,
        });

        const responseImg = await axios.get('https://akabab.github.io/starwars-api/api/all.json');
        const personagemEncontrado = responseImg.data.find(p => p.name === dados.name);
        if (personagemEncontrado) {
          setImagem(personagemEncontrado.image);
        }
      } catch (erro) {
        console.error('Erro ao carregar personagem:', erro);
      }
    };
    fetchPersonagem();
  }, [personagemUrl]);

  if (!personagem) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      {imagem && <Image source={{ uri: imagem }} style={styles.imagem} resizeMode="contain" />}
      <Text style={styles.nome}>{personagem.name}</Text>
      <Text style={styles.info}>Altura: {personagem.height} cm</Text>
      <Text style={styles.info}>Peso: {personagem.mass} kg</Text>
      <Text style={styles.info}>Olhos: {personagem.eye_color}</Text>
      <Text style={styles.info}>Nascimento: {personagem.birth_year}</Text>
      <Text style={styles.info}>Gênero: {personagem.gender}</Text>

      <View style={styles.botoes}>
        <TouchableOpacity
          style={styles.botao}
          onPress={() =>
            navigation.navigate('Filmes', {
              filmesUrl: personagem.films,
              characterName: personagem.name,
            })
          }
        >
          <Text style={styles.textoBotao}>Ver Filmes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botao}
          onPress={() =>
            navigation.navigate('Naves', {
              navesUrl: personagem.starships,
              characterName: personagem.name,
            })
          }
        >
          <Text style={styles.textoBotao}>Ver Naves</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#000',
  },
  container: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  imagem: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  nome: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 2,
  },
  botoes: {
    marginTop: 20,
    width: '100%',
    gap: 10,
  },
  botao: {
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
