import token from './Reducers/token.js';
import localStorage from './middleware/localStorage.js';
import thunk from './middleware/thunk.js';
// import user from './Reducers/user.js';

//Esse [thunk], é um middleware criado para podermos lidar com funções assincronas

//Combinando reducers
const reducer = Redux.combineReducers({ token });

// Aqui, estou descontruindo o objeto {Redux}
const { createStore, compose, applyMiddleware } = Redux;

//Faço a verificação se aquele navegador há a ferramenta de DEBUG no Redux
//Se tiver, eu uso o "compose" dessa ferramenta para incrementar middlewares,
//Se não, apenas retorna o (compose) que é usado para combinar funções
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Aqui, uso o compose (nativo ou da ferramenta), para aplicar os midleware
//[applyMiddleware] é onde passo uma ou varias middleware para serem usadas
//[middleware] são funções que serão executadas entre o acontecimento do reducer e da action dele
const enhancer = composeEnhancers(applyMiddleware(thunk, localStorage));

const store = Redux.createStore(reducer, enhancer);

export default store;
