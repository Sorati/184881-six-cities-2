import {favoritesAdapter} from '../app/data-adapter';

export const init = (dispatch, getState, api) => {
  return api
      .get(`/favorite`)
      .then((respond) => {
        dispatch({type: `SET_USER_FAVORITES`, payload: favoritesAdapter(respond.data)});
      });
};
