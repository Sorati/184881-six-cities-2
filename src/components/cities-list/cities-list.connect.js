import {connect} from 'react-redux';
import CitiesList from './cities-list';
import * as AppActionCreator from '../app/actions';

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeItem: state.app.city,
  cities: state.app.actualCities
});

const mapDispatchToProps = (dispatch) => ({
  cityFilterClickHandler: (city) => {
    dispatch(AppActionCreator.changeCity(city));
    dispatch(AppActionCreator.changeOffersByCurrentCity());
    dispatch(AppActionCreator.changeSortType(`Popular`));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
