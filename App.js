import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Image } from 'react-native';
import Personagens from './screens/Personagens';
import Detalhes from './screens/Detalhes';
import Filmes from './screens/Filmes';
import Naves from './screens/Naves';
import Sobre from './screens/Sobre';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#FFD700',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 22 },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="Personagens"
          component={Personagens}
          options={({ navigation }) => ({
            title: 'PERSONAGENS',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Sobre')}>
                <Image
                  source={require('./assets/sobre-icon.png')}
                  style={{ width: 30, height: 30, marginRight: 10 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Detalhes"
          component={Detalhes}
          options={({ route }) => ({
            title: `DETALHES - ${route.params.name}`, // Exibe "DETALHES - [Nome do Personagem]"
          })}
        />
        <Stack.Screen
          name="Filmes"
          component={Filmes}
          options={({ route }) => ({
            title: `FILMES - ${route.params.title}`, // Exibe "FILMES - [Nome do Filme]"
            headerBackVisible: true, // Garante que o botão de voltar seja visível
          })}
        />
        <Stack.Screen
          name="Naves"
          component={Naves}
          options={({ route }) => ({
            title: `NAVES - ${route.params.title}`, // Exibe "NAVES - [Nome da Nave]"
            headerBackVisible: true, // Garante que o botão de voltar seja visível
          })}
        />
        <Stack.Screen
          name="Sobre"
          component={Sobre}
          options={{ title: 'SOBRE' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
