import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';


//A api indicada não estava acessível nem na minha máquina, na da Atitus e nem na máquina do meu colega, impossibilitando-nos de fazer os testes devidos. 
//Portanto usamos está provisória para os testes e funcionou perfeitamente. 
//Temos vídeo do app funcionando se precisar.  Abraço!!


export default function Sobre() {
  const soundRef = useRef();

  useEffect(() => {
    const tocarMusica = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/star-wars-intro.mp3')
      );
      soundRef.current = sound;
      await sound.playAsync();
    };

    tocarMusica();

    return () => {
      if (soundRef.current) {
        soundRef.current.stopAsync();
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Desenvolvedores</Text>

      <View style={styles.card}>
        <Text style={styles.nome}>Alex Rodrigues Gonçalves</Text>
        <Text style={styles.info}>RA: 1136919</Text>
        <Text style={styles.info}>Email: 1136919@atitus.edu.br</Text>
        <Text style={styles.info}>Função: Dev</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.nome}>João Vitor Parizotto Benedetti</Text>
        <Text style={styles.info}>RA: 1136044</Text>
        <Text style={styles.info}>Email: 1136044@atitus.edu.br</Text>
        <Text style={styles.info}>Função: Dev</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  titulo: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
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
    marginTop: 4,
  },
});
