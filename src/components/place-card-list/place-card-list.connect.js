import {connect} from 'react-redux';
import PlaceCardList from './place-card-list';
import * as AppActionCreator from '../app/actions';


const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  cards: state.app.offers,
  sort: state.app.sortType,
});


const mapDispatchToProps = (dispatch) => ({
  onCardHover: (card) => {
    dispatch(AppActionCreator.setActiveCard(card));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceCardList);
