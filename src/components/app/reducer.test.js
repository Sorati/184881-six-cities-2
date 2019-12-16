import appReducer, {INITIAL_STATE} from './reducer';
import mockOffers from '../../mocks/offers';

describe(`App reducer work correctly`, () => {
  it(`App reducer without additional parameters should return initial state`, () => {
    expect(appReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it(`App reducer with city parameter should change state city`, () => {

    expect(appReducer(INITIAL_STATE, {type: `CHANGE_CITY`, payload: `Moscow`})).toEqual({...INITIAL_STATE, city: `Moscow`});
  });

  it(`App reducer with init offers parameter should set offers`, () => {
    expect(appReducer(INITIAL_STATE, {type: `SET_INIT_OFFERS`, payload: mockOffers})).toEqual({...INITIAL_STATE, offers: mockOffers});
  });

  it(`App reducer with offers parameter should change state offers`, () => {
    expect(appReducer(INITIAL_STATE, {type: `CHANGE_OFFERS`, payload: mockOffers})).toEqual({...INITIAL_STATE, offers: mockOffers});
  });

  it(`App reducer with sort parameter should change state sort type`, () => {
    expect(appReducer(INITIAL_STATE, {type: `CHANGE_SORT_TYPE`, payload: `test`})).toEqual({...INITIAL_STATE, sortType: `test`});
  });

  it(`App reducer with active card should change active card`, () => {
    expect(appReducer(INITIAL_STATE, {type: `SET_ACTIVE_CARD`, payload: mockOffers[0]})).toEqual({...INITIAL_STATE, activeCard: mockOffers[0]});
  });

  it(`App reducer with authorization require status should change login status`, () => {
    expect(appReducer(INITIAL_STATE, {type: `CHANGE_LOGIN_STATUS`, payload: true})).toEqual({...INITIAL_STATE, isAuthorizationRequired: true});
  });

  it(`App reducer with user info should change user info`, () => {
    expect(appReducer(INITIAL_STATE, {type: `SET_USER_INFO`, payload: {
      id: 1,
      name: `test`
    }})).toEqual({...INITIAL_STATE, user: {
      id: 1,
      name: `test`
    }});
  });

  it(`App reducer with user favorites offers should change user favorites`, () => {
    expect(appReducer(INITIAL_STATE, {type: `SET_USER_FAVORITES`, payload: mockOffers})).toEqual({...INITIAL_STATE, userFavorites: mockOffers});
  });

  it(`App reducer with comments should change acrive card comments`, () => {
    expect(appReducer(INITIAL_STATE, {type: `SET_ACTIVE_COMMENTS`, payload: [`test comment`, `test comment 2`]})).toEqual({...INITIAL_STATE, activeCardComments: [`test comment`, `test comment 2`]});
  });

  it(`App reducer with near offers should change near offers for active offer`, () => {
    expect(appReducer(INITIAL_STATE, {type: `SET_NEAR_CARDS`, payload: mockOffers.slice(0, 3)})).toEqual({...INITIAL_STATE, activeCardNears: mockOffers.slice(0, 3)});
  });

  it(`App reducer with reset type should reset state`, () => {
    expect(appReducer(INITIAL_STATE, {type: `RESET`, payload: `test`})).toEqual(INITIAL_STATE);
  });
});
