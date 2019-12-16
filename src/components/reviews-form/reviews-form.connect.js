import {connect} from 'react-redux';
import ReviewsForm from './reviews-form';
import * as ActionCreator from './actions';

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {});

const mapDispatchToProps = (dispatch) => ({
  sendComment: (hotelId, data) => dispatch((...args) => ActionCreator.sendComment(...args, hotelId, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsForm);

