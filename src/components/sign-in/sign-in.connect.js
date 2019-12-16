import {connect} from 'react-redux';
import * as ActionCreator from './actions';
import SignIn from './sign-in';

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
});

const mapDispatchToProps = (dispatch) => ({
  loginSubmitHandler: (state) => dispatch((...args) => ActionCreator.login(state, ...args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

