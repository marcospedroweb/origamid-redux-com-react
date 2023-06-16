/*
  [Currying]  
    Uma função curried permite passarmos um argumento por vez, ao invés de todos de uma vez.
*/

/*
  [applyMiddleware]  
    Essa função é uma currying function
    O Middleware ocorre entre o momento que a ação é disparada e antes dela chegar ao reducer. Ele é aplicado através da função Redux.applyMiddleware.
*/
// considere esse reducer para os próximos exemplos
function reducer(state = 0, action) {
  console.log('reducer executado');
  switch (action.type) {
    case 'INCREMENTAR':
      return state + 1;
    case 'REDUZIR':
      return state - 1;
    default:
      return state;
  }
}
// middleware, recebe store, next e action.
//Essa função será entre o momento do reducer e a ação
const logger = (store) => (next) => (action) => {
  //Aqui, você coloca tudo que você queira que seja executado sempre que ocorrer uma ação
  //Ex: ter acesso ao estado inicial, o proximo estado e entre outros
  console.group(action.type);
  console.log('middleware');
  console.log('ACTION', action);
  console.log('STATE ANTERIOR', store.getState());
  // temos sempre que chamar o next(action), para que ocorra a ação para o próximo middleware
  const result = next(action);
  console.log('NOVO STATE', store.getState());
  console.groupEnd();

  // sempre temos que retornar o resultado desse next(action)
  return result;
  // se retornamos algo que não seja o resultado, quando fomos ver o que o dispatch retornou, será o que retornamos aqui
  return 'teste';
};

// Configura o middleware, podemos passar quantos quisermos.
const middleware = Redux.applyMiddleware(logger);

// Passar o middleware como segundo ou tercerio argumento do createStore
// Se o segundo argumento não for uma função, este será considerado
// o estado inicial da aplicação.
const store = Redux.createStore(reducer, middleware);
//[store] sintaxe: createStore([reducer], [estado inicial], [potenciador dev tools ou middleware])

store.dispatch({ type: 'INCREMENTAR' });
store.dispatch({ type: 'INCREMENTAR' });
store.dispatch({ type: 'INCREMENTAR' });
store.dispatch({ type: 'INCREMENTAR' });
store.dispatch({ type: 'REDUZIR' });
store.dispatch({ type: 'REDUZIR' });
//Com o middleware, conseguimos receber o retorno do dispatch, que será o mesmo que retornamos lá na middleware
const resultMiddleware = store.dispatch({ type: 'REDUZIR' });
console.log(resultMiddleware);

/* 
[Compose]
  O segundo ou terceiro argumento de createStore é considerado um enhancer. Assim como um middleware, a função do devtools também é um enhancer da store. Para passarmos mais de um, devemos utilizar a função Redux.compose()
*/

// Desestrutução das funções do Redux (não é necessário, podemos usar Redux.compose)
const { compose, applyMiddleware } = Redux;

// Verifica se __REDUX_DEVTOOLS_EXTENSION__COMPOSE__ existe, se nõa usa o compose puro.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Aplica o Middleware com o compose
const enhancer = composeEnhancers(applyMiddleware(logger));

// Utiliza a devTools + middleware como enhancer da store
const storeWithCompose = Redux.createStore(reducer, enhancer);
