import {commentsAdapter} from '../app/data-adapter';

export const loadComments = (dispatch, getState, api, hotelId) => {
  return api
    .get(`/comments/${hotelId}`)
    .then((respond) => {
      dispatch({type: `SET_ACTIVE_COMMENTS`, payload: commentsAdapter(respond.data)});
    });
};
