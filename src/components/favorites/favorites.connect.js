import {connect} from 'react-redux';
import * as ActionCreator from './actions';
import Favorites from './favorites';

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  cards: state.app.userFavorites,
});

const mapDispatchToProps = (dispatch) => ({
  loadFavorites: () => dispatch((...args) => ActionCreator.init(...args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
