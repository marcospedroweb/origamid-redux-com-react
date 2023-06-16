// Usando o Redux (pode usar Immer ou Não).
// Crie uma store contendo os estados iniciais abaixo
// Crie as seguintes ações:
// aluno/INCREMENTAR_TEMPO, adiciona 1 dia de acesso
// aluno/REDUZIR_TEMPO, reduz 1 dia de acesso
// aluno/MODIFICAR_EMAIL(email), modifica o email do usuário
// aulas/COMPLETAR_AULA(id), completa a aula com base no ID passado
// aulas/COMPLETAR_CURSO, completa todas as aulas
// aulas/RESETAR_CURSO, reseta todas as aulas completas
// Crie constantes e action creators para as ações.
// Crie um reducer para aluno e um para aulas.
// Renderize na tela o nome, email, tempo restante e o total de aulas completas
// Configure a DevTools

import store from './configureStore.js';
import { completar_aula, completar_curso, resetar_curso } from './aulas.js';
import { incrementar_tempo, reduzir_tempo, modificar_email } from './aluno.js';

function render() {
  const { aluno, aulas } = store.getState();
  //Aluno
  const alunoNome = document.querySelector('#nome');
  const alunoEmail = document.querySelector('#email');
  const alunoDias = document.querySelector('#dias_restantes');
  alunoNome.textContent = aluno.nome;
  alunoEmail.textContent = aluno.email;
  alunoDias.textContent = aluno.diasRestantes;

  //Aulas
  const divMain = document.querySelector('.row');
  while (divMain.firstChild) {
    divMain.removeChild(divMain.firstChild);
  }
  aulas.forEach((aula) => {
    const divCol = document.createElement('div');
    divCol.classList.add(
      'col-12',
      'col-sm-3',
      'text-center',
      'mt-2',
      'align-self-stretch',
    );

    const divBg = document.createElement('div');
    divBg.classList.add('bg-primary', 'p-3', 'rounded', 'h-100');

    const titulo = document.createElement('h3');
    const spanNome = document.createElement('span');
    titulo.classList.add('text-white');
    spanNome.classList.add('fw-bold');
    spanNome.textContent = aula.nome;
    titulo.appendChild(document.createTextNode('Aula '));
    titulo.appendChild(spanNome);

    const id = document.createElement('p');
    const spanId = document.createElement('span');
    spanId.classList.add('fw-bold');
    spanId.textContent = aula.id;
    id.appendChild(document.createTextNode('Id: '));
    id.appendChild(spanId);

    const status = document.createElement('p');
    const spanStatus = document.createElement('span');
    spanStatus.classList.add('fw-bold');
    spanStatus.textContent = aula.completa ? 'Completa' : 'Em andamento';
    status.appendChild(document.createTextNode('Estado: '));
    status.appendChild(spanStatus);

    const btnCompletar = document.createElement('button');
    btnCompletar.classList.add('btn', 'btn-success', 'me-2');
    btnCompletar.textContent = 'Completar';
    btnCompletar.addEventListener('click', () => {
      store.dispatch({
        ...completar_aula(),
        payload: { id: aula.id, status: true },
      });
    });

    divBg.appendChild(titulo);
    divBg.appendChild(id);
    divBg.appendChild(status);
    if (!aula.completa) divBg.appendChild(btnCompletar);

    divCol.appendChild(divBg);

    divMain.appendChild(divCol);
  });
}
render();
store.subscribe(render);

//Completar curso
const btnCompletarTudo = document.querySelector('#completar');
btnCompletarTudo.addEventListener('click', () => {
  store.dispatch(completar_curso());
});

//Resetar curso
const btnResetar = document.querySelector('#resetar');
btnResetar.addEventListener('click', () => {
  store.dispatch(resetar_curso());
});

//Mudar dias
const aumentarDias = document.querySelector('#aumentar-dias');
const diminuirDias = document.querySelector('#diminuir-dias');

aumentarDias.addEventListener('click', () => {
  store.dispatch(incrementar_tempo());
});

diminuirDias.addEventListener('click', () => {
  store.dispatch(reduzir_tempo());
});

//Mudar email
const mudarEmail = document.querySelector('#mudar-email');
mudarEmail.addEventListener('click', () => {
  store.dispatch(modificar_email());
});
