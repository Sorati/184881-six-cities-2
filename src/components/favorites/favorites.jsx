import withLayout from '../../hocs/withLayout';
import PlaceCardList from '../place-card-list/place-card-list';


class Favorites extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadFavorites();
  }

  render() {

    const {cards} = this.props;
    const CARDS_MIN_COUNT = 0;

    if (Object.keys(cards).length === CARDS_MIN_COUNT) {

      return (
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
              </div>
            </section>
          </div>
        </main>
      );

    } else {

      const cardList = [];

      for (const prop in cards) {

        if (cards.hasOwnProperty(prop)) {

          cardList.push(<>

            <li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>{prop}</span>
                  </a>
                </div>
              </div>

              <PlaceCardList cards={cards[prop]} sort={`Popular`} isFavoriteList={true}/>

            </li>

        </>);
        }
      }


      return (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">

                {cardList}

              </ul>
            </section>
          </div>
        </main>

      );


    }

  }
}

export default withLayout(Favorites);

Favorites.propTypes = {
  loadFavorites: PropTypes.func,
  cards: PropTypes.array.isRequired
};
