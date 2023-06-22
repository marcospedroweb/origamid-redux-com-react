// const initialState = 0;

// const FETCH_STARTED = 'user/FETCH_STARTED';
// const FETCH_SUCCESS = 'user/FETCH_SUCCESS';
// const FETCH_ERROR = 'user/FETCH_ERROR';

// export const fetch_started = () => ({ type: FETCH_STARTED });
// export const fetch_success = (payload) => ({ type: FETCH_SUCCESS, payload });
// export const fetch_error = (payload) => ({ type: FETCH_ERROR, payload });

// async function fetchUser(url) {
//   // Com a api do curso de React, puxe o usuário:
//   const response = await fetch('https://dogsapi.origamid.dev/json/api/user', {
//     method: 'GET',
//     headers: {
//       Authorization: 'Bearer ' + token,
//     },
//   });
//   const data = await response.json();
// }

// //Criação de reducer
// const user = immer.produce((state, action) => {
//   switch (action.type) {
//     case FETCH_STARTED:
//       return { ...state, loading: true };
//     case FETCH_SUCCESS:
//       return { loading: false, data: action.payload, error: null };
//     case FETCH_ERROR:
//       return { loading: false, error: action.payload, data: null };
//     default:
//       return state;
//   }
// }, initialState);

// export default user;
