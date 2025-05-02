import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Sobre() {
  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <Text style={styles.texto}>
        Este aplicativo foi criado com React Native e Expo, utilizando a API SWAPI para explorar o universo de Star Wars.
      </Text>
=======
      <Text style={styles.text}>Informações sobre o app Star Wars!</Text>
>>>>>>> bb5e5464ad308ec1ac6d127659d7244cf71f78dd
    </View>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', padding: 20 },
  texto: { color: '#fff', fontSize: 16, textAlign: 'center' },
=======
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#FFD700',
    fontSize: 18,
  },
>>>>>>> bb5e5464ad308ec1ac6d127659d7244cf71f78dd
});
