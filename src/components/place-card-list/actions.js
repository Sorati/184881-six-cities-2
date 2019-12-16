import store from '../../store';
import {changeOffersByCurrentCity, changeOffers} from '../app/actions';

export const sortOffers = (type) => {
  switch (type) {
    case `Popular`:
      return changeOffersByCurrentCity();
    case `Price: low to high`:
      return changeOffers(store.getState().app.offers.sort((a, b) => a.price - b.price));
    case `Price: high to low`:
      return changeOffers(store.getState().app.offers.sort((a, b) => b.price - a.price));
    case `Top rated first`:
      return changeOffers(store.getState().app.offers.sort((a, b) => b.rating - a.rating));
    default:
      return null;
  }
};
