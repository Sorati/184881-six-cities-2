import {Redirect} from 'react-router-dom';

const withAuthReqiure = (Component) => {
  class RequireAuth extends React.PureComponent {

    constructor(props) {
      super(props);

      this.state = {
        needAuth: false,
      };

      this.setAuthStateHandler = this
      .setAuthStateHandler
      .bind(this);
    }

    setAuthStateHandler(payload) {
      this.setState({needAuth: payload});
    }

    render() {
      if (this.state.needAuth) {
        return <Redirect to="/login"/>;
      } else {
        return <Component {...this.props} onClickToAuthRequire={this.setAuthStateHandler}/>;
      }
    }
  }

  RequireAuth.propTypes = {
    isAuthorizationRequired: PropTypes.bool.isRequired
  };

  return RequireAuth;
};

export default withAuthReqiure;


