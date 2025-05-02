import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Filmes() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aqui estarão os filmes!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
