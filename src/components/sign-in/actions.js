const HTTP_SUCCESS_STATUS = 200;

export const changeLoginRequired = (isRequired) => ({
  type: `CHANGE_LOGIN_STATUS`,
  payload: isRequired
});

export const login = (state, dispatch, getState, api) => {
  return api
    .post(`/login`, {
      email: state.login,
      password: state.password
    })
    .then((respond) => {
      if (respond.status === HTTP_SUCCESS_STATUS) {
        dispatch(changeLoginRequired(!getState().app.isAuthorizationRequired));

        dispatch({
          type: `SET_USER_INFO`,
          payload: respond.data
        });
      }
    });
};
