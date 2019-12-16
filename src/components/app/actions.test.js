import * as ActionCreator from './actions';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {init} from './actions';
import mockOffers from '../../mocks/offers';

describe(`App actions creator work correctly`, () => {
  it(`App actions creator return change city type when city was changed`, () => {
    expect(ActionCreator.changeCity(`Moscow`)).toEqual({type: `CHANGE_CITY`, payload: `Moscow`});
  });

  it(`App actions creator return change sort type with sort type when sort type was changed`, () => {
    expect(ActionCreator.changeSortType(`Popular`)).toEqual({type: `CHANGE_SORT_TYPE`, payload: `Popular`});
  });

  it(`App actions creator return active card when active card was changed`, () => {
    expect(ActionCreator.setActiveCard(mockOffers[0])).toEqual({type: `SET_ACTIVE_CARD`, payload: mockOffers[0]});
  });

  it(`App actions creator return offers card when offers was changed`, () => {
    expect(ActionCreator.changeOffers(mockOffers)).toEqual({type: `CHANGE_OFFERS`, payload: mockOffers});
  });

  it(`Should make a correct API call to /hotels`, () => {
    const apiMock = new MockAdapter(axios);
    const dispatch = jest.fn();
    const getState = jest.fn();

    apiMock.onGet(`/hotels`)
    .reply(200, [mockOffers[0]]);

    init(dispatch, getState, axios).then(() => {
      expect(dispatch).toBeCalledTimes(4);
    });
  });

  it(`Should make a correct API call to /favorite`, () => {
    const apiMock = new MockAdapter(axios);
    const dispatch = jest.fn();
    const getState = jest.fn();

    apiMock.onPost(`/favorite/1/1`)
    .reply(200, {status: `success`});

    ActionCreator.changeFavoriteStatus(dispatch, getState, axios, 1, 1).then(() => {
      expect(dispatch).toBeCalledTimes(4);
    });
  });
});
