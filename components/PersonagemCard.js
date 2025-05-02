import React from 'react';
<<<<<<< HEAD
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
=======
import { View, Text, StyleSheet } from 'react-native';

const PersonagemCard = ({ personagem }) => {
  return (
    <View style={styles.card}>
      <Text>{personagem.name}</Text>
      <Text>{personagem.birth_year}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Alterado para boxShadow
  },
});

export default PersonagemCard;
>>>>>>> bb5e5464ad308ec1ac6d127659d7244cf71f78dd
