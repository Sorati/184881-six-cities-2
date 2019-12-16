import {connect} from 'react-redux';
import * as ActionCreator from './actions';
import {changeSortType} from '../app/actions';
import PlacesOptionList from './places-option-list';

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  availableSorts: state.app.availableSorts,
  sortType: state.app.sortType,
});

const mapDispatchToProps = (dispatch) => ({
  optionsClickHandler: (option) => {
    dispatch(changeSortType(option));
    dispatch(ActionCreator.sortOffers(option));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlacesOptionList);
