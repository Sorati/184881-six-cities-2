import {connect} from 'react-redux';
import Main from './main';

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentCity: state.app.city,
  placeCards: state.app.offers,
});


export default connect(mapStateToProps)(Main);
