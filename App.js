import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const [personagens, setPersonagens] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function fetchDados() {
      try {
        const response = await fetch('https://swapi.dev/api/people/');
        const json = await response.json();
        setPersonagens(json.results);
      } catch (error) {
        console.error(error);
      } finally {
        setCarregando(false);
      }
    }

    fetchDados();
  }, []);

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={personagens}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Detalhes', { personagem: item })}
          >
            <Text style={styles.nome}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function DetalhesScreen({ route }) {
  const { personagem } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.nome}>{personagem.name}</Text>
      <Text>Altura: {personagem.height} cm</Text>
      <Text>Peso: {personagem.mass} kg</Text>
      <Text>Cor dos olhos: {personagem.eye_color}</Text>
      <Text>Cor da pele: {personagem.skin_color}</Text>
      <Text>Gênero: {personagem.gender}</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Início" component={HomeScreen} />
        <Stack.Screen name="Detalhes" component={DetalhesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
