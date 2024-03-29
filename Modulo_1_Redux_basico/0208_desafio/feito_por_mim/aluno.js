const initialState = {
  nome: 'André Rafael',
  email: 'andre@origamid.com',
  diasRestantes: 120,
};

const PEGAR_TOKEN = 'aluno/INCREMENTAR_TEMPO';
const REDUZIR_TEMPO = 'aluno/REDUZIR_TEMPO';
const MODIFICAR_EMAIL = 'aluno/MODIFICAR_EMAIL';

export const pegar_token = () => ({ type: PEGAR_TOKEN });
export const reduzir_tempo = () => ({ type: REDUZIR_TEMPO });
export const modificar_email = () => ({ type: MODIFICAR_EMAIL });

//Criação de reducers
const aluno = immer.produce((state, action) => {
  switch (action.type) {
    case PEGAR_TOKEN:
      state.diasRestantes = state.diasRestantes + 1;
      break;
    case REDUZIR_TEMPO:
      state.diasRestantes = state.diasRestantes - 1;
      break;
    case MODIFICAR_EMAIL:
      // state.email = action.payload;
      state.email = `andre${Number.parseInt(Math.random() * 1000)
        .toString()
        .padStart(4, '0')}@origamid.com`;
      break;
  }
}, initialState);

export default aluno;
