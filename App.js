import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Image } from 'react-native';
import Personagens from './screens/Personagens';
import Detalhes from './screens/Detalhes';
import Filmes from './screens/Filmes';
import Naves from './screens/Naves';
import Sobre from './screens/Sobre';

//A api indicada não estava acessível nem na minha máquina, na da Atitus e nem na máquina do meu colega, impossibilitando-nos de fazer os testes devidos. 
//Portanto usamos está provisória para os testes e funcionou perfeitamente. 
//Temos vídeo do app funcionando se precisar.  Abraço!!

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
            title: `DETALHES - ${route.params.name}`, 
          })}
        />
        <Stack.Screen
          name="Filmes"
          component={Filmes}
          options={({ route }) => ({
            title: `FILMES - ${route.params.title}`, 
            headerBackVisible: true, 
          })}
        />
        <Stack.Screen
          name="Naves"
          component={Naves}
          options={({ route }) => ({
            title: `NAVES - ${route.params.title}`, 
            headerBackVisible: true, 
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
