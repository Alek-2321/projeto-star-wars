import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function PersonagemCard({ personagem, imagem, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {imagem ? (
        <Image source={{ uri: imagem }} style={styles.imagem} resizeMode="contain" />
      ) : (
        <View style={styles.placeholderImagem} />
      )}
      <Text style={styles.nome}>{personagem.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a1a',
    width: '48%',
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  imagem: {
    width: '80%',
    height: '70%',
  },
  placeholderImagem: {
    width: '80%',
    height: '70%',
    backgroundColor: '#333',
    borderRadius: 8,
  },
  nome: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 4,
  },
});
