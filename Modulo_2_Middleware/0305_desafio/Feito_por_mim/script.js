import { fetchToken } from './store/Reducers/token.js';
import store from './store/configureStore.js';
// Organize o código em diferentes arquivos com type module
// Crie 2 reducers, token e user
// Ações:
// token/FETCH_STARTED, token/FETCH_SUCCESS, token/FETCH_ERROR
// user/FETCH_STARTED, user/FETCH_SUCCESS, user/FETCH_ERROR
// Crie constantes e action creators para cada ação
// Crie middlewares: Thunk e localStorage
// Com a api do curso de React, puxe o token:
// o user pode ser { username: 'dog', password: 'dog' }
// A api deve ir dentro da action creator das funções assíncronas
// Verifique se o token existe, caso exista dispare imediatamente
// a função para puxar o usuário. Se não existir, dispare a
// função para puxar o token e em seguida para puxar o usuário

const state = store.getState();
if (state.token.data === null)
  store.dispatch(fetchToken({ username: 'dog', password: 'dog' }));
