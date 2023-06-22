/* 
[Operações Assíncronas]
  O reducer deve ser uma função pura, sem efeitos colaterais. Por isso não fazemos requisições http diretamente no mesmo.
*/

//Não devemos fazer isso
function reducerErrado(state = null, action) {
  switch (action.type) {
    case 'FETCH_DATA':
      // fetch é um efeito colateral
      const data = fetch('https://dogsapi.origamid.dev/json/api/photo').then(
        (r) => r.json(),
      );
      // data é uma Promise
      return data;
    default:
      return state;
  }
}

// store.dispatch({ type: 'FETCH_DATA' });

//---------------------
//UMA FORMA DE SER FEITA
const initialState = {
  loading: false,
  data: null,
  error: null,
};

function reducer1(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_STARTED':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { loading: false, data: action.payload, error: null };
    case 'FETCH_ERROR':
      return { loading: false, error: action.payload, data: null };
    default:
      return state;
  }
}

const composeEnhancers1 =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
// já vamos criar um Middleware, deixe assim por enquanto
const enhancer1 = composeEnhancers1(Redux.applyMiddleware());

const store1 = Redux.createStore(reducer1, enhancer1);

async function fetchUrl1(dispatch, url) {
  try {
    //Altera o estado, mudando para que o Fetch começou
    dispatch({ type: 'FETCH_STARTED' });
    const data = await fetch(url).then((r) => r.json());
    //Em caso de sucesso, retorna fetch feito e os dados do fetch
    dispatch({ type: 'FETCH_SUCCESS', payload: data });
  } catch (error) {
    //Em caso de erro, retorna que deu erro e a mensagem de erro
    dispatch({ type: 'FETCH_ERROR', payload: error.message });
  }
}
fetchUrl1(store1.dispatch, 'https://dogsapi.origamid.dev/json/api/photo');

function render() {
  const state = store1.getState();
  console.log(state);
}
render();
//Subscribe, função que é executada sempre que o estado muda
store1.subscribe(render);

console.log('--------------------------------------------');
/* 
[ANOTAÇÃO]
  A forma feita acima funciona normalmente, mas não é uma boa pratica usar dessa maneira.
  Até porque, na função, estamos mudando o [estado] (isso só deve ser feito dentro de um [reducer]) e estamos mudando a forma que o [store.dispatch] está sendo chamado (e para piorar, sempre temos que passar o dispatch na função)
  Fazer isso, acaba "fugindo do padrão"
*/

/* 
[Redux Thunk]
  Com base no que está acima, vamos utilizar o thunk para fazer algo semelhante, mas melhor.

  Podemos utilizar um middleware para contornar a obrigação de sempre enviarmos objetos via dispatch. 
  No middleware podemos identificar a action, e verificar se a mesma é uma função. Caso ela seja uma função podemos ativá-la.
*/

//[reducer] tem a função de atualizar o estado, apenas retornando o resultado para o dispatch (geralmente)
function reducer(state = initialState, action) {
  //Reducer tem 2 parametros, o state (que já está dentro do store.dispatch)
  //E o [action], que geralmente vai ser um objeto com {type, payload}
  //{type}, seria o tipo da ação, ou seja, o que será feito, mandando a string para o switch
  //{payload}, seria o resultado que ira interagir com o [state], por exemplo, em um contador: state + payload
  switch (action.type) {
    //Como dito antes, pelo switch nos escolhemos o tipo, e retornamos o resultado, que o mesmo passar a ser o novo valor do state
    case 'FETCH_STARTED':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { loading: false, data: action.payload, error: null };
    case 'FETCH_ERROR':
      return { loading: false, error: action.payload, data: null };
    default:
      return state;
  }
}

// Action Creator, retorna uma função ao invés de um objeto
// fetchUrl sendo usado da maneira correta
function fetchUrl(url) {
  //Aqui temos uma função que retorna outra função
  return async (dispatch) => {
    try {
      dispatch({ type: 'FETCH_STARTED' });
      const data = await fetch(url).then((r) => r.json());
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };
}

//Esse [thunk], é um middleware criado para podermos lidar com funções assincronas
const thunk = (store) => (next) => (action) => {
  //Aqui fazemos a verificação se o que foi recebido pelo [store.dispatch] é uma função
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

//Aqui, estou descontruindo o objeto {Redux}
const { compose, applyMiddleware } = Redux;

//Faço a verificação se aquele navegador há a ferramenta de DEBUG no Redux
//Se tiver, eu uso o "compose" dessa ferramenta para incrementar middlewares,
//Se não, apenas retorna o (compose) que é usado para combinar funções
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Aqui, uso o compose (nativo ou da ferramenta), para aplicar os midleware
//[applyMiddleware] é onde passo uma ou varias middleware para serem usadas
//[middleware] são funções que serão executadas entre o acontecimento do reducer e da action dele
const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = Redux.createStore(reducer, enhancer);

store.dispatch(fetchUrl('https://dogsapi.origamid.dev/json/api/photo'));
/* 
[Por que estamos executando uma função no dispatch?]
  Porque, o [store.dispatch] DEVE receber um objeto.
  No nosso caso, queremos usar uma função assincrona, que a mesma enquanto não estiver solucionada, retona uma função
  Se deixar dessa forma, trazendo uma função, o Redux dá erro.

  Por isso, utilizamos o "thunk", com ele, podemos fazer uma verificação
  Se o que o fetch retorna é uma função, ele NÃO executa o dispatch
  Se o que o fetch retorna é um objeto, ele EXECUTA o dispatch
*/
