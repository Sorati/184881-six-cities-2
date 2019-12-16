import {offersAdapter} from './data-adapter';
import {getActualCities} from '../../utils';
import store from '../../store';

const NEAR_CARDS_NUM = 3;
const FavoriteStatuses = {
  ADD: 1,
  REMOVE: 0
};

export const changeSortType = (option) => ({type: `CHANGE_SORT_TYPE`, payload: option});
export const changeCity = (city) => ({type: `CHANGE_CITY`, payload: city});
export const setActiveCard = (card) => ({type: `SET_ACTIVE_CARD`, payload: card});

export const changeOffers = (offers) => ({
  type: `CHANGE_OFFERS`,
  payload: offers
});

export const changeNearCardsByCurrentCity = () => ({
  type: `SET_NEAR_CARDS`,
  payload: store.getState().app.initOffers.filter((item) => item.city === store.getState().app.activeCard.city).slice(0, NEAR_CARDS_NUM)
});

export const findActiveCard = (id) => {
  return store.getState().app.initOffers.find((item) => item.id === id);
};

export const changeOffersByCurrentCity = () => changeOffers(store.getState().app.initOffers.filter((item) => item.city === store.getState().app.city));

export const changeFavoriteStatus = (dispatch, getState, api, hotelId, status) => {

  let statusCode = FavoriteStatuses.ADD;

  if (status) {
    statusCode = FavoriteStatuses.REMOVE;
  }

  return api
      .post(`/favorite/${hotelId}/${statusCode}`)
      .then((respond) => {

        const newCard = offersAdapter([respond.data])[0];
        const initOffers = getState().app.initOffers;
        let cardIndex;

        initOffers.forEach((item, index) => {
          if (item.id === newCard.id) {
            cardIndex = index;
          }
        });

        initOffers[cardIndex].isFavorite = newCard.isFavorite;

        dispatch({type: `SET_INIT_OFFERS`, payload: initOffers});
        dispatch(changeOffersByCurrentCity());
        dispatch(setActiveCard(initOffers[cardIndex]));
        dispatch(changeNearCardsByCurrentCity());
      });
};

export const init = (dispatch, getState, api) => {
  return api
    .get(`/hotels`)
    .then((respond) => {
      const offers = offersAdapter(respond.data);
      const cities = getActualCities(offers);

      dispatch({type: `SET_INIT_OFFERS`, payload: offers});
      dispatch({type: `CHANGE_ACTUAL_CITIES`, payload: cities});
      dispatch(changeCity(cities[0]));
      dispatch(changeOffersByCurrentCity());
    });
};
