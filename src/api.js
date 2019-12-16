import axios from 'axios';
import store from './store';
import {changeLoginRequired} from './components/sign-in/actions';

const HttpStatusCodes = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401
};

const createAPI = () => {
  const api = axios.create({baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`, timeout: 5000, withCredentials: true});

  const onSuccess = (response) => response;
  const onFail = (err) => {
    switch (err.response.status) {
      case HttpStatusCodes.UNAUTHORIZED:

        store.dispatch(changeLoginRequired(true));
        return err;

      case HttpStatusCodes.BAD_REQUEST:

        store.dispatch(changeLoginRequired(true));
        return err;

      default:
        return err;
    }
  };

  api
    .interceptors
    .response
    .use(onSuccess, onFail);

  return api;
};

export {createAPI};
