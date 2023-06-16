const initialState = [
  {
    id: 1,
    nome: 'Design',
    completa: true,
  },
  {
    id: 2,
    nome: 'HTML',
    completa: false,
  },
  {
    id: 3,
    nome: 'CSS',
    completa: false,
  },
  {
    id: 4,
    nome: 'JavaScript',
    completa: false,
  },
];

//Constantes
const COMPLETAR_AULA = 'aulas/COMPLETAR_AULA';
const COMPLETAR_CURSO = 'aulas/COMPLETAR_CURSO';
const RESETAR_CURSO = 'aulas/RESETAR_CURSO';

//Action creators
export const completar_aula = () => ({ type: COMPLETAR_AULA });
export const completar_curso = () => ({ type: COMPLETAR_CURSO });
export const resetar_curso = () => ({ type: RESETAR_CURSO });

const aulas = immer.produce((state, action) => {
  switch (action.type) {
    case COMPLETAR_AULA:
      state.forEach((aula) => {
        if (aula.id === action.payload.id) aula.completa = true;
      });
      break;
    case COMPLETAR_CURSO:
      state.forEach((aula) => {
        aula.completa = true;
      });
      break;
    case RESETAR_CURSO:
      state.forEach((aula) => {
        aula.completa = false;
      });
      break;
  }
}, initialState);

export default aulas;
