/*
[localStorage]
  Gravar algo no localStorage é um side-effect, assim como a manipulação do DOM. 
  Para isso podemos criar um middleware que irá lidar com a situação.
*/

// middleware
const localStorage = (store) => (next) => (action) => {
  //Esse middleware terá a função de salvar algo no localstorage
  //No nosso caso, será o token do usuario

  //Começamos armazenando o resultado da action
  const response = next(action);

  //Se o state TIVER o localStorage, ele adiciona o payload (token) com o nome da action no localStorage
  if (action.localStorage !== undefined)
    //Nesse caso, isso acontecerá quando estivermos colocando o token pela primeira vez, apos isso, isso já estará no localStorage
    window.localStorage.setItem(
      action.localStorage,
      JSON.stringify(action.payload),
    );
  //Se essa action, for um payload ou valor, ele retorna isso
  return response;
};

//Função para retornar um localStorage especifico
function getLocalStorage(key, initial) {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (error) {
    return initial;
  }
}

const initialState = {
  //Aqui verificamos se Já existe o token, se existir, colocamos no state
  token: getLocalStorage('token', null),
};

//Reducer adicionar o token
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      //Caso seja o type para adicionar o token, ele colocar esse token no state
      return { token: action.payload };
    default:
      return state;
  }
}

const { compose, applyMiddleware } = Redux;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(localStorage));
const store = Redux.createStore(reducer, enhancer);

const state = store.getState();
//Aqui estamos adicionando o token
//Verificamos se o state já tem token
if (state.token === null)
  store.dispatch({
    type: 'SET_TOKEN',
    payload: 'xxxx-xxxx',
    localStorage: 'token',
  });
