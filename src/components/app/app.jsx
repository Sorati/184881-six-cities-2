import Main from '../main/main.connect';
import SignIn from '../sign-in/sign-in.connect';
import PlaceCardDetail from '../place-card-detail/place-card-detail.connect';
import Favorites from '../favorites/favorites.connect';
import withAuth from '../../hocs/withAuth';

import {
  Route,
  Switch
} from 'react-router-dom';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadOffers();
  }

  render() {

    return (
      <Switch>
        <Route path="/" exact component={Main}/>
        <Route path="/login" exact component={SignIn}/>
        <Route path="/offer/:id" exact component={PlaceCardDetail}/>
        <Route path="/favorites" exact component={withAuth(Favorites)} />
        <Route
          render={() => (
            <h1>
              404.
              <br />
              <small>Page not found</small>
            </h1>
          )}
        />
      </Switch>
    );
  }
}

App.propTypes = {
  loadOffers: PropTypes.func
};

export default App;
