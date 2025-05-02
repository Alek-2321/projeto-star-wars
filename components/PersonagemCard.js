// components/PersonagemCard.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function PersonagemCard({ personagem, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.nome}>{personagem.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
