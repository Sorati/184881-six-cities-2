import {commentsAdapter} from '../app/data-adapter';

export const sendComment = (dispatch, getState, api, hotelId, data) => {

  return api
        .post(`/comments/${hotelId}`, data)
        .then((respond) => {
          dispatch({type: `SET_ACTIVE_COMMENTS`, payload: commentsAdapter(respond.data)});
        });
};
