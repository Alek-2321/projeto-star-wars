import React from 'react';
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
