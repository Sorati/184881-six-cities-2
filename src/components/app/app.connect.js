import {connect} from 'react-redux';
import * as AppActionCreator from './actions';
import App from './app';

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {});

const mapDispatchToProps = (dispatch) => ({
  loadOffers: () => dispatch((...args) => AppActionCreator.init(...args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
