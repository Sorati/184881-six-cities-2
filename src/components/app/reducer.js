
export const INITIAL_STATE = {
  city: ``,
  sortType: `Popular`,
  initOffers: [],
  offers: [],
  activeCard: null,
  activeCardComments: [],
  activeCardNears: [],
  actualCities: [],
  isAuthorizationRequired: true,
  user: {},
  availableSorts: [`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`],
  userFavorites: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `CHANGE_CITY`:
      return {...state, city: action.payload};

    case `SET_INIT_OFFERS`:
      return {...state, initOffers: action.payload};

    case `CHANGE_OFFERS`:
      return {...state, offers: action.payload};

    case `CHANGE_ACTUAL_CITIES`:
      return {...state, actualCities: action.payload};

    case `CHANGE_SORT_TYPE`:
      return {...state, sortType: action.payload};

    case `SET_ACTIVE_CARD`:
      return {...state, activeCard: {...action.payload}};

    case `CHANGE_LOGIN_STATUS`:
      return {...state, isAuthorizationRequired: action.payload};

    case `SET_USER_INFO`:
      return {...state, user: action.payload};

    case `SET_USER_FAVORITES`:
      return {...state, userFavorites: action.payload};

    case `SET_ACTIVE_COMMENTS`:
      return {...state, activeCardComments: action.payload};

    case `SET_NEAR_CARDS`:
      return {...state, activeCardNears: action.payload};

    case `RESET`:
      return Object.assign({}, INITIAL_STATE);
  }

  return state;
};
