import PlaceCardList from '../place-card-list/place-card-list.connect';
import Map from '../map/map.connect';
import CitiesList from '../cities-list/cities-list.connect';
import withLayout from '../../hocs/withLayout';
import PlacesSorting from '../places-sorting/places-sorting.connect';

const Main = (props) => {
  const {
    currentCity,
    placeCards
  } = props;

  return (<main className="page__main page__main--index">
    <h1 className="visually-hidden">Cities</h1>
    <div className="tabs">
      <section className="locations container">
        <CitiesList/>
      </section>
    </div>
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{[placeCards.length, ` `]}
              places to stay in {[` `, currentCity]}</b>
          <PlacesSorting/>
          <PlaceCardList/>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map/>
          </section>
        </div>
      </div>
    </div>
  </main>);
};

Main.propTypes = {
  currentCity: PropTypes.string.isRequired,
  placeCards: PropTypes.array.isRequired
};

export default withLayout(Main);
