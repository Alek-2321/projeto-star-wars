import axios from 'axios';

const api = axios.create({
  baseURL: 'https://swapi.py4e.com/api/',
});


//A api indicada não estava acessível nem na minha máquina, na da Atitus e nem na máquina do meu colega, impossibilitando-nos de fazer os testes devidos. 
//Portanto usamos está provisória para os testes e funcionou perfeitamente. 
//Temos vídeo do app funcionando se precisar.  Abraço!!


export default api;

