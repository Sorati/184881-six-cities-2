import {connect} from 'react-redux';
import PlaceCardDetail from './place-card-detail';
import * as AppActionCreator from '../app/actions';
import * as ActionCreator from './actions';
import {compose} from 'recompose';

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuthorizationRequired: state.app.isAuthorizationRequired,
  card: state.app.activeCard,
  nearCards: state.app.activeCardNears,
  comments: state.app.activeCardComments,
});

const mapDispatchToProps = (dispatch) => ({
  changeFavoriteStatus: (hotelId, status) => dispatch((...args) => AppActionCreator.changeFavoriteStatus(...args, hotelId, status)),

  initCard: (id) => {
    compose(dispatch, AppActionCreator.setActiveCard, AppActionCreator.findActiveCard)(id);
    dispatch((...args) => ActionCreator.loadComments(...args, id));
    dispatch(AppActionCreator.changeNearCardsByCurrentCity());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceCardDetail);
