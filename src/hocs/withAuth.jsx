import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';


const withAuth = (Component) => {
  class RequireAuth extends React.PureComponent {

    constructor(props) {
      super(props);
    }

    render() {
      if (this.props.isAuthorizationRequired) {
        return (<Redirect to="/login"/>);
      } else {
        return (<Component {...this.props} />);
      }
    }
  }

  RequireAuth.propTypes = {
    isAuthorizationRequired: PropTypes.bool.isRequired
  };

  const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
    isAuthorizationRequired: state.app.isAuthorizationRequired,
  });

  return connect(mapStateToProps)(RequireAuth);

};

export default withAuth;


