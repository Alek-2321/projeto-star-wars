import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Audio } from 'expo-av';
import axios from 'axios';

const Stack = createNativeStackNavigator();

function PersonagensScreen({ navigation }) {
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

function DetalhesScreen({ route, navigation }) {
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
      <Text style={styles.info}>Cor dos olhos: {personagem.eye_color}</Text>
      <Text style={styles.info}>Ano de nascimento: {personagem.birth_year}</Text>
      <Text style={styles.info}>Gênero: {personagem.gender}</Text>

      {/* Botões para navegar para as telas de Naves e Filmes */}
      <Button
        title="Ver Naves"
        onPress={() => navigation.navigate('Naves', { navesUrl: personagem.starships })}
      />
      <Button
        title="Ver Filmes"
        onPress={() => navigation.navigate('Filmes', { filmesUrl: personagem.films })}
      />
    </View>
  );
}

function NavesScreen({ route }) {
  const { navesUrl } = route.params;
  const [naves, setNaves] = useState([]);

  useEffect(() => {
    const fetchNaves = async () => {
      try {
        const navesPromises = navesUrl.map(url => axios.get(url));
        const respostas = await Promise.all(navesPromises);
        setNaves(respostas.map(resposta => resposta.data));
      } catch (erro) {
        console.error('Erro ao carregar naves:', erro);
      }
    };
    if (navesUrl) {
      fetchNaves();
    }
  }, [navesUrl]);

  return (
    <View style={styles.container}>
      <Text style={styles.nome}>Naves</Text>
      {naves.length === 0 ? (
        <ActivityIndicator size="large" color="#FFD700" />
      ) : (
        naves.map((nave, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.nome}>{nave.name}</Text>
            <Text style={styles.info}>Modelo: {nave.model}</Text>
            <Text style={styles.info}>Fabricante: {nave.manufacturer}</Text>
          </View>
        ))
      )}
    </View>
  );
}

function FilmesScreen({ route }) {
  const { filmesUrl } = route.params;
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const filmesPromises = filmesUrl.map(url => axios.get(url));
        const respostas = await Promise.all(filmesPromises);
        setFilmes(respostas.map(resposta => resposta.data));
      } catch (erro) {
        console.error('Erro ao carregar filmes:', erro);
      }
    };
    if (filmesUrl) {
      fetchFilmes();
    }
  }, [filmesUrl]);

  return (
    <View style={styles.container}>
      <Text style={styles.nome}>Filmes</Text>
      {filmes.length === 0 ? (
        <ActivityIndicator size="large" color="#FFD700" />
      ) : (
        filmes.map((filme, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.nome}>{filme.title}</Text>
            <Text style={styles.info}>Data de lançamento: {filme.release_date}</Text>
            <Text style={styles.info}>Diretor: {filme.director}</Text>
            <Text style={styles.info}>Produtor: {filme.producer}</Text>
          </View>
        ))
      )}
    </View>
  );
}

export default function App() {
  useEffect(() => {
    const tocarMusica = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('./assets/audio/star-wars-intro.mp3')
        );
        await sound.playAsync();
      } catch (erro) {
        console.error('Erro ao tocar áudio:', erro);
      }
    };
    tocarMusica();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Personagens"
          component={PersonagensScreen}
          options={{
            title: 'Personagens',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#FFD700',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen name="Detalhes" component={DetalhesScreen} />
        <Stack.Screen name="Naves" component={NavesScreen} />
        <Stack.Screen name="Filmes" component={FilmesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
  info: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
});
