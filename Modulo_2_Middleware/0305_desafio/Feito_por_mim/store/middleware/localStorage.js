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

export default localStorage;
