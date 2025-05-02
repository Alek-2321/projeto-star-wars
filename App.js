import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Personagens from './screens/Personagens';
import Detalhes from './screens/Detalhes';
import Filmes from './screens/Filmes';
import Naves from './screens/Naves';
import Sobre from './screens/Sobre';
import { Audio } from 'expo-audio';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const tocarMusica = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('./assets/star-wars-intro.mp3')
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
        <Stack.Screen name="Personagens" component={Personagens} options={{ title: 'PERSONAGENS', headerTitleAlign: 'center' }} />
        <Stack.Screen name="Detalhes" component={Detalhes} />
        <Stack.Screen name="Filmes" component={Filmes} />
        <Stack.Screen name="Naves" component={Naves} />
        <Stack.Screen name="Sobre" component={Sobre} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
