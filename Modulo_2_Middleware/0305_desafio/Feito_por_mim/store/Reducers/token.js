import getLocalStorage from '../helper/getLocalStorage.js';

const initialState = {
  loading: false,
  data: getLocalStorage('token', null),
  error: null,
};

const FETCH_STARTED = 'token/FETCH_STARTED';
const FETCH_SUCCESS = 'token/FETCH_SUCCESS';
const FETCH_ERROR = 'token/FETCH_ERROR';

export const fetch_started = () => ({ type: FETCH_STARTED });
export const fetch_success = (payload) => ({
  type: FETCH_SUCCESS,
  payload,
  localStorage: 'token',
});
export const fetch_error = (payload) => ({ type: FETCH_ERROR, payload });

export function fetchToken(user) {
  const url = 'https://dogsapi.origamid.dev/json/jwt-auth/v1/token';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  return async (dispatch) => {
    try {
      dispatch(fetch_started());
      const { token } = await fetch(url, options).then((r) => r.json());
      dispatch(fetch_success(token));
    } catch (error) {
      dispatch(fetch_error(error.message));
    }
  };
}

//Criação de reducer
const token = immer.produce((state, action) => {
  switch (action.type) {
    case FETCH_STARTED:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case FETCH_ERROR:
      return { loading: false, error: action.payload, data: null };
    default:
      return state;
  }
}, initialState);

export default token;
