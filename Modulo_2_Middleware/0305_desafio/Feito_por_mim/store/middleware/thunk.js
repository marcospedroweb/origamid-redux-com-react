const thunk = (store) => (next) => (action) => {
  // Aqui fazemos a verificação se o que foi recebido pelo [store.dispatch] é uma função
  if (typeof action === 'function') {
    //Caso seja uma função (no caso o fetch), executamos A FUNÇÃO ASYNC DENTRO "fetchUrl", passando os argumentos necessarios
    //No momento, é necessario apenas o [store.dispatch]
    //Mas em alguns casos, podemos precisar do getState()
    return action(store.dispatch, store.getState);
  } else {
    //Caso não seja função, provavelmente será o resultado o "fetch", então podemos retonar esse next, que provelmente será o resultado do fetch
    return next(action);
  }
};

export default thunk;
